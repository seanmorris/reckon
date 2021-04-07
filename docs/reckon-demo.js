!function(){"use strict";var r="undefined"==typeof global?self:global;if("function"!=typeof r.require){var e={},t={},n={},o={}.hasOwnProperty,s=/^\.\.?(\/|$)/,i=function(r,e){for(var t,n=[],o=(s.test(e)?r+"/"+e:e).split("/"),i=0,a=o.length;i<a;i++)".."===(t=o[i])?n.pop():"."!==t&&""!==t&&n.push(t);return n.join("/")},a=function(r){return r.split("/").slice(0,-1).join("/")},c=function(e,n){var o,s={id:e,exports:{},hot:f&&f.createHot(e)};return t[e]=s,n(s.exports,(o=e,function(e){var t=i(a(o),e);return r.require(t,o)}),s),s.exports},b=function(r){var e=n[r];return e&&r!==e?b(e):r},l=function(r,n){null==n&&(n="/");var s=b(r);if(o.call(t,s))return t[s].exports;if(o.call(e,s))return c(s,e[s]);throw new Error("Cannot find module '"+r+"' from '"+n+"'")};l.alias=function(r,e){n[e]=r};var g=/\.[^.\/]+$/,u=/\/index(\.[^\/]+)?$/;l.register=l.define=function(r,s){if(r&&"object"==typeof r)for(var i in r)o.call(r,i)&&l.register(i,r[i]);else e[r]=s,delete t[r],function(r){if(g.test(r)){var e=r.replace(g,"");o.call(n,e)&&n[e].replace(g,"")!==e+"/index"||(n[e]=r)}if(u.test(r)){var t=r.replace(u,"");o.call(n,t)||(n[t]=r)}}(r)},l.list=function(){var r=[];for(var t in e)o.call(e,t)&&r.push(t);return r};var f=r._hmr&&new r._hmr(function(r,e){return b(i(a(r),e))},l,e,t);l._cache=t,l.hmr=f&&f.wrap,l.brunch=!0,r.require=l}}(),"undefined"==typeof window||window,require.register("demo/AnsiParser.js",function(r,e,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.AnsiParser=void 0;var n=e("Parser"),o=e("Actions"),s={normal:{reset:[o.IGNORE,o.ENTER,o.LEAVE],graphics:[o.IGNORE,o.ENTER,o.LEAVE],escape:[o.IGNORE,o.ENTER,o.LEAVE],characters:[o.INSERT]}},i=new n.Parser({reset:/\u001b\[(0)m/,escape:/\\(.)/,graphics:/\u001b\[(\d+);?(\d+)?;?([\d;]*)./,characters:/[^\u001b]+/},s);r.AnsiParser=i}),require.register("demo/AnsiRenderer.js",function(r,e,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.AnsiRenderer=void 0;var n=e("Transformer"),o=e("./pallete"),s=e("./Colors255");function i(r){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(r)}function a(r,e){return function(r){if(Array.isArray(r))return r}(r)||function(r,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(r)){var t=[],n=!0,o=!1,s=void 0;try{for(var i,a=r[Symbol.iterator]();!(n=(i=a.next()).done)&&(t.push(i.value),!e||t.length!==e);n=!0);}catch(r){o=!0,s=r}finally{try{n||null==a.return||a.return()}finally{if(o)throw s}}return t}}(r,e)||function(r,e){if(r){if("string"==typeof r)return c(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?c(r,e):void 0}}(r,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=Array(e);t<e;t++)n[t]=r[t];return n}function b(r,e){for(var t,n=0;n<e.length;n++)(t=e[n]).enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,t.key,t)}function l(r){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(r){return!1}}();return function(){var t,n=u(r);if(e){var o=u(this).constructor;t=Reflect.construct(n,arguments,o)}else t=n.apply(this,arguments);return function(r,e){return!e||"object"!==i(e)&&"function"!=typeof e?g(r):e}(this,t)}}function g(r){if(void 0===r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function u(r){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(r){return r.__proto__||Object.getPrototypeOf(r)})(r)}var f=new AudioContext,h=function(r){function e(){var r;return function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(r,e,t){e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t}(g(r=t.call(this,{normal:function(e,t){return r.setGraphicsMode(e,t)}})),"style",{}),r}!function(r,e){throw new TypeError("Super expression must either be null or a function")}(0,n.Transformer);var t=l(e);return function(r,e,t){e&&b(r.prototype,e)}(e,[{key:"reset",value:function(){for(var r=0,e=Object.entries(this.style);r<e.length;r++){var t=a(e[r],1)[0];delete this.style[t]}}},{key:"beep",value:function(){var r=f.createOscillator(),e=f.createGain();r.connect(e),r.frequency.value=840,r.type="square",e.connect(f.destination),e.gain.value=.1,r.start(f.currentTime),r.stop(f.currentTime+.2)}},{key:"setGraphicsMode",value:function(r){if("string"==typeof r){if(""===r)return!1;for(var e="",t=0,n=Object.entries(this.style);t<n.length;t++){var c=a(n[t],2),b=c[0],l=c[1];e+="".concat(b,": ").concat(l,"; ")}return'<span class = "ansi" style = "'.concat(e,'">').concat(r,"</span>")}if("object"===i(r)){if("escaped"===r.type&&"a"===r.groups[0]&&this.beep(),"graphics"===r.type||"reset"===r.type)for(var g,u=0;u<r.groups.length;u++){if(g=+r.groups[u],""===r.groups[u])return!1;switch(g){case 0:for(var f in this.style)delete this.style[f];break;case 1:this.style.filter="brightness(1.25) contrast(1.25)",this.style["font-weight"]="bold",this.style.opacity=1;break;case 2:this.style.filter="brightness(0.75)",this.style["font-weight"]="light",this.style.opacity=.75;break;case 3:this.style["font-this.style"]="italic";break;case 4:this.style["text-decoration"]="underline";break;case 5:this.style.animation="var(--ansiBlink)";break;case 7:this.style.filter="invert(1) contrast(1.5)";break;case 8:this.style.filter="contrast(0.5)",this.style.opacity=.1;break;case 9:this.style["text-decoration"]="line-through";break;case 10:this.style["font-family"]="var(--base-font))";break;case 11:case 12:case 13:case 14:case 15:case 16:case 17:case 18:case 19:this.style["font-family"]="var(--alt-font-no-".concat(g,")");break;case 20:this.style["font-family"]="var(--alt-font-fraktur)",this.style["font-size"]="1.1rem";break;case 21:case 22:this.style["font-weight"]="initial";break;case 23:this.style["font-style"]="fractur";break;case 24:this.this.style["text-decoration"]="none";break;case 25:this.style.animation="none";break;case 27:this.style.filter="initial";break;case 28:this.style.opacity="initial";break;case 29:this.style["text-decoration"]="initial";break;case 30:this.style.color=o.pallete.black;break;case 31:this.style.color=o.pallete.red;break;case 32:this.style.color=o.pallete.green;break;case 33:this.style.color=o.pallete.yellow;break;case 34:this.style.color=o.pallete.blue;break;case 35:this.style.color=o.pallete.magenta;break;case 36:this.style.color=o.pallete.cyan;break;case 37:this.style.color=o.pallete.white;break;case 38:if(2==r.groups[1+u]){var h=a(r.groups[2+u].split(";"),3),y=h[0],p=h[1],d=h[2];this.style.color="rgb(".concat(y,",").concat(p,",").concat(d,")")}if(5==r.groups[1+u]){var v=s.Colors255[+r.groups[2+u]],m=v.r,k=v.g,E=v.b;this.style.color="rgb(".concat(m,",").concat(k,",").concat(E,")")}u+=2;break;case 39:this.style.color="var(--fgColor)";break;case 40:this.style["background-color"]=o.pallete.black;break;case 41:this.style["background-color"]=o.pallete.red;break;case 42:this.style["background-color"]=o.pallete.green;break;case 43:this.style["background-color"]=o.pallete.yellow;break;case 44:this.style["background-color"]=o.pallete.blue;break;case 45:this.style["background-color"]=o.pallete.magenta;break;case 46:this.style["background-color"]=o.pallete.cyan;break;case 47:this.style["background-color"]=o.pallete.white;break;case 48:if(2==r.groups[1+u]){var w=a(r.groups[2+u].split(";"),3),O=w[0],j=w[1],A=w[2];this.style["background-color"]="rgb(".concat(O,",").concat(j,",").concat(A,")")}if(5==r.groups[1+u]){var _=s.Colors255[+r.groups[2+u]],R=_.r,C=_.g,S=_.b;this.style["background-color"]="rgb(".concat(R,",").concat(C,",").concat(S,")")}u+=2;break;case 49:this.style["background-color"]="var(--bgColor)";break;case 51:this.style.border="1px solid currentColor";break;case 52:this.style.border="1px solid currentColor",this.style["border-radius"]="1em";break;case 53:this.style["text-decoration"]="overline";break;case 54:this.style.border="initial";break;case 55:this.style.border="initial"}}return!1}}}]),e}();r.AnsiRenderer=h}),require.register("demo/Colors255.js",function(r,e,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Colors255=void 0,r.Colors255={0:{r:0,g:0,b:0},1:{r:128,g:0,b:0},2:{r:0,g:128,b:0},3:{r:128,g:128,b:0},4:{r:0,g:0,b:128},5:{r:128,g:0,b:128},6:{r:0,g:128,b:128},7:{r:192,g:192,b:192},8:{r:128,g:128,b:128},9:{r:255,g:0,b:0},10:{r:0,g:255,b:0},11:{r:255,g:255,b:0},12:{r:0,g:0,b:255},13:{r:255,g:0,b:255},14:{r:0,g:255,b:255},15:{r:255,g:255,b:255},16:{r:0,g:0,b:0},17:{r:0,g:0,b:95},18:{r:0,g:0,b:135},19:{r:0,g:0,b:175},20:{r:0,g:0,b:215},21:{r:0,g:0,b:255},22:{r:0,g:95,b:0},23:{r:0,g:95,b:95},24:{r:0,g:95,b:135},25:{r:0,g:95,b:175},26:{r:0,g:95,b:215},27:{r:0,g:95,b:255},28:{r:0,g:135,b:0},29:{r:0,g:135,b:95},30:{r:0,g:135,b:135},31:{r:0,g:135,b:175},32:{r:0,g:135,b:215},33:{r:0,g:135,b:255},34:{r:0,g:175,b:0},35:{r:0,g:175,b:95},36:{r:0,g:175,b:135},37:{r:0,g:175,b:175},38:{r:0,g:175,b:215},39:{r:0,g:175,b:255},40:{r:0,g:215,b:0},41:{r:0,g:215,b:95},42:{r:0,g:215,b:135},43:{r:0,g:215,b:175},44:{r:0,g:215,b:215},45:{r:0,g:215,b:255},46:{r:0,g:255,b:0},47:{r:0,g:255,b:95},48:{r:0,g:255,b:135},49:{r:0,g:255,b:175},50:{r:0,g:255,b:215},51:{r:0,g:255,b:255},52:{r:95,g:0,b:0},53:{r:95,g:0,b:95},54:{r:95,g:0,b:135},55:{r:95,g:0,b:175},56:{r:95,g:0,b:215},57:{r:95,g:0,b:255},58:{r:95,g:95,b:0},59:{r:95,g:95,b:95},60:{r:95,g:95,b:135},61:{r:95,g:95,b:175},62:{r:95,g:95,b:215},63:{r:95,g:95,b:255},64:{r:95,g:135,b:0},65:{r:95,g:135,b:95},66:{r:95,g:135,b:135},67:{r:95,g:135,b:175},68:{r:95,g:135,b:215},69:{r:95,g:135,b:255},70:{r:95,g:175,b:0},71:{r:95,g:175,b:95},72:{r:95,g:175,b:135},73:{r:95,g:175,b:175},74:{r:95,g:175,b:215},75:{r:95,g:175,b:255},76:{r:95,g:215,b:0},77:{r:95,g:215,b:95},78:{r:95,g:215,b:135},79:{r:95,g:215,b:175},80:{r:95,g:215,b:215},81:{r:95,g:215,b:255},82:{r:95,g:255,b:0},83:{r:95,g:255,b:95},84:{r:95,g:255,b:135},85:{r:95,g:255,b:175},86:{r:95,g:255,b:215},87:{r:95,g:255,b:255},88:{r:135,g:0,b:0},89:{r:135,g:0,b:95},90:{r:135,g:0,b:135},91:{r:135,g:0,b:175},92:{r:135,g:0,b:215},93:{r:135,g:0,b:255},94:{r:135,g:95,b:0},95:{r:135,g:95,b:95},96:{r:135,g:95,b:135},97:{r:135,g:95,b:175},98:{r:135,g:95,b:215},99:{r:135,g:95,b:255},100:{r:135,g:135,b:0},101:{r:135,g:135,b:95},102:{r:135,g:135,b:135},103:{r:135,g:135,b:175},104:{r:135,g:135,b:215},105:{r:135,g:135,b:255},106:{r:135,g:175,b:0},107:{r:135,g:175,b:95},108:{r:135,g:175,b:135},109:{r:135,g:175,b:175},110:{r:135,g:175,b:215},111:{r:135,g:175,b:255},112:{r:135,g:215,b:0},113:{r:135,g:215,b:95},114:{r:135,g:215,b:135},115:{r:135,g:215,b:175},116:{r:135,g:215,b:215},117:{r:135,g:215,b:255},118:{r:135,g:255,b:0},119:{r:135,g:255,b:95},120:{r:135,g:255,b:135},121:{r:135,g:255,b:175},122:{r:135,g:255,b:215},123:{r:135,g:255,b:255},124:{r:175,g:0,b:0},125:{r:175,g:0,b:95},126:{r:175,g:0,b:135},127:{r:175,g:0,b:175},128:{r:175,g:0,b:215},129:{r:175,g:0,b:255},130:{r:175,g:95,b:0},131:{r:175,g:95,b:95},132:{r:175,g:95,b:135},133:{r:175,g:95,b:175},134:{r:175,g:95,b:215},135:{r:175,g:95,b:255},136:{r:175,g:135,b:0},137:{r:175,g:135,b:95},138:{r:175,g:135,b:135},139:{r:175,g:135,b:175},140:{r:175,g:135,b:215},141:{r:175,g:135,b:255},142:{r:175,g:175,b:0},143:{r:175,g:175,b:95},144:{r:175,g:175,b:135},145:{r:175,g:175,b:175},146:{r:175,g:175,b:215},147:{r:175,g:175,b:255},148:{r:175,g:215,b:0},149:{r:175,g:215,b:95},150:{r:175,g:215,b:135},151:{r:175,g:215,b:175},152:{r:175,g:215,b:215},153:{r:175,g:215,b:255},154:{r:175,g:255,b:0},155:{r:175,g:255,b:95},156:{r:175,g:255,b:135},157:{r:175,g:255,b:175},158:{r:175,g:255,b:215},159:{r:175,g:255,b:255},160:{r:215,g:0,b:0},161:{r:215,g:0,b:95},162:{r:215,g:0,b:135},163:{r:215,g:0,b:175},164:{r:215,g:0,b:215},165:{r:215,g:0,b:255},166:{r:215,g:95,b:0},167:{r:215,g:95,b:95},168:{r:215,g:95,b:135},169:{r:215,g:95,b:175},170:{r:215,g:95,b:215},171:{r:215,g:95,b:255},172:{r:215,g:135,b:0},173:{r:215,g:135,b:95},174:{r:215,g:135,b:135},175:{r:215,g:135,b:175},176:{r:215,g:135,b:215},177:{r:215,g:135,b:255},178:{r:215,g:175,b:0},179:{r:215,g:175,b:95},180:{r:215,g:175,b:135},181:{r:215,g:175,b:175},182:{r:215,g:175,b:215},183:{r:215,g:175,b:255},184:{r:215,g:215,b:0},185:{r:215,g:215,b:95},186:{r:215,g:215,b:135},187:{r:215,g:215,b:175},188:{r:215,g:215,b:215},189:{r:215,g:215,b:255},190:{r:215,g:255,b:0},191:{r:215,g:255,b:95},192:{r:215,g:255,b:135},193:{r:215,g:255,b:175},194:{r:215,g:255,b:215},195:{r:215,g:255,b:255},196:{r:255,g:0,b:0},197:{r:255,g:0,b:95},198:{r:255,g:0,b:135},199:{r:255,g:0,b:175},200:{r:255,g:0,b:215},201:{r:255,g:0,b:255},202:{r:255,g:95,b:0},203:{r:255,g:95,b:95},204:{r:255,g:95,b:135},205:{r:255,g:95,b:175},206:{r:255,g:95,b:215},207:{r:255,g:95,b:255},208:{r:255,g:135,b:0},209:{r:255,g:135,b:95},210:{r:255,g:135,b:135},211:{r:255,g:135,b:175},212:{r:255,g:135,b:215},213:{r:255,g:135,b:255},214:{r:255,g:175,b:0},215:{r:255,g:175,b:95},216:{r:255,g:175,b:135},217:{r:255,g:175,b:175},218:{r:255,g:175,b:215},219:{r:255,g:175,b:255},220:{r:255,g:215,b:0},221:{r:255,g:215,b:95},222:{r:255,g:215,b:135},223:{r:255,g:215,b:175},224:{r:255,g:215,b:215},225:{r:255,g:215,b:255},226:{r:255,g:255,b:0},227:{r:255,g:255,b:95},228:{r:255,g:255,b:135},229:{r:255,g:255,b:175},230:{r:255,g:255,b:215},231:{r:255,g:255,b:255},232:{r:8,g:8,b:8},233:{r:18,g:18,b:18},234:{r:28,g:28,b:28},235:{r:38,g:38,b:38},236:{r:48,g:48,b:48},237:{r:58,g:58,b:58},238:{r:68,g:68,b:68},239:{r:78,g:78,b:78},240:{r:88,g:88,b:88},241:{r:98,g:98,b:98},242:{r:108,g:108,b:108},243:{r:118,g:118,b:118},244:{r:128,g:128,b:128},245:{r:138,g:138,b:138},246:{r:148,g:148,b:148},247:{r:158,g:158,b:158},248:{r:168,g:168,b:168},249:{r:178,g:178,b:178},250:{r:188,g:188,b:188},251:{r:198,g:198,b:198},252:{r:208,g:208,b:208},253:{r:218,g:218,b:218},254:{r:228,g:228,b:228},255:{r:238,g:238,b:238}}}),require.register("demo/initialize.js",function(r,e,t){"use strict";var n=e("Parser"),o=e("Actions"),s=new(e("./AnsiRenderer").AnsiRenderer),i=function(r,e,t){for(;r.firstChild;)r.firstChild.remove();var i,a=e.split(/\n/);i=t?{reset:/\\e\[(0);?m/,graphics:/\\e\[(\d+);?(\d+)?;?([\d;]*)?./,escaped:/\\([^e])/,characters:/.+?(?=\\e|$)/}:{reset:/\u001b\[(0);?m/,graphics:/\u001b\[(\d+);?(\d+)?;?([\d;]*)?./,escaped:/\\([^e])/,characters:/.+?(?=\u001b|$)/};var c={normal:{reset:[o.IGNORE,o.ENTER,o.LEAVE],escaped:[o.IGNORE,o.ENTER,o.LEAVE],graphics:[o.IGNORE,o.ENTER,o.LEAVE],characters:[o.INSERT]}},b=new n.Parser(i,c);a.map(function(e){s.reset();var t=b.parse(e),n=s.process(t),o=document.createElement("div");o.innerHTML=n,r.append(o)})};document.addEventListener("DOMContentLoaded",function(){var r=document.querySelector("#output"),e=document.querySelector("#escaped"),t=document.querySelector("textarea");t.addEventListener("input",function(){return i(r,t.value,e.checked)}),e.addEventListener("input",function(){return i(r,t.value,e.checked)}),i(r,t.value,e.checked)})}),require.register("demo/pallete.js",function(r,e,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.pallete=void 0,r.pallete={black:"#002731",bBlack:"#006388",red:"#D01B24",bRed:"",green:"#6BBE6C",bGreen:"",yellow:"#FFD156",blue:"#2075C7",magenta:"#C61B6E",cyan:"#259185",white:"#E9E2CB"}}),require.register("Actions.js",function(r,e,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.HOME=r.LEAVE=r.ENTER=r.INSERT=r.IGNORE=void 0,r.IGNORE=0,r.INSERT=1,r.ENTER=2,r.LEAVE=3,r.HOME=4}),require.register("Chunk.js",function(r,e,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Chunk=void 0,r.Chunk=function r(){(function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")})(this,r),this.depth=0,this.match=null,this.type="normal",this.list=[]}}),require.register("Parser.js",function(r,e,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.Parser=void 0;var n=e("Chunk"),o=e("Actions");function s(r){return function(r){if(Array.isArray(r))return i(r)}(r)||function(r){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(r))return Array.from(r)}(r)||function(r,e){if(r){if("string"==typeof r)return i(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?i(r,e):void 0}}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=Array(e);t<e;t++)n[t]=r[t];return n}function a(r){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(r)}function c(r,e){for(var t,n=0;n<e.length;n++)(t=e[n]).enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,t.key,t)}var b=function(){function r(e,t){(function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")})(this,r),this.tokens=e||{},this.modes=t||{}}return function(r,e,t){e&&c(r.prototype,e)}(r,[{key:"parse",value:function(r){if(this.index=0,this.mode="normal",this.stack=[],!(this.mode in this.modes))throw new Error("Mode ".concat(this.mode," does not exist on parser."),this);var e=new n.Chunk,t=this.modes[this.mode];for(e.type=this.mode;this.index<r.length;){var i=!1;for(var c in t){var b=this.tokens[c],l=b.exec(r.substr(this.index));if(l&&!(0<l.index)){if(!t[c])throw new Error('Invalid token type "'.concat(c,'" found in mode "').concat(this.mode,'".'));var g=l[0],u="object"===a(t[c])?t[c]:[t[c]];i=!0,this.index+=g.length;var f="normal";for(var h in u){var y=u[h];if("string"!=typeof y)switch(y){case o.INSERT:e.list.push(g);break;case o.ENTER:var p=new n.Chunk;p.depth=e.depth+1,p.match=g,p.groups=s(g.match(b)).slice(1),p.mode=f,p.type=c,e.list.push(p),this.stack.push(e),e=p;break;case o.LEAVE:this.stack.length&&(e=this.stack.pop(),this.mode=e.type,t=this.modes[this.mode]);break;case o.HOME:this.stack.splice(0),t=this.modes.normal}else{if(!(y in this.modes))throw new Error('Mode "'.concat(y,'" does not exist.'));this.mode=y,t=this.modes[this.mode],f=y}}break}}if(!i)break}if(this.stack.length)throw new Error("Did not return to top of stack!");return this.stack.shift()||e}}]),r}();r.Parser=b}),require.register("Transformer.js",function(r,e,t){"use strict";function n(r,e){for(var t,n=0;n<e.length;n++)(t=e[n]).enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,t.key,t)}Object.defineProperty(r,"__esModule",{value:!0}),r.Transformer=void 0;var o=function(){function r(e){(function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")})(this,r),this.ops=e||{}}return function(r,e,t){e&&n(r.prototype,e)}(r,[{key:"process",value:function(r){var e="";for(var t in r.list){var n=r.list[t];if(this.ops[r.type]){var o=this.ops[r.type](n,r);!1!==o&&(e+=o)}else!1!==n&&(e+=n)}return e}}]),r}();r.Transformer=o}),require.register("___globals___",function(r,e,t){}),require("___globals___");
