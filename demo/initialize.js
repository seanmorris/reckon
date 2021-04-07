import { Parser } from 'Parser';
import { IGNORE, INSERT, ENTER, LEAVE, HOME } from 'Actions';

import { AnsiRenderer } from './AnsiRenderer';

const refresh = (box, source, escaped) => {

	while(box.firstChild)
	{
		box.firstChild.remove();
	}

	const lines  = source.split(/\n/);
	
	let tokens;
	
	if(escaped)
	{
		tokens = {
			reset:         /\\e\[(0);?m/
			, esc:         /\\e\[(\d+);?(\d+)?;?([\d;]*)?./
			, characters:  /.+?(?=\\e|$)/
		};
	}
	else
	{
		tokens = {
			reset:         /\u001b\[(0);?m/
			, esc:         /\u001b\[(\d+);?(\d+)?;?([\d;]*)?./
			, characters:  /.+?(?=\u001b|$)/
		};
	}

	const modes  = {
		normal:{
			reset: [IGNORE, ENTER, LEAVE]
			, esc: [IGNORE, ENTER, LEAVE]
			, characters: [INSERT]
		},
	}
	
	const AnsiParser = new Parser(tokens, modes);
	
	lines.map(line => {

		AnsiRenderer.reset();

		const syntax = AnsiParser.parse(line);
		const output = AnsiRenderer.process(syntax);

		const div = document.createElement('div');

		div.innerHTML = output;

		box.append(div);
	});

};

document.addEventListener('DOMContentLoaded', event => {

	const box     = document.querySelector('#output');
	const escaped = document.querySelector('#escaped');
	const source  = document.querySelector('textarea');
	
	source.addEventListener('input', event => refresh(box, source.value, escaped.checked));
	escaped.addEventListener('input', event => refresh(box, source.value, escaped.checked));

	refresh(box, source.value, escaped.checked);
});