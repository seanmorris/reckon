import { compareSnapshot } from 'cv3-test/Snapshot.mjs';
import { Test } from 'cv3-test/Test.mjs';
import { INSERT, ENTER, LEAVE, IGNORE } from '../Actions.mjs';
import { Parser } from '../Parser.mjs';

const tokens = {
	startOpenTag: /<(\w+)/i,
	endTag: />/,
	closeTag: /<\/(\w+)>/,
	startAttr: /(\w+)(?:\s+=\s+)?/,
	quote: /['"]/,
	endAttr: /['"]/,
	whitespace: /\s+/,
	escape:   /\\/,
	quoted: /[^'"\\]+/,
	text: /[^<]+/,
	word: /\S+/,
	any: /./,
};

const modes = {
	normal: {
		startOpenTag: ['tag', ENTER, IGNORE],
		closeTag: [IGNORE, LEAVE, LEAVE],
		text: [INSERT],
	},
	tag: {
		endTag: [IGNORE, 'normal', ENTER],
		startAttr: ['attr', ENTER, INSERT],
		whitespace: [IGNORE],
		word: [INSERT],
	},
	attr: {
		quote: [IGNORE],
		whitespace: [IGNORE, LEAVE],
		quoted: [INSERT],
		escape: [IGNORE, 'escape', ENTER],
		endAttr: [IGNORE, LEAVE],
	},
	escape: {
		any: [LEAVE, INSERT]
	}
}

export class HtmlTest extends Test
{
	testSimpleHtml()
	{
		const htmlString  = 'lorem <B disabled id = "lol\\"ESCAPED">ipsum</B> dolor sit amet';

		const parser = new Parser(tokens, modes);
		const parsed = parser.parse(htmlString);

		this.assert(compareSnapshot(parsed), 'Snapshot is invalid!');
	}

	testHtmlDocument()
	{
		const htmlString  = `
			<html>
				<head>
					<title>This is the title</title>
				</head>
				<body>
					This is some body text.
				</body>
			</html>
		`;

		const parser = new Parser(tokens, modes);
		const parsed = parser.parse(htmlString);

		this.assert(compareSnapshot(parsed), 'Snapshot is invalid!');
	}
}
