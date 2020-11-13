module.exports = {
	name: 'bts',
	description: 'Display a random bts meme',
	execute(message, got, Discord){
		const embed = new Discord.MessageEmbed()
		got('https://www.reddit.com/r/btsmemes/random/.json').then(response => {
			let content = JSON.parse(response.body);
			let permalink = content[0].data.children[0].data.permalink;
			let memeURL = `https://reddit.com/${permalink}`;
			let memeImage = content[0].data.children[0].data.url;
			let memeTitle = content[0].data.children[0].data.title;
			let memeUpvotes = content[0].data.children[0].data.ups;
			let memeDownvotes = content[0].data.children[0].data.downs;
			let memeNumComments = content[0].data.children[0].data.num_comments;
				embed.setTitle(memeTitle)
				embed.setURL(memeURL)
				embed.setImage(memeImage)
				embed.setColor("RANDOM")
				embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes}`)
			message.channel.send(embed);
		});
		
	}
}