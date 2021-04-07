"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HOME = exports.LEAVE = exports.ENTER = exports.INSERT = exports.IGNORE = void 0;
var IGNORE = 0;
exports.IGNORE = IGNORE;
var INSERT = 1;
exports.INSERT = INSERT;
var ENTER = 2;
exports.ENTER = ENTER;
var LEAVE = 3;
exports.LEAVE = LEAVE;
var HOME = 4;
exports.HOME = HOME;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chunk = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chunk = function Chunk() {
  _classCallCheck(this, Chunk);

  this.depth = 0;
  this.match = null;
  this.type = 'normal';
  this.list = [];
};

exports.Chunk = Chunk;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parser = void 0;

var _Chunk = require("Chunk");

var _Actions = require("Actions");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Parser = function () {
  function Parser(tokens, modes) {
    _classCallCheck(this, Parser);

    this.tokens = tokens || {};
    this.modes = modes || {};
  }

  _createClass(Parser, [{
    key: "parse",
    value: function parse(source) {
      this.index = 0;
      this.mode = 'normal';
      this.stack = [];

      if (!(this.mode in this.modes)) {
        throw new Error("Mode ".concat(this.mode, " does not exist on parser."), this);
      }

      var chunk = new _Chunk.Chunk();
      var mode = this.modes[this.mode];
      chunk.type = this.mode;

      while (this.index < source.length) {
        var matched = false;

        for (var tokenName in mode) {
          var token = this.tokens[tokenName];
          var search = token.exec(source.substr(this.index));

          if (!search || search.index > 0) {
            continue;
          }

          if (!mode[tokenName]) {
            throw new Error("Invalid token type \"".concat(tokenName, "\" found in mode \"").concat(this.mode, "\"."));
            continue;
          }

          var value = search[0];
          var actions = _typeof(mode[tokenName]) === 'object' ? mode[tokenName] : [mode[tokenName]];
          matched = true;
          this.index += value.length;
          var type = 'normal';

          for (var i in actions) {
            var action = actions[i];

            if (typeof action === 'string') {
              if (!(action in this.modes)) {
                throw new Error("Mode \"".concat(action, "\" does not exist."));
              }

              this.mode = action;
              mode = this.modes[this.mode];
              type = action;
              continue;
            }

            switch (action) {
              case _Actions.INSERT:
                chunk.list.push(value);
                break;

              case _Actions.ENTER:
                var newChunk = new _Chunk.Chunk();
                newChunk.depth = chunk.depth + 1;
                newChunk.match = value;
                newChunk.groups = _toConsumableArray(value.match(token)).slice(1);
                newChunk.mode = type;
                newChunk.type = tokenName;
                chunk.list.push(newChunk);
                this.stack.push(chunk);
                chunk = newChunk;
                break;

              case _Actions.LEAVE:
                if (!this.stack.length) {} else {
                  chunk = this.stack.pop();
                  this.mode = chunk.type;
                  mode = this.modes[this.mode];
                }

                break;

              case _Actions.HOME:
                this.stack.splice(0);
                mode = this.modes['normal'];
                break;
            }
          }

          break;
        }

        if (!matched) {
          break;
        }
      }

      if (this.stack.length) {
        throw new Error('Did not return to top of stack!');
      }

      return this.stack.shift() || chunk;
    }
  }]);

  return Parser;
}();

exports.Parser = Parser;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transformer = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Transformer = function () {
  function Transformer(ops) {
    _classCallCheck(this, Transformer);

    this.ops = ops || {};
  }

  _createClass(Transformer, [{
    key: "process",
    value: function process(tree) {
      var output = '';

      for (var i in tree.list) {
        var chunk = tree.list[i];

        if (this.ops[tree.type]) {
          var processed = this.ops[tree.type](chunk, tree);

          if (processed !== false) {
            output += processed;
          }
        } else if (chunk !== false) {
          output += chunk;
        }
      }

      return output;
    }
  }]);

  return Transformer;
}();

exports.Transformer = Transformer;
