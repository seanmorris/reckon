# sixgram
*inspired by Rakudo Grammars.*

## What is it?

Sixgram is a parsing library that was originally inspired by Raku Grammars (formerly Perl 6).

It allows the parsing of strings into trees of `chunks` using `modes`, `tokens`, and `actions`.

## How it works

### Token

A `token` is a regular expression that may match a part of the string being parsed. Tokens are searched for at the begining of the string being parsed.

When a match is found, the matching section is removed from the begining of the input string.

For example, a set of tokens that can match numbers and spaces could looks like:

```javascript
const tokens = {
    spacer: /\D+/,
    digits: /\d+/,
};
```

### Action

An `action` determines the handling of the text that has matched the token.

The available actions are: `INSERT`, `ENTER`, `LEAVE`, `IGNORE`.

These actions affect text handling:

* `INSERT`
  Inserts the text into the `list` of the current `chunk`.
* `IGNORE`
  Drops the value and move onto the next match.

These actions affect `chunk` handling:

* `ENTER`
  Creates a new chunk and make it a child of the current chunk.
  The child will be the current chunk afterward.
  Similar to `mkdir NEWDIR && cd NEWDIR`
* `LEAVE`
  Switch back to the parent of the current chunk.
  Similar to `cd ..`

### Mode

A `mode` is a mapping of tokens to actions. Given the current `mode`, a parser will treat a set of tokens differently, defined by its list of actions.

For example, the constant `modes` in the example below below defines two modes: `normal` and `digits`. For each of the tokens expected to be encountered in a given mode, there is a list of actions provided.

```javascript
const modes = {
    normal: {
        spacer: [INSERT],
        digits: ['digits', ENTER, INSERT],
    },
    digits: {
        spacer: [LEAVE, INSERT],
        digits: [INSERT],
    },
}
```

The modes above will give us the following behavior:

The parser always starts in `normal` mode.

If we are in `normal` mode, and we enounter a `spacer` token, then the text that matched that regex will be `INSERT`ed into the current chunk.

If we are in `normal` mode, and we encounter a `digits` token, then we will first switch to `digits` mode. We will then  `ENTER` a new chunk, meaning it will be made a child of the current chunk, and then we will switch into it as the current chunk. We then `INSERT` the matching text into the list of the new current chunk.

If we are in `digits` mode, and we encounter a `spacer` token, we will `LEAVE` the current chunk and return to its parent, and then `INSERT` the text into the parent chunk, which is now our current chunk again.

If we are in `digits` mode, and we encounter a `digits` token, we will simply `INSERT` the text into the current chunk.

```javascript
import { INSERT, ENTER, LEAVE, IGNORE } from './Actions.mjs';
import { Parser } from './Parser.mjs';

import util from 'node:util';

const tokens = {
    spacer: /\D+/,
    digits: /\d+/,
};

const modes = {
    normal: {
        spacer: [INSERT],
        digits: ['digits', ENTER, INSERT],
    },
    digits: {
        spacer: [LEAVE, INSERT],
        digits: [INSERT],
    },
}

const parser = new Parser(tokens, modes);
const parsed = parser.parse('0 12 345 6789');

console.log( util.inspect(parsed, {depth: null, colors: true}) );
```

```json
{
    "type": "normal",
    "token": "normal",
    "match": null,
    "depth": 0,
    "groups": [],
    "list": [
        {
            "type": "normal",
            "token": "digits",
            "match": "0",
            "depth": 1,
            "groups": [],
            "list": [
                "0"
            ]
        },
        " ",
        {
            "type": "normal",
            "token": "digits",
            "match": "12",
            "depth": 1,
            "groups": [],
            "list": [
                "12"
            ]
        },
        " ",
        {
            "type": "normal",
            "token": "digits",
            "match": "345",
            "depth": 1,
            "groups": [],
            "list": [
                "345"
            ]
        },
        " ",
        {
            "type": "normal",
            "token": "digits",
            "match": "6789",
            "depth": 1,
            "groups": [],
            "list": [
                "6789"
            ]
        }
    ]
}

```

A more complicated example could facilitate the processing of bracketed numbers:

```javascript
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
        digits: ['digits', ENTER, INSERT],
    },
    digits: {
        open:   ['list', ENTER, INSERT],
        close:  [LEAVE, INSERT, LEAVE],
        spacer: [LEAVE, INSERT],
        digits: [INSERT],
    },
    list: {
        open:   ['list', ENTER, INSERT],
        close:  [INSERT, LEAVE],
        spacer: [INSERT],
        digits: ['digits', ENTER, INSERT],
    },
};

const parser = new Parser(tokens, modes);
const parsed = parser.parse('0 [1 2] 3 4 [5 [[6] 7] 8] 9');

console.log( util.inspect(parsed, {depth: null, colors: true}) );
```

Or even HTML trees:

```javascript
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
    },
}
```
