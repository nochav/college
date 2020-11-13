module.exports = {
	name: 'ban',
	description: 'Ban a user from the server',
	execute(message, args, logs, Discord){
		if(!message.member.hasPermission(`BAN_MEMBERS`)) return message.channel.send('You do not have permission to use this command')
 		const User = message.mentions.members.first();
		const reason = args.slice(1).join(" ");
		if(!User) return message.channel.send(`You need to mention a user to ban!`);
		if(!reason) return message.channel.send(`You need to specify a reason`);
		if(!logsChannel) return message.channel.send("An error occured while finding the channel");
		if(!User.bannable) return message.channel.send("I can not ban a mod/admin");
		const embed = new Discord.MessageEmbed()
			.setTitle(`Ban`)
			.setDescription(`${message.author.username} (${message.author.id}) banned ${User.user.username} (${User.id})`)
			.setColor("RED")
			.setFooter(`Reason: ${reason}`);
		message.channel.send(embed);
		User.send(embed);
		logs.send(embed);
		console.log(`${User.user.username} (User.user.id) was banned by ${message.author.username} (${message.author.id})`);
		User.ban();
		
	}
}

