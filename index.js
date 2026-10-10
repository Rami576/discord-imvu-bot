import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from "discord.js";

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

if (!token || !clientId || !guildId) {
throw new Error("Missing DISCORD_TOKEN, CLIENT_ID, or GUILD_ID environment variables.");
}

const commands = [
new SlashCommandBuilder()
.setName("status")
.setDescription("Check if the bot is online"),
new SlashCommandBuilder()
.setName("help")
.setDescription("Show bot commands")
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

await rest.put(
Routes.applicationGuildCommands(clientId, guildId),
{ body: commands }
);

const client = new Client({
intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
console.log("Bot online as ${client.user.tag}");
});

client.on("interactionCreate", async interaction => {
if (!interaction.isChatInputCommand()) return;

if (interaction.commandName === "status") {
await interaction.reply("✅ البوت شغّال!");
}

if (interaction.commandName === "help") {
await interaction.reply("الأوامر المتاحة: /status و /help");
}
});

await client.login(token);
