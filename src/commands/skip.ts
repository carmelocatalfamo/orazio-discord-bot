import { AudioPlayerStatus } from '@discordjs/voice'
import { ApplicationCommandType } from 'discord.js'

import { removePlayingSong } from '../db/song'
import { player } from '../player'
import { Command } from './types'

export const Skip: Command = {
  name: 'skip',
  description: 'Skip song',
  type: ApplicationCommandType.ChatInput,
  run: async (_, interaction) => {
    try {
      // Check if player status is "playing"
      if (player.state.status !== AudioPlayerStatus.Playing) {
        throw new Error("Chi cazzu è skippari? Non 'navi musica")
      }

      // Remove playing song from DB
      await removePlayingSong()

      // Stop player (there is a listener on 'src/utils/player.ts' that play
      // next song - when queue isn't empty - if player status change to "stop")
      const stopped = player.stop()

      // If the player hasn't stopped, throw an error
      if (!stopped) {
        throw new Error()
      }

      await interaction.followUp({
        content: `**Skipped**`,
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
