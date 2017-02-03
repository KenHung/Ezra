(function (ezraLinkifier, undefined) {
  // Ezra embeds Tether and Drop from HubSpot, which are MIT licensed
  var Tether=function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t){var o=t.getBoundingClientRect(),i={};for(var n in o)i[n]=o[n];if(t.ownerDocument!==document){var r=t.ownerDocument.defaultView.frameElement;if(r){var s=e(r);i.top+=s.top,i.bottom+=s.top,i.left+=s.left,i.right+=s.left}}return i}function o(t){var e=getComputedStyle(t)||{},o=e.position,i=[];if("fixed"===o)return[t];for(var n=t;(n=n.parentNode)&&n&&1===n.nodeType;){var r=void 0;try{r=getComputedStyle(n)}catch(t){}if("undefined"==typeof r||null===r)return i.push(n),i;var s=r,a=s.overflow,f=s.overflowX,l=s.overflowY;/(auto|scroll)/.test(a+l+f)&&("absolute"!==o||["relative","absolute","fixed"].indexOf(r.position)>=0)&&i.push(n)}return i.push(t.ownerDocument.body),t.ownerDocument!==document&&i.push(t.ownerDocument.defaultView),i}function i(){O&&document.body.removeChild(O),O=null}function n(t){var o=void 0;t===document?(o=document,t=document.documentElement):o=t.ownerDocument;var i=o.documentElement,n=e(t),r=A();return n.top-=r.top,n.left-=r.left,"undefined"==typeof n.width&&(n.width=document.body.scrollWidth-n.left-n.right),"undefined"==typeof n.height&&(n.height=document.body.scrollHeight-n.top-n.bottom),n.top=n.top-i.clientTop,n.left=n.left-i.clientLeft,n.right=o.body.clientWidth-n.width-n.left,n.bottom=o.body.clientHeight-n.height-n.top,n}function r(t){return t.offsetParent||document.documentElement}function s(){var t=document.createElement("div");t.style.width="100%",t.style.height="200px";var e=document.createElement("div");a(e.style,{position:"absolute",top:0,left:0,pointerEvents:"none",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),e.appendChild(t),document.body.appendChild(e);var o=t.offsetWidth;e.style.overflow="scroll";var i=t.offsetWidth;o===i&&(i=e.clientWidth),document.body.removeChild(e);var n=o-i;return{width:n,height:n}}function a(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=[];return Array.prototype.push.apply(e,arguments),e.slice(1).forEach(function(e){if(e)for(var o in e)({}).hasOwnProperty.call(e,o)&&(t[o]=e[o])}),t}function f(t,e){if("undefined"!=typeof t.classList)e.split(" ").forEach(function(e){e.trim()&&t.classList.remove(e)});else{var o=new RegExp("(^| )"+e.split(" ").join("|")+"( |$)","gi"),i=d(t).replace(o," ");p(t,i)}}function l(t,e){if("undefined"!=typeof t.classList)e.split(" ").forEach(function(e){e.trim()&&t.classList.add(e)});else{f(t,e);var o=d(t)+(" "+e);p(t,o)}}function h(t,e){if("undefined"!=typeof t.classList)return t.classList.contains(e);var o=d(t);return new RegExp("(^| )"+e+"( |$)","gi").test(o)}function d(t){return t.className instanceof t.ownerDocument.defaultView.SVGAnimatedString?t.className.baseVal:t.className}function p(t,e){t.setAttribute("class",e)}function u(t,e,o){o.forEach(function(o){e.indexOf(o)===-1&&h(t,o)&&f(t,o)}),e.forEach(function(e){h(t,e)||l(t,e)})}function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function g(t,e){var o=arguments.length<=2||void 0===arguments[2]?1:arguments[2];return t+o>=e&&e>=t-o}function m(){return"undefined"!=typeof performance&&"undefined"!=typeof performance.now?performance.now():+new Date}function v(){for(var t={top:0,left:0},e=arguments.length,o=Array(e),i=0;i<e;i++)o[i]=arguments[i];return o.forEach(function(e){var o=e.top,i=e.left;"string"==typeof o&&(o=parseFloat(o,10)),"string"==typeof i&&(i=parseFloat(i,10)),t.top+=o,t.left+=i}),t}function y(t,e){return"string"==typeof t.left&&t.left.indexOf("%")!==-1&&(t.left=parseFloat(t.left,10)/100*e.width),"string"==typeof t.top&&t.top.indexOf("%")!==-1&&(t.top=parseFloat(t.top,10)/100*e.height),t}function b(t,e){return"scrollParent"===e?e=t.scrollParents[0]:"window"===e&&(e=[pageXOffset,pageYOffset,innerWidth+pageXOffset,innerHeight+pageYOffset]),e===document&&(e=e.documentElement),"undefined"!=typeof e.nodeType&&!function(){var t=e,o=n(e),i=o,r=getComputedStyle(e);if(e=[i.left,i.top,o.width+i.left,o.height+i.top],t.ownerDocument!==document){var s=t.ownerDocument.defaultView;e[0]+=s.pageXOffset,e[1]+=s.pageYOffset,e[2]+=s.pageXOffset,e[3]+=s.pageYOffset}R.forEach(function(t,o){t=t[0].toUpperCase()+t.substr(1),"Top"===t||"Left"===t?e[o]+=parseFloat(r["border"+t+"Width"]):e[o]-=parseFloat(r["border"+t+"Width"])})}(),e}var w=function(){function t(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,o,i){return o&&t(e.prototype,o),i&&t(e,i),e}}(),C=void 0;"undefined"==typeof C&&(C={modules:[]});var O=null,E=function(){var t=0;return function(){return++t}}(),x={},A=function(){var t=O;t||(t=document.createElement("div"),t.setAttribute("data-tether-id",E()),a(t.style,{top:0,left:0,position:"absolute"}),document.body.appendChild(t),O=t);var o=t.getAttribute("data-tether-id");return"undefined"==typeof x[o]&&(x[o]=e(t),S(function(){delete x[o]})),x[o]},T=[],S=function(t){T.push(t)},P=function(){for(var t=void 0;t=T.pop();)t()},W=function(){function e(){t(this,e)}return w(e,[{key:"on",value:function(t,e,o){var i=!(arguments.length<=3||void 0===arguments[3])&&arguments[3];"undefined"==typeof this.bindings&&(this.bindings={}),"undefined"==typeof this.bindings[t]&&(this.bindings[t]=[]),this.bindings[t].push({handler:e,ctx:o,once:i})}},{key:"once",value:function(t,e,o){this.on(t,e,o,!0)}},{key:"off",value:function(t,e){if("undefined"!=typeof this.bindings&&"undefined"!=typeof this.bindings[t])if("undefined"==typeof e)delete this.bindings[t];else for(var o=0;o<this.bindings[t].length;)this.bindings[t][o].handler===e?this.bindings[t].splice(o,1):++o}},{key:"trigger",value:function(t){if("undefined"!=typeof this.bindings&&this.bindings[t]){for(var e=0,o=arguments.length,i=Array(o>1?o-1:0),n=1;n<o;n++)i[n-1]=arguments[n];for(;e<this.bindings[t].length;){var r=this.bindings[t][e],s=r.handler,a=r.ctx,f=r.once,l=a;"undefined"==typeof l&&(l=this),s.apply(l,i),f?this.bindings[t].splice(e,1):++e}}}}]),e}();C.Utils={getActualBoundingClientRect:e,getScrollParents:o,getBounds:n,getOffsetParent:r,extend:a,addClass:l,removeClass:f,hasClass:h,updateClasses:u,defer:S,flush:P,uniqueId:E,Evented:W,getScrollBarSize:s,removeUtilElements:i};var M=function(){function t(t,e){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(t){n=!0,r=t}finally{try{!i&&a.return&&a.return()}finally{if(n)throw r}}return o}return function(e,o){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,o);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),w=function(){function t(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,o,i){return o&&t(e.prototype,o),i&&t(e,i),e}}(),_=function(t,e,o){for(var i=!0;i;){var n=t,r=e,s=o;i=!1,null===n&&(n=Function.prototype);var a=Object.getOwnPropertyDescriptor(n,r);if(void 0!==a){if("value"in a)return a.value;var f=a.get;if(void 0===f)return;return f.call(s)}var l=Object.getPrototypeOf(n);if(null===l)return;t=l,e=r,o=s,i=!0,a=l=void 0}};if("undefined"==typeof C)throw new Error("You must include the utils.js file before tether.js");var k=C.Utils,o=k.getScrollParents,n=k.getBounds,r=k.getOffsetParent,a=k.extend,l=k.addClass,f=k.removeClass,u=k.updateClasses,S=k.defer,P=k.flush,s=k.getScrollBarSize,i=k.removeUtilElements,B=function(){if("undefined"==typeof document)return"";for(var t=document.createElement("div"),e=["transform","WebkitTransform","OTransform","MozTransform","msTransform"],o=0;o<e.length;++o){var i=e[o];if(void 0!==t.style[i])return i}}(),z=[],Y=function(){z.forEach(function(t){t.position(!1)}),P()};!function(){var t=null,e=null,o=null,i=function i(){return"undefined"!=typeof e&&e>16?(e=Math.min(e-16,250),void(o=setTimeout(i,250))):void("undefined"!=typeof t&&m()-t<10||(null!=o&&(clearTimeout(o),o=null),t=m(),Y(),e=m()-t))};"undefined"!=typeof window&&"undefined"!=typeof window.addEventListener&&["resize","scroll","touchmove"].forEach(function(t){window.addEventListener(t,i)})}();var j={center:"center",left:"right",right:"left"},L={middle:"middle",top:"bottom",bottom:"top"},D={top:0,left:0,middle:"50%",center:"50%",bottom:"100%",right:"100%"},X=function(t,e){var o=t.left,i=t.top;return"auto"===o&&(o=j[e.left]),"auto"===i&&(i=L[e.top]),{left:o,top:i}},F=function(t){var e=t.left,o=t.top;return"undefined"!=typeof D[t.left]&&(e=D[t.left]),"undefined"!=typeof D[t.top]&&(o=D[t.top]),{left:e,top:o}},H=function(t){var e=t.split(" "),o=M(e,2),i=o[0],n=o[1];return{top:i,left:n}},N=H,U=function(e){function h(e){var o=this;t(this,h),_(Object.getPrototypeOf(h.prototype),"constructor",this).call(this),this.position=this.position.bind(this),z.push(this),this.history=[],this.setOptions(e,!1),C.modules.forEach(function(t){"undefined"!=typeof t.initialize&&t.initialize.call(o)}),this.position()}return c(h,e),w(h,[{key:"getClass",value:function(){var t=arguments.length<=0||void 0===arguments[0]?"":arguments[0],e=this.options.classes;return"undefined"!=typeof e&&e[t]?this.options.classes[t]:this.options.classPrefix?this.options.classPrefix+"-"+t:t}},{key:"setOptions",value:function(t){var e=this,i=arguments.length<=1||void 0===arguments[1]||arguments[1],n={offset:"0 0",targetOffset:"0 0",targetAttachment:"auto auto",classPrefix:"tether"};this.options=a(n,t);var r=this.options,s=r.element,f=r.target,h=r.targetModifier;if(this.element=s,this.target=f,this.targetModifier=h,"viewport"===this.target?(this.target=document.body,this.targetModifier="visible"):"scroll-handle"===this.target&&(this.target=document.body,this.targetModifier="scroll-handle"),["element","target"].forEach(function(t){if("undefined"==typeof e[t])throw new Error("Tether Error: Both element and target must be defined");"undefined"!=typeof e[t].jquery?e[t]=e[t][0]:"string"==typeof e[t]&&(e[t]=document.querySelector(e[t]))}),l(this.element,this.getClass("element")),this.options.addTargetClasses!==!1&&l(this.target,this.getClass("target")),!this.options.attachment)throw new Error("Tether Error: You must provide an attachment");this.targetAttachment=N(this.options.targetAttachment),this.attachment=N(this.options.attachment),this.offset=H(this.options.offset),this.targetOffset=H(this.options.targetOffset),"undefined"!=typeof this.scrollParents&&this.disable(),"scroll-handle"===this.targetModifier?this.scrollParents=[this.target]:this.scrollParents=o(this.target),this.options.enabled!==!1&&this.enable(i)}},{key:"getTargetBounds",value:function(){if("undefined"==typeof this.targetModifier)return n(this.target);if("visible"===this.targetModifier){if(this.target===document.body)return{top:pageYOffset,left:pageXOffset,height:innerHeight,width:innerWidth};var t=n(this.target),e={height:t.height,width:t.width,top:t.top,left:t.left};return e.height=Math.min(e.height,t.height-(pageYOffset-t.top)),e.height=Math.min(e.height,t.height-(t.top+t.height-(pageYOffset+innerHeight))),e.height=Math.min(innerHeight,e.height),e.height-=2,e.width=Math.min(e.width,t.width-(pageXOffset-t.left)),e.width=Math.min(e.width,t.width-(t.left+t.width-(pageXOffset+innerWidth))),e.width=Math.min(innerWidth,e.width),e.width-=2,e.top<pageYOffset&&(e.top=pageYOffset),e.left<pageXOffset&&(e.left=pageXOffset),e}if("scroll-handle"===this.targetModifier){var t=void 0,o=this.target;o===document.body?(o=document.documentElement,t={left:pageXOffset,top:pageYOffset,height:innerHeight,width:innerWidth}):t=n(o);var i=getComputedStyle(o),r=o.scrollWidth>o.clientWidth||[i.overflow,i.overflowX].indexOf("scroll")>=0||this.target!==document.body,s=0;r&&(s=15);var a=t.height-parseFloat(i.borderTopWidth)-parseFloat(i.borderBottomWidth)-s,e={width:15,height:.975*a*(a/o.scrollHeight),left:t.left+t.width-parseFloat(i.borderLeftWidth)-15},f=0;a<408&&this.target===document.body&&(f=-11e-5*Math.pow(a,2)-.00727*a+22.58),this.target!==document.body&&(e.height=Math.max(e.height,24));var l=this.target.scrollTop/(o.scrollHeight-a);return e.top=l*(a-e.height-f)+t.top+parseFloat(i.borderTopWidth),this.target===document.body&&(e.height=Math.max(e.height,24)),e}}},{key:"clearCache",value:function(){this._cache={}}},{key:"cache",value:function(t,e){return"undefined"==typeof this._cache&&(this._cache={}),"undefined"==typeof this._cache[t]&&(this._cache[t]=e.call(this)),this._cache[t]}},{key:"enable",value:function(){var t=this,e=arguments.length<=0||void 0===arguments[0]||arguments[0];this.options.addTargetClasses!==!1&&l(this.target,this.getClass("enabled")),l(this.element,this.getClass("enabled")),this.enabled=!0,this.scrollParents.forEach(function(e){e!==t.target.ownerDocument&&e.addEventListener("scroll",t.position)}),e&&this.position()}},{key:"disable",value:function(){var t=this;f(this.target,this.getClass("enabled")),f(this.element,this.getClass("enabled")),this.enabled=!1,"undefined"!=typeof this.scrollParents&&this.scrollParents.forEach(function(e){e.removeEventListener("scroll",t.position)})}},{key:"destroy",value:function(){var t=this;this.disable(),z.forEach(function(e,o){e===t&&z.splice(o,1)}),0===z.length&&i()}},{key:"updateAttachClasses",value:function(t,e){var o=this;t=t||this.attachment,e=e||this.targetAttachment;var i=["left","top","bottom","right","middle","center"];"undefined"!=typeof this._addAttachClasses&&this._addAttachClasses.length&&this._addAttachClasses.splice(0,this._addAttachClasses.length),"undefined"==typeof this._addAttachClasses&&(this._addAttachClasses=[]);var n=this._addAttachClasses;t.top&&n.push(this.getClass("element-attached")+"-"+t.top),t.left&&n.push(this.getClass("element-attached")+"-"+t.left),e.top&&n.push(this.getClass("target-attached")+"-"+e.top),e.left&&n.push(this.getClass("target-attached")+"-"+e.left);var r=[];i.forEach(function(t){r.push(o.getClass("element-attached")+"-"+t),r.push(o.getClass("target-attached")+"-"+t)}),S(function(){"undefined"!=typeof o._addAttachClasses&&(u(o.element,o._addAttachClasses,r),o.options.addTargetClasses!==!1&&u(o.target,o._addAttachClasses,r),delete o._addAttachClasses)})}},{key:"position",value:function(){var t=this,e=arguments.length<=0||void 0===arguments[0]||arguments[0];if(this.enabled){this.clearCache();var o=X(this.targetAttachment,this.attachment);this.updateAttachClasses(this.attachment,o);var i=this.cache("element-bounds",function(){return n(t.element)}),a=i.width,f=i.height;if(0===a&&0===f&&"undefined"!=typeof this.lastSize){var l=this.lastSize;a=l.width,f=l.height}else this.lastSize={width:a,height:f};var h=this.cache("target-bounds",function(){return t.getTargetBounds()}),d=h,p=y(F(this.attachment),{width:a,height:f}),u=y(F(o),d),c=y(this.offset,{width:a,height:f}),g=y(this.targetOffset,d);p=v(p,c),u=v(u,g);for(var m=h.left+u.left-p.left,b=h.top+u.top-p.top,w=0;w<C.modules.length;++w){var O=C.modules[w],E=O.position.call(this,{left:m,top:b,targetAttachment:o,targetPos:h,elementPos:i,offset:p,targetOffset:u,manualOffset:c,manualTargetOffset:g,scrollbarSize:S,attachment:this.attachment});if(E===!1)return!1;"undefined"!=typeof E&&"object"==typeof E&&(b=E.top,m=E.left)}var x={page:{top:b,left:m},viewport:{top:b-pageYOffset,bottom:pageYOffset-b-f+innerHeight,left:m-pageXOffset,right:pageXOffset-m-a+innerWidth}},A=this.target.ownerDocument,T=A.defaultView,S=void 0;return A.body.scrollWidth>T.innerWidth&&(S=this.cache("scrollbar-size",s),x.viewport.bottom-=S.height),A.body.scrollHeight>T.innerHeight&&(S=this.cache("scrollbar-size",s),x.viewport.right-=S.width),["","static"].indexOf(A.body.style.position)!==-1&&["","static"].indexOf(A.body.parentElement.style.position)!==-1||(x.page.bottom=A.body.scrollHeight-b-f,x.page.right=A.body.scrollWidth-m-a),"undefined"!=typeof this.options.optimizations&&this.options.optimizations.moveElement!==!1&&"undefined"==typeof this.targetModifier&&!function(){var e=t.cache("target-offsetparent",function(){return r(t.target)}),o=t.cache("target-offsetparent-bounds",function(){return n(e)}),i=getComputedStyle(e),s=o,a={};if(["Top","Left","Bottom","Right"].forEach(function(t){a[t.toLowerCase()]=parseFloat(i["border"+t+"Width"])}),o.right=A.body.scrollWidth-o.left-s.width+a.right,o.bottom=A.body.scrollHeight-o.top-s.height+a.bottom,x.page.top>=o.top+a.top&&x.page.bottom>=o.bottom&&x.page.left>=o.left+a.left&&x.page.right>=o.right){var f=e.scrollTop,l=e.scrollLeft;x.offset={top:x.page.top-o.top+f-a.top,left:x.page.left-o.left+l-a.left}}}(),this.move(x),this.history.unshift(x),this.history.length>3&&this.history.pop(),e&&P(),!0}}},{key:"move",value:function(t){var e=this;if("undefined"!=typeof this.element.parentNode){var o={};for(var i in t){o[i]={};for(var n in t[i]){for(var s=!1,f=0;f<this.history.length;++f){var l=this.history[f];if("undefined"!=typeof l[i]&&!g(l[i][n],t[i][n])){s=!0;break}}s||(o[i][n]=!0)}}var h={top:"",left:"",right:"",bottom:""},d=function(t,o){var i="undefined"!=typeof e.options.optimizations,n=i?e.options.optimizations.gpu:null;if(n!==!1){var r=void 0,s=void 0;t.top?(h.top=0,r=o.top):(h.bottom=0,r=-o.bottom),t.left?(h.left=0,s=o.left):(h.right=0,s=-o.right),h[B]="translateX("+Math.round(s)+"px) translateY("+Math.round(r)+"px)","msTransform"!==B&&(h[B]+=" translateZ(0)")}else t.top?h.top=o.top+"px":h.bottom=o.bottom+"px",t.left?h.left=o.left+"px":h.right=o.right+"px"},p=!1;if((o.page.top||o.page.bottom)&&(o.page.left||o.page.right)?(h.position="absolute",d(o.page,t.page)):(o.viewport.top||o.viewport.bottom)&&(o.viewport.left||o.viewport.right)?(h.position="fixed",d(o.viewport,t.viewport)):"undefined"!=typeof o.offset&&o.offset.top&&o.offset.left?!function(){h.position="absolute";var i=e.cache("target-offsetparent",function(){return r(e.target)});r(e.element)!==i&&S(function(){e.element.parentNode.removeChild(e.element),i.appendChild(e.element)}),d(o.offset,t.offset),p=!0}():(h.position="absolute",d({top:!0,left:!0},t.page)),!p){for(var u=!0,c=this.element.parentNode;c&&1===c.nodeType&&"BODY"!==c.tagName;){if("static"!==getComputedStyle(c).position){u=!1;break}c=c.parentNode}u||(this.element.parentNode.removeChild(this.element),this.element.ownerDocument.body.appendChild(this.element))}var m={},v=!1;for(var n in h){var y=h[n],b=this.element.style[n];b!==y&&(v=!0,m[n]=y)}v&&S(function(){a(e.element.style,m)})}}}]),h}(W);U.modules=[],C.position=Y;var V=a(U,C),M=function(){function t(t,e){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(t){n=!0,r=t}finally{try{!i&&a.return&&a.return()}finally{if(n)throw r}}return o}return function(e,o){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,o);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),k=C.Utils,n=k.getBounds,a=k.extend,u=k.updateClasses,S=k.defer,R=["left","top","right","bottom"];C.modules.push({position:function(t){var e=this,o=t.top,i=t.left,r=t.targetAttachment;if(!this.options.constraints)return!0;var s=this.cache("element-bounds",function(){return n(e.element)}),f=s.height,l=s.width;if(0===l&&0===f&&"undefined"!=typeof this.lastSize){var h=this.lastSize;l=h.width,f=h.height}var d=this.cache("target-bounds",function(){return e.getTargetBounds()}),p=d.height,c=d.width,g=[this.getClass("pinned"),this.getClass("out-of-bounds")];this.options.constraints.forEach(function(t){var e=t.outOfBoundsClass,o=t.pinnedClass;e&&g.push(e),o&&g.push(o)}),g.forEach(function(t){["left","top","right","bottom"].forEach(function(e){g.push(t+"-"+e)})});var m=[],v=a({},r),y=a({},this.attachment);return this.options.constraints.forEach(function(t){var n=t.to,s=t.attachment,a=t.pin;"undefined"==typeof s&&(s="");var h=void 0,d=void 0;if(s.indexOf(" ")>=0){var u=s.split(" "),g=M(u,2);d=g[0],h=g[1]}else h=d=s;var w=b(e,n);"target"!==d&&"both"!==d||(o<w[1]&&"top"===v.top&&(o+=p,v.top="bottom"),o+f>w[3]&&"bottom"===v.top&&(o-=p,v.top="top")),"together"===d&&("top"===v.top&&("bottom"===y.top&&o<w[1]?(o+=p,v.top="bottom",o+=f,y.top="top"):"top"===y.top&&o+f>w[3]&&o-(f-p)>=w[1]&&(o-=f-p,v.top="bottom",y.top="bottom")),"bottom"===v.top&&("top"===y.top&&o+f>w[3]?(o-=p,v.top="top",o-=f,y.top="bottom"):"bottom"===y.top&&o<w[1]&&o+(2*f-p)<=w[3]&&(o+=f-p,v.top="top",y.top="top")),"middle"===v.top&&(o+f>w[3]&&"top"===y.top?(o-=f,y.top="bottom"):o<w[1]&&"bottom"===y.top&&(o+=f,y.top="top"))),"target"!==h&&"both"!==h||(i<w[0]&&"left"===v.left&&(i+=c,v.left="right"),i+l>w[2]&&"right"===v.left&&(i-=c,v.left="left")),"together"===h&&(i<w[0]&&"left"===v.left?"right"===y.left?(i+=c,v.left="right",i+=l,y.left="left"):"left"===y.left&&(i+=c,v.left="right",i-=l,y.left="right"):i+l>w[2]&&"right"===v.left?"left"===y.left?(i-=c,v.left="left",i-=l,y.left="right"):"right"===y.left&&(i-=c,v.left="left",i+=l,y.left="left"):"center"===v.left&&(i+l>w[2]&&"left"===y.left?(i-=l,y.left="right"):i<w[0]&&"right"===y.left&&(i+=l,y.left="left"))),"element"!==d&&"both"!==d||(o<w[1]&&"bottom"===y.top&&(o+=f,y.top="top"),o+f>w[3]&&"top"===y.top&&(o-=f,y.top="bottom")),"element"!==h&&"both"!==h||(i<w[0]&&("right"===y.left?(i+=l,y.left="left"):"center"===y.left&&(i+=l/2,y.left="left")),i+l>w[2]&&("left"===y.left?(i-=l,y.left="right"):"center"===y.left&&(i-=l/2,y.left="right"))),"string"==typeof a?a=a.split(",").map(function(t){return t.trim()}):a===!0&&(a=["top","left","right","bottom"]),a=a||[];var C=[],O=[];o<w[1]&&(a.indexOf("top")>=0?(o=w[1],C.push("top")):O.push("top")),o+f>w[3]&&(a.indexOf("bottom")>=0?(o=w[3]-f,C.push("bottom")):O.push("bottom")),i<w[0]&&(a.indexOf("left")>=0?(i=w[0],C.push("left")):O.push("left")),i+l>w[2]&&(a.indexOf("right")>=0?(i=w[2]-l,C.push("right")):O.push("right")),C.length&&!function(){var t=void 0;t="undefined"!=typeof e.options.pinnedClass?e.options.pinnedClass:e.getClass("pinned"),m.push(t),C.forEach(function(e){m.push(t+"-"+e)})}(),O.length&&!function(){var t=void 0;t="undefined"!=typeof e.options.outOfBoundsClass?e.options.outOfBoundsClass:e.getClass("out-of-bounds"),m.push(t),O.forEach(function(e){m.push(t+"-"+e)})}(),(C.indexOf("left")>=0||C.indexOf("right")>=0)&&(y.left=v.left=!1),(C.indexOf("top")>=0||C.indexOf("bottom")>=0)&&(y.top=v.top=!1),v.top===r.top&&v.left===r.left&&y.top===e.attachment.top&&y.left===e.attachment.left||(e.updateAttachClasses(y,v),e.trigger("update",{attachment:y,targetAttachment:v}))}),S(function(){e.options.addTargetClasses!==!1&&u(e.target,m,g),u(e.element,m,g)}),{top:o,left:i}}});var k=C.Utils,n=k.getBounds,u=k.updateClasses,S=k.defer;C.modules.push({position:function(t){var e=this,o=t.top,i=t.left,r=this.cache("element-bounds",function(){return n(e.element)}),s=r.height,a=r.width,f=this.getTargetBounds(),l=o+s,h=i+a,d=[];o<=f.bottom&&l>=f.top&&["left","right"].forEach(function(t){var e=f[t];e!==i&&e!==h||d.push(t)}),i<=f.right&&h>=f.left&&["top","bottom"].forEach(function(t){var e=f[t];e!==o&&e!==l||d.push(t)});var p=[],c=[],g=["left","top","right","bottom"];return p.push(this.getClass("abutted")),g.forEach(function(t){p.push(e.getClass("abutted")+"-"+t)}),d.length&&c.push(this.getClass("abutted")),d.forEach(function(t){c.push(e.getClass("abutted")+"-"+t)}),S(function(){e.options.addTargetClasses!==!1&&u(e.target,c,p),u(e.element,c,p)}),!0}});var M=function(){function t(t,e){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(t){n=!0,r=t}finally{try{!i&&a.return&&a.return()}finally{if(n)throw r}}return o}return function(e,o){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,o);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();return C.modules.push({position:function(t){var e=t.top,o=t.left;if(this.options.shift){var i=this.options.shift;"function"==typeof this.options.shift&&(i=this.options.shift.call(this,{top:e,left:o}));var n=void 0,r=void 0;if("string"==typeof i){i=i.split(" "),i[1]=i[1]||i[0];var s=i,a=M(s,2);n=a[0],r=a[1],n=parseFloat(n,10),r=parseFloat(r,10)}else n=i.top,r=i.left;return e+=n,o+=r,{top:e,left:o}}}}),V}();
  var Drop=function(t){"use strict";function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function o(t){var e=t.split(" "),n=a(e,2),o=n[0],i=n[1];if(["left","right"].indexOf(o)>=0){var s=[i,o];o=s[0],i=s[1]}return[o,i].join(" ")}function i(t,e){for(var n=void 0,o=[];(n=t.indexOf(e))!==-1;)o.push(t.splice(n,1));return o}function s(){var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],u=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return new(r.apply(m,[null].concat(e)))};p(u,{createContext:s,drops:[],defaults:{}});var g={classPrefix:"drop",defaults:{position:"bottom left",openOn:"click",beforeClose:null,constrainToScrollParent:!0,constrainToWindow:!0,classes:"",remove:!1,openDelay:0,closeDelay:50,focusDelay:null,blurDelay:null,hoverOpenDelay:null,hoverCloseDelay:null,tetherOptions:{}}};p(u,g,a),p(u.defaults,g.defaults,a.defaults),"undefined"==typeof P[u.classPrefix]&&(P[u.classPrefix]=[]),u.updateBodyClasses=function(){for(var t=!1,e=P[u.classPrefix],n=e.length,o=0;o<n;++o)if(e[o].isOpened()){t=!0;break}t?c(document.body,u.classPrefix+"-open"):d(document.body,u.classPrefix+"-open")};var m=function(s){function r(t){if(e(this,r),h(Object.getPrototypeOf(r.prototype),"constructor",this).call(this),this.options=p({},u.defaults,t),this.target=this.options.target,"undefined"==typeof this.target)throw new Error("Drop Error: You must provide a target.");var n="data-"+u.classPrefix,o=this.target.getAttribute(n);o&&null==this.options.content&&(this.options.content=o);for(var i=["position","openOn"],s=0;s<i.length;++s){var a=this.target.getAttribute(n+"-"+i[s]);a&&null==this.options[i[s]]&&(this.options[i[s]]=a)}this.options.classes&&this.options.addTargetClasses!==!1&&c(this.target,this.options.classes),u.drops.push(this),P[u.classPrefix].push(this),this._boundEvents=[],this.bindMethods(),this.setupElements(),this.setupEvents(),this.setupTether()}return n(r,s),l(r,[{key:"_on",value:function(t,e,n){this._boundEvents.push({element:t,event:e,handler:n}),t.addEventListener(e,n)}},{key:"bindMethods",value:function(){this.transitionEndHandler=this._transitionEndHandler.bind(this)}},{key:"setupElements",value:function(){var t=this;if(this.drop=document.createElement("div"),c(this.drop,u.classPrefix),this.options.classes&&c(this.drop,this.options.classes),this.content=document.createElement("div"),c(this.content,u.classPrefix+"-content"),"function"==typeof this.options.content){var e=function(){var e=t.options.content.call(t,t);if("string"==typeof e)t.content.innerHTML=e;else{if("object"!=typeof e)throw new Error("Drop Error: Content function should return a string or HTMLElement.");t.content.innerHTML="",t.content.appendChild(e)}};e(),this.on("open",e.bind(this))}else"object"==typeof this.options.content?this.content.appendChild(this.options.content):this.content.innerHTML=this.options.content;this.drop.appendChild(this.content)}},{key:"setupTether",value:function(){var e=this.options.position.split(" ");e[0]=E[e[0]],e=e.join(" ");var n=[];this.options.constrainToScrollParent?n.push({to:"scrollParent",pin:"top, bottom",attachment:"together none"}):n.push({to:"scrollParent"}),this.options.constrainToWindow!==!1?n.push({to:"window",attachment:"together"}):n.push({to:"window"});var i={element:this.drop,target:this.target,attachment:o(e),targetAttachment:o(this.options.position),classPrefix:u.classPrefix,offset:"0 0",targetOffset:"0 0",enabled:!1,constraints:n,addTargetClasses:this.options.addTargetClasses};this.options.tetherOptions!==!1&&(this.tether=new t(p({},i,this.options.tetherOptions)))}},{key:"setupEvents",value:function(){var t=this;if(this.options.openOn){if("always"===this.options.openOn)return void setTimeout(this.open.bind(this));var e=this.options.openOn.split(" ");if(e.indexOf("click")>=0)for(var n=function(e){t.toggle(e),e.preventDefault()},o=function(e){t.isOpened()&&(e.target===t.drop||t.drop.contains(e.target)||e.target===t.target||t.target.contains(e.target)||t.close(e))},i=0;i<y.length;++i){var s=y[i];this._on(this.target,s,n),this._on(document,s,o)}var r=null,a=null,l=function(e){null!==a?clearTimeout(a):r=setTimeout(function(){t.open(e),r=null},("focus"===e.type?t.options.focusDelay:t.options.hoverOpenDelay)||t.options.openDelay)},h=function(e){null!==r?clearTimeout(r):a=setTimeout(function(){t.close(e),a=null},("blur"===e.type?t.options.blurDelay:t.options.hoverCloseDelay)||t.options.closeDelay)};e.indexOf("hover")>=0&&(this._on(this.target,"mouseover",l),this._on(this.drop,"mouseover",l),this._on(this.target,"mouseout",h),this._on(this.drop,"mouseout",h)),e.indexOf("focus")>=0&&(this._on(this.target,"focus",l),this._on(this.drop,"focus",l),this._on(this.target,"blur",h),this._on(this.drop,"blur",h))}}},{key:"isOpened",value:function(){if(this.drop)return f(this.drop,u.classPrefix+"-open")}},{key:"toggle",value:function(t){this.isOpened()?this.close(t):this.open(t)}},{key:"open",value:function(t){var e=this;this.isOpened()||(this.drop.parentNode||document.body.appendChild(this.drop),"undefined"!=typeof this.tether&&this.tether.enable(),c(this.drop,u.classPrefix+"-open"),c(this.drop,u.classPrefix+"-open-transitionend"),setTimeout(function(){e.drop&&c(e.drop,u.classPrefix+"-after-open")}),"undefined"!=typeof this.tether&&this.tether.position(),this.trigger("open"),u.updateBodyClasses())}},{key:"_transitionEndHandler",value:function(t){t.target===t.currentTarget&&(f(this.drop,u.classPrefix+"-open")||d(this.drop,u.classPrefix+"-open-transitionend"),this.drop.removeEventListener(b,this.transitionEndHandler))}},{key:"beforeCloseHandler",value:function(t){var e=!0;return this.isClosing||"function"!=typeof this.options.beforeClose||(this.isClosing=!0,e=this.options.beforeClose(t,this)!==!1),this.isClosing=!1,e}},{key:"close",value:function(t){this.isOpened()&&this.beforeCloseHandler(t)&&(d(this.drop,u.classPrefix+"-open"),d(this.drop,u.classPrefix+"-after-open"),this.drop.addEventListener(b,this.transitionEndHandler),this.trigger("close"),"undefined"!=typeof this.tether&&this.tether.disable(),u.updateBodyClasses(),this.options.remove&&this.remove(t))}},{key:"remove",value:function(t){this.close(t),this.drop.parentNode&&this.drop.parentNode.removeChild(this.drop)}},{key:"position",value:function(){this.isOpened()&&"undefined"!=typeof this.tether&&this.tether.position()}},{key:"destroy",value:function(){this.remove(),"undefined"!=typeof this.tether&&this.tether.destroy();for(var t=0;t<this._boundEvents.length;++t){var e=this._boundEvents[t],n=e.element,o=e.event,s=e.handler;n.removeEventListener(o,s)}this._boundEvents=[],this.tether=null,this.drop=null,this.content=null,this.target=null,i(P[u.classPrefix],this),i(u.drops,this)}}]),r}(v);return u}var r=Function.prototype.bind,a=function(){function t(t,e){var n=[],o=!0,i=!1,s=void 0;try{for(var r,a=t[Symbol.iterator]();!(o=(r=a.next()).done)&&(n.push(r.value),!e||n.length!==e);o=!0);}catch(t){i=!0,s=t}finally{try{!o&&a.return&&a.return()}finally{if(i)throw s}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),l=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),h=function(t,e,n){for(var o=!0;o;){var i=t,s=e,r=n;o=!1,null===i&&(i=Function.prototype);var a=Object.getOwnPropertyDescriptor(i,s);if(void 0!==a){if("value"in a)return a.value;var l=a.get;if(void 0===l)return;return l.call(r)}var h=Object.getPrototypeOf(i);if(null===h)return;t=h,e=s,n=r,o=!0,a=h=void 0}},u=t.Utils,p=u.extend,c=u.addClass,d=u.removeClass,f=u.hasClass,v=u.Evented,y=["click"];"ontouchstart"in document.documentElement&&y.push("touchstart");var g={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"},b="";for(var m in g)if({}.hasOwnProperty.call(g,m)){var O=document.createElement("p");"undefined"!=typeof O.style[m]&&(b=g[m])}var E={left:"right",right:"left",top:"bottom",bottom:"top",middle:"middle",center:"center"},P={},x=s();return document.addEventListener("DOMContentLoaded",function(){x.updateBodyClasses()}),x}(Tether);
  var _Drop = Drop.createContext({
    classPrefix: 'ezra'
  });
  var bibleRefReader = new BibleRefReader();
  ezraLinkifier.linkify = function (element) {
    var textNodes = getTextNodesIn(element);
    for (var i = 0; i < textNodes.length; i++) {
      if (textNodes[i].parentNode.nodeName !== 'A') {
        var linkifiedNodes = bibleRefReader.linkify(textNodes[i].nodeValue);
        var hasLink = linkifiedNodes.some(function (node) {
          return node.nodeName === 'A';
        });
        if (hasLink) {
          replaceWithNodes(textNodes[i], linkifiedNodes);
        }
      }
    }
    var ezraLinks = element.querySelectorAll('.ezraBibleRefLink');
    for (var i = 0; i < ezraLinks.length; i++) {
      var link = ezraLinks[i];
      var ref = link.getAttribute('ezra-ref');
      if (ref !== null) {
        createDrop(link, ref);
      }
      else {
        // there should be something wrong if ref is null
        // maybe there is a link inserted manually but ezra-ref is missing
        // consider adding some notice for the site owner
      }
    }
  };

  function createDrop(link, refText) {
    var drop = new _Drop({
      classes: 'ezra-theme-arrows',
      target: link,
      content: document.createTextNode(refText),
      openOn: 'hover',
      constrainToScrollParent: false,
      tetherOptions: {
        constraints: [
          {
            to: 'window',
            attachment: 'together',
            pin: ['left', 'right']
          }
        ]
      }
    });
    drop.on('open', function () {
      var linkSize = window.getComputedStyle(this.target).fontSize;
      this.content.style.fontSize = linkSize;
      var ref = bibleRefReader.readRef(refText);
      ref.getBibleTextWithRef(function (text) {
        drop.content.innerText = text;
        drop.content.innerHTML += '<div class="ezraBibleRefSeperator"></div>'
          + '<div class="ezraBibleRefFooter"><a href="https://kenhung.github.io/Ezra/" target="_blank">Powered by Ezra</a></div>';
        drop.position();
      });
    });
  }

  // added for unit testing
  ezraLinkifier._BibleRefReader = BibleRefReader;
  ezraLinkifier._AbbrResolver = AbbrResolver;
  ezraLinkifier._ChineseNumParser = ChineseNumParser;

  function BibleRefReader() {
    var abbrResolver = new AbbrResolver();
    var chiNumParser = new ChineseNumParser();
    function bibleRefExp(exp, flags) {
      return new RegExp(exp
        .replace('{B}', abbrResolver.bibleBooks)
        .replace('{C}', '第?[' + chiNumParser.supportedChars + ']+|\\d+\\s*[{:}]')
        .replace('{S}', '\\s{:}第')
        .replace('{V}', '[{,}{-}{;}{VE}\\s\\d]*\\d')
        .replace(/{:}/g, ':：︰篇章')
        .replace('{,}', ',，、和及')
        .replace('{-}', '\\-─–－—~～〜至')
        .replace(/{VE}/g, '節节')
        .replace(/{;}/g, ';；'), flags || '');
    }
    var bibleRef = bibleRefExp('({B})?\\s?({C})[{S}]*({V})[{VE}]?', 'g');
    this.linkify = function (text) {
      // different bible referance formats are handled: 約1:1 約1:1,2 約1:1;2 約1:2,3:4 約1:2;3:4
      var linkifiedNodes = [];
      var match;
      var lastBook = '';
      var lastIndex = 0;
      while ((match = bibleRef.exec(text)) !== null) {
        var ref = match[0];
        // check if verses accidently matched the next bilble reference
        // for referances like "約1:2,3:4", the match is "約1:2,3", the ",3" should not be counted as match  
        var strAfterMatch = text.substring(bibleRef.lastIndex); // ":4" in the example
        var verses = match[3].match(/\d+/g); // [2, 3] in the example
        if (strAfterMatch.search(bibleRefExp('\\s*[{:}]{V}')) === 0 && verses.length > 1) {
          var realRef = trimLast(ref, bibleRefExp('[{,}{;}\\s]+' + verses[verses.length - 1]));
          bibleRef.lastIndex -= (ref.length - realRef.length);
          ref = realRef;
        }
        var book = match[1];
        if (book !== undefined || lastBook !== '') {
          var titleRef = book !== undefined ? ref : lastBook + ref;
          var link = document.createElement('a');
          link.setAttribute('ezra-ref', '載入中...(' + titleRef + ')');
          link.className = 'ezraBibleRefLink';
          link.innerText = ref;
        }
        else {
          // if no book is provided (e.g. 4:11), there will be no link created
        }
        var strBeforeMatch = text.substring(lastIndex, match.index);
        linkifiedNodes.push(document.createTextNode(strBeforeMatch));
        linkifiedNodes.push(link || document.createTextNode(ref));
        lastBook = book || lastBook;
        lastIndex = bibleRef.lastIndex;
      }
      linkifiedNodes.push(document.createTextNode(text.substring(lastIndex)));
      return linkifiedNodes;
    };
    function trimLast(ref, regex) {
      // preconditions: at least one match
      var matches = ref.match(regex);
      var newIndex = ref.lastIndexOf(matches[matches.length - 1]);
      return ref.substring(0, newIndex);
    }
    this.readRef = function (ref) {
      // preconditions: ref must contains a full bible referance
      var match = bibleRefExp('({B})\\s?({C})[{S}]*({V})').exec(ref);
      if (match !== null) {
        return new BibleRef(
          abbrResolver.toAbbr(match[1]),
          chiNumParser.parse(match[2].replace(bibleRefExp('[{:}\\s]', 'g'), '')),
          this.readVers(match[3]));
      }
      else {
        return null;
      }
    };
    this.readVers = function (vers) {
      return vers
        .replace(bibleRefExp('[{-}]', 'g'), '-')
        .replace(bibleRefExp('[{,}]', 'g'), ',')
        .replace(bibleRefExp('[{VE}\\s]', 'g'), '');
    };
  }

  function ChineseNumParser() {
    var numVal = { '○': 0, 零: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
    var expVal = { 十: 10, 廿: 20, 卅: 30, 卌: 40, 百: 100 };
    var nums = Object.keys(numVal);
    var exps = Object.keys(expVal);
    this.supportedChars = nums.concat(exps).join('');
    this.parse = function (num) {
      if (!isNaN(num)) {
        return +num;
      }
      else {
        if (contiansExp(num)) {
          var acc = [];
          for (var i = 0; i < num.length; i++) {
            var n = num[i];
            if (isExp(n)) {
              if (acc.length === 0) {
                acc.push(1);
              }
              acc[acc.length - 1] *= expVal[n];
            } else {
              acc.push(numVal[n] || 0);
            }
          }
          return sumOf(acc);
        }
        else {
          var intStr = num.split('').map(function (n) { return numVal[n]; }).join('');
          return parseInt(intStr, 10);
        }
      }
    };
    function contiansExp(num) {
      for (var i = 0; i < num.length; i++) {
        if (expVal[num[i]]) {
          return true;
        }
      }
      return false;
    }
    function isExp(num) { return expVal[num] ? true : false; }
    function sumOf(nums) {
      var sum = 0;
      for (var i = 0; i < nums.length; i++) {
        sum += nums[i];
      }
      return sum;
    }
  }

  function BibleRef(abbr, chap, vers) {
    this.abbr = abbr;
    this.chap = chap;
    this.vers = vers;
    var refText = '(' + abbr + ' ' + chap + ':' + vers + ')';
    this.getBibleTextWithRef = function (success, fail) {
      this.getBibleText(function (bibleText) {
        success(bibleText + refText);
      }, fail || success);
    };
    this.getBibleText = function (success, fail) {
      BibleRef.versesCache = BibleRef.versesCache || {};
      var cache = BibleRef.versesCache;
      if (cache.hasOwnProperty(refText)) {
        success(cache[refText]);
      } else {
        getBibleTextFromFHL(function (text) {
          cache[refText] = text;
          success(text);
        }, fail || success);
      }
    };
    // the returning text will be the parameter of both success and fail callback
    var getBibleTextFromFHL = function (success, fail) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status !== 200) {
          fail('未能查訽經文: XHR status = ' + xhr.status);
          return;
        }
        try {
          var resp = JSON.parse(xhr.responseText);
          if (resp.status !== 'success') {
            fail('未能查訽經文: FHL response text = ' + xhr.responseText);
            return;
          } else if (resp.record.length === 0) {
            fail('找不到記錄！是不是聖經中沒有這章節' + refText + '？');
            return;
          }
          var versesText = '';
          var lastSec = 0;
          for (var i = 0; i < resp.record.length; i++) {
            var record = resp.record[i];
            if (i > 0 && record.sec > lastSec + 1) {
              versesText += '⋯⋯';
            }
            lastSec = record.sec;
            versesText += record.bible_text;
          }
          success(versesText);
        } catch (err) {
          fail('未能查訽經文: ' + err);
        }
      };
      xhr.onerror = function () {
        fail('無法連上伺服器。');
      };
      try {
        xhr.open('GET', 'https://bible.fhl.net/json/qb.php?chineses=' + abbr + '&chap=' + chap + '&sec=' + vers, true);
        xhr.send();
      }
      catch (err) {
        fail('未能查訽經文: ' + err);
      }
    };
  }

  ezraLinkifier.lang = 'zh-hk';

  function AbbrResolver() {
    // traditional Chinese and simplified Chinese parser cannot exist at the same time,
    // because words like '出', '利', '伯' can both be traditional or simplified Chinese
    var abbr = {
      創世記: '創',
      出埃及記: '出',
      利未記: '利',
      民數記: '民',
      申命記: '申',
      約書亞記: '書',
      士師記: '士',
      路得記: '得',
      撒母耳記上: '撒上',
      撒母耳記下: '撒下',
      列王紀上: '王上',
      列王紀下: '王下',
      歷代志上: '代上',
      歷代志下: '代下',
      以斯拉記: '拉',
      尼希米記: '尼',
      以斯帖記: '斯',
      約伯記: '伯',
      詩篇: '詩',
      箴言: '箴',
      傳道書: '傳',
      雅歌: '歌',
      以賽亞書: '賽',
      耶利米書: '耶',
      耶利米哀歌: '哀',
      以西結書: '結',
      但以理書: '但',
      何西阿書: '何',
      約珥書: '珥',
      阿摩司書: '摩',
      俄巴底亞書: '俄',
      約拿書: '拿',
      彌迦書: '彌',
      那鴻書: '鴻',
      哈巴谷書: '哈',
      西番雅書: '番',
      哈該書: '該',
      撒迦利亞書: '亞',
      瑪拉基書: '瑪',
      馬太福音: '太',
      馬可福音: '可',
      路加福音: '路',
      約翰福音: '約',
      使徒行傳: '徒',
      羅馬書: '羅',
      哥林多前書: '林前',
      哥林多後書: '林後',
      加拉太書: '加',
      以弗所書: '弗',
      腓立比書: '腓',
      歌羅西書: '西',
      帖撒羅尼迦前書: '帖前',
      帖撒羅尼迦後書: '帖後',
      提摩太前書: '提前',
      提摩太後書: '提後',
      提多書: '多',
      腓利門書: '門',
      希伯來書: '來',
      雅各書: '雅',
      彼得前書: '彼前',
      彼得後書: '彼後',
      約翰壹書: '約一',
      約翰貳書: '約二',
      約翰參書: '約三',
      猶大書: '猶',
      啟示錄: '啟',

      哥前: '林前',
      哥後: '林後',
      歌前: '林前',
      歌後: '林後',
      希: '來',
      約翰一書: '約一',
      約翰二書: '約二',
      約翰三書: '約三',
      約壹: '約一',
      約貳: '約二',
      約參: '約三',
      啓示錄: '啟',
      啓: '啟',

      创: '創',
      书: '書',
      诗: '詩',
      传: '傳',
      赛: '賽',
      结: '結',
      弥: '彌',
      鸿: '鴻',
      该: '該',
      亚: '亞',
      玛: '瑪',
      约: '約',
      罗: '羅',
      林后: '林後',
      帖后: '帖後',
      提后: '提後',
      门: '門',
      来: '來',
      彼后: '彼後',
      约一: '約一',
      约二: '約二',
      约三: '約三',
      犹: '猶',
      启: '啟',

      哥后: '林後',
      歌后: '林後',
      约翰一书: '約一',
      约翰二书: '約二',
      约翰三书: '約三',
      约壹: '約一',
      约贰: '約二',
      约参: '約三'
    };
    var books = Object.keys(abbr);
    var descending = function (a, b) { return b.length - a.length; };
    // sort by length descending, such that match of "約" will not override "約一"
    var abbrs = books.map(function (book) { return abbr[book]; }).sort(descending);
    this.bibleBooks = books.concat(abbrs).join('|');
    this.toAbbr = function (book) { return abbr[book] || book; };
  }

  function getTextNodesIn(node) {
    var textNodes = [];
    function getTextNodes(node) {
      if (node.nodeType == 3) {
        textNodes.push(node);
      } else {
        for (var i = 0; i < node.childNodes.length; i++) {
          getTextNodes(node.childNodes[i]);
        }
      }
    }
    getTextNodes(node);
    return textNodes;
  }

  function replaceWithNodes(oldNode, newNodes) {
    for (var i = newNodes.length - 1; i > 0; i--) {
      oldNode.parentNode.insertBefore(newNodes[i], oldNode.nextSibling);
    }
    oldNode.parentNode.replaceChild(newNodes[0], oldNode);
  }
} (window.ezraLinkifier = window.ezraLinkifier || {}));