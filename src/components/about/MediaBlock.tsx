import type { AboutMedia } from '@/types'

interface MediaBlockProps {
  media: AboutMedia
}

function MediaBlock({ media }: MediaBlockProps) {
  switch (media.type) {
    case 'youtube':
      return (
        <iframe
          src={`https://www.youtube.com/embed/${media.youtubeId}`}
          title={media.title}
          allowFullScreen
          className="w-full aspect-video rounded-xl"
        />
      )
    case 'video':
      return (
        <video
          src={media.src}
          poster={media.poster}
          title={media.title}
          controls
          className="w-full aspect-video rounded-xl bg-black"
        />
      )
    case 'image':
      return (
        <figure className="flex flex-col gap-2">
          <img
            src={media.src}
            alt={media.alt}
            className="w-full rounded-xl object-cover"
          />
          {media.caption && (
            <figcaption className="text-small">{media.caption}</figcaption>
          )}
        </figure>
      )
    case 'audio':
      return (
        <audio
          src={media.src}
          title={media.title}
          controls
          className="w-full"
        />
      )
  }
}

export default MediaBlock
