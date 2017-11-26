module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	if (opts === void 0) opts = EMPTY$1;

	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	var aAttr = a.attributes || EMPTY$1,
	    bAttr = b.attributes || EMPTY$1;
	if (aAttr.default) {
		return 1;
	}
	if (bAttr.default) {
		return -1;
	}
	var diff = rank(aAttr.path) - rank(bAttr.path);
	return diff || aAttr.path.length - bAttr.path.length;
}

function segmentize(url) {
	return strip(url).split('/');
}

function rank(url) {
	return (strip(url).match(/\/+/g) || '').length;
}

function strip(url) {
	return url.replace(/(^\/+|\/+$)/g, '');
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				return routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.slice().sort(pathRankSort).map(function (vnode) {
			var attrs = vnode.attributes || {},
			    path = attrs.path,
			    matches = exec(url, path, attrs);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
			return false;
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["default"] = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ "7BpW":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"day":"day__1Bqpt","background":"background__ZCkI0","label":"label__2BtRs","guard":"guard__UXw_u","opened":"opened__3r8E_","cover":"cover__1Xjgy","box":"box__1tRXU","day-1":"day-1__2EG-K","day-2":"day-2__3Oo5u","day-3":"day-3__2vj-l","day-4":"day-4__1qI6D","day-5":"day-5__xskGj","day-6":"day-6__2R5id","day-7":"day-7__2soa2","day-8":"day-8__39qBf","day-9":"day-9__1FzKA","day-10":"day-10__27Swe","day-11":"day-11__3ZVbK","day-12":"day-12__3TVDU","day-13":"day-13__3pyPw","day-14":"day-14__2Mh4g","day-15":"day-15__2xpaW","day-16":"day-16__JYukD","day-17":"day-17__2PY85","day-18":"day-18__3uIzv","day-19":"day-19__1NwZN","day-20":"day-20__1ABKp","day-21":"day-21__2vIKC","day-22":"day-22__1jVub","day-23":"day-23__3rQy8","day-24":"day-24__2bScc","day-25":"day-25__3oINU"};

/***/ }),

/***/ "HgQI":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"about":"about__QyXyn","centred":"centred__19Psa"};

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/index.scss
var style = __webpack_require__("yY49");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ../node_modules/preact-router/dist/preact-router.es.js
var preact_router_es = __webpack_require__("/QC5");

// EXTERNAL MODULE: ./routes/home/style.scss
var home_style = __webpack_require__("Lglr");
var home_style_default = /*#__PURE__*/__webpack_require__.n(home_style);

// EXTERNAL MODULE: ./components/day/style.scss
var day_style = __webpack_require__("7BpW");
var day_style_default = /*#__PURE__*/__webpack_require__.n(day_style);

// CONCATENATED MODULE: ./utils/date.js
var TIME_SUFFIXES = ['w', 'd', 'h', 'm', 's', 'ms'];

function isFutureDate(date) {
  return date - new Date() > 0;
}

function formatDateDelta(delta) {
  var timePartsFormatted = [];
  var timeParts = decomposeDateDelta(delta);
  for (var i = 0, part, suffix; i < timeParts.length; i++) {
    part = timeParts[i];
    suffix = TIME_SUFFIXES[i];
    if (part) {
      timePartsFormatted.push('' + part + suffix);
      if (timePartsFormatted.length >= 2) {
        break;
      }
    }
  }
  return timePartsFormatted.join(', ');
}

function decomposeDateDelta(delta) {
  var timeParts = [];
  var rest = delta;
  var part = void 0;
  [1000, 60, 60, 24, 7, 52].forEach(function (divisor) {
    var _divMod = divMod(rest, divisor);

    rest = _divMod[0];
    part = _divMod[1];

    timeParts.unshift(part);
  }, []);

  return timeParts;
}

function divMod(numerator, denominator) {
  var remainder = numerator % denominator;
  var integerResult = (numerator - remainder) / denominator;
  return [integerResult, remainder];
}
// CONCATENATED MODULE: ./utils/opens-state.js
var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OpensState = (_temp = _class = function () {
  function OpensState() {
    _classCallCheck(this, OpensState);

    this.opens = this.loadState();
  }

  OpensState.prototype.openDay = function openDay(day) {
    this.opens[day] = true;
    this.saveState();
  };

  OpensState.prototype.loadState = function loadState() {
    var stateRaw = void 0;
    try {
      stateRaw = localStorage.getItem(OpensState.KEY);
    } catch (e) {}

    var state = void 0;
    if (stateRaw) {
      try {
        state = JSON.parse(stateRaw);
      } catch (e) {}
    }

    if (!state) {
      state = {};
      for (var i = 0; i < 25; i++) {
        state[i] = false;
      }
    }
    return state;
  };

  OpensState.prototype.saveState = function saveState() {
    var stateRaw = JSON.stringify(this.opens);
    try {
      localStorage.setItem(OpensState.KEY, stateRaw);
    } catch (e) {}
  };

  return OpensState;
}(), _class.KEY = 'opens', _temp);


var OPEN_STATE = new OpensState();
// CONCATENATED MODULE: ./components/day/index.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



function day__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var YEAR = new Date().getFullYear();

var day_Day = function (_Component) {
  _inherits(Day, _Component);

  function Day() {
    day__classCallCheck(this, Day);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.open = function (e) {
      OPEN_STATE.openDay(_this.props.day);
      _this.setState({ isOpened: true });
    };

    _this.state = {
      isFuture: true,
      deltaFormatted: null,
      isOpened: false
    };
    return _this;
  }

  Day.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.setState({ isOpened: OPEN_STATE.opens[this.props.day] });
    this.timer = setInterval(function () {
      var isFuture = isFutureDate(_this2.date);
      if (_this2.state.isFuture !== isFuture) {
        _this2.setState({ isFuture: isFuture });
      }
      if (isFuture) {
        var delta = _this2.date - new Date();
        var deltaFormatted = formatDateDelta(delta);
        if (_this2.state.deltaFormatted !== deltaFormatted) {
          _this2.setState({ deltaFormatted: deltaFormatted });
        }
      }
    }, 1000);
  };

  Day.prototype.componentWillUnmount = function componentWillUnmount() {
    clearInterval(this.timer);
  };

  Day.prototype.render = function render(_ref, state) {
    var day = _ref.day,
        offsetX = _ref.offsetX;

    var mod2Class = day % 2 === 0 ? day_style_default.a.cover : day_style_default.a.box;
    var dayClass = day_style_default.a['day-' + (day + 1)];
    return Object(preact_min["h"])(
      'div',
      { 'class': day_style_default.a.day + ' ' + mod2Class + ' ' + dayClass },
      Object(preact_min["h"])(
        'h1',
        { 'class': day_style_default.a.label },
        day + 1
      ),
      Object(preact_min["h"])('div', { 'class': day_style_default.a.background, style: this.getStyle(day, offsetX) }),
      this.renderGaurd(state)
    );
  };

  Day.prototype.getStyle = function getStyle(day, offsetX) {
    if (typeof window === "undefined") {
      return {};
    }
    var relativeOffset = 20 * offsetX / window.innerWidth;
    if (20 < Math.abs(relativeOffset)) {
      // Only cause style re-paints for the current visible area
      return {};
    }

    var transform = void 0;
    if (day % 2 === 0) {
      transform = 'translate3d(' + relativeOffset + '%, 0, 0)';
    } else {
      transform = 'rotateY(' + 2 * relativeOffset + 'deg)';
    }
    return { transform: transform };
  };

  Day.prototype.renderGaurd = function renderGaurd(_ref2) {
    var isFuture = _ref2.isFuture,
        deltaFormatted = _ref2.deltaFormatted,
        isOpened = _ref2.isOpened;

    var content = isFuture ? Object(preact_min["h"])(
      'p',
      null,
      'Open in ',
      deltaFormatted
    ) : Object(preact_min["h"])(
      'button',
      { type: 'button', onClick: this.open },
      'Open'
    );
    var classes = day_style_default.a.guard;
    if (isOpened) {
      classes = classes + ' ' + day_style_default.a.opened;
    }
    return Object(preact_min["h"])(
      'div',
      { 'class': classes },
      Object(preact_min["h"])(
        'div',
        null,
        Object(preact_min["h"])(
          'h1',
          null,
          this.props.day + 1,
          ' Dec'
        )
      ),
      Object(preact_min["h"])(
        'div',
        null,
        content
      )
    );
  };

  _createClass(Day, [{
    key: 'date',
    get: function get() {
      var day = this.props.day;

      var date = new Date(YEAR, 11, day + 1);
      return date;
    }
  }]);

  return Day;
}(preact_min["Component"]);
// EXTERNAL MODULE: ../node_modules/preact-router/match.js
var match = __webpack_require__("sw5u");
var match_default = /*#__PURE__*/__webpack_require__.n(match);

// EXTERNAL MODULE: ./components/intro/style.scss
var intro_style = __webpack_require__("yQ52");
var intro_style_default = /*#__PURE__*/__webpack_require__.n(intro_style);

// CONCATENATED MODULE: ./components/intro/index.js


function intro__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function intro__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function intro__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var intro_Intro = function (_Component) {
  intro__inherits(Intro, _Component);

  function Intro() {
    intro__classCallCheck(this, Intro);

    return intro__possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Intro.prototype.render = function render(_ref) {
    var offsetX = _ref.offsetX;

    return Object(preact_min["h"])(
      'div',
      { 'class': intro_style_default.a.intro },
      Object(preact_min["h"])(
        'div',
        { style: this.getStyles(offsetX) },
        'Scroll to start your advent adventure...'
      ),
      Object(preact_min["h"])(
        match["Link"],
        { href: '/about', 'class': intro_style_default.a.about + ' link-button' },
        'About'
      )
    );
  };

  Intro.prototype.getStyles = function getStyles(offsetX) {
    if (typeof window === "undefined") {
      return {};
    }
    var ratio = offsetX / window.innerWidth;
    var percent = 100 * ratio;
    return {
      transform: 'translate3d(' + 1.5 * offsetX + 'px, 0, ' + -1.5 * percent + 'px)',
      opacity: 1 - ratio
    };
  };

  return Intro;
}(preact_min["Component"]);
// CONCATENATED MODULE: ./routes/home/index.js
var home__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



function home__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function home__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function home__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var DAY_OF_ADVENT = 25;

var FRICTION = 0.95;
var STOP_THRESHOLD = 0.3;

var windowProxy = void 0;
if (typeof window === "undefined") {
	windowProxy = { innerWidth: 1200 };
} else {
	windowProxy = window;
}

var home_Home = function (_Component) {
	home__inherits(Home, _Component);

	function Home() {
		var _temp, _this, _ret;

		home__classCallCheck(this, Home);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = home__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = { isMouseDown: false, x: 0, offsetX: 0, trackingPoints: [], decVelX: 0, relOffsetX: 0 }, _this.startDrag = function (e) {
			var x = getXFromTouchOrPointer(e);
			_this.setState({ isMouseDown: true, x: x, trackingPoints: [] });
		}, _this.endDrag = function (e) {
			var x = getXFromTouchOrPointer(e);
			_this.addTrackingPoint(x);
			_this.setState({ isMouseDown: false });
			_this.startDeceleration();
		}, _this.drag = function (e) {
			if (_this.state.isMouseDown) {
				var x = getXFromTouchOrPointer(e);
				_this.addTrackingPoint(x);
				var delta = _this.state.x - x;
				_this.setState({ x: x });
				_this.updateOffset(delta);
			}
		}, _this.scroll = function (e) {
			e.preventDefault();
			var delta = e.deltaX + e.deltaY;
			_this.updateOffset(delta);
		}, _temp), home__possibleConstructorReturn(_this, _ret);
	}

	Home.prototype.render = function render(props, state) {
		return Object(preact_min["h"])(
			'div',
			{
				'class': 'fullscreen container',
				onTouchStart: this.startDrag,
				onTouchEnd: this.endDrag,
				onTouchMove: this.drag,
				onMouseDown: this.startDrag,
				onMouseUp: this.endDrag,
				onMouseMove: this.drag,
				onMouseWheel: this.scroll,
				onMouseLeave: this.endDrag
			},
			Object(preact_min["h"])(
				'div',
				{
					'class': 'fullscreen ' + home_style_default.a.days + ' ' + this.grabbingClass,
					style: this.getTransform(state)
				},
				Object(preact_min["h"])(intro_Intro, { offsetX: state.offsetX }),
				this.renderDays(state.offsetX)
			)
		);
	};

	Home.prototype.addTrackingPoint = function addTrackingPoint(x) {
		var time = Date.now();
		var trackingPoints = [].concat(this.state.trackingPoints);
		while (trackingPoints.length > 0) {
			if (time - trackingPoints[0].time <= 100) {
				break;
			}
			trackingPoints.shift();
		}
		trackingPoints.push({ x: x, time: time });
		this.setState({ trackingPoints: trackingPoints });
	};

	Home.prototype.updateOffset = function updateOffset(delta) {
		var fullWidth = windowProxy.innerWidth * DAY_OF_ADVENT;
		var offsetX = constrainNumber(this.state.offsetX + delta, 0, fullWidth);
		var relOffsetX = offsetX / fullWidth;
		this.setState({ offsetX: offsetX, relOffsetX: relOffsetX });
	};

	Home.prototype.componentDidMount = function componentDidMount() {
		window.addEventListener('resize', this.updateDimensions.bind(this));
	};

	Home.prototype.componentWillUnmount = function componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions.bind(this));
	};

	Home.prototype.updateDimensions = function updateDimensions() {
		var offsetX = this.state.relOffsetX * windowProxy.innerWidth * DAY_OF_ADVENT;
		this.setState({ offsetX: offsetX });
	};

	Home.prototype.getTransform = function getTransform(_ref) {
		var offsetX = _ref.offsetX;

		return { transform: 'translate3d(' + -1 * offsetX + 'px, 0, 0)' };
	};

	Home.prototype.renderDays = function renderDays(offsetX) {
		var days = [];
		var windowWidth = windowProxy.innerWidth;
		for (var i = 0; i < DAY_OF_ADVENT; i++) {
			var dayOffsetX = offsetX - windowWidth * (i + 1);
			days.push(Object(preact_min["h"])(day_Day, { day: i, offsetX: dayOffsetX }));
		}
		return days;
	};

	// Deceleration
	Home.prototype.startDeceleration = function startDeceleration() {
		var trackingPoints = this.state.trackingPoints;

		var firstPoint = trackingPoints[0];
		var lastPoint = trackingPoints[trackingPoints.length - 1];

		var xOffset = lastPoint.x - firstPoint.x;
		var timeOffset = lastPoint.time - firstPoint.time;

		var D = timeOffset / 15;

		var decVelX = xOffset / D || 0; // prevent NaN

		var decelerating = false;
		if (Math.abs(decVelX) > 1) {
			decelerating = true;
			requestAnimationFrame(this.stepDeceleration.bind(this));
		}
		this.setState({ decelerating: decelerating, decVelX: decVelX });
	};

	Home.prototype.stepDeceleration = function stepDeceleration() {
		if (!this.state.decelerating) {
			return;
		}

		var decVelX = this.state.decVelX * FRICTION;
		if (Math.abs(decVelX) > STOP_THRESHOLD) {
			this.updateOffset(-1 * decVelX);

			requestAnimationFrame(this.stepDeceleration.bind(this));
			this.setState({ decVelX: decVelX });
		} else {
			this.setState({ decelerating: false });
		}
	};

	home__createClass(Home, [{
		key: 'grabbingClass',
		get: function get() {
			return this.state.isMouseDown ? home_style_default.a.grabbing : '';
		}
	}]);

	return Home;
}(preact_min["Component"]);




function getXFromTouchOrPointer(event) {
	var x = void 0;
	if ('touches' in event) {
		try {
			x = event.changedTouches[0].clientX;
		} catch (e) {
			console.log(event);
		}
	} else {
		x = event.clientX;
	}
	return x;
}

function constrainNumber(number, min, max) {
	return Math.min(Math.max(number, min), max);
}
// EXTERNAL MODULE: ./routes/about/style.scss
var about_style = __webpack_require__("HgQI");
var about_style_default = /*#__PURE__*/__webpack_require__.n(about_style);

// CONCATENATED MODULE: ./routes/about/index.js


function about__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function about__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function about__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var about__ref = Object(preact_min["h"])(
  'h1',
  null,
  'About this card'
);

var about__ref2 = Object(preact_min["h"])(
  'p',
  null,
  'This card was created by ',
  Object(preact_min["h"])(
    'a',
    { href: 'https://github.com/euangoddard', target: '_blank' },
    'Euan Goddard'
  ),
  ' to celebrate Christmas 2017 and to learn ',
  Object(preact_min["h"])(
    'a',
    { href: 'https://preactjs.com/', target: '_blank' },
    'Preact'
  ),
  '. It is available as an installed progressive web app (i.e. works offline) \u2013 this was achieved using ',
  Object(preact_min["h"])(
    'a',
    { href: 'https://github.com/developit/preact-cli', target: '_blank' },
    'Preact CLI'
  ),
  '. The source code is available ',
  Object(preact_min["h"])(
    'a',
    { href: 'https://github.com/euangoddard/xmas-17', target: '_blank' },
    'on github'
  ),
  '.'
);

var _ref3 = Object(preact_min["h"])(
  'p',
  null,
  'All images were obtained from the marvellous ',
  Object(preact_min["h"])(
    'a',
    { href: 'https://unsplash.com/search/photos/christmas', target: '_blank' },
    'Unsplash'
  ),
  ' collection of free images.'
);

var _ref4 = Object(preact_min["h"])(
  'h2',
  null,
  'Merry Christmas and a Happy 2018!'
);

var _ref5 = Object(preact_min["h"])(
  match["Link"],
  { href: '/', 'class': 'link-button' },
  'Back to the card'
);

var about_About = function (_Component) {
  about__inherits(About, _Component);

  function About() {
    about__classCallCheck(this, About);

    return about__possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  About.prototype.render = function render() {
    console.log(about_style_default.a);
    return Object(preact_min["h"])(
      'div',
      { 'class': about_style_default.a.about },
      about__ref,
      about__ref2,
      _ref3,
      _ref4,
      Object(preact_min["h"])(
        'p',
        { 'class': about_style_default.a.centred },
        _ref5
      )
    );
  };

  return About;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/app.js


function app__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function app__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var app__ref = Object(preact_min["h"])(home_Home, { path: '/' });

var app__ref2 = Object(preact_min["h"])(about_About, { path: '/about' });

var app_App = function (_Component) {
  app__inherits(App, _Component);

  function App() {
    var _temp, _this, _ret;

    app__classCallCheck(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = app__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRoute = function (e) {
      _this.currentUrl = e.url;
    }, _temp), app__possibleConstructorReturn(_this, _ret);
  }
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */


  App.prototype.render = function render() {
    return Object(preact_min["h"])(
      'div',
      { id: 'app' },
      Object(preact_min["h"])(
        preact_router_es["Router"],
        { onChange: this.handleRoute },
        app__ref,
        app__ref2
      )
    );
  };

  return App;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./index.js



/* harmony default export */ var index = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e() {}function t(t, n) {
    var o,
        r,
        i,
        l,
        a = E;for (l = arguments.length; l-- > 2;) {
      W.push(arguments[l]);
    }n && null != n.children && (W.length || W.push(n.children), delete n.children);while (W.length) {
      if ((r = W.pop()) && void 0 !== r.pop) for (l = r.length; l--;) {
        W.push(r[l]);
      } else "boolean" == typeof r && (r = null), (i = "function" != typeof t) && (null == r ? r = "" : "number" == typeof r ? r += "" : "string" != typeof r && (i = !1)), i && o ? a[a.length - 1] += r : a === E ? a = [r] : a.push(r), o = i;
    }var u = new e();return u.nodeName = t, u.children = a, u.attributes = null == n ? void 0 : n, u.key = null == n ? void 0 : n.key, void 0 !== S.vnode && S.vnode(u), u;
  }function n(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function o(e, o) {
    return t(e.nodeName, n(n({}, e.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : e.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == A.push(e) && (S.debounceRendering || P)(i);
  }function i() {
    var e,
        t = A;A = [];while (e = t.pop()) {
      e.__d && k(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var t = n({}, e.attributes);t.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === t[r] && (t[r] = o[r]);
    }return t;
  }function _(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function c(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === V.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, f, l) : e.removeEventListener(t, f, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) s(e, t, null == o ? "" : o), null != o && !1 !== o || e.removeAttribute(t);else {
        var a = r && t !== (t = t.replace(/^xlink\:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function s(e, t, n) {
    try {
      e[t] = n;
    } catch (e) {}
  }function f(e) {
    return this.__l[e.type](S.event && S.event(e) || e);
  }function d() {
    var e;while (e = D.pop()) {
      S.afterMount && S.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function h(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, j = null != e && !("__preactattr_" in e));var l = m(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (j = !1, i || d()), l;
  }function m(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return U(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = _(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0);
    }var p = i.firstChild,
        c = i.__preactattr_,
        s = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        c[f[d].name] = f[d].value;
      }
    }return !j && s && 1 === s.length && "string" == typeof s[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != s[0] && (p.nodeValue = s[0]) : (s && s.length || null != p) && v(i, s, n, o, j || null != c.dangerouslySetInnerHTML), g(i, t.attributes, c), R = l, i;
  }function v(e, t, n, o, r) {
    var i,
        a,
        u,
        _,
        c,
        s = e.childNodes,
        f = [],
        d = {},
        h = 0,
        v = 0,
        y = s.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = s[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (h++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      _ = t[C], c = null;var k = _.key;if (null != k) h && void 0 !== d[k] && (c = d[k], d[k] = void 0, h--);else if (!c && v < g) for (i = v; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], _, r)) {
          c = a, f[i] = void 0, i === g - 1 && g--, i === v && v++;break;
        }
      }c = m(c, _, n, o), u = s[C], c && c !== e && c !== u && (null == u ? e.appendChild(c) : c === u.nextSibling ? p(u) : e.insertBefore(c, u));
    }if (h) for (var C in d) {
      void 0 !== d[C] && b(d[C], !1);
    }while (v <= g) {
      void 0 !== (c = f[g--]) && b(c, !1);
    }
  }function b(e, t) {
    var n = e._component;n ? L(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || p(e), y(e));
  }function y(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;b(e, !0), e = t;
    }
  }function g(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || c(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || c(e, o, n[o], n[o] = t[o], R);
    }
  }function w(e) {
    var t = e.constructor.name;(I[t] || (I[t] = [])).push(e);
  }function C(e, t, n) {
    var o,
        r = I[e.name];if (e.prototype && e.prototype.render ? (o = new e(t, n), T.call(o, t, n)) : (o = new T(t, n), o.constructor = e, o.render = x), r) for (var i = r.length; i--;) {
      if (r[i].constructor === e) {
        o.__b = r[i].__b, r.splice(i, 1);break;
      }
    }return o;
  }function x(e, t, n) {
    return this.constructor(e, n);
  }function N(e, t, n, o, i) {
    e.__x || (e.__x = !0, (e.__r = t.ref) && delete t.ref, (e.__k = t.key) && delete t.key, !e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, o), o && o !== e.context && (e.__c || (e.__c = e.context), e.context = o), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === S.syncComponentUpdates && e.base ? r(e) : k(e, 1, i)), e.__r && e.__r(e));
  }function k(e, t, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          _ = e.props,
          p = e.state,
          c = e.context,
          s = e.__p || _,
          f = e.__s || p,
          m = e.__c || c,
          v = e.base,
          y = e.__b,
          g = v || y,
          w = e._component,
          x = !1;if (v && (e.props = s, e.state = f, e.context = m, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(_, p, c) ? x = !0 : e.componentWillUpdate && e.componentWillUpdate(_, p, c), e.props = _, e.state = p, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !x) {
        i = e.render(_, p, c), e.getChildContext && (c = n(n({}, c), e.getChildContext()));var U,
            T,
            M = i && i.nodeName;if ("function" == typeof M) {
          var W = u(i);l = w, l && l.constructor === M && W.key == l.__k ? N(l, W, 1, c, !1) : (U = l, e._component = l = C(M, W, c), l.__b = l.__b || y, l.__u = e, N(l, W, 0, c, !1), k(l, 1, o, !0)), T = l.base;
        } else a = g, U = w, U && (a = e._component = null), (g || 1 === t) && (a && (a._component = null), T = h(a, i, c, o || !v, g && g.parentNode, !0));if (g && T !== g && l !== w) {
          var E = g.parentNode;E && T !== E && (E.replaceChild(T, g), U || (g._component = null, b(g, !1)));
        }if (U && L(U), e.base = T, T && !r) {
          var P = e,
              V = e;while (V = V.__u) {
            (P = V).base = T;
          }T._component = P, T._componentConstructor = P.constructor;
        }
      }if (!v || o ? D.unshift(e) : x || (e.componentDidUpdate && e.componentDidUpdate(s, f, m), S.afterUpdate && S.afterUpdate(e)), null != e.__h) while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || d();
    }
  }function U(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        _ = a,
        p = u(t);while (r && !_ && (r = r.__u)) {
      _ = r.constructor === t.nodeName;
    }return r && _ && (!o || r._component) ? (N(r, p, 3, n, o), e = r.base) : (i && !a && (L(i), e = l = null), r = C(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), N(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, b(l, !1))), e;
  }function L(e) {
    S.beforeUnmount && S.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? L(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, p(t), w(e), y(t)), e.__r && e.__r(null);
  }function T(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {};
  }function M(e, t, n) {
    return h(n, e, {}, !1, t, !1);
  }var S = {},
      W = [],
      E = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      V = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      A = [],
      D = [],
      H = 0,
      R = !1,
      j = !1,
      I = {};n(T.prototype, { setState: function setState(e, t) {
      var o = this.state;this.__s || (this.__s = n({}, o)), n(o, "function" == typeof e ? e(o, this.props) : e), t && (this.__h = this.__h || []).push(t), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && (this.__h = this.__h || []).push(e), k(this, 2);
    }, render: function render() {} });var $ = { h: t, createElement: t, cloneElement: o, Component: T, render: M, rerender: i, options: S }; true ? module.exports = $ : self.preact = $;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "Lglr":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"days":"days__zCUeF","grabbing":"grabbing__3ik7x"};

/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "yQ52":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"intro":"intro__3V96J","about":"about__2MuEn"};

/***/ }),

/***/ "yY49":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map