import { CommandInteraction } from "discord.js";
import client from "../index";

declare module "discord.js" {
  export interface Interaction {
    commandName: string;
  }
}

client.on("interactionCreate", async (interaction: CommandInteraction) => {
  if (interaction.isCommand()) {
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) {
      return interaction.reply("Invaild Interaction.");
    }

    if (!cmd.modal) {
      await interaction.deferReply({ ephemeral: false }).catch(() => { });
    }

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(interaction.user.id);

    cmd.run(client, interaction, args);
  }

  if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.slashCommands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }
});
