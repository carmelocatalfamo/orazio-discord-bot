import { Readable } from 'stream'
import ytStream from 'yt-stream'

export interface YoutubeVideo {
  author: string
  stream: Readable
  title: string
  url: string
}

export const getYoutubeVideoFromString = async (
  query: string,
): Promise<YoutubeVideo> => {
  const isVideoURL = query.includes('https://www.youtube.com')
  let videoURL = isVideoURL ? query : ''

  if (!isVideoURL) {
    const results = await ytStream.search(query)

    if (!results.length) {
      throw new Error('Youtube video not found')
    }

    videoURL = results[0].url
  }

  const {
    info: { title, author },
    stream,
  } = await ytStream.stream(videoURL, {
    quality: 'high',
    type: 'audio',
    highWaterMark: 1048576 * 32,
  })

  return {
    author,
    stream,
    title,
    url: videoURL,
  }
}
