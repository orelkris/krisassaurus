import type { QuizEndSound, QuizMusic } from '@/types/quiz'

// The Quiz's sounds. Most are made in the browser with the Web Audio API:
// three music loops, the end-of-time sounds, the last-seconds tick and the
// reveal chime. Kris's tracks (e.g. Phrygian) and a music file the teacher
// picks play on repeat through an <audio> element instead.
// Sound only starts after a click or key, so the first play() must come from one

interface NoteOptions {
  vol?: number
  att?: number
  rel?: number
  type?: OscillatorType
  freq?: number
  detune?: number
  cut?: number
}

// One of the made-up music loops: 4 bars of 16 steps each
interface MusicStyle {
  bpm: number
  chords: number[][]
  bass: number[]
  // Plays one step. hot = the last 10 seconds, when the music gets busier
  step: (
    audio: QuizAudio,
    t: number,
    s: number,
    chord: number[],
    bass: number,
    hot: boolean
  ) => void
}

const midiToHz = (m: number) => 440 * Math.pow(2, (m - 69) / 12)

const STYLES: Record<'upbeat' | 'thinking' | 'suspense', MusicStyle> = {
  upbeat: {
    bpm: 124,
    chords: [
      [60, 64, 67],
      [55, 59, 62],
      [57, 60, 64],
      [53, 57, 60],
    ],
    bass: [36, 43, 45, 41],
    step(a, t, s, ch, b, hot) {
      if (s % 4 === 0) a.kick(t, 0.85)
      if (s === 4 || s === 12) a.hit(t, { hp: 1400, dur: 0.14, vol: 0.3 })
      if (s % 4 === 2 || (hot && s % 2 === 1))
        a.hit(t, { hp: 7500, dur: 0.045, vol: 0.14 })
      if (s % 2 === 0)
        a.note(t, b + (s % 8 === 6 ? 12 : 0), 0.11, {
          type: 'sawtooth',
          vol: 0.13,
          cut: 650,
        })
      a.note(
        t,
        ch[[0, 1, 2, 1][s % 4]] + 12 + (s >= 8 && s % 4 === 3 ? 12 : 0),
        0.08,
        { type: 'square', vol: 0.045, cut: 2600 }
      )
      if (s === 0)
        ch.forEach((m) =>
          a.note(t, m + 12, 0.9, {
            type: 'triangle',
            vol: 0.03,
            att: 0.05,
            rel: 0.3,
          })
        )
    },
  },
  thinking: {
    bpm: 88,
    chords: [
      [53, 57, 60, 64],
      [52, 55, 59, 62],
      [50, 53, 57, 60],
      [48, 52, 55, 59],
    ],
    bass: [41, 40, 38, 36],
    step(a, t, s, ch, b, hot) {
      const bar = (16 * 60) / 88 / 4
      if (s === 0) {
        ch.forEach((m) =>
          a.note(t, m, bar * 0.95, {
            type: 'sine',
            vol: 0.035,
            att: 0.35,
            rel: 0.6,
          })
        )
        a.note(t, b, bar * 0.45, { type: 'triangle', vol: 0.2, rel: 0.3 })
      }
      if (s === 8)
        a.note(t, b + 7, bar * 0.4, { type: 'triangle', vol: 0.14, rel: 0.3 })
      if (s === 0 || s === 10) a.kick(t, 0.5)
      if (s === 4 || s === 12) a.hit(t, { hp: 3000, dur: 0.03, vol: 0.12 })
      if (hot ? s % 2 === 0 : s % 4 === 2)
        a.hit(t, { hp: 8000, dur: 0.035, vol: 0.08 })
      if (s % 2 === 0)
        a.note(t, ch[(s / 2) % 4] + 12, 0.22, {
          type: 'triangle',
          vol: 0.06,
          rel: 0.2,
        })
      if (s === 14)
        a.note(t, ch[3] + 24, 0.3, { type: 'sine', vol: 0.03, rel: 0.4 })
    },
  },
  suspense: {
    bpm: 116,
    chords: [
      [57, 60, 64],
      [53, 57, 60],
      [50, 53, 57],
      [52, 56, 59],
    ],
    bass: [33, 29, 26, 28],
    step(a, t, s, ch, b, hot) {
      a.note(t, b + (s % 8 === 7 ? 12 : 0), 0.07, {
        type: 'sawtooth',
        vol: s % 4 === 0 ? 0.17 : 0.1,
        cut: hot ? 900 : 480,
      })
      if (s % 8 === 0 || (hot && s % 4 === 0)) a.kick(t, 0.75)
      if (hot || s % 2 === 0) a.hit(t, { hp: 8500, dur: 0.03, vol: 0.09 })
      if (s === 8) a.hit(t, { hp: 1600, dur: 0.12, vol: 0.18 })
      if (s === 0)
        ch.forEach((m) =>
          a.note(t, m, 0.45, {
            type: 'sawtooth',
            vol: 0.045,
            cut: 1400,
            rel: 0.2,
          })
        )
      if (s === 14 || (hot && s === 6))
        a.note(t, ch[2] + 24, 0.12, { type: 'sine', vol: 0.05, rel: 0.25 })
    },
  },
}

export class QuizAudio {
  private ctx: AudioContext | null = null
  private master!: GainNode
  private musicGain!: GainNode
  private sfx!: GainNode
  private noise!: AudioBuffer
  private timer: ReturnType<typeof setInterval> | null = null
  private style: MusicStyle | null = null
  private stepCount = 0
  private nextT = 0
  private fileEl: HTMLAudioElement | null = null
  private fileUrl: string | null = null
  // Kris's tracks, by music name, played through their own <audio>
  private trackEls: Partial<Record<QuizMusic, HTMLAudioElement>> = {}

  playing = false
  // The last 10 seconds: the music gets busier
  hot = false
  muted = false
  music: QuizMusic = 'upbeat'
  volume = 0.7

  private ensure() {
    if (!this.ctx) {
      const ctx = new AudioContext()
      this.ctx = ctx
      this.master = ctx.createGain()
      this.master.connect(ctx.destination)
      this.musicGain = ctx.createGain()
      this.musicGain.connect(this.master)
      this.sfx = ctx.createGain()
      this.sfx.gain.value = 0.9
      this.sfx.connect(this.master)
      // One second of white noise, for drums
      this.noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
      const data = this.noise.getChannelData(0)
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
      this.master.gain.value = this.muted ? 0 : 1
    }
    if (this.ctx.state === 'suspended') this.ctx.resume()
    return this.ctx
  }

  note(
    t: number,
    midi: number,
    dur: number,
    o: NoteOptions = {},
    dest?: AudioNode
  ) {
    const c = this.ctx!
    const osc = c.createOscillator()
    const g = c.createGain()
    const vol = o.vol ?? 0.15
    const att = o.att ?? 0.005
    const rel = o.rel ?? 0.08
    osc.type = o.type ?? 'triangle'
    osc.frequency.value = o.freq ?? midiToHz(midi)
    if (o.detune) osc.detune.value = o.detune
    let node: AudioNode = osc
    if (o.cut) {
      const f = c.createBiquadFilter()
      f.type = 'lowpass'
      f.frequency.value = o.cut
      osc.connect(f)
      node = f
    }
    node.connect(g)
    g.connect(dest ?? this.musicGain)
    const hold = t + Math.max(att, dur)
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(vol, t + att)
    g.gain.setValueAtTime(vol, hold)
    g.gain.exponentialRampToValueAtTime(0.0001, hold + rel)
    osc.start(t)
    osc.stop(t + dur + rel + 0.05)
  }

  kick(t: number, vol = 0.8, dest?: AudioNode) {
    const c = this.ctx!
    const o = c.createOscillator()
    const g = c.createGain()
    o.frequency.setValueAtTime(150, t)
    o.frequency.exponentialRampToValueAtTime(42, t + 0.14)
    g.gain.setValueAtTime(vol, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.32)
    o.connect(g)
    g.connect(dest ?? this.musicGain)
    o.start(t)
    o.stop(t + 0.35)
  }

  hit(t: number, { hp = 6000, dur = 0.05, vol = 0.15 } = {}, dest?: AudioNode) {
    const c = this.ctx!
    const s = c.createBufferSource()
    const f = c.createBiquadFilter()
    const g = c.createGain()
    s.buffer = this.noise
    f.type = 'highpass'
    f.frequency.value = hp
    g.gain.setValueAtTime(vol, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    s.connect(f)
    f.connect(g)
    g.connect(dest ?? this.musicGain)
    s.start(t, Math.random() * 0.5)
    s.stop(t + dur + 0.02)
  }

  // A music file from the teacher's computer
  setFile(file: File) {
    if (this.fileUrl) URL.revokeObjectURL(this.fileUrl)
    this.fileUrl = URL.createObjectURL(file)
    if (!this.fileEl) {
      this.fileEl = new Audio()
      this.fileEl.loop = true
    }
    this.fileEl.src = this.fileUrl
    this.applyVolume()
  }

  // A track from the site, e.g. Phrygian
  setTrack(music: QuizMusic, url: string) {
    if (this.trackEls[music]) return
    const el = new Audio(url)
    el.loop = true
    this.trackEls[music] = el
    this.applyVolume()
  }

  // The <audio> playing the current music, if it isn't made in the browser
  private get element() {
    return this.music === 'file'
      ? this.fileEl
      : (this.trackEls[this.music] ?? null)
  }

  private get synthesized() {
    return this.music in STYLES
  }

  get hasFile() {
    return this.fileEl !== null
  }

  applyVolume() {
    const elements = [this.fileEl, ...Object.values(this.trackEls)]
    elements.forEach((el) => {
      if (el) el.volume = this.muted ? 0 : Math.min(1, this.volume)
    })
    if (this.ctx && this.playing && this.synthesized)
      this.musicGain.gain.setTargetAtTime(
        this.volume * 0.55,
        this.ctx.currentTime,
        0.05
      )
  }

  play() {
    if (this.playing || this.music === 'off') return
    if (!this.synthesized) {
      const el = this.element
      if (!el) return
      this.applyVolume()
      el.play().catch(() => {})
      this.playing = true
      return
    }
    const c = this.ensure()
    this.style = STYLES[this.music as keyof typeof STYLES]
    this.playing = true
    this.musicGain.gain.cancelScheduledValues(c.currentTime)
    this.musicGain.gain.setValueAtTime(this.volume * 0.55, c.currentTime)
    this.nextT = c.currentTime + 0.06
    this.timer = setInterval(() => this.schedule(), 25)
    this.schedule()
  }

  // Lines up the notes for the next moment, a little ahead of time
  private schedule() {
    const c = this.ctx
    const style = this.style
    if (!c || !style) return
    const stepLength = 60 / style.bpm / 4
    while (this.nextT < c.currentTime + 0.15) {
      const s = this.stepCount % 16
      const bar = Math.floor(this.stepCount / 16) % 4
      style.step(
        this,
        this.nextT,
        s,
        style.chords[bar],
        style.bass[bar],
        this.hot
      )
      this.nextT += stepLength
      this.stepCount++
    }
  }

  pause() {
    if (this.timer) clearInterval(this.timer)
    this.timer = null
    ;[this.fileEl, ...Object.values(this.trackEls)].forEach((el) => {
      if (el && !el.paused) el.pause()
    })
    if (this.playing && this.ctx && this.synthesized) {
      const g = this.musicGain.gain
      const t = this.ctx.currentTime
      g.cancelScheduledValues(t)
      g.setValueAtTime(g.value, t)
      g.linearRampToValueAtTime(0, t + 0.15)
    }
    this.playing = false
  }

  // Back to the start of the music; rewind also rewinds a picked file
  stop(rewind = false) {
    this.pause()
    this.stepCount = 0
    this.hot = false
    if (rewind)
      [this.fileEl, ...Object.values(this.trackEls)].forEach((el) => {
        if (el) el.currentTime = 0
      })
  }

  setMuted(muted: boolean) {
    this.muted = muted
    if (this.ctx)
      this.master.gain.setTargetAtTime(
        muted ? 0 : 1,
        this.ctx.currentTime,
        0.03
      )
    this.applyVolume()
  }

  tick(last: boolean) {
    this.ensure()
    const t = this.ctx!.currentTime
    this.note(
      t,
      last ? 91 : 84,
      0.03,
      { type: 'sine', vol: 0.35, rel: 0.06 },
      this.sfx
    )
    this.note(
      t,
      last ? 79 : 72,
      0.02,
      { type: 'square', vol: 0.04, cut: 2000, rel: 0.04 },
      this.sfx
    )
  }

  end(kind: QuizEndSound) {
    if (kind === 'none') return
    const c = this.ensure()
    const t = c.currentTime + 0.02
    const d = this.sfx
    if (kind === 'gong') {
      // Partials of a gong: ratio, volume, seconds to fade
      const partials = [
        [1, 0.32, 4.5],
        [2.01, 0.14, 3],
        [2.76, 0.13, 2.6],
        [4.07, 0.08, 1.8],
        [5.4, 0.05, 1.2],
        [6.8, 0.03, 0.8],
      ]
      partials.forEach(([ratio, vol, fade]) => {
        const o = c.createOscillator()
        const g = c.createGain()
        o.type = 'sine'
        o.frequency.value = 98 * ratio
        g.gain.setValueAtTime(0, t)
        g.gain.linearRampToValueAtTime(vol, t + 0.008)
        g.gain.exponentialRampToValueAtTime(0.0001, t + fade)
        o.connect(g)
        g.connect(d)
        o.start(t)
        o.stop(t + fade + 0.05)
      })
      this.hit(t, { hp: 300, dur: 0.25, vol: 0.12 }, d)
    } else if (kind === 'fanfare') {
      ;[
        [67, 0],
        [72, 0.12],
        [76, 0.24],
      ].forEach(([m, at]) =>
        this.note(
          t + at,
          m,
          0.1,
          { type: 'square', vol: 0.09, cut: 3200, rel: 0.05 },
          d
        )
      )
      ;[72, 76, 79, 84].forEach((m) =>
        this.note(
          t + 0.38,
          m,
          0.75,
          { type: 'sawtooth', vol: 0.06, cut: 2800, att: 0.02, rel: 0.5 },
          d
        )
      )
      this.kick(t + 0.38, 0.6, d)
    } else {
      ;[0, 22].forEach((detune) =>
        this.note(
          t,
          0,
          0.85,
          {
            freq: 110,
            detune,
            type: 'sawtooth',
            vol: 0.16,
            cut: 1800,
            rel: 0.08,
          },
          d
        )
      )
    }
  }

  reveal() {
    this.ensure()
    const t = this.ctx!.currentTime
    ;[84, 88, 91, 96].forEach((m, i) =>
      this.note(
        t + i * 0.07,
        m,
        0.12,
        { type: 'sine', vol: 0.18, rel: 0.35 },
        this.sfx
      )
    )
  }

  close() {
    this.stop(true)
    this.ctx?.close()
    this.ctx = null
    if (this.fileUrl) URL.revokeObjectURL(this.fileUrl)
  }
}
