import { ApplicationCommandType } from 'discord.js'

import { player } from '../utils/player'
import { Command } from './types'

export const Unpause: Command = {
  name: 'unpause',
  description: 'Unpause player',
  type: ApplicationCommandType.ChatInput,
  run: async (_, interaction) => {
    try {
      const unpaused = player.unpause()

      if (!unpaused) {
        throw new Error()
      }

      await interaction.followUp({
        content: `**Playing**`,
      })
    } catch (error) {
      const content =
        (error as Error).message ||
        'An error occurred while processing your request'
      await interaction.followUp({ content })
    }
  },
}
