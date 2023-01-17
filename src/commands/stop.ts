import { ApplicationCommandType } from 'discord.js'

import { clearQueue } from '../db/song'
import { player } from '../player'
import { Command } from './types'

export const Stop: Command = {
  name: 'stop',
  description: 'Stop player and clear queue',
  type: ApplicationCommandType.ChatInput,
  run: async (_, interaction) => {
    try {
      // Remove all songs from DB
      await clearQueue()

      // Stop player
      const stopped = player.stop()

      // If the player hasn't stopped, throw an error
      if (!stopped) {
        throw new Error()
      }

      await interaction.followUp({
        content: `**Stopped. Queue cleared**`,
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
