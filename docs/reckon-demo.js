(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("demo/AnsiParser.js", function(exports, require, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AnsiParser=void 0;var _Parser=require("Parser"),_Actions=require("Actions"),tokens={reset:/\u001b\[(0)m/,escape:/\\(.)/,graphics:/\u001b\[(\d+);?(\d+)?;?([\d;]*)./,characters:/[^\u001b]+/ // reset:         /\\e\[(0)m/
// , esc:         /\\e\[(\d+);?(\d+)?;?([\d;]*)./
// , characters:  /.+?(?=\\e|$)/
},modes={normal:{reset:[_Actions.IGNORE,_Actions.ENTER,_Actions.LEAVE],graphics:[_Actions.IGNORE,_Actions.ENTER,_Actions.LEAVE],escape:[_Actions.IGNORE,_Actions.ENTER,_Actions.LEAVE],characters:[_Actions.INSERT]}},AnsiParser=new _Parser.Parser(tokens,modes);exports.AnsiParser=AnsiParser;
});

require.register("demo/AnsiRenderer.js", function(exports, require, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AnsiRenderer=void 0;var _Transformer2=require("Transformer"),_pallete=require("./pallete"),_Colors=require("./Colors255");function _typeof(a){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}function _slicedToArray(a,b){return _arrayWithHoles(a)||_iterableToArrayLimit(a,b)||_unsupportedIterableToArray(a,b)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(a):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}function _iterableToArrayLimit(a,b){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(a)){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{d||null==h["return"]||h["return"]()}finally{if(e)throw f}}return c}}function _arrayWithHoles(a){if(Array.isArray(a))return a}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}function _inherits(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function");a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,writable:!0,configurable:!0}}),b&&_setPrototypeOf(a,b)}function _setPrototypeOf(a,b){return _setPrototypeOf=Object.setPrototypeOf||function(a,b){return a.__proto__=b,a},_setPrototypeOf(a,b)}function _createSuper(a){var b=_isNativeReflectConstruct();return function(){var c,d=_getPrototypeOf(a);if(b){var e=_getPrototypeOf(this).constructor;c=Reflect.construct(d,arguments,e)}else c=d.apply(this,arguments);return _possibleConstructorReturn(this,c)}}function _possibleConstructorReturn(a,b){return b&&("object"===_typeof(b)||"function"==typeof b)?b:_assertThisInitialized(a)}function _assertThisInitialized(a){if(void 0===a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(a){return!1}}function _getPrototypeOf(a){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)},_getPrototypeOf(a)}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var audio=new AudioContext,AnsiRenderer=/*#__PURE__*/function(a){function b(){var a;return _classCallCheck(this,b),a=c.call(this,{normal:function normal(b,c){return a.setGraphicsMode(b,c)}}),_defineProperty(_assertThisInitialized(a),"style",{}),a}_inherits(b,a);var c=_createSuper(b);return _createClass(b,[{key:"reset",value:function reset(){for(var a=0,b=Object.entries(this.style);a<b.length;a++){var c=_slicedToArray(b[a],1),d=c[0];delete this.style[d]}}},{key:"beep",value:function beep(){var a=audio.createOscillator(),b=audio.createGain();a.connect(b),a.frequency.value=840,a.type="square",b.connect(audio.destination),b.gain.value=.01*10,a.start(audio.currentTime),a.stop(audio.currentTime+.001*200)}},{key:"setGraphicsMode",value:function setGraphicsMode(a){if("string"==typeof a){if(""===a)return!1;for(var b="",c=0,d=Object.entries(this.style);c<d.length;c++){var e=_slicedToArray(d[c],2),f=e[0],h=e[1];b+="".concat(f,": ").concat(h,"; ")}return"<span class = \"ansi\" style = \"".concat(b,"\">").concat(a,"</span>")}if("object"===_typeof(a)){if("escaped"===a.type&&"a"===a.groups[0]&&this.beep(),"graphics"===a.type||"reset"===a.type)for(var A,B=0;B<a.groups.length;B++){if(A=+a.groups[B],""===a.groups[B])return!1;switch(A){case 0:for(var g in this.style)delete this.style[g];break;case 1:this.style.filter="brightness(1.25) contrast(1.25)",this.style["font-weight"]="bold",this.style.opacity=1;break;case 2:this.style.filter="brightness(0.75)",this.style["font-weight"]="light",this.style.opacity=.75;break;case 3:this.style["font-this.style"]="italic";break;case 4:this.style["text-decoration"]="underline";break;case 5:this.style.animation="var(--ansiBlink)";break;case 7:this.style.filter="invert(1) contrast(1.5)";break;case 8:this.style.filter="contrast(0.5)",this.style.opacity=.1;break;case 9:this.style["text-decoration"]="line-through";break;case 10:this.style["font-family"]="var(--base-font))";break;case 11:case 12:case 13:case 14:case 15:case 16:case 17:case 18:case 19:this.style["font-family"]="var(--alt-font-no-".concat(A,")");break;case 20:this.style["font-family"]="var(--alt-font-fraktur)",this.style["font-size"]="1.1rem";break;case 21:this.style["font-weight"]="initial";break;case 22:this.style["font-weight"]="initial";break;case 23:this.style["font-style"]="fractur";break;case 24:this["this"].style["text-decoration"]="none";break;case 25:this.style.animation="none";break;case 27:this.style.filter="initial";break;case 28:this.style.opacity="initial";break;case 29:this.style["text-decoration"]="initial";break;case 30:this.style.color=_pallete.pallete.black;break;case 31:this.style.color=_pallete.pallete.red;break;case 32:this.style.color=_pallete.pallete.green;break;case 33:this.style.color=_pallete.pallete.yellow;break;case 34:this.style.color=_pallete.pallete.blue;break;case 35:this.style.color=_pallete.pallete.magenta;break;case 36:this.style.color=_pallete.pallete.cyan;break;case 37:this.style.color=_pallete.pallete.white;break;case 38:if(2==a.groups[1+B]){var i=a.groups[2+B].split(";"),j=_slicedToArray(i,3),k=j[0],l=j[1],m=j[2];this.style.color="rgb(".concat(k,",").concat(l,",").concat(m,")")}if(5==a.groups[1+B]){var n=_Colors.Colors255[+a.groups[2+B]],o=n.r,p=n.g,q=n.b;this.style.color="rgb(".concat(o,",").concat(p,",").concat(q,")")}B+=2;break;case 39:this.style.color="var(--fgColor)";break;case 40:this.style["background-color"]=_pallete.pallete.black;break;case 41:this.style["background-color"]=_pallete.pallete.red;break;case 42:this.style["background-color"]=_pallete.pallete.green;break;case 43:this.style["background-color"]=_pallete.pallete.yellow;break;case 44:this.style["background-color"]=_pallete.pallete.blue;break;case 45:this.style["background-color"]=_pallete.pallete.magenta;break;case 46:this.style["background-color"]=_pallete.pallete.cyan;break;case 47:this.style["background-color"]=_pallete.pallete.white;break;case 48:if(2==a.groups[1+B]){var r=a.groups[2+B].split(";"),s=_slicedToArray(r,3),t=s[0],u=s[1],v=s[2];this.style["background-color"]="rgb(".concat(t,",").concat(u,",").concat(v,")")}if(5==a.groups[1+B]){var w=_Colors.Colors255[+a.groups[2+B]],x=w.r,y=w.g,z=w.b;this.style["background-color"]="rgb(".concat(x,",").concat(y,",").concat(z,")")}B+=2;break;case 49:this.style["background-color"]="var(--bgColor)";break;case 51:this.style.border="1px solid currentColor";break;case 52:this.style.border="1px solid currentColor",this.style["border-radius"]="1em";break;case 53:this.style["text-decoration"]="overline";break;case 54:this.style.border="initial";break;case 55:this.style.border="initial";}}return!1}}}]),b}(_Transformer2.Transformer);exports.AnsiRenderer=AnsiRenderer;
});

;require.register("demo/Colors255.js", function(exports, require, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Colors255=void 0;var Colors255={0:{r:0,g:0,b:0},1:{r:128,g:0,b:0},2:{r:0,g:128,b:0},3:{r:128,g:128,b:0},4:{r:0,g:0,b:128},5:{r:128,g:0,b:128},6:{r:0,g:128,b:128},7:{r:192,g:192,b:192},8:{r:128,g:128,b:128},9:{r:255,g:0,b:0},10:{r:0,g:255,b:0},11:{r:255,g:255,b:0},12:{r:0,g:0,b:255},13:{r:255,g:0,b:255},14:{r:0,g:255,b:255},15:{r:255,g:255,b:255},16:{r:0,g:0,b:0},17:{r:0,g:0,b:95},18:{r:0,g:0,b:135},19:{r:0,g:0,b:175},20:{r:0,g:0,b:215},21:{r:0,g:0,b:255},22:{r:0,g:95,b:0},23:{r:0,g:95,b:95},24:{r:0,g:95,b:135},25:{r:0,g:95,b:175},26:{r:0,g:95,b:215},27:{r:0,g:95,b:255},28:{r:0,g:135,b:0},29:{r:0,g:135,b:95},30:{r:0,g:135,b:135},31:{r:0,g:135,b:175},32:{r:0,g:135,b:215},33:{r:0,g:135,b:255},34:{r:0,g:175,b:0},35:{r:0,g:175,b:95},36:{r:0,g:175,b:135},37:{r:0,g:175,b:175},38:{r:0,g:175,b:215},39:{r:0,g:175,b:255},40:{r:0,g:215,b:0},41:{r:0,g:215,b:95},42:{r:0,g:215,b:135},43:{r:0,g:215,b:175},44:{r:0,g:215,b:215},45:{r:0,g:215,b:255},46:{r:0,g:255,b:0},47:{r:0,g:255,b:95},48:{r:0,g:255,b:135},49:{r:0,g:255,b:175},50:{r:0,g:255,b:215},51:{r:0,g:255,b:255},52:{r:95,g:0,b:0},53:{r:95,g:0,b:95},54:{r:95,g:0,b:135},55:{r:95,g:0,b:175},56:{r:95,g:0,b:215},57:{r:95,g:0,b:255},58:{r:95,g:95,b:0},59:{r:95,g:95,b:95},60:{r:95,g:95,b:135},61:{r:95,g:95,b:175},62:{r:95,g:95,b:215},63:{r:95,g:95,b:255},64:{r:95,g:135,b:0},65:{r:95,g:135,b:95},66:{r:95,g:135,b:135},67:{r:95,g:135,b:175},68:{r:95,g:135,b:215},69:{r:95,g:135,b:255},70:{r:95,g:175,b:0},71:{r:95,g:175,b:95},72:{r:95,g:175,b:135},73:{r:95,g:175,b:175},74:{r:95,g:175,b:215},75:{r:95,g:175,b:255},76:{r:95,g:215,b:0},77:{r:95,g:215,b:95},78:{r:95,g:215,b:135},79:{r:95,g:215,b:175},80:{r:95,g:215,b:215},81:{r:95,g:215,b:255},82:{r:95,g:255,b:0},83:{r:95,g:255,b:95},84:{r:95,g:255,b:135},85:{r:95,g:255,b:175},86:{r:95,g:255,b:215},87:{r:95,g:255,b:255},88:{r:135,g:0,b:0},89:{r:135,g:0,b:95},90:{r:135,g:0,b:135},91:{r:135,g:0,b:175},92:{r:135,g:0,b:215},93:{r:135,g:0,b:255},94:{r:135,g:95,b:0},95:{r:135,g:95,b:95},96:{r:135,g:95,b:135},97:{r:135,g:95,b:175},98:{r:135,g:95,b:215},99:{r:135,g:95,b:255},100:{r:135,g:135,b:0},101:{r:135,g:135,b:95},102:{r:135,g:135,b:135},103:{r:135,g:135,b:175},104:{r:135,g:135,b:215},105:{r:135,g:135,b:255},106:{r:135,g:175,b:0},107:{r:135,g:175,b:95},108:{r:135,g:175,b:135},109:{r:135,g:175,b:175},110:{r:135,g:175,b:215},111:{r:135,g:175,b:255},112:{r:135,g:215,b:0},113:{r:135,g:215,b:95},114:{r:135,g:215,b:135},115:{r:135,g:215,b:175},116:{r:135,g:215,b:215},117:{r:135,g:215,b:255},118:{r:135,g:255,b:0},119:{r:135,g:255,b:95},120:{r:135,g:255,b:135},121:{r:135,g:255,b:175},122:{r:135,g:255,b:215},123:{r:135,g:255,b:255},124:{r:175,g:0,b:0},125:{r:175,g:0,b:95},126:{r:175,g:0,b:135},127:{r:175,g:0,b:175},128:{r:175,g:0,b:215},129:{r:175,g:0,b:255},130:{r:175,g:95,b:0},131:{r:175,g:95,b:95},132:{r:175,g:95,b:135},133:{r:175,g:95,b:175},134:{r:175,g:95,b:215},135:{r:175,g:95,b:255},136:{r:175,g:135,b:0},137:{r:175,g:135,b:95},138:{r:175,g:135,b:135},139:{r:175,g:135,b:175},140:{r:175,g:135,b:215},141:{r:175,g:135,b:255},142:{r:175,g:175,b:0},143:{r:175,g:175,b:95},144:{r:175,g:175,b:135},145:{r:175,g:175,b:175},146:{r:175,g:175,b:215},147:{r:175,g:175,b:255},148:{r:175,g:215,b:0},149:{r:175,g:215,b:95},150:{r:175,g:215,b:135},151:{r:175,g:215,b:175},152:{r:175,g:215,b:215},153:{r:175,g:215,b:255},154:{r:175,g:255,b:0},155:{r:175,g:255,b:95},156:{r:175,g:255,b:135},157:{r:175,g:255,b:175},158:{r:175,g:255,b:215},159:{r:175,g:255,b:255},160:{r:215,g:0,b:0},161:{r:215,g:0,b:95},162:{r:215,g:0,b:135},163:{r:215,g:0,b:175},164:{r:215,g:0,b:215},165:{r:215,g:0,b:255},166:{r:215,g:95,b:0},167:{r:215,g:95,b:95},168:{r:215,g:95,b:135},169:{r:215,g:95,b:175},170:{r:215,g:95,b:215},171:{r:215,g:95,b:255},172:{r:215,g:135,b:0},173:{r:215,g:135,b:95},174:{r:215,g:135,b:135},175:{r:215,g:135,b:175},176:{r:215,g:135,b:215},177:{r:215,g:135,b:255},178:{r:215,g:175,b:0},179:{r:215,g:175,b:95},180:{r:215,g:175,b:135},181:{r:215,g:175,b:175},182:{r:215,g:175,b:215},183:{r:215,g:175,b:255},184:{r:215,g:215,b:0},185:{r:215,g:215,b:95},186:{r:215,g:215,b:135},187:{r:215,g:215,b:175},188:{r:215,g:215,b:215},189:{r:215,g:215,b:255},190:{r:215,g:255,b:0},191:{r:215,g:255,b:95},192:{r:215,g:255,b:135},193:{r:215,g:255,b:175},194:{r:215,g:255,b:215},195:{r:215,g:255,b:255},196:{r:255,g:0,b:0},197:{r:255,g:0,b:95},198:{r:255,g:0,b:135},199:{r:255,g:0,b:175},200:{r:255,g:0,b:215},201:{r:255,g:0,b:255},202:{r:255,g:95,b:0},203:{r:255,g:95,b:95},204:{r:255,g:95,b:135},205:{r:255,g:95,b:175},206:{r:255,g:95,b:215},207:{r:255,g:95,b:255},208:{r:255,g:135,b:0},209:{r:255,g:135,b:95},210:{r:255,g:135,b:135},211:{r:255,g:135,b:175},212:{r:255,g:135,b:215},213:{r:255,g:135,b:255},214:{r:255,g:175,b:0},215:{r:255,g:175,b:95},216:{r:255,g:175,b:135},217:{r:255,g:175,b:175},218:{r:255,g:175,b:215},219:{r:255,g:175,b:255},220:{r:255,g:215,b:0},221:{r:255,g:215,b:95},222:{r:255,g:215,b:135},223:{r:255,g:215,b:175},224:{r:255,g:215,b:215},225:{r:255,g:215,b:255},226:{r:255,g:255,b:0},227:{r:255,g:255,b:95},228:{r:255,g:255,b:135},229:{r:255,g:255,b:175},230:{r:255,g:255,b:215},231:{r:255,g:255,b:255},232:{r:8,g:8,b:8},233:{r:18,g:18,b:18},234:{r:28,g:28,b:28},235:{r:38,g:38,b:38},236:{r:48,g:48,b:48},237:{r:58,g:58,b:58},238:{r:68,g:68,b:68},239:{r:78,g:78,b:78},240:{r:88,g:88,b:88},241:{r:98,g:98,b:98},242:{r:108,g:108,b:108},243:{r:118,g:118,b:118},244:{r:128,g:128,b:128},245:{r:138,g:138,b:138},246:{r:148,g:148,b:148},247:{r:158,g:158,b:158},248:{r:168,g:168,b:168},249:{r:178,g:178,b:178},250:{r:188,g:188,b:188},251:{r:198,g:198,b:198},252:{r:208,g:208,b:208},253:{r:218,g:218,b:218},254:{r:228,g:228,b:228},255:{r:238,g:238,b:238}};exports.Colors255=Colors255;
});

require.register("demo/initialize.js", function(exports, require, module) {
"use strict";var _Parser=require("Parser"),_Actions=require("Actions"),_AnsiRenderer=require("./AnsiRenderer"),renderer=new _AnsiRenderer.AnsiRenderer,refresh=function(a,b,c){for(;a.firstChild;)a.firstChild.remove();var d,e=b.split(/\n/);d=c?{reset:/\\e\[(0);?m/,graphics:/\\e\[(\d+);?(\d+)?;?([\d;]*)?./,escaped:/\\([^e])/,characters:/.+?(?=\\e|$)/}:{reset:/\u001b\[(0);?m/,graphics:/\u001b\[(\d+);?(\d+)?;?([\d;]*)?./,escaped:/\\([^e])/,characters:/.+?(?=\u001b|$)/};var f={normal:{reset:[_Actions.IGNORE,_Actions.ENTER,_Actions.LEAVE],escaped:[_Actions.IGNORE,_Actions.ENTER,_Actions.LEAVE],graphics:[_Actions.IGNORE,_Actions.ENTER,_Actions.LEAVE],characters:[_Actions.INSERT]}},g=new _Parser.Parser(d,f);e.map(function(b){renderer.reset();var c=g.parse(b),d=renderer.process(c),e=document.createElement("div");e.innerHTML=d,a.append(e)})};document.addEventListener("DOMContentLoaded",function(){var a=document.querySelector("#output"),b=document.querySelector("#escaped"),c=document.querySelector("textarea");c.addEventListener("input",function(){return refresh(a,c.value,b.checked)}),b.addEventListener("input",function(){return refresh(a,c.value,b.checked)}),refresh(a,c.value,b.checked)});
});

require.register("demo/pallete.js", function(exports, require, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.pallete=void 0;var pallete={black:"#002731",bBlack:"#006388",red:"#D01B24",bRed:"",green:"#6BBE6C",bGreen:"",yellow:"#FFD156",blue:"#2075C7",magenta:"#C61B6E",cyan:"#259185",white:"#E9E2CB"};exports.pallete=pallete;
});

require.register("Actions.js", function(exports, require, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.HOME=exports.LEAVE=exports.ENTER=exports.INSERT=exports.IGNORE=void 0;var IGNORE=0;exports.IGNORE=0;var INSERT=1;exports.INSERT=1;var ENTER=2;exports.ENTER=2;var LEAVE=3;exports.LEAVE=3;var HOME=4;exports.HOME=4;
});

require.register("Chunk.js", function(exports, require, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Chunk=void 0;function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var Chunk=function a(){_classCallCheck(this,a),this.depth=0,this.match=null,this.type="normal",this.list=[]};exports.Chunk=Chunk;
});

;require.register("Parser.js", function(exports, require, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Parser=void 0;var _Chunk=require("Chunk"),_Actions=require("Actions");function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(a):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _iterableToArray(a){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}function _typeof(a){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}var Parser=/*#__PURE__*/function(){function a(b,c){_classCallCheck(this,a),this.tokens=b||{},this.modes=c||{}}return _createClass(a,[{key:"parse",value:function parse(a){if(this.index=0,this.mode="normal",this.stack=[],!(this.mode in this.modes))throw new Error("Mode ".concat(this.mode," does not exist on parser."),this);var b=new _Chunk.Chunk,c=this.modes[this.mode];for(b.type=this.mode;this.index<a.length;){var j=!1;for(var k in c){var d=this.tokens[k],e=d.exec(a.substr(this.index));if(e&&!(0<e.index)){if(!c[k]){throw new Error("Invalid token type \"".concat(k,"\" found in mode \"").concat(this.mode,"\"."))}var f=e[0],g="object"===_typeof(c[k])?c[k]:[c[k]];j=!0,this.index+=f.length;var h="normal";for(var l in g){var i=g[l];if("string"==typeof i){if(!(i in this.modes))throw new Error("Mode \"".concat(i,"\" does not exist."));this.mode=i,c=this.modes[this.mode],h=i;continue}switch(i){case _Actions.INSERT:b.list.push(f);break;case _Actions.ENTER:var m=new _Chunk.Chunk;m.depth=b.depth+1,m.match=f,m.groups=_toConsumableArray(f.match(d)).slice(1),m.mode=h,m.type=k,b.list.push(m),this.stack.push(b),b=m;// this.mode = chunk.type;
break;case _Actions.LEAVE:this.stack.length&&(b=this.stack.pop(),this.mode=b.type,c=this.modes[this.mode]);break;case _Actions.HOME:this.stack.splice(0),c=this.modes.normal;}}break}}if(!j)break}if(this.stack.length)throw new Error("Did not return to top of stack!");return this.stack.shift()||b}}]),a}();exports.Parser=Parser;
});

;require.register("Transformer.js", function(exports, require, module) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Transformer=void 0;function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}var Transformer=/*#__PURE__*/function(){function a(b){_classCallCheck(this,a),this.ops=b||{}}return _createClass(a,[{key:"process",value:function process(a){var b="";for(var c in a.list){var d=a.list[c];if(this.ops[a.type]){var e=this.ops[a.type](d,a);!1!==e&&(b+=e)}else!1!==d&&(b+=d)}return b}}]),a}();exports.Transformer=Transformer;
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

/* jshint ignore:start */(function(){var WebSocket=window.WebSocket||window.MozWebSocket,br=window.brunch=window.brunch||{},ar=br["auto-reload"]=br["auto-reload"]||{};if(WebSocket&&!ar.disabled&&!window._ar){window._ar=!0;var cacheBuster=function(a){var b=Math.round,c=b(Date.now()/1e3).toString();return a=a.replace(/(\&|\\?)cacheBuster=\d*/,""),a+(0<=a.indexOf("?")?"&":"?")+"cacheBuster="+c},browser=navigator.userAgent.toLowerCase(),forceRepaint=ar.forceRepaint||-1<browser.indexOf("chrome"),reloaders={page:function(){window.location.reload(!0)},stylesheet:function(){[].slice.call(document.querySelectorAll("link[rel=stylesheet]")).filter(function(a){var b=a.getAttribute("data-autoreload");return a.href&&"false"!=b}).forEach(function(a){a.href=cacheBuster(a.href)}),forceRepaint&&setTimeout(function(){document.body.offsetHeight},25)},javascript:function(){var scripts=[].slice.call(document.querySelectorAll("script")),textScripts=scripts.map(function(a){return a.text}).filter(function(a){return 0<a.length}),srcScripts=scripts.filter(function(a){return a.src}),loaded=0,all=srcScripts.length,onLoad=function(){++loaded,loaded===all&&textScripts.forEach(function(script){eval(script)})};srcScripts.forEach(function(a){var b=a.src;a.remove();var c=document.createElement("script");c.src=cacheBuster(b),c.async=!0,c.onload=onLoad,document.head.appendChild(c)})}},port=ar.port||9485,host=br.server||window.location.hostname||"localhost",connect=function(){var a=new WebSocket("ws://"+host+":"+port);a.onmessage=function(a){if(!ar.disabled){var b=a.data,c=reloaders[b]||reloaders.page;c()}},a.onerror=function(){a.readyState&&a.close()},a.onclose=function(){window.setTimeout(connect,1e3)}};connect()}})();
;
//# sourceMappingURL=reckon-demo.js.map