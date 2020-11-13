module.exports = {
	name: 'serverinfo',
	description: 'Get server info',
	execute(message, args, Discord){
		var server = message.guild;
		var name = server.name;
		var id = server.id;
		var owner = server.owner;
		var members = server.memberCount;
		var bots = server.members.cache.filter(m => m.user.bot).size;
		var humans = server.members.cache.filter(m => !m.user.bot).size;
		var online = server.members.cache.filter(m => m.presence.status == "online").size;
		var roles = server.roles.cache.map(role => `<@&${role.id}>`).join('\n')
		var dnd = server.members.cache.filter(m => m.presence.status == "dnd").size;
		var idle = server.members.cache.filter(m => m.presence.status == "idle").size;
		var offline = server.members.cache.filter(m => m.presence.status == "offline").size;
		
		
		const embed = new Discord.MessageEmbed()
			.setTitle(`Serverinfo ${name}`)
			.setColor("BLUE")
			.setDescription(`ID: ${id}`)
			.addField("Owner", owner)
			.addField("Total Members", members)
			.addField("Bot Count", bots)
			.addField("Humans", humans)
			.addField("Online", online)
			.addField("Do not Disturb", dnd)
			.addField("Idle", idle)
			.addField("Offline", offline)
			.addField('Roles', roles);
			
		message.channel.send(embed);
		
			
	}
}