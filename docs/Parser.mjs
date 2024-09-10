import { Chunk } from './Chunk.mjs';
import { IGNORE, INSERT, ENTER, LEAVE, HOME } from './Actions.mjs';

export class Parser
{
	constructor(tokens, modes)
	{

		this.tokens = tokens || {};
		this.modes  = modes  || {};

		this.sortedModes = {};
	}

	sortModes(modes)
	{
		const grouped = {};
		for(const [key, action] of Object.entries(modes))
		{
			const splitActions = key.split('>');
			grouped[splitActions.length] = grouped[splitActions.length] || {};
			grouped[splitActions.length][key] = action;
		}

		return Object.fromEntries(Object.entries(grouped).sort(([a], [b]) => a < b ? 1 : -1));
	}

	findActions(stack, mode, sortedModes)
	{
		const keyParts = [...stack.map(chunk => chunk.type), mode];

		for(let i = keyParts.length; i > 0; i--)
		{
			if(!sortedModes[i])
			{
				continue;
			}

			const modeKey = keyParts.slice(-i + keyParts.length).join('>');

			if(!sortedModes[i][modeKey])
			{
				continue;
			}

			return sortedModes[i][modeKey];
		}

		throw new Error(`Mode chain ${keyParts.join('>')} does not exist on parser.`, this);
	}

	parse(source)
	{
		this.index = 0;
		this.mode  = 'normal';
		this.stack = [];

		if(!(this.mode in this.modes))
		{
			throw new Error(`Mode ${this.mode} does not exist on parser.`, this);
		}

		const sortedModes = this.sortModes(this.modes);

		let chunk = new Chunk;
		let mode = this.modes[this.mode];

		chunk.type = chunk.token = this.mode;

		while(this.index < source.length)
		{
			let matched = false;

			for(const tokenName in mode)
			{
				const token  = this.tokens[tokenName];
				const search = token.exec(source.substr(this.index));

				if(!search || search.index > 0)
				{
					continue;
				}

				if(!mode[tokenName])
				{
					// continue;
					throw new Error(`Invalid token type "${tokenName}" found in mode "${this.mode}".`);
				}

				const value = search[0];

				const actions = Array.isArray(mode[tokenName]) ? mode[tokenName] : [mode[tokenName]];

				matched = true;

				this.index += value.length;

				// let type = 'normal';

				for(const action of actions)
				{
					if(typeof action === 'string')
					{
						if(!(action in sortedModes[1]))
						{
							throw new Error(`Mode "${action}" does not exist.`)
						}

						this.mode = action;
						mode = this.findActions([...this.stack, chunk], this.mode, sortedModes);
						// type = action;

						continue;
					}

					switch(action)
					{
						case INSERT:
							chunk.list.push(value);
							break;

						case ENTER:

							const newChunk  = new Chunk;

							newChunk.depth  = chunk.depth + 1;
							newChunk.match  = value;
							newChunk.groups = [...value.match(token)].slice(1);
							newChunk.token  = tokenName;
							newChunk.type   = this.mode;

							chunk.list.push(newChunk);
							this.stack.push(chunk);

							chunk = newChunk;

							break;

						case LEAVE:
							if(!this.stack.length)
							{
								throw new error(`Already at the top of the stack.`);
							}
							else
							{
								chunk = this.stack.pop();
								this.mode = chunk.type;
								mode = this.findActions(this.stack, this.mode, sortedModes);
							}

							break;

						case HOME:
							this.stack.splice(0);
							mode = this.findActions(this.stack, 'normal', sortedModes);
							break;
					}
				}

				break;
			}

			if(!matched)
			{
				break;
			}
		}

		if(this.stack.length)
		{
			// throw new Error('Did not return to top of stack!');
		}

		return this.stack.shift() || chunk;
	}
}
