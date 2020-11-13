module.exports = {
	name: 'unmute',
	description: 'Unmute a user in the server',
	execute(message, args, logsChannel, muted, prefix){
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission to use this command");
		let User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if(!User) return message.channel.send(`You need to mention a user. Usage: ${prefix}mute @exampleuser 10 toxic`);
		const nowMuted = muted.get(User.user.id);
		if(!muted.get(User.user.id)) return message.channel.send(`${User} is not muted!`);
		let reason = args.slice(1).join(" ");
		if(!reason) return message.channel.send("You need to provide a reason");
		muted.delete(User.user.id);
		message.channel.send(`**${message.author.username} (${message.author.id})** has unmuted ${User.user.username} **(${User.user.id}). Reason: ${reason}**`);
		console.log(`${message.author.username} (${message.author.id}) has muted ${User.user.username} (${User.user.id}). Reason: ${reason}`);
		logsChannel.send(`**${message.author.username} (${message.author.id})** has muted **${User.user.username} (${User.user.id}). Reason: ${reason}**`);
		
	}
}