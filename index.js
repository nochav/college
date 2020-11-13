const Discord = require('discord.js');
const fs = require('fs');
const got = require('got');
const info = require('./info.json');
const bot = new Discord.Client();
const prefix = info.prefix;
const muted = new Map();
const langwarn = new Map();
bot.login(info.token);
bot.commands = new Discord.Collection();

const totalMCH = bot.channels.cache.get(ch => ch.name.includes("Total"));
const humanMCH = bot.channels.cache.get(ch => ch.name.includes("Members"));
const botsMCH = bot.channels.cache.get(ch => ch.name.includes("Bots"));

// This should be a filter but I have removed the filter words
// for obvious reasons :)
const filter = [];

// This finds all JavaScript files
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

// This adds all the files to our bot automatically
// so we do not have to add them 1 by 1. If we choose
// to have 3-4 files, manually is fine. Once we have
// 10+ we should just use this for loop
for(const file of commandFiles){
	const command = require(`./commands/${file}`);
	
	bot.commands.set(command.name, command);
}

// This code is executed when the bot successfully
// connects to the discord api
bot.on('ready', () => {

	// The setInverval method runs the code with 
	// a delay of 10 seconds. 1 second is 1000
	// milliseconds so 10 * 1000 = 10000
	// The array activities had a lot of different 
	// bot statsus the bot can set. Index chooses a 
	// random number from 1 to the array length 
	// Then setActivity sets the random array value
	// and puts it as a status
	setInterval(() => {
		var activities = ["$10 moderation bot", `${prefix}help`, "Whatever you do...don't close your eyes!", "discord.gg/5VYFJcJ"];
        	const index = Math.floor(Math.random() * (activities.length - 1) + 1);
        	bot.user.setActivity(activities[index]);
    	}, 10000);

	// This is a loop as the bot is updating 
	// server statistics
	setInterval(() => {
		bot.channels.cache.get("765659272884649996").send(`${prefix}update stats`);
	}, 5000);	

	console.log(`${bot.user.username} is online`);
});
	
// Whenever the bot detects a new message, whether it's 
// a direct message or server message, this code will run
bot.on('message', async message => {

	// There is a map at the beginning of the code
	// called muted. If the user who sends a message 
	// is in the map, their message will be deleted
	var checkMuted = muted.get(message.author.id);
	if(checkMuted){
		message.delete();
		message.author.send(`You are still muted!`);
		return;
	}
		
	// Any user who does not have permission to manage 
	// other member's messages will be vulnerable to
	// this basic chat filter although the filter is now 
	// empty
	if(!message.member.hasPermission("MANAGE_MESSAGES")){
		if(filter.some(w => `${message.content.toLowerCase()}`.includes(`${w}`))){
			message.delete();
			var warns = langwarn.get(message.author.id);
			if(!warns){
				langwarn.set(message.author.id, 0);
			}
			var theWarns = langwarn.set(message.author.id, langwarn.get(message.author.id) + 1);
			var newWarns = langwarn.get(message.author.id);
			if(newWarns > 5){
				message.member.send(`Your warn count is ${newWarns}, you have been muted by Automod`);
				muted.set(message.author.id, 10);
				console.log(`${message.author.username} (${message.author.id}) is now muted by Automod for 10 minutes. They had ${newWarns} warns for bad language usage`)
				setTimeout(() => {
					muted.delete(message.author.id);
					message.member.send("You are now unmuted");
					console.log(`${message.author.username} (${message.author.id}) is now unmuted by Automod. They were muted for bad language usage`);
				}, 60000 * 10);
			}
			if(newWarns > 10){
				message.member.send(`Your warn count is ${newWarns}, you have been muted by Automod`);
				muted.set(message.author.id, 10);
				console.log(`${message.author.username} (${message.author.id}) is now muted by Automod for 10 minutes. They had ${newWarns} warns for bad language usage`)
				setTimeout(() => {
					muted.delete(message.author.id);
					message.member.send("You are now unmuted");
					console.log(`${message.author.username} (${message.author.id}) is now unmuted by Automod. They were muted for bad language usage`);
				}, 60000 * 10);
			}
			if(newWarns > 15){
				message.member.send(`Your warn count is ${newWarns}, you have been muted by Automod`);
				muted.set(message.author.id, 60);
				console.log(`${message.author.username} (${message.author.id}) is now muted by Automod for 15 minutes. They had ${newWarns} warns for bad language usage`)
				setTimeout(() => {
					muted.delete(message.author.id);
					message.member.send("You are now unmuted");
					console.log(`${message.author.username} (${message.author.id}) is now unmuted by Automod. They were muted for bad language usage`);
				}, 60000 * 15);
			}
			if(newWarns > 20){
				message.member.send(`Your warn count is ${newWarns}, you have been kicked by Automod`);
				console.log(`${message.member.username} (${message.author.id}) has been kicked by Automod. They had ${newWarns} warns for bad language usage`);
				message.member.kick();
				
			}
			message.member.send(`You are not allowed to say that, your warn count for bad language is ${newWarns}`);
		}
	}
	
	// If the message starts with the prefix
	// the bot will run this. If a message
	// starts with a prefix, it is a command
	if(message.content.startsWith(prefix)){
		
		const args = message.content.substring(prefix.length).split(" ");
		const command = args.shift().toLowerCase();
		const logsChannel = message.guild.channels.cache.find(ch => ch.id === "765073051967684608");
		
		if(command === "help"){
			bot.commands.get("help").execute(message, args, prefix, Discord);
		}
		if(command === "ban"){
			bot.commands.get("ban").execute(message, args, logsChannel, Discord);
		}
		if(command === "kick"){
			bot.commands.get("kick").execute(message, args, logsChannel, Discord);
		}
		if(command === "purge"){
			bot.commands.get("purge").execute(message, args, logsChannel);
		}
		if(command === "mute"){
			bot.commands.get("mute").execute(message, args, logsChannel, muted, prefix);
		}
		if(command === "unmute"){
			bot.commands.get("unmute").execute(message, args, logsChannel, muted, prefix);
		}
		if(command === "meme"){
			bot.commands.get("meme").execute(message, got, Discord);
		}
		if(command === "bts"){
			bot.commands.get("bts").execute(message, got, Discord);
		}
		if(command === "cat"){
			bot.commands.get("cat").execute(message, got, Discord);
		}
		if(command === "update"){
			bot.commands.get("update").execute(message, args);
		}
		if(command === "whois"){
			bot.commands.get("whois").execute(message, args, Discord);
		}
		if(command === "serverinfo"){
			bot.commands.get("serverinfo").execute(message, args, Discord);
		}
		if(command === "fetchbans"){
			bot.commands.get("fetchbans").execute(message, Discord);
		}
		if(message.content == `${prefix}flip`){
			const choose = ['heads', 'tails']
			var choice = Math.round(Math.random());
			message.channel.send(choose[choice]);
		}
		if(message.content.startsWith(`${prefix}info`)){
			bot.commands.get('info').execute(message, Discord, args);
		}
		
	}
});

// Updates the server statistics when a member
// joins the server
bot.on('guildMemberAdd', async member => {
	try{
		totalMCH.setName(`Total: ${member.guild.memberCount}`);
		humanMCH.setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
		botsMCH.setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);	
	}catch(err){
		console.log(err);
	}
});

// Updates the server statistics when a member
// leaves or is removed from the server
bot.on('guildMemberRemove', async member => {
	try{
		totalMCH.setName(`Total: ${member.guild.memberCount}`);
                humanMCH.setName(`Humans: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
                botsMCH.setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);    
	}catch(err){

	}
});


	
