import { Test } from 'cv3-test/Test.mjs';
import { INSERT, ENTER, LEAVE, IGNORE } from '../Actions.mjs';
import { Parser } from '../Parser.mjs';

export class WordTest extends Test
{
	testSpaces()
	{
		const words  = 'These are some words with spaces.';
		const words2 = '    These are some words with spaces around them.    ';

		const tokens = {
			space:  /\s+/
			, char: /\S+/
		};

		const modes = {
			normal: {
				space:  [INSERT]
				, char: [ENTER, 'word', INSERT]
			}
			, word: {
				space:  [LEAVE, INSERT]
				, char: [INSERT]
			}
		}

		const parser = new Parser(tokens, modes);

		// console.error(JSON.stringify(parser.parse(words), null, 4));
		// console.error(JSON.stringify(parser.parse(words2), null, 4));
	}

	testPunctuation()
	{
		const words = 'Now this is getting more complicated, these are some words with spaces and punctuation. Parse the words into sentences too. And maintain breaking them by word.';

		const tokens = {
			space:  /\s+/
			, dot:  /\.+/
			, char: /[^\.\s]+/
		};

		const modes = {
			normal: {
				space:  ['sentence', ENTER, 'space', ENTER, INSERT]
				, char: ['sentence', ENTER, 'word',  ENTER, INSERT]
				, dot:  ['sentence', ENTER, INSERT, LEAVE]
			}
			, sentence: {
				space:  [ENTER, 'space', INSERT]
				, char: [ENTER, 'word', INSERT]
				, dot:  ['postfix', INSERT, ENTER]
			}
			, postfix: {
				space:  [INSERT]
				, char: [LEAVE, LEAVE, 'sentence', ENTER, 'word',  ENTER, INSERT]
				, dot:  [LEAVE, LEAVE, 'sentence', ENTER, INSERT, LEAVE]
			}
			, word: {
				space:  [LEAVE, 'space', ENTER, INSERT]
				, char: [INSERT]
				, dot:  [LEAVE, INSERT, 'postfix', ENTER]
			}
			, space: {
				space:  [INSERT]
				, char: [LEAVE, 'word', ENTER, INSERT]
				, dot:  [LEAVE, INSERT, 'postfix', ENTER]
			}
		}

		const parser = new Parser(tokens, modes);

		// console.error(JSON.stringify(parser.parse(words), ' ', 4));
	}

	testQuotes()
	{
		const words = 'Now try and pull some quotes out. "It can\'t be so hard," right? This sentence "has. a. punctuated. quote." in the middle. This one doesn\'t';

		const tokens = {
			quote:    /\"/
			, space:  /\s+/
			, dot:    /[\.\?]+/
			, char:   /[^\"\.\?\s]+/
		};

		const modes = {
			normal: {
				quote:   ['sentence', ENTER, 'quote', ENTER, INSERT]
				, space: ['sentence', ENTER, 'space', ENTER, INSERT]
				, char:  ['sentence', ENTER, 'word',  ENTER, INSERT]
				, dot:   ['sentence', ENTER, INSERT, LEAVE]
			}
			, sentence: {
				space:  [ENTER, 'space', INSERT]
				, char: [ENTER, 'word', INSERT]
				, dot:  ['postfix', INSERT, ENTER]
			}
			, postfix: {
				space:   [INSERT]
				, quote: [LEAVE, LEAVE, 'sentence', ENTER, 'quote', ENTER, INSERT]
				, char:  [LEAVE, LEAVE, 'sentence', ENTER, 'word',  ENTER, INSERT]
				, dot:   [LEAVE, LEAVE, 'sentence', ENTER, INSERT, LEAVE]
			}
			, quote: {
				quote:   [INSERT,  LEAVE]
				, space: ['space', ENTER, INSERT]
				, char:  ['word',  ENTER, INSERT]
			}
			, word: {
				quote:   [LEAVE, INSERT, LEAVE]
				, space: [LEAVE, 'space', ENTER, INSERT]
				, char:  [INSERT]
				, dot:   [LEAVE, INSERT, 'postfix', ENTER]
			}
			, space: {
				quote:   [LEAVE, 'quote', ENTER, INSERT]
				, space: [INSERT]
				, char:  [LEAVE, 'word', ENTER, INSERT]
				, dot:   [LEAVE, INSERT, 'postfix', ENTER]
			}
			, 'quote>word': {
				quote:   [LEAVE, INSERT, LEAVE]
				, space: [LEAVE, 'space', ENTER, INSERT]
				, char:  [INSERT]
				, dot:   [LEAVE, INSERT]
			}
			, 'quote>space': {
				quote:   [LEAVE, INSERT, LEAVE]
				, space: [INSERT]
				, char:  [LEAVE, 'word', ENTER, INSERT]
				, dot:   [LEAVE, INSERT]
			}
			, 'quote>dot': {
				quote:   [LEAVE, INSERT, LEAVE]
				, space: [LEAVE, 'space', ENTER, INSERT]
				, char:  [LEAVE, INSERT]
				, dot:   [INSERT]
			}
		}

		const parser = new Parser(tokens, modes);

		// console.error(JSON.stringify(parser.parse(words), ' ', 4));
	}

	testEscapedQuotes()
	{
		const words = 'Lets make it a little more complicated. This sentence "has a \\"quote\\" with escaped quotes" inside.';

		console.log(words);

		const tokens = {
			escape:   /\\/
			, quote:  /\"/
			, space:  /\s+/
			, dot:    /[\.\?]+/
			, char:   /[^\"\.\?\s\\]+/
			, any:    /./
		};

		const modes = {
			normal: {
				escape:  ['escape', INSERT]
				, quote: ['sentence', ENTER, 'quote', ENTER, INSERT]
				, space: ['sentence', ENTER, 'space', ENTER, INSERT]
				, char:  ['sentence', ENTER, 'word',  ENTER, INSERT]
				, dot:   ['sentence', ENTER, INSERT, LEAVE]
			}
			, escape: {
				any:     [ENTER, INSERT, LEAVE]
			}
			, sentence: {
				escape:  ['escape', INSERT]
				, space: [ENTER, 'space', INSERT]
				, char:  [ENTER, 'word', INSERT]
				, dot:   ['postfix', INSERT, ENTER]
			}
			, postfix: {
				escape:  ['escape', INSERT]
				, space: [INSERT]
				, quote: [LEAVE, LEAVE, 'sentence', ENTER, 'quote', ENTER, INSERT]
				, char:  [LEAVE, LEAVE, 'sentence', ENTER, 'word',  ENTER, INSERT]
				, dot:   [LEAVE, LEAVE, 'sentence', ENTER, INSERT, LEAVE]
			}
			, quote: {
				escape:  ['escape', INSERT]
				, quote: [INSERT,  LEAVE]
				, space: ['space', ENTER, INSERT]
				, char:  ['word',  ENTER, INSERT]
			}
			, word: {
				escape:  [LEAVE, 'escape', INSERT]
				, quote: [LEAVE, INSERT, LEAVE]
				, space: [LEAVE, 'space', ENTER, INSERT]
				, char:  [INSERT]
				, dot:   [LEAVE, INSERT, 'postfix', ENTER]
			}
			, space: {
				escape:  [LEAVE, 'escape', INSERT]
				, quote: [LEAVE, 'quote', ENTER, INSERT]
				, space: [INSERT]
				, char:  [LEAVE, 'word', ENTER, INSERT]
				, dot:   [LEAVE, INSERT, 'postfix', ENTER]
			}
			, 'quote>word': {
				escape:  [LEAVE, 'escape', INSERT]
				, quote: [LEAVE, INSERT, LEAVE]
				, space: [LEAVE, 'space', ENTER, INSERT]
				, char:  [INSERT]
				, dot:   [LEAVE, INSERT]
			}
			, 'quote>space': {
				escape:  [LEAVE, 'escape', INSERT]
				, quote: [LEAVE, INSERT, LEAVE]
				, space: [INSERT]
				, char:  [LEAVE, 'word', ENTER, INSERT]
				, dot:   [LEAVE, INSERT]
			}
			, 'quote>dot': {
				escape:  [LEAVE, 'escape', INSERT]
				, quote: [LEAVE, INSERT, LEAVE]
				, space: [LEAVE, 'space', ENTER, INSERT]
				, char:  [LEAVE, INSERT]
				, dot:   [INSERT]
			}
		};

		const parser = new Parser(tokens, modes);
		const parsed = parser.parse(words);

		console.error(JSON.stringify(parsed, ' ', 4));

		console.error(words);
		console.error(parsed.toString());

		console.error(parsed.list[0].toString());
		console.error(parsed.list[1].toString());

		console.error(parsed.list[1].list[0].toString());
		console.error(parsed.list[1].list[1].toString());
		console.error(parsed.list[1].list[2].toString());
		console.error(parsed.list[1].list[3].toString());
		console.error(parsed.list[1].list[4].toString());
		console.error(parsed.list[1].list[5].toString());
		console.error(parsed.list[1].list[6].toString());
	}
}
