import "dotenv/config";
import { Client, Collection } from "discord.js";

const client: Client = new Client({ intents: 32767 });
export default client;

declare module "discord.js" {
  export interface Client {
    slashCommands: Collection<unknown, any>;
  }
}

export { };

client.slashCommands = new Collection();

require("./handler")(client);

client.login(process.env.TOKEN);
