import { Parser } from 'Parser';
import { IGNORE, INSERT, ENTER, LEAVE, HOME } from 'Actions';

const tokens = {
	
	reset:         /\u001b\[(0)m/
	, escape:      /\\(.)/
	, graphics:    /\u001b\[(\d+);?(\d+)?;?([\d;]*)./
	, characters:  /[^\u001b]+/
	
	// reset:         /\\e\[(0)m/
	// , esc:         /\\e\[(\d+);?(\d+)?;?([\d;]*)./
	// , characters:  /.+?(?=\\e|$)/
};

const modes  = {
	normal:{
		reset:        [IGNORE, ENTER, LEAVE]
		, graphics:   [IGNORE, ENTER, LEAVE]
		, escape:     [IGNORE, ENTER, LEAVE]
		, characters: [INSERT]
	},
}

export const AnsiParser = new Parser(tokens, modes);

