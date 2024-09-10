import { Test } from 'cv3-test/Test.mjs';
import { INSERT, ENTER, LEAVE, IGNORE } from '../Actions.mjs';
import { Parser } from '../Parser.mjs';

export class HtmlTest extends Test
{
	testBracketed()
	{
		const numbers  = '0 [1 2] 3 4 [5 [[6] 7] 8] 9';
		const tokens = {
			open:   /\[/,
			close:  /\]/,
			spacer: /\D/,
			digits: /\d+/,
		};

		const modes = {
			normal: {
				open:   ['list', ENTER, INSERT],
				spacer: [INSERT],
				digits: [ENTER, 'digits', INSERT],
			}
			, digits: {
				open:   ['list', ENTER, INSERT],
				close:  [LEAVE, INSERT, LEAVE],
				spacer: [LEAVE, INSERT],
				digits: [INSERT],
			}
			, list: {
				open:   ['list', ENTER, INSERT],
				close:  [INSERT, LEAVE],
				spacer: [INSERT],
				digits: [ENTER, 'digits', INSERT],
			}
		}

		const parser = new Parser(tokens, modes);

		console.error(JSON.stringify(parser.parse(numbers), null, 4));
	}
}
