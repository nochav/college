module.exports = {
	name: 'kick',
	description: 'Kick a user from the server',
	execute(message, args, logsChannel, Discord){
		if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have permission to use this command")
		const User = message.mentions.members.first();
		const reason = args.slice(1).join(" ");
		if(!User) return message.channel.send(`You need to mention a user to ban!`);
		if(!reason) return message.channel.send(`You need to specify a reason`);
		if(!logsChannel) return message.channel.send("An error occured while finding the channel");
		if(!User.kickable) return message.channel.send("I can not kick a mod/admin");
		const embed = new Discord.MessageEmbed()
			.setTitle(`Kick`)
			.setDescription(`${message.author.username} (${message.author.id}) kicked ${User.user.username} (${User.id})`)
			.setColor("RED")
			.setFooter(`Reason: ${reason}`);
		message.channel.send(embed);
		User.send(embed);
		logsChannel.send(embed);
		console.log(`${User.user.username} (User.user.id) was kicked by ${message.author.username} (${message.author.id})`);
		User.kick()
		
	}
}