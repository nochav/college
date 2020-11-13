module.exports = {
	name: 'update',
	description: 'Update user info',
	execute(message, args){
		if(!args[0]) return message.channel.send("I could not determine if I should update goal or update stats. Try again")
		const goalCh = message.guild.channels.cache.find(ch => ch.name.includes("Goal"));
		const totalCh = message.guild.channels.cache.find(ch => ch.name.includes("Total"));
		const humCh = message.guild.channels.cache.find(ch => ch.name.includes("Members"));
		const botCh = message.guild.channels.cache.find(ch => ch.name.includes("Bots"));
		const onlineCh = message.guild.channels.cache.find(ch => ch.name.includes("Online"));
		if(args[0] == "stats"){
			totalCh.setName(`Total: ${message.guild.memberCount}`);
			humCh.setName(`Members: ${message.guild.members.cache.filter(m => !m.user.bot).size}`);
			botCh.setName(`Bots: ${message.guild.members.cache.filter(m => m.user.bot).size}`);
			onlineCh.setName(`Online: ${message.guild.members.cache.filter(m => m.presence.status === "online").size + message.guild.members.cache.filter(m => m.presence.status === "dnd").size}`);
			if(!message.author.bot) return message.channel.send(`Successfully Updates the Server Statistics`);
		}
		if(args[0] == "goal"){
			if(!message.member.hasPermission(`MANAGE_ROLES`)) return message.channel.send("You do not have permission to use this command");
			let newGoal = parseInt(args[1]);
			if(!newGoal) return message.channel.send("Please choose a numeric goal");
			goalCh.setName(`Goal: ${newGoal}`);
			message.channel.send(`Set goal to ${newGoal}`);
			console.log(`${message.author.username} (${message.author.id}) set the Member Goal to ${newGoal}`);
		}
	}
}