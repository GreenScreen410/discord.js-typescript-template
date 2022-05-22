import { Client, CommandInteraction, MessageEmbed } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export default {
  ...new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!"),

  run: async (client: Client, interaction: CommandInteraction) => {
    const embed = new MessageEmbed()
      .setColor("#FF0000")
      .setTitle("🏓 Pong!")
      .setDescription(`Bot Latency : ${client.ws.ping}ms`)
      .setTimestamp()
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    interaction.followUp({ embeds: [embed] });
  },
};
