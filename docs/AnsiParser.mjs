import { Parser } from './Parser.mjs';

const tokens = {
	reset:        /\\e\[(0);?m/
	, graphics:   /\\e\[(\d+);?(\d+)?;?([\d;]*)?./
	, escaped:    /\\([^e])/
	, characters: /.+?(?=\\e|$)/
};

const modes	= {
	normal:{
		reset:        [IGNORE, ENTER, LEAVE]
		, escaped:    [IGNORE, ENTER, LEAVE]
		, graphics:   [IGNORE, ENTER, LEAVE]
		, characters: [INSERT]
	},
};

export const AnsiParser = new Parser(tokens, modes);
