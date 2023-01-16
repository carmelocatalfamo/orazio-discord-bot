import { ApplicationCommandType } from 'discord.js'

import { player } from '../utils/player'
import { Command } from './types'

export const Stop: Command = {
  name: 'stop',
  description: 'Stop player',
  type: ApplicationCommandType.ChatInput,
  run: async (_, interaction) => {
    try {
      const stopped = player.stop()

      if (!stopped) {
        throw new Error()
      }

      await interaction.followUp({
        content: `**Stopped**`,
      })
    } catch (error) {
      const content =
        (error as Error).message ||
        'An error occurred while processing your request'
      await interaction.followUp({ content })
    }
  },
}
