import { Client, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export default {
  ...new SlashCommandBuilder()
    .setName("test")
    .setDescription("Testing Slash Command"),

  run: async (client: Client, interaction: CommandInteraction) => {
    interaction.followUp({ content: "Test Message" });
  },
};
