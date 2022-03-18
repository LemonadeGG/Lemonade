import { ApplicationCommandRegistry, Command, CommandOptionsRunTypeEnum } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { inspect } from 'util';
import { isThenable } from "@sapphire/utilities"
import { Type } from "@sapphire/type"
import { SlashCommandBuilder } from '@discordjs/builders';
import { emojis } from '../../lib/utils';

@ApplyOptions<Command.Options>({
  name: 'evaluate',
  description: "This will evaluate the living shit out of lemonade",
  runIn: [CommandOptionsRunTypeEnum.GuildAny],
  chatInputCommand: {
    register: true
  }
})
export class UserCommand extends Command {
    public override registerApplicationCommands(
        registry: ApplicationCommandRegistry
      ) {
        const builder = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption(option => 
            option.setName("code")
            .setDescription("This is the code you wish to evaluate")
            .setRequired(true))
        .addBooleanOption(option => 
            option.setName("async")
            .setDescription("Do you wish this code to be ran async?")
            .setRequired(true))

            registry.registerChatInputCommand(builder);
      }
      public override async chatInputRun(interaction: CommandInteraction) {
          const code = interaction.options.getString("code")
          const async = interaction.options.getBoolean("async")
    const { result, success, type } = await this.eval(code!, {
        async: async!
    })

    const embed = new MessageEmbed()
    .setTitle("Evaluation:")
    .addField(`${success ? emojis.CheckEmoji : emojis.CancelEmoji} Result:`, `\`\`\` ${result ?? "No Result Was Provided"}\`\`\``)
    .addField("Information:", `Type: ${type ?? "There was no result"} \n Success: ${success ? emojis.CheckEmoji : emojis.CancelEmoji} \n Async: ${async ? emojis.CheckEmoji : emojis.CancelEmoji}`)
    .setColor(success ? "GREEN" : "RED")

    
    return interaction.reply({
        embeds: [embed]
    })

    
  }

  private async eval(code: string, flags: { async: boolean }) {
      if(flags.async) code = `(async () => {\n${code}\n})();`;

      let success = true;
      let result = null;

      try {
        // eslint-disable-next-line no-eval
        result = eval(code);
    } catch (error) {
        if (error && error instanceof Error && error.stack) {
            this.container.client.logger.error(error);
        }
        result = error;
        success = false;
    }

    const type = new Type(result).toString();
		if (isThenable(result)) result = await result;

		if (typeof result !== 'string') {
			result = inspect(result, {
			});
		}

		return { result, success, type };
	}
  }
