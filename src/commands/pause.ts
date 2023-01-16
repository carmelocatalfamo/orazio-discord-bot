import { ApplicationCommandType } from 'discord.js'

import { player } from '../utils/player'
import { Command } from './types'

export const Pause: Command = {
  name: 'pause',
  description: 'Pause player',
  type: ApplicationCommandType.ChatInput,
  run: async (_, interaction) => {
    try {
      const paused = player.pause()

      if (!paused) {
        throw new Error()
      }

      await interaction.followUp({
        content: `**Paused**`,
      })
    } catch (error) {
      const content =
        (error as Error).message ||
        'An error occurred while processing your request'
      await interaction.followUp({ content })
    }
  },
}
