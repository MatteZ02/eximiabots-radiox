module.exports = {
    name: 'statistics',
    alias: 'stats',
    usage: '',
    description: 'Show usage statistics.',
    permission: 'none',
    category: 'info',
    execute(msg, args, client, Discord, command) {
        let message = {};
        let stations = client.stations;
        let currentGuild = client.datastore.getEntry(msg.guild.id);
        let statistics = "";
        
		if(!client.stations) {
			message.errorToGetPlaylist = client.messages.errorToGetPlaylist.replace("%client.config.supportGuild%", client.config.supportGuild);
			return msg.channel.send(client.messageEmojis["error"] + message.errorToGetPlaylist);
		}

        if(!currentGuild || currentGuild && !currentGuild.statistics){
            statistics = "You have not listened any radio station";
        } else {
            Object.keys(stations).forEach(function(station) {
                if(currentGuild.statistics[stations[station].name] && currentGuild.statistics[stations[station].name].time && parseInt(currentGuild.statistics[stations[station].name].time) > 0 && currentGuild.statistics[stations[station].name].used && parseInt(currentGuild.statistics[stations[station].name].used) > 0){
                    statistics += `**${parseInt(station) + 1}** ` + stations[station].name + " \n";
                    statistics += "Time: " + client.funcs.msToTime(currentGuild.statistics[stations[station].name].time, "dd:hh:mm:ss") + "\n";
                    statistics += "Used: " + currentGuild.statistics[stations[station].name].used + "\n";
                }
            });
        }
        
        const embed = new Discord.MessageEmbed()
            .setTitle(client.messages.statisticsTitle)
            .setThumbnail("https://cdn.discordapp.com/emojis/" + client.messageEmojis["statistics"].replace(/[^0-9]+/g, ''))
            .setColor(client.config.embedColor)
            .setDescription(statistics)
            .setFooter('EximiaBots by Warén Media', "https://cdn.discordapp.com/emojis/" + client.messageEmojis["eximiabots"].replace(/[^0-9]+/g, ''));
        return msg.channel.send(embed);
    }
};