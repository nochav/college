module.exports = {
	name: 'Flip',
	description: 'Flip a coin',
	execute(message){
		const choose = ['heads', 'tails']
		var choice = Math.floor(Math.random() * 2 + 1);
		message.channel.send(choose[choice]);
	}
}