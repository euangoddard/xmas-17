webpackJsonp([0],{"7BpW":function(t){t.exports={day:"day__1Bqpt",background:"background__ZCkI0",label:"label__2BtRs",cover:"cover__1Xjgy",box:"box__1tRXU","day-1":"day-1__2EG-K","day-2":"day-2__3Oo5u","day-3":"day-3__2vj-l","day-4":"day-4__1qI6D","day-5":"day-5__xskGj","day-6":"day-6__2R5id","day-7":"day-7__2soa2","day-8":"day-8__39qBf","day-9":"day-9__1FzKA","day-10":"day-10__27Swe","day-11":"day-11__3ZVbK","day-12":"day-12__3TVDU","day-13":"day-13__3pyPw","day-14":"day-14__2Mh4g","day-15":"day-15__2xpaW","day-16":"day-16__JYukD","day-17":"day-17__2PY85","day-18":"day-18__3uIzv","day-19":"day-19__1NwZN","day-20":"day-20__1ABKp","day-21":"day-21__2vIKC","day-22":"day-22__1jVub","day-23":"day-23__3rQy8","day-24":"day-24__2bScc","day-25":"day-25__3oINU"}},"Jt/k":function(t,e,n){"use strict";function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function f(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function d(t){var e=void 0;if("touches"in t)try{e=t.changedTouches[0].clientX}catch(e){console.log(t)}else e=t.clientX;return e}function y(t,e,n){return Math.min(Math.max(t,e),n)}Object.defineProperty(e,"__esModule",{value:!0});var l=n("KM04"),p=n("Lglr"),h=n.n(p),_=n("7BpW"),b=n.n(_),g=function(t){function e(){return o(this,t.apply(this,arguments))}return r(e,t),e.prototype.render=function(t){var e=t.day,n=t.offsetX,o=e%2==0?b.a.cover:b.a.box,r=b.a["day-"+(e+1)];return Object(l.h)("div",{class:b.a.day+" "+o+" "+r},Object(l.h)("h1",{class:b.a.label},e+1),Object(l.h)("div",{class:b.a.background,style:this.getStyle(e,n)}))},e.prototype.getStyle=function(t,e){if("undefined"==typeof window)return{};var n=20*e/window.innerWidth;if(20<Math.abs(n))return{};var o=void 0;return o=t%2==0?"translate3d("+n+"%, 0, 0)":"rotateY("+n+"deg)",{transform:o}},e}(l.Component),v=n("yQ52"),w=n.n(v),O=function(t){function e(){return a(this,e),i(this,t.apply(this,arguments))}return s(e,t),e.prototype.render=function(t){var e=t.offsetX;return Object(l.h)("div",{class:w.a.intro},Object(l.h)("div",{style:this.getStyles(e)},"Scroll to start your advent adventure..."))},e.prototype.getStyles=function(t){if("undefined"==typeof window)return{};var e=t/window.innerWidth;return{transform:"translate3d("+1.5*t+"px, 0, "+100*e*-1.5+"px)",opacity:1-e}},e}(l.Component);n.d(e,"default",function(){return D});var j=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),m=void 0;m="undefined"==typeof window?{innerWidth:1200}:window;var D=function(t){function e(){var n,o,r;c(this,e);for(var a=arguments.length,i=Array(a),s=0;s<a;s++)i[s]=arguments[s];return n=o=u(this,t.call.apply(t,[this].concat(i))),o.state={isMouseDown:!1,x:0,offsetX:0,trackingPoints:[],decVelX:0},o.startDrag=function(t){var e=d(t);o.setState({isMouseDown:!0,x:e,trackingPoints:[]})},o.endDrag=function(t){var e=d(t);o.addTrackingPoint(e),o.setState({isMouseDown:!1}),o.startDeceleration()},o.drag=function(t){if(o.state.isMouseDown){var e=d(t);o.addTrackingPoint(e);var n=o.state.x-e;o.setState({x:e}),o.updateOffset(n)}},o.scroll=function(t){t.preventDefault(),o.updateOffset(t.deltaX+t.deltaY)},r=n,u(o,r)}return f(e,t),e.prototype.render=function(t,e){return Object(l.h)("div",{class:"fullscreen container",onTouchStart:this.startDrag,onTouchEnd:this.endDrag,onTouchMove:this.drag,onMouseDown:this.startDrag,onMouseUp:this.endDrag,onMouseMove:this.drag,onMouseWheel:this.scroll,onMouseLeave:this.endDrag},Object(l.h)("div",{class:"fullscreen "+h.a.days+" "+this.grabbingClass,style:this.getTransform(e)},Object(l.h)(O,{offsetX:e.offsetX}),this.renderDays(e.offsetX)))},e.prototype.addTrackingPoint=function(t){for(var e=Date.now(),n=[].concat(this.state.trackingPoints);n.length>0&&!(e-n[0].time<=100);)n.shift();n.push({x:t,time:e}),this.setState({trackingPoints:n})},e.prototype.updateOffset=function(t){this.setState({offsetX:y(this.state.offsetX+t,0,25*m.innerWidth)})},e.prototype.getTransform=function(t){return{transform:"translate3d("+-1*t.offsetX+"px, 0, 0)"}},e.prototype.renderDays=function(t){for(var e=[],n=m.innerWidth,o=0;o<25;o++){var r=t-n*(o+1);e.push(Object(l.h)(g,{day:o,offsetX:r}))}return e},e.prototype.startDeceleration=function(){var t=this.state.trackingPoints,e=t[0],n=t[t.length-1],o=n.x-e.x,r=n.time-e.time,a=r/15,i=o/a||0,s=!1;Math.abs(i)>1&&(s=!0,requestAnimationFrame(this.stepDeceleration.bind(this))),this.setState({decelerating:s,decVelX:i})},e.prototype.stepDeceleration=function(){if(this.state.decelerating){var t=.95*this.state.decVelX;Math.abs(t)>.3?(this.updateOffset(-1*t),requestAnimationFrame(this.stepDeceleration.bind(this)),this.setState({decVelX:t})):this.setState({decelerating:!1})}},j(e,[{key:"grabbingClass",get:function(){return this.state.isMouseDown?h.a.grabbing:""}}]),e}(l.Component)},Lglr:function(t){t.exports={days:"days__zCUeF",grabbing:"grabbing__3ik7x"}},yQ52:function(t){t.exports={intro:"intro__3V96J"}}});
//# sourceMappingURL=route-home.chunk.53382.js.map