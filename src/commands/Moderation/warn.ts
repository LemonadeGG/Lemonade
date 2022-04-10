import { SlashCommandBuilder } from '@discordjs/builders';
import { ApplyOptions } from '@sapphire/decorators';
import { ApplicationCommandRegistry, Command, CommandOptions } from '@sapphire/framework';
import { CommandInteraction, GuildMember, MessageEmbed } from 'discord.js';
import { uid } from 'uid';
import { CaseType, emojis } from '../../lib/utils';

@ApplyOptions<CommandOptions>({
  description: 'Warn a user.',
  runIn: 'GUILD_ANY'
})
export default class extends Command {
  public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addMentionableOption((o) => o.setName('user').setDescription('The user you want to warn.').setRequired(true))
      .addStringOption((o) => o.setName('reason').setDescription('The reason to display in the logs and DM to the user.').setRequired(true));

    registry.registerChatInputCommand(builder);
  }

  public override async chatInputRun(interaction: CommandInteraction) {
    console.log('ack');
    const target = interaction.guild?.members.cache.get(interaction.options.getUser('user', true).id) as GuildMember;
    const reason = interaction.options.getString('reason', true);

    const miscSettings = this.container.db.misc.findFirst({ where: { guildId: interaction.guild?.id } });

    await target.kick(reason);

    const dmEmbed = new MessageEmbed()
      .setTitle('You were warned!')
      .setDescription(`Server: ${interaction.guild}\nModerator: ${interaction.user}\nReason: ${reason}`)
      .setFooter({ text: `Sent from ${interaction.guild} | ${interaction.guild?.id}` });

    await this.container.db.cases.create({
      data: {
        uID: uid(6),
        caseType: CaseType.Warn,
        caseReason: reason,
        victimTag: target.user.tag,
        victimId: target.id,
        modId: interaction.user.id,
        modTag: interaction.user.tag,
        guildId: interaction.guild?.id
      }
    });

    const successEmbed = new MessageEmbed()
      .setDescription(`${emojis.CheckEmoji}    Successfully warned ${target.user.tag}!`)
      .setTimestamp(Date.now());

    await interaction.reply({ embeds: [successEmbed] });

    await target.send({ embeds: [dmEmbed] });
  }
}
