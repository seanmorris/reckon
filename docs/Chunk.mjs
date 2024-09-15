export class Chunk
{
	constructor()
	{
		this.type   = '';
		this.token  = '';
		this.match  = null;
		this.depth  = 0;
		this.groups = [];
		this.list   = [];
	}

	toString(sep = '')
	{
		return this.list.length
			? this.list.join(sep)
			: '';
	}
}
