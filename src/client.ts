import { Client, Events, GatewayIntentBits, Interaction } from 'discord.js'

import { commands } from './commands'

// Define a new client
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
})

// Attach commands
client.on(Events.ClientReady, async (c) => {
  await c.application.commands.set(commands)
  console.log(`Ready! Logged in as ${c.user.tag}`)
})

// Handling commands
client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (interaction.isCommand()) {
    const command = commands.find(
      ({ name }) => name === interaction.commandName,
    )

    if (!command) {
      interaction.followUp({ content: 'An error has occurred' })
      return
    }

    await interaction.deferReply()

    command.run(client, interaction)
  }
})

client.login(process.env.TOKEN)
