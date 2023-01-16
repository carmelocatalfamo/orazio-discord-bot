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

import { getYoutubeVideoFromString } from '../utils/getYoutubeVideoFromString'
import { player } from '../utils/player'
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
        throw new Error('Member not found')
      }

      const { channel } = member.voice

      // Check if member is connected to voice channel
      if (!channel) {
        throw new Error("Compare, ha 'ntrasiri 'nto canali BAAAABBU")
      }

      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      })

      const youtubeVideo = await getYoutubeVideoFromString(query)
      const resource = createAudioResource(youtubeVideo.stream)

      // Wait to connection state is "ready"
      await entersState(connection, VoiceConnectionStatus.Ready, 5000)

      connection.subscribe(player)
      player.play(resource)

      await interaction.followUp({
        content: `Playing **${youtubeVideo.title}**`,
      })
    } catch (error) {
      const content =
        (error as Error).message ||
        'An error occurred while processing your request'
      await interaction.followUp({ content })
    }
  },
}
