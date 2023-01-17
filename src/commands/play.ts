import {
  createAudioResource,
  entersState,
  joinVoiceChannel,
  VoiceConnectionStatus,
} from '@discordjs/voice'
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from 'discord.js'

import { addSong, clearQueue, songIsPlaying } from '../db/song'
import { player } from '../player'
import { getYoutubeVideoFromString } from '../utils/getYoutubeVideoFromString'
import { Command } from './types'

export const Play: Command = {
  name: 'play',
  description: 'Play a song!',
  options: [
    {
      name: 'query',
      type: ApplicationCommandOptionType.String,
      description: 'Name or youtube URL to play',
      required: true,
    },
  ],
  type: ApplicationCommandType.ChatInput,
  run: async (_, interaction) => {
    try {
      const queryOption = interaction.options.get('query')
      const query = queryOption ? `${queryOption.value}` : ''

      // Find user that start command
      const member = interaction.guild?.members.cache.find((m) => {
        return interaction.user.id === m.id
      })

      if (!member) {
        throw new Error()
      }

      // Find user channel
      const { channel } = member.voice

      // Check if member is connected to voice channel
      if (!channel) {
        throw new Error("Compare, ha 'ntrasiri 'nto canali BAAAABBU")
      }

      // Get video from YouTube by `query`
      const youtubeVideo = await getYoutubeVideoFromString(query)
      // Check if a song is playing
      const isPlaying = await songIsPlaying()

      // If a song is playing add new song to queue
      if (isPlaying) {
        await addSong({
          addedBy: member.user.tag,
          status: 'QUEUEING',
          url: youtubeVideo.url,
        })

        return await interaction.followUp({
          content: `Adding to queue: **${youtubeVideo.title}**`,
        })
      }

      // Connect to user voice channel
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      })

      // Add a listener on bot connection.
      // Clear queue if user disconnect bot from voice channel
      connection.on('stateChange', async (_, newState) => {
        if (newState.status === VoiceConnectionStatus.Disconnected) {
          await clearQueue()
        }
      })

      const resource = createAudioResource(youtubeVideo.stream)

      // Wait until connection state is "ready"
      await entersState(connection, VoiceConnectionStatus.Ready, 5000)

      // Play!
      connection.subscribe(player)
      player.play(resource)

      // Add song to DB
      await addSong({
        addedBy: member.user.tag,
        status: 'PLAYING',
        url: youtubeVideo.url,
      })

      await interaction.followUp({
        content: `Playing **${youtubeVideo.title}**`,
      })
    } catch (error) {
      const content = `**${
        (error as Error).message ||
        'An error occurred while processing your request'
      }**`
      await interaction.followUp({ content })
    }
  },
}
