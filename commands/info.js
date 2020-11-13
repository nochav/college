module.exports = {
	name: 'info',
	description: 'Get information on bot packages',
	execute(message, Discord, args){
		
		if(args[0] == `basic`){
			const basicEmbed = new Discord.MessageEmbed()
				.setTitle('Info about Basic Package')
				.setDesciption(`Basic Package is $10`)
				.addField('\u200b', '\u200b')
				.addField("This package includes: ", '\u200b')
				.addFields(
					{ name: ""}
				)
		}
		
	}
}
