import {
  AudioPlayerState,
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
} from '@discordjs/voice'

import {
  findNextSongToPlay,
  removePlayingSong,
  updateSongStatus,
} from './db/song'
import { getYoutubeVideoFromString } from './utils/getYoutubeVideoFromString'

export const player = createAudioPlayer()

player.on('stateChange', async (oldState, newState) => {
  const status = composePlayerStatus(oldState, newState)

  switch (status) {
    case 'PLAY_END': {
      await removePlayingSong()
      const song = await findNextSongToPlay()

      if (song) {
        const youtubeVideo = await getYoutubeVideoFromString(song.url)
        const resource = createAudioResource(youtubeVideo.stream)
        await updateSongStatus({ id: song.id, status: 'PLAYING' })
        player.play(resource)
      }

      return
    }
  }
})

const composePlayerStatus = (
  oldState: AudioPlayerState,
  newState: AudioPlayerState,
) => {
  if (
    oldState.status === AudioPlayerStatus.Playing &&
    newState.status === AudioPlayerStatus.Idle
  ) {
    return 'PLAY_END'
  } else if (
    oldState.status === AudioPlayerStatus.Idle &&
    newState.status === AudioPlayerStatus.Playing
  ) {
    return 'PLAY_START'
  }
}
