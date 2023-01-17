import { ApplicationCommandType } from 'discord.js'

import { Song } from '../db/song'
import { Command } from './types'

export const Debug: Command = {
  name: 'debug',
  description: 'Debug',
  type: ApplicationCommandType.ChatInput,
  run: async (_, interaction) => {
    // Find all songs
    const songs = await Song.findAll({ raw: true })
    // Print songs list to the console
    console.log(songs)

    await interaction.followUp({ content: 'Debug!' })
  },
}
