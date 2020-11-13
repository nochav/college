module.exports = {
	name: 'help',
	description: 'Help command for the a list of commands',
	execute(message, args, prefix, Discord){
		const embed = new Discord.MessageEmbed()
			.setTitle(`Help: ${message.guild.name}`)
			.setDescription("My prefix is `" + prefix + "`")
			.setColor("RED")
			.addField(`${prefix}meme`, "Get a random meme from the internet")
			.addField(`${prefix}cat`, "Get a cute cat picture")
			.addField(`${prefix}bts`, "Army? Get an image!")
			.addField(`${prefix}flip`, "Flip a coin. Heads of Tails")
			.addField(`${prefix}whois`, "Get information about a user")
			.addField(`${prefix}serverinfo`, "Get information about the server")
			.addField(`${prefix}update stats`, "Update the Server Statistics manually")
			.addField(`${prefix}update goal (locked)`, "Update the Server member goal")
			.addField(`${prefix}purge (locked)`, "Clear messaes in chat. (limit 99)")
			.addField(`${prefix}mute (locked)`, "Mute a user in the server")
			.addField(`${prefix}unmute (locked)`, "Unmute a user in the server")
			.addField(`${prefix}kick (locked)`, "Kick a user from the server")
			.addField(`${prefix}ban (locked)`, "Ban a user from the server")
		message.channel.send(embed);
			
		console.log(`${message.author.username} (${message.author.id}) used ${message.content} in ${message.channel.name}`)
	}
}