/*! For license information please see 7818.70a44aab.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkmyiia=self.webpackChunkmyiia||[]).push([[7818],{7818:function(t,e,r){r.r(e),r.d(e,{scopeCss:function(){return y}});var n=r(9388),c="-shadowcsshost",s="-shadowcssslotted",o="-shadowcsscontext",i=")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)",u=new RegExp("("+c+i,"gim"),a=new RegExp("("+o+i,"gim"),l=new RegExp("("+s+i,"gim"),f=c+"-no-combinator",p=/-shadowcsshost-no-combinator([^\s]*)/,h=[/::shadow/g,/::content/g],g=/-shadowcsshost/gim,m=/:host/gim,d=/::slotted/gim,v=/:host-context/gim,x=/\/\*\s*[\s\S]*?\*\//g,_=/\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g,w=/(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g,b=/([{}])/g,S="%BLOCK%",W=function(t,e){var r=k(t),n=0;return r.escapedString.replace(w,(function(){for(var t=[],c=0;c<arguments.length;c++)t[c]=arguments[c];var s=t[2],o="",i=t[4],u="";i&&i.startsWith("{"+S)&&(o=r.blocks[n++],i=i.substring(S.length+1),u="{");var a=e({selector:s,content:o});return""+t[1]+a.selector+t[3]+u+a.content+i}))},k=function(t){for(var e=t.split(b),r=[],n=[],c=0,s=[],o=0;o<e.length;o++){var i=e[o];"}"===i&&c--,c>0?s.push(i):(s.length>0&&(n.push(s.join("")),r.push(S),s=[]),r.push(i)),"{"===i&&c++}return s.length>0&&(n.push(s.join("")),r.push(S)),{escapedString:r.join(""),blocks:n}},O=function(t,e,r){return t.replace(e,(function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(t[2]){for(var n=t[2].split(","),c=[],s=0;s<n.length;s++){var o=n[s].trim();if(!o)break;c.push(r(f,o,t[3]))}return c.join(",")}return f+t[3]}))},j=function(t,e,r){return t+e.replace(c,"")+r},E=function(t,e,r){return e.indexOf(c)>-1?j(t,e,r):t+e+r+", "+e+" "+t+r},R=function(t,e){var r=function(t){return t=t.replace(/\[/g,"\\[").replace(/\]/g,"\\]"),new RegExp("^("+t+")([>\\s~+[.,{:][\\s\\S]*)?$","m")}(e);return!r.test(t)},C=function(t,e,r){e=e.replace(/\[is=([^\]]*)\]/g,(function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return e[0]}));for(var n,c="."+e,s=function(t){var n=t.trim();if(!n)return"";if(t.indexOf(f)>-1)n=function(t,e,r){if(g.lastIndex=0,g.test(t)){var n="."+r;return t.replace(p,(function(t,e){return e.replace(/([^:]*)(:*)(.*)/,(function(t,e,r,c){return e+n+r+c}))})).replace(g,n+" ")}return e+" "+t}(t,e,r);else{var s=t.replace(g,"");if(s.length>0){var o=s.match(/([^:]*)(:*)(.*)/);o&&(n=o[1]+c+o[2]+o[3])}}return n},o=function(t){var e,r=[],n=0;return t=t.replace(/(\[[^\]]*\])/g,(function(t,e){var c="__ph-"+n+"__";return r.push(e),n++,c})),e=t.replace(/(:nth-[-\w]+)(\([^)]+\))/g,(function(t,e,c){var s="__ph-"+n+"__";return r.push(c),n++,e+s})),{content:e,placeholders:r}}(t),i="",u=0,a=/( |>|\+|~(?!=))\s*/g,l=!((t=o.content).indexOf(f)>-1);null!==(n=a.exec(t));){var h=n[1],m=t.slice(u,n.index).trim();i+=((l=l||m.indexOf(f)>-1)?s(m):m)+" "+h+" ",u=a.lastIndex}var d=t.substring(u);return i+=(l=l||d.indexOf(f)>-1)?s(d):d,function(t,e){return e.replace(/__ph-(\d+)__/g,(function(e,r){return t[+r]}))}(o.placeholders,i)},T=function t(e,r,n,c,s){return W(e,(function(e){var s=e.selector,o=e.content;return"@"!==e.selector[0]?s=function(t,e,r,n){return t.split(",").map((function(t){return n&&t.indexOf("."+n)>-1?t.trim():R(t,e)?C(t,e,r).trim():t.trim()})).join(", ")}(e.selector,r,n,c):(e.selector.startsWith("@media")||e.selector.startsWith("@supports")||e.selector.startsWith("@page")||e.selector.startsWith("@document"))&&(o=t(e.content,r,n,c)),{selector:s.replace(/\s{2,}/g," ").trim(),content:o}}))},L=function(t,e,r,n,i){var p=function(t,e){var r="."+e+" > ",n=[];return t=t.replace(l,(function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(t[2]){for(var c=t[2].trim(),s=t[3],o=r+c+s,i="",u=t[4]-1;u>=0;u--){var a=t[5][u];if("}"===a||","===a)break;i=a+i}var l=i+o,p=""+i.trimRight()+o.trim();if(l.trim()!==p.trim()){var h=p+", "+l;n.push({orgSelector:l,updatedSelector:h})}return o}return f+t[3]})),{selectors:n,cssText:t}}(t=function(t){return O(t,a,E)}(t=function(t){return O(t,u,j)}(t=function(t){return t.replace(v,o).replace(m,c).replace(d,s)}(t))),n);return t=function(t){return h.reduce((function(t,e){return t.replace(e," ")}),t)}(t=p.cssText),e&&(t=T(t,e,r,n)),{cssText:(t=(t=t.replace(/-shadowcsshost-no-combinator/g,"."+r)).replace(/>\s*\*\s+([^{, ]+)/gm," $1 ")).trim(),slottedSelectors:p.selectors}},y=function(t,e,r){var c=e+"-h",s=e+"-s",o=function(t){return t.match(_)||[]}(t);t=function(t){return t.replace(x,"")}(t);var i=[];if(r){var u=function(t){var e="/*!@___"+i.length+"___*/",r="/*!@"+t.selector+"*/";return i.push({placeholder:e,comment:r}),t.selector=e+t.selector,t};t=W(t,(function(t){return"@"!==t.selector[0]?u(t):t.selector.startsWith("@media")||t.selector.startsWith("@supports")||t.selector.startsWith("@page")||t.selector.startsWith("@document")?(t.content=W(t.content,u),t):t}))}var a=L(t,e,c,s);return t=(0,n.ev)([a.cssText],o).join("\n"),r&&i.forEach((function(e){var r=e.placeholder,n=e.comment;t=t.replace(r,n)})),a.slottedSelectors.forEach((function(e){t=t.replace(e.orgSelector,e.updatedSelector)})),t}}}]);
//# sourceMappingURL=7818.70a44aab.chunk.js.map