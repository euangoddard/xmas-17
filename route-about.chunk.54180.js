webpackJsonp([1],{HgQI:function(t){t.exports={about:"about__QyXyn",centred:"centred__19Psa"}},Uj4f:function(t,e,r){"use strict";function n(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),r.d(e,"default",function(){return b});var a=r("KM04"),c=(r.n(a),r("sw5u")),i=(r.n(c),r("HgQI")),s=r.n(i),u=Object(a.h)("h1",null,"About this card"),l=Object(a.h)("p",null,"This card was created by ",Object(a.h)("a",{href:"https://github.com/euangoddard",target:"_blank"},"Euan Goddard")," to celebrate Christmas 2017 and to learn ",Object(a.h)("a",{href:"https://preactjs.com/",target:"_blank"},"Preact"),". It is available as an installed progressive web app (i.e. works offline) – this was achieved using ",Object(a.h)("a",{href:"https://github.com/developit/preact-cli",target:"_blank"},"Preact CLI"),". The source code is available ",Object(a.h)("a",{href:"https://github.com/euangoddard/xmas-17",target:"_blank"},"on github"),"."),p=Object(a.h)("p",null,"All images were obtained from the marvellous ",Object(a.h)("a",{href:"https://unsplash.com/search/photos/christmas",target:"_blank"},"Unsplash")," collection of free images."),h=Object(a.h)("h2",null,"Merry Christmas and a Happy 2018!"),f=Object(a.h)(c.Link,{href:"/",class:"link-button"},"Back to the card"),b=function(t){function e(){return n(this,t.apply(this,arguments))}return o(e,t),e.prototype.render=function(){return console.log(s.a),Object(a.h)("div",{class:s.a.about},u,l,p,h,Object(a.h)("p",{class:s.a.centred},f))},e}(a.Component)},sw5u:function(t,e,r){"use strict";function n(t,e){var r={};for(var n in t)e.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(r[n]=t[n]);return r}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.Link=e.Match=void 0;var c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},i=r("KM04"),s=r("/QC5"),u=e.Match=function(t){function e(){for(var e,r,n,a=arguments.length,c=Array(a),i=0;i<a;i++)c[i]=arguments[i];return e=r=o(this,t.call.apply(t,[this].concat(c))),r.update=function(t){r.nextUrl=t,r.setState({})},n=e,o(r,n)}return a(e,t),e.prototype.componentDidMount=function(){s.subscribers.push(this.update)},e.prototype.componentWillUnmount=function(){s.subscribers.splice(s.subscribers.indexOf(this.update)>>>0,1)},e.prototype.render=function(t){var e=this.nextUrl||(0,s.getCurrentUrl)(),r=e.replace(/\?.+$/,"");return this.nextUrl=null,t.children[0]&&t.children[0]({url:e,path:r,matches:r===t.path})},e}(i.Component),l=function(t){var e=t.activeClassName,r=t.path,o=n(t,["activeClassName","path"]);return(0,i.h)(u,{path:r||o.href},function(t){var r=t.matches;return(0,i.h)(s.Link,c({},o,{class:[o.class||o.className,r&&e].filter(Boolean).join(" ")}))})};e.Link=l,e.default=u,u.Link=l}});
//# sourceMappingURL=route-about.chunk.54180.js.map