module.exports = {
	name: 'mute',
	description: 'Mute a user in the server',
	execute(message, args, logsChannel, muted, prefix){
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission to use this command");
		let User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if(!User) return message.channel.send(`You need to mention a user. Usage: ${prefix}mute @exampleuser 10 toxic`);
		const nowMuted = muted.get(User.user.id);
		if(nowMuted) return message.channel.send("This user is already muted");
		let minutes = parseInt(args.slice(1)) || parseFloat(args.slice(1));
		if(!minutes) return message.channel.send(`You need to put minutes. Usage: ${prefix}mute @exampleuser 10 toxic`);
		let reason = args.slice(2).join(" ");
		if(!reason) return message.channel.send("You need to provide a reason");
		if(User.user.bot) return message.channel.send("I can not mute another bot!");
		muted.set(User.user.id, minutes);
		message.channel.send(`**${message.author.username} (${message.author.id})** has muted **${User.user.username} (${User.user.id}) for ${minutes} minute(s). Reason: ${reason}**`);
		console.log(`${message.author.username} (${message.author.id})** has muted **${User.user.username} (${User.user.id}) for ${minutes} minute(s). Reason: ${reason}**`)
		logsChannel.send(`**${message.author.username} (${message.author.id}) has muted ${User.user.username} (${User.user.id}) for ${minutes} minute(s). Reason: ${reason}`);
		setTimeout(() => {
			muted.delete(User.user.id);
			User.user.send(`You are now unmuted from ${message.guild.name}!`);
			logsChannel.send(`${User} was unmuted by Automod`);
		}, 60000 * minutes);
		
	}
}