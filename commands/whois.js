module.exports = {
	name: 'whois',
	description: 'Get user info',
	execute(message, args, Discord){
		var User = message.mentions.members.first() || message.member;
		var status = User.presence.status;
		if(status == "dnd"){
			var status = "Do not Disturb";
		}
		if(status == "online"){
			var status = "Online";
		}
		if(status == "idle"){
			var status = "Idle";
		}
		if(status == "offline"){
			var status = "Offline";
		}
		const embed = new Discord.MessageEmbed()
			.setTitle(`Whois ${User.user.username}?`)
			.setColor("BLUE")
			.setDescription(`ID: ${User.id}`)
			.addField('Status', status)
			.addField('Roles', User.roles.cache.map(role => `<@&${role.id}>`).join('\n'));
			
		message.channel.send(embed);
		
			
	}
}