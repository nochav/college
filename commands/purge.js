module.exports = {
	name: 'purge',
	description: 'Clear messages in a channel',
	execute(message, args, logsChannel){
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission to use this command");
		let amount = parseInt(args[1 - 1]);
		if(message.channel.id === logsChannel.id) { 
			message.channel.send("You can not do that here");
			console.log(`${message.author.username} (${message.author.id}) attempted to delete logs saved in #${logsChannel.name}`);
			return;
		}
		if(!amount) return message.channel.send("Please choose a numeric value");
		if(amount > 99) return message.channel.send("Amount can not be greater than 99")
		message.channel.bulkDelete(amount);
		if(!logsChannel) return message.channel.send("Could not find logs channel");
		logsChannel.send(`${message.author.toString()} cleared ${amount} messages in ${message.channel}`)
		console.log(`${message.author.username} (${message.author.id}) cleared ${amount} messages in #${message.channel.name} (${message.channel.id})`)
	}
}