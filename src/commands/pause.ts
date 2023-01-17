import { AudioPlayerStatus } from '@discordjs/voice'
import { ApplicationCommandType } from 'discord.js'

import { player } from '../player'
import { Command } from './types'

export const Pause: Command = {
  name: 'pause',
  description: 'Pause player',
  type: ApplicationCommandType.ChatInput,
  run: async (_, interaction) => {
    try {
      // Check if player status is "playing"
      if (player.state.status === AudioPlayerStatus.Playing) {
        throw new Error("Chi c'è pausari, non staiu sunandu nenti")
      }

      // Pause
      const paused = player.pause()

      // If the player hasn't paused, throw an error
      if (!paused) {
        throw new Error()
      }

      await interaction.followUp({
        content: `**Paused**`,
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
