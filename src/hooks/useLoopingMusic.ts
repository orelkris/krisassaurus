import { useEffect, useRef, useState } from 'react'
import type { LoopingMusic } from '@/types/quickGame'

// Seconds to fade in or out
const FADE = 1.5

// Plays a music loop with no gap at the join. An <audio loop> element leaves
// a short silence with MP3 files, so this uses the Web Audio API, which
// repeats exactly between loopStart and loopEnd.
// play() must first be called from a click, since browsers only allow sound
// after the reader has done something on the page
export function useLoopingMusic(music: LoopingMusic) {
  const context = useRef<AudioContext | null>(null)
  const volume = useRef<GainNode | null>(null)
  const playing = useRef(false)
  const [muted, setMuted] = useState(false)
  const mutedRef = useRef(false)

  // Moves the volume to `to` over FADE seconds
  const fadeTo = (to: number) => {
    const ctx = context.current
    const gain = volume.current?.gain
    if (!ctx || !gain) return
    gain.cancelScheduledValues(ctx.currentTime)
    gain.setValueAtTime(gain.value, ctx.currentTime)
    gain.linearRampToValueAtTime(to, ctx.currentTime + FADE)
  }

  const load = async (ctx: AudioContext, gain: GainNode) => {
    const data = await fetch(music.url).then((res) => res.arrayBuffer())
    const buffer = await ctx.decodeAudioData(data)
    if (context.current !== ctx) return // stopped while loading
    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true
    source.loopStart = music.loopStart
    source.loopEnd = music.loopEnd
    source.connect(gain)
    source.start(0, music.loopStart)
  }

  // The music keeps running silently while paused, so it picks up where it was
  const play = () => {
    if (!context.current) {
      const ctx = new AudioContext()
      const gain = ctx.createGain()
      gain.gain.value = 0
      gain.connect(ctx.destination)
      context.current = ctx
      volume.current = gain
      load(ctx, gain).catch(() => {})
    }
    context.current.resume()
    playing.current = true
    fadeTo(mutedRef.current ? 0 : 1)
  }

  const pause = () => {
    playing.current = false
    fadeTo(0)
  }

  const toggleMute = () => {
    mutedRef.current = !mutedRef.current
    setMuted(mutedRef.current)
    fadeTo(playing.current && !mutedRef.current ? 1 : 0)
  }

  // Stops the music for good, e.g. when the game ends
  const stop = () => {
    context.current?.close()
    context.current = null
    volume.current = null
    playing.current = false
  }

  useEffect(() => {
    return () => {
      context.current?.close()
      context.current = null
    }
  }, [])

  return { play, pause, stop, muted, toggleMute }
}
