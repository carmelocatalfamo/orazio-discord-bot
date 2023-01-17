import { AudioPlayerStatus } from '@discordjs/voice'
import { ApplicationCommandType } from 'discord.js'

import { player } from '../player'
import { Command } from './types'

export const Unpause: Command = {
  name: 'unpause',
  description: 'Unpause player',
  type: ApplicationCommandType.ChatInput,
  run: async (_, interaction) => {
    try {
      // Check if player status is "paused"
      if (player.state.status !== AudioPlayerStatus.Paused) {
        throw new Error('Non sugnu in pausa, comando inutile, comu a tia!')
      }

      // Unpause player
      const unpaused = player.unpause()

      // If the player hasn't unpaused, throw an error
      if (!unpaused) {
        throw new Error()
      }

      await interaction.followUp({
        content: `**Playing**`,
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
