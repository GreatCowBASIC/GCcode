"use strict";(function(){function n(f,l,p,d){const o=/("[^"\\]*(?:\\.[^"\\]*)*")|('[^'\\]*(?:\\.[^'\\]*)*')|(\/\*[^\/\*]*(?:(?:\*|\/)[^\/\*]*)*?\*\/)|(\/{2,}.*?(?:(?:\r?\n)|$))|(,\s*[}\]])/g;function s(i){return i.replace(o,function(t,m,g,u,e,c){if(u)return"";if(e){const r=e.length;return e[r-1]===`
`?e[r-2]==="\r"?`\r
`:`
`:""}else return c?t.substring(1):t})}return{stripComments:s}}typeof define=="function"?define([],function(){return n()}):typeof module=="object"&&typeof module.exports=="object"?module.exports=n():console.trace("strip comments defined in UNKNOWN context (neither requirejs or commonjs)")})();

//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/6c122d9b2d1af2c37bd55caad614321eb53b342f/core/vs\base\common\stripComments.js.map
