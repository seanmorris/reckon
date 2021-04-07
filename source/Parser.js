import { Chunk } from 'Chunk';
import { IGNORE, INSERT, ENTER, LEAVE, HOME } from 'Actions';

export class Parser
{
	constructor(tokens, modes)
	{

		this.tokens = tokens || {};
		this.modes  = modes  || {};
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

		let chunk = new Chunk;
		let mode  = this.modes[this.mode];

		chunk.type = this.mode;

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
					throw new Error(`Invalid token type "${tokenName}" found in mode "${this.mode}".`);
					continue;
				}

				const value = search[0];

				const actions = typeof mode[tokenName] === 'object'
					? mode[tokenName]
					: [mode[tokenName]];

				matched = true;

				this.index += value.length;

				let type = 'normal';

				for(const i in actions)
				{
					const action = actions[i];

					if(typeof action === 'string')
					{
						if(!(action in this.modes))
						{
							throw new Error(`Mode "${action}" does not exist.`)
						}

						this.mode = action;
						mode = this.modes[this.mode];
						type = action;

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
							newChunk.mode   = type;
							newChunk.type   = tokenName;

							chunk.list.push(newChunk);
							this.stack.push(chunk);

							chunk = newChunk;
							// this.mode = chunk.type;

							break;

						case LEAVE:
							if(!this.stack.length)
							{
								// throw new Warning(`Already at the top of the stack.`)
							}
							else
							{

								chunk = this.stack.pop();

								this.mode = chunk.type;
								mode = this.modes[this.mode];

							}

							break;

						case HOME:
							this.stack.splice(0);
							mode = this.modes['normal'];
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
			throw new Error('Did not return to top of stack!');
		}

		return this.stack.shift() || chunk;
	}
}