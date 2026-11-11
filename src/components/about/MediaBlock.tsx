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
          className="w-full aspect-video rounded-card"
        />
      )
    case 'video':
      return (
        <video
          src={media.src}
          poster={media.poster}
          title={media.title}
          controls
          className="w-full aspect-video rounded-card bg-fg"
        />
      )
    case 'image':
      return (
        <figure className="flex flex-col gap-sm">
          <img
            src={media.src}
            alt={media.alt}
            className="w-full rounded-card object-cover"
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
