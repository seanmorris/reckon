export class Renderer
{
	constructor(ops)
	{
		this.ops = ops || {};
	}

	process(tree)
	{
		let output = '';

		for(const i in tree.list)
		{
			let chunk = tree.list[i];

			if(this.ops[tree.type])
			{
				const processed = this.ops[tree.type]( chunk, tree );

				if(processed !== false)
				{
					output += processed;
				}
			}
			else if(chunk !== false)
			{
				output += chunk;
			}
		}

		return output;
	}
}
