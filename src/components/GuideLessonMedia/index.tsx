import Image from 'next/image'
import type { Media } from '@/payload-types'
import { Play } from 'lucide-react'

export function GuideLessonMedia({
  image,
  imageSrc,
  title,
  videoTitle,
  videoUrl,
}: {
  image?: number | Media | null
  imageSrc?: string
  title: string
  videoTitle?: string | null
  videoUrl?: string | null
}) {
  const media = typeof image === 'object' ? image : null
  const imageUrl = media?.url
  const resolvedImageUrl = imageUrl || imageSrc
  const source = videoUrl?.trim()
  const embedUrl = source ? getVideoEmbedUrl(source) : null

  if (!resolvedImageUrl && !source) return null

  return (
    <section className="space-y-5" aria-label={`${title} media`}>
      {resolvedImageUrl && (
        <figure className="overflow-hidden rounded-lg border border-[#c9d5cd] bg-white">
          <Image
            alt={media?.alt || title}
            className="h-auto max-h-[38rem] w-full object-contain"
            height={media?.height || 900}
            src={resolvedImageUrl}
            unoptimized
            width={media?.width || 1200}
          />
          <figcaption className="border-t border-[#d9e1da] px-5 py-3 text-sm text-[#58746a]">
            {media?.alt || title}
          </figcaption>
        </figure>
      )}
      {source && (
        <figure className="overflow-hidden rounded-lg border border-[#164044] bg-[#002326]">
          {embedUrl ? (
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full"
              referrerPolicy="strict-origin-when-cross-origin"
              src={embedUrl}
              title={`${title} video`}
            />
          ) : (
            <video className="aspect-video w-full" controls preload="metadata" src={source}>
              Your browser does not support embedded video.
            </video>
          )}
          <figcaption className="flex items-center gap-2 px-5 py-3 text-sm text-[#d9e9e5]">
            <Play aria-hidden="true" className="size-4 text-[#b9f0dc]" />
            {videoTitle || 'Lesson video'}
          </figcaption>
        </figure>
      )}
    </section>
  )
}

function getVideoEmbedUrl(videoUrl: string): string | null {
  try {
    const url = new URL(videoUrl)
    const host = url.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const videoId = url.pathname.split('/').filter(Boolean)[0]
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      const videoId =
        url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1]
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null
    }

    if (host === 'vimeo.com') {
      const videoId = url.pathname.split('/').filter(Boolean).at(-1)
      return videoId && /^\d+$/.test(videoId) ? `https://player.vimeo.com/video/${videoId}` : null
    }
  } catch {
    return null
  }

  return null
}
