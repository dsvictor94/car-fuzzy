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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "/assets";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameLoop = function () {
  function GameLoop() {
    _classCallCheck(this, GameLoop);

    this.running = false;
    this.id = null;
    //binds
    this.fps = this.fps.bind(this);
    this.scene = this.scene.bind(this);
    this.attach = this.attach.bind(this);
    this.run = this.run.bind(this);
  }

  _createClass(GameLoop, [{
    key: "fps",
    value: function fps(_fps) {
      this._fps = _fps;
      return this;
    }
  }, {
    key: "scene",
    value: function scene(_scene2) {
      this._scene = _scene2;
      return this;
    }
  }, {
    key: "attach",
    value: function attach(context) {
      this._context = context;
      return this;
    }
  }, {
    key: "run",
    value: function run() {
      var _this = this;

      this.running = true;
      var now = void 0,
          dt = void 0,
          last = window.performance.now();
      this._scene.settup();

      var frame = function frame() {
        var _context = _this._context,
            _scene = _this._scene,
            running = _this.running;

        now = window.performance.now();
        dt = (now - last) / 1000; // duration in seconds
        _scene.update(dt);
        _context.clearRect(0, 0, _context.canvas.width, _context.canvas.height);
        _context.beginPath();
        _context.save();
        _scene.render(_context, dt);
        _context.restore();
        last = now;
        if (running) _this.id = requestAnimationFrame(frame);else _this.id = null;
      };

      this.id = requestAnimationFrame(frame);
      return this;
    }
  }, {
    key: "pause",
    value: function pause() {
      this.running = false;
      return this;
    }
  }]);

  return GameLoop;
}();

exports.default = GameLoop;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function toPoint(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

var Map = function () {
  function Map(canvas) {
    _classCallCheck(this, Map);

    this.canvas = canvas;
    this.at = { x: 0, y: 0 };
    this.drawing = null;
    this.path = [];

    this.move = this.move.bind(this);
    this.start = this.start.bind(this);
    this.end = this.end.bind(this);
  }

  _createClass(Map, [{
    key: "move",
    value: function move(e) {
      if (this.drawing != null) {
        this.drawing.to = toPoint(this.canvas, e);
      }
    }
  }, {
    key: "start",
    value: function start(e) {
      var point = toPoint(this.canvas, e);
      this.drawing = { from: point, to: point };
    }
  }, {
    key: "end",
    value: function end(e) {
      if (this.drawing != null) {
        this.drawing.to = toPoint(this.canvas, e);
        this.path.push(this.drawing);
        this.drawing = null;
      }
    }
  }]);

  return Map;
}();

exports.default = Map;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colide = __webpack_require__(4);

var _colide2 = _interopRequireDefault(_colide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Simulator = function () {
  function Simulator(map) {
    _classCallCheck(this, Simulator);

    this.x = 40;
    this.y = 200;
    this.map = map;
  }

  _createClass(Simulator, [{
    key: "settup",
    value: function settup() {}
  }, {
    key: "update",
    value: function update(dt) {
      var x = this.x,
          y = this.y,
          map = this.map;

      var newX = x + 80 * dt;
      if (!this.colide({ x: newX, y: y })) {
        this.x = newX;
      }
    }
  }, {
    key: "colide",
    value: function colide(to) {
      var segA = { from: { x: this.x, y: this.y }, to: to };
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.map.path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var segB = _step.value;

          if ((0, _colide2.default)(segA, segB)) return true;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }, {
    key: "render",
    value: function render(ctx, dt) {
      ctx.font = "14px Arial";
      ctx.fillText("fps: " + Math.round(1 / dt), 2, 14);
      this.drawCar(ctx, dt);
      this.drawMap(ctx, dt);
    }
  }, {
    key: "drawCar",
    value: function drawCar(ctx, dt) {
      var x = this.x,
          y = this.y;

      ctx.rect(x - 13, y - 7, 26, 14);
      ctx.fill();
    }
  }, {
    key: "drawMap",
    value: function drawMap(ctx, dt) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.map.path[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _step2.value,
              _from = _step2$value.from,
              _to = _step2$value.to;

          ctx.moveTo(_from.x, _from.y);
          ctx.lineTo(_to.x, _to.y);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (this.map.drawing != null) {
        var _map$drawing = this.map.drawing,
            from = _map$drawing.from,
            to = _map$drawing.to;

        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
      }
      ctx.stroke();
    }
  }]);

  return Simulator;
}();

exports.default = Simulator;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _engine = __webpack_require__(0);

var _engine2 = _interopRequireDefault(_engine);

var _simulator = __webpack_require__(2);

var _simulator2 = _interopRequireDefault(_simulator);

var _map = __webpack_require__(1);

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var map = new _map2.default(canvas);

canvas.addEventListener("mousemove", map.move, false);

canvas.addEventListener("mousedown", map.start, false);

canvas.addEventListener("mouseup", map.end, false);

var game = new _engine2.default().fps(60).scene(new _simulator2.default(map)).attach(context).run();

window.game = game; //to debug

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = colide;

var _lineIntersect = __webpack_require__(5);

function colide(a, b) {
  var _checkIntersection = (0, _lineIntersect.checkIntersection)(a.from.x, a.from.y, a.to.x, a.to.y, b.from.x, b.from.y, b.to.x, b.to.y),
      type = _checkIntersection.type,
      point = _checkIntersection.point;

  if (type == 'colinear') return true;

  if (type == 'intersecting') return true;

  return false;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports.checkIntersection = __webpack_require__(6);
exports.colinearPointWithinSegment = __webpack_require__(7);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
* Check how two line segments intersect eachother. Line segments are represented
* as (x1, y1)-(x2, y2) and (x3, y3)-(x4, y4).
*
* @param {number} x1
* @param {number} y1
* @param {number} x2
* @param {number} y2
* @param {number} x3
* @param {number} y3
* @param {number} x4
* @param {number} y4
* @return {object} Object describing intersection that looks like
*    {
*      type: none|parallel|colinear|intersecting,
*      point: {x, y} - only defined when type == intersecting
*    }
*/
function checkIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  var denom = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1));
  var numeA = ((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3));
  var numeB = ((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3));

  if (denom == 0) {
    if (numeA == 0 && numeB == 0) {
      return colinear();
    }
    return parallel();
  }

  var uA = numeA / denom;
  var uB = numeB / denom;

  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    var point = {
      x: x1 + (uA * (x2 - x1)),
      y: y1 + (uA * (y2 - y1))
    };
    return intersecting(point);
  }

  return none();
}

function colinear() {
  return intersectResult('colinear');
}

function parallel() {
  return intersectResult('parallel');
}

function none() {
  return intersectResult('none');
}

function intersecting(point) {
  var result = intersectResult('intersecting');
  result.point = point;
  return result;
}

function intersectResult(type) {
  return {
    type: type
  };
}

module.exports = checkIntersection;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
* Assuming a point is on same line as a line segment, tell if that point is
* on the line segment.
*
* @param {number} pointX - X of point
* @param {number} pointY - Y of point
* @param {number} startX - X of line segment start
* @param {number} startY - Y of line segment start
* @param {number} endX   - X of line segment end
* @param {number} endY   - Y of line segment end
* @return {boolean} true if point is within segment, false otherwise.
*/
function colinearPointWithinSegment(pointX, pointY, startX, startY, endX, endY) {
  if (startX != endX) {
    if (startX <= pointX && pointX <= endX) return true;
    if (startX >= pointX && pointX >= endX) return true;
  } else {
    if (startY <= pointY && pointY <= endY) return true;
    if (startY >= pointY && pointY >= endY) return true;
  }
  return false;
}

module.exports = colinearPointWithinSegment;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODAzZDQ2MGI4MjliNGE0MDUyMWMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2VuZ2luZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvbWFwLmpzIiwid2VicGFjazovLy8uL2FwcC9zaW11bGF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL2FwcC9jb2xpZGUuanMiLCJ3ZWJwYWNrOi8vLy4uL34vbGluZS1pbnRlcnNlY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL34vbGluZS1pbnRlcnNlY3QvbGliL2NoZWNrLWludGVyc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vfi9saW5lLWludGVyc2VjdC9saWIvY29saW5lYXItcG9pbnQtd2l0aGluLXNlZ21lbnQuanMiXSwibmFtZXMiOlsiR2FtZUxvb3AiLCJydW5uaW5nIiwiaWQiLCJmcHMiLCJiaW5kIiwic2NlbmUiLCJhdHRhY2giLCJydW4iLCJfZnBzIiwiX3NjZW5lIiwiY29udGV4dCIsIl9jb250ZXh0Iiwibm93IiwiZHQiLCJsYXN0Iiwid2luZG93IiwicGVyZm9ybWFuY2UiLCJzZXR0dXAiLCJmcmFtZSIsInVwZGF0ZSIsImNsZWFyUmVjdCIsImNhbnZhcyIsIndpZHRoIiwiaGVpZ2h0IiwiYmVnaW5QYXRoIiwic2F2ZSIsInJlbmRlciIsInJlc3RvcmUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0b1BvaW50IiwiZXZ0IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIngiLCJjbGllbnRYIiwibGVmdCIsInkiLCJjbGllbnRZIiwidG9wIiwiTWFwIiwiYXQiLCJkcmF3aW5nIiwicGF0aCIsIm1vdmUiLCJzdGFydCIsImVuZCIsImUiLCJ0byIsInBvaW50IiwiZnJvbSIsInB1c2giLCJTaW11bGF0b3IiLCJtYXAiLCJuZXdYIiwiY29saWRlIiwic2VnQSIsInNlZ0IiLCJjdHgiLCJmb250IiwiZmlsbFRleHQiLCJNYXRoIiwicm91bmQiLCJkcmF3Q2FyIiwiZHJhd01hcCIsImZpbGwiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZ2V0Q29udGV4dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJnYW1lIiwiYSIsImIiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ2hFcUJBLFE7QUFDbkIsc0JBQWM7QUFBQTs7QUFDWixTQUFLQyxPQUFMLEdBQWUsS0FBZjtBQUNBLFNBQUtDLEVBQUwsR0FBVSxJQUFWO0FBQ0E7QUFDQSxTQUFLQyxHQUFMLEdBQVcsS0FBS0EsR0FBTCxDQUFTQyxJQUFULENBQWMsSUFBZCxDQUFYO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEtBQUtBLEtBQUwsQ0FBV0QsSUFBWCxDQUFnQixJQUFoQixDQUFiO0FBQ0EsU0FBS0UsTUFBTCxHQUFjLEtBQUtBLE1BQUwsQ0FBWUYsSUFBWixDQUFpQixJQUFqQixDQUFkO0FBQ0EsU0FBS0csR0FBTCxHQUFXLEtBQUtBLEdBQUwsQ0FBU0gsSUFBVCxDQUFjLElBQWQsQ0FBWDtBQUNEOzs7O3dCQUVJRCxJLEVBQUs7QUFDUixXQUFLSyxJQUFMLEdBQVlMLElBQVo7QUFDQSxhQUFPLElBQVA7QUFDRDs7OzBCQUVNRSxPLEVBQU87QUFDWixXQUFLSSxNQUFMLEdBQWNKLE9BQWQ7QUFDQSxhQUFPLElBQVA7QUFDRDs7OzJCQUVPSyxPLEVBQVM7QUFDZixXQUFLQyxRQUFMLEdBQWdCRCxPQUFoQjtBQUNBLGFBQU8sSUFBUDtBQUNEOzs7MEJBRU07QUFBQTs7QUFDTCxXQUFLVCxPQUFMLEdBQWUsSUFBZjtBQUNBLFVBQUlXLFlBQUo7QUFBQSxVQUFTQyxXQUFUO0FBQUEsVUFBYUMsT0FBT0MsT0FBT0MsV0FBUCxDQUFtQkosR0FBbkIsRUFBcEI7QUFDQSxXQUFLSCxNQUFMLENBQVlRLE1BQVo7O0FBRUEsVUFBTUMsUUFBUSxTQUFSQSxLQUFRLEdBQU07QUFBQSxZQUNWUCxRQURVLFNBQ1ZBLFFBRFU7QUFBQSxZQUNBRixNQURBLFNBQ0FBLE1BREE7QUFBQSxZQUNRUixPQURSLFNBQ1FBLE9BRFI7O0FBRWxCVyxjQUFNRyxPQUFPQyxXQUFQLENBQW1CSixHQUFuQixFQUFOO0FBQ0FDLGFBQUssQ0FBQ0QsTUFBTUUsSUFBUCxJQUFlLElBQXBCLENBSGtCLENBR1c7QUFDN0JMLGVBQU9VLE1BQVAsQ0FBY04sRUFBZDtBQUNBRixpQkFBU1MsU0FBVCxDQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QlQsU0FBU1UsTUFBVCxDQUFnQkMsS0FBekMsRUFBZ0RYLFNBQVNVLE1BQVQsQ0FBZ0JFLE1BQWhFO0FBQ0FaLGlCQUFTYSxTQUFUO0FBQ0FiLGlCQUFTYyxJQUFUO0FBQ0FoQixlQUFPaUIsTUFBUCxDQUFjZixRQUFkLEVBQXdCRSxFQUF4QjtBQUNBRixpQkFBU2dCLE9BQVQ7QUFDQWIsZUFBT0YsR0FBUDtBQUNBLFlBQUlYLE9BQUosRUFDRSxNQUFLQyxFQUFMLEdBQVUwQixzQkFBc0JWLEtBQXRCLENBQVYsQ0FERixLQUdFLE1BQUtoQixFQUFMLEdBQVUsSUFBVjtBQUNILE9BZkQ7O0FBaUJBLFdBQUtBLEVBQUwsR0FBVTBCLHNCQUFzQlYsS0FBdEIsQ0FBVjtBQUNBLGFBQU8sSUFBUDtBQUNEOzs7NEJBRVE7QUFDUCxXQUFLakIsT0FBTCxHQUFlLEtBQWY7QUFDQSxhQUFPLElBQVA7QUFDRDs7Ozs7O2tCQXZEa0JELFE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQXJCLFNBQVM2QixPQUFULENBQWlCUixNQUFqQixFQUF5QlMsR0FBekIsRUFBOEI7QUFDNUIsTUFBTUMsT0FBT1YsT0FBT1cscUJBQVAsRUFBYjtBQUNBLFNBQU87QUFDTEMsT0FBR0gsSUFBSUksT0FBSixHQUFjSCxLQUFLSSxJQURqQjtBQUVMQyxPQUFHTixJQUFJTyxPQUFKLEdBQWNOLEtBQUtPO0FBRmpCLEdBQVA7QUFJRDs7SUFFb0JDLEc7QUFDbkIsZUFBYWxCLE1BQWIsRUFBcUI7QUFBQTs7QUFDbkIsU0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS21CLEVBQUwsR0FBVSxFQUFDUCxHQUFHLENBQUosRUFBT0csR0FBRyxDQUFWLEVBQVY7QUFDQSxTQUFLSyxPQUFMLEdBQWUsSUFBZjtBQUNBLFNBQUtDLElBQUwsR0FBWSxFQUFaOztBQUVBLFNBQUtDLElBQUwsR0FBWSxLQUFLQSxJQUFMLENBQVV2QyxJQUFWLENBQWUsSUFBZixDQUFaO0FBQ0EsU0FBS3dDLEtBQUwsR0FBYSxLQUFLQSxLQUFMLENBQVd4QyxJQUFYLENBQWdCLElBQWhCLENBQWI7QUFDQSxTQUFLeUMsR0FBTCxHQUFXLEtBQUtBLEdBQUwsQ0FBU3pDLElBQVQsQ0FBYyxJQUFkLENBQVg7QUFDRDs7Ozt5QkFFSzBDLEMsRUFBRztBQUNQLFVBQUksS0FBS0wsT0FBTCxJQUFnQixJQUFwQixFQUEwQjtBQUN4QixhQUFLQSxPQUFMLENBQWFNLEVBQWIsR0FBa0JsQixRQUFRLEtBQUtSLE1BQWIsRUFBcUJ5QixDQUFyQixDQUFsQjtBQUNEO0FBQ0Y7OzswQkFFTUEsQyxFQUFHO0FBQ1IsVUFBTUUsUUFBUW5CLFFBQVEsS0FBS1IsTUFBYixFQUFxQnlCLENBQXJCLENBQWQ7QUFDQSxXQUFLTCxPQUFMLEdBQWUsRUFBRVEsTUFBTUQsS0FBUixFQUFlRCxJQUFJQyxLQUFuQixFQUFmO0FBQ0Q7Ozt3QkFFSUYsQyxFQUFHO0FBQ04sVUFBSSxLQUFLTCxPQUFMLElBQWdCLElBQXBCLEVBQTBCO0FBQ3hCLGFBQUtBLE9BQUwsQ0FBYU0sRUFBYixHQUFrQmxCLFFBQVEsS0FBS1IsTUFBYixFQUFxQnlCLENBQXJCLENBQWxCO0FBQ0EsYUFBS0osSUFBTCxDQUFVUSxJQUFWLENBQWUsS0FBS1QsT0FBcEI7QUFDQSxhQUFLQSxPQUFMLEdBQWUsSUFBZjtBQUNEO0FBQ0Y7Ozs7OztrQkE3QmtCRixHOzs7Ozs7Ozs7Ozs7Ozs7QUNSckI7Ozs7Ozs7O0lBRXFCWSxTO0FBQ25CLHFCQUFhQyxHQUFiLEVBQWtCO0FBQUE7O0FBQ2hCLFNBQUtuQixDQUFMLEdBQVMsRUFBVDtBQUNBLFNBQUtHLENBQUwsR0FBUyxHQUFUO0FBQ0EsU0FBS2dCLEdBQUwsR0FBV0EsR0FBWDtBQUNEOzs7OzZCQUVTLENBRVQ7OzsyQkFFT3ZDLEUsRUFBSTtBQUFBLFVBQ0hvQixDQURHLEdBQ1UsSUFEVixDQUNIQSxDQURHO0FBQUEsVUFDQUcsQ0FEQSxHQUNVLElBRFYsQ0FDQUEsQ0FEQTtBQUFBLFVBQ0dnQixHQURILEdBQ1UsSUFEVixDQUNHQSxHQURIOztBQUVWLFVBQU1DLE9BQU9wQixJQUFJLEtBQUdwQixFQUFwQjtBQUNBLFVBQUksQ0FBQyxLQUFLeUMsTUFBTCxDQUFZLEVBQUNyQixHQUFHb0IsSUFBSixFQUFVakIsSUFBVixFQUFaLENBQUwsRUFBZ0M7QUFDOUIsYUFBS0gsQ0FBTCxHQUFTb0IsSUFBVDtBQUNEO0FBQ0Y7OzsyQkFFT04sRSxFQUFJO0FBQ1YsVUFBTVEsT0FBUSxFQUFFTixNQUFNLEVBQUVoQixHQUFHLEtBQUtBLENBQVYsRUFBYUcsR0FBRyxLQUFLQSxDQUFyQixFQUFSLEVBQWtDVyxNQUFsQyxFQUFkO0FBRFU7QUFBQTtBQUFBOztBQUFBO0FBRVYsNkJBQWlCLEtBQUtLLEdBQUwsQ0FBU1YsSUFBMUIsOEhBQWdDO0FBQUEsY0FBdkJjLElBQXVCOztBQUM5QixjQUFJLHNCQUFjRCxJQUFkLEVBQW9CQyxJQUFwQixDQUFKLEVBQStCLE9BQU8sSUFBUDtBQUNoQztBQUpTO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBS1YsYUFBTyxLQUFQO0FBQ0Q7OzsyQkFFT0MsRyxFQUFLNUMsRSxFQUFJO0FBQ2Y0QyxVQUFJQyxJQUFKLEdBQVcsWUFBWDtBQUNBRCxVQUFJRSxRQUFKLFdBQXFCQyxLQUFLQyxLQUFMLENBQVcsSUFBRWhELEVBQWIsQ0FBckIsRUFBd0MsQ0FBeEMsRUFBMEMsRUFBMUM7QUFDQSxXQUFLaUQsT0FBTCxDQUFhTCxHQUFiLEVBQWtCNUMsRUFBbEI7QUFDQSxXQUFLa0QsT0FBTCxDQUFhTixHQUFiLEVBQWtCNUMsRUFBbEI7QUFDRDs7OzRCQUVPNEMsRyxFQUFLNUMsRSxFQUFJO0FBQUEsVUFDUm9CLENBRFEsR0FDQSxJQURBLENBQ1JBLENBRFE7QUFBQSxVQUNMRyxDQURLLEdBQ0EsSUFEQSxDQUNMQSxDQURLOztBQUVmcUIsVUFBSTFCLElBQUosQ0FBU0UsSUFBRSxFQUFYLEVBQWVHLElBQUUsQ0FBakIsRUFBb0IsRUFBcEIsRUFBd0IsRUFBeEI7QUFDQXFCLFVBQUlPLElBQUo7QUFDRDs7OzRCQUVPUCxHLEVBQUs1QyxFLEVBQUk7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDZiw4QkFBdUIsS0FBS3VDLEdBQUwsQ0FBU1YsSUFBaEMsbUlBQXNDO0FBQUE7QUFBQSxjQUE1Qk8sS0FBNEIsZ0JBQTVCQSxJQUE0QjtBQUFBLGNBQXRCRixHQUFzQixnQkFBdEJBLEVBQXNCOztBQUNwQ1UsY0FBSVEsTUFBSixDQUFXaEIsTUFBS2hCLENBQWhCLEVBQW1CZ0IsTUFBS2IsQ0FBeEI7QUFDQXFCLGNBQUlTLE1BQUosQ0FBV25CLElBQUdkLENBQWQsRUFBaUJjLElBQUdYLENBQXBCO0FBQ0Q7QUFKYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUtmLFVBQUksS0FBS2dCLEdBQUwsQ0FBU1gsT0FBVCxJQUFvQixJQUF4QixFQUE4QjtBQUFBLDJCQUNULEtBQUtXLEdBQUwsQ0FBU1gsT0FEQTtBQUFBLFlBQ3JCUSxJQURxQixnQkFDckJBLElBRHFCO0FBQUEsWUFDZkYsRUFEZSxnQkFDZkEsRUFEZTs7QUFFNUJVLFlBQUlRLE1BQUosQ0FBV2hCLEtBQUtoQixDQUFoQixFQUFtQmdCLEtBQUtiLENBQXhCO0FBQ0FxQixZQUFJUyxNQUFKLENBQVduQixHQUFHZCxDQUFkLEVBQWlCYyxHQUFHWCxDQUFwQjtBQUNEO0FBQ0RxQixVQUFJVSxNQUFKO0FBQ0Q7Ozs7OztrQkFuRGtCaEIsUzs7Ozs7Ozs7O0FDRnJCOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTTlCLFNBQVMrQyxTQUFTQyxjQUFULENBQXdCLFFBQXhCLENBQWY7QUFDQSxJQUFNM0QsVUFBVVcsT0FBT2lELFVBQVAsQ0FBa0IsSUFBbEIsQ0FBaEI7O0FBRUEsSUFBTWxCLE1BQU0sa0JBQVEvQixNQUFSLENBQVo7O0FBRUFBLE9BQU9rRCxnQkFBUCxDQUF3QixXQUF4QixFQUFxQ25CLElBQUlULElBQXpDLEVBQStDLEtBQS9DOztBQUVBdEIsT0FBT2tELGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDbkIsSUFBSVIsS0FBekMsRUFBZ0QsS0FBaEQ7O0FBRUF2QixPQUFPa0QsZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUNuQixJQUFJUCxHQUF2QyxFQUE0QyxLQUE1Qzs7QUFFQSxJQUFNMkIsT0FBTyx1QkFDVnJFLEdBRFUsQ0FDTixFQURNLEVBRVZFLEtBRlUsQ0FFSix3QkFBYytDLEdBQWQsQ0FGSSxFQUdWOUMsTUFIVSxDQUdISSxPQUhHLEVBSVZILEdBSlUsRUFBYjs7QUFPQVEsT0FBT3lELElBQVAsR0FBY0EsSUFBZCxDLENBQW9CLFU7Ozs7Ozs7Ozs7OztrQkNwQklsQixNOztBQUZ4Qjs7QUFFZSxTQUFTQSxNQUFULENBQWlCbUIsQ0FBakIsRUFBb0JDLENBQXBCLEVBQXVCO0FBQUEsMkJBQ1osc0NBQ3RCRCxFQUFFeEIsSUFBRixDQUFPaEIsQ0FEZSxFQUNad0MsRUFBRXhCLElBQUYsQ0FBT2IsQ0FESyxFQUNGcUMsRUFBRTFCLEVBQUYsQ0FBS2QsQ0FESCxFQUNNd0MsRUFBRTFCLEVBQUYsQ0FBS1gsQ0FEWCxFQUV0QnNDLEVBQUV6QixJQUFGLENBQU9oQixDQUZlLEVBRVp5QyxFQUFFekIsSUFBRixDQUFPYixDQUZLLEVBRUZzQyxFQUFFM0IsRUFBRixDQUFLZCxDQUZILEVBRU15QyxFQUFFM0IsRUFBRixDQUFLWCxDQUZYLENBRFk7QUFBQSxNQUM1QnVDLElBRDRCLHNCQUM1QkEsSUFENEI7QUFBQSxNQUN0QjNCLEtBRHNCLHNCQUN0QkEsS0FEc0I7O0FBTXBDLE1BQUkyQixRQUFRLFVBQVosRUFBd0IsT0FBTyxJQUFQOztBQUV4QixNQUFJQSxRQUFRLGNBQVosRUFBNEIsT0FBTyxJQUFQOztBQUU1QixTQUFPLEtBQVA7QUFDRCxDOzs7Ozs7QUNiRDtBQUNBOzs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLE9BQU87QUFDakIsVUFBVSxPQUFPO0FBQ2pCLFVBQVUsT0FBTztBQUNqQixVQUFVLE9BQU87QUFDakIsVUFBVSxPQUFPO0FBQ2pCLFVBQVUsT0FBTztBQUNqQixVQUFVLE9BQU87QUFDakIsVUFBVSxPQUFPO0FBQ2pCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0EsZUFBZSxLQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsT0FBTztBQUNqQixVQUFVLE9BQU87QUFDakIsVUFBVSxPQUFPO0FBQ2pCLFVBQVUsT0FBTztBQUNqQixVQUFVLE9BQU87QUFDakIsVUFBVSxPQUFPO0FBQ2pCLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Fzc2V0c1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDgwM2Q0NjBiODI5YjRhNDA1MjFjIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUxvb3Age1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZVxuICAgIHRoaXMuaWQgPSBudWxsXG4gICAgLy9iaW5kc1xuICAgIHRoaXMuZnBzID0gdGhpcy5mcHMuYmluZCh0aGlzKVxuICAgIHRoaXMuc2NlbmUgPSB0aGlzLnNjZW5lLmJpbmQodGhpcylcbiAgICB0aGlzLmF0dGFjaCA9IHRoaXMuYXR0YWNoLmJpbmQodGhpcylcbiAgICB0aGlzLnJ1biA9IHRoaXMucnVuLmJpbmQodGhpcylcbiAgfVxuXG4gIGZwcyAoZnBzKSB7XG4gICAgdGhpcy5fZnBzID0gZnBzXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHNjZW5lIChzY2VuZSkge1xuICAgIHRoaXMuX3NjZW5lID0gc2NlbmVcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYXR0YWNoIChjb250ZXh0KSB7XG4gICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcnVuICgpIHtcbiAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlXG4gICAgbGV0IG5vdywgZHQsIGxhc3QgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KClcbiAgICB0aGlzLl9zY2VuZS5zZXR0dXAoKVxuXG4gICAgY29uc3QgZnJhbWUgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7IF9jb250ZXh0LCBfc2NlbmUsIHJ1bm5pbmcgfSA9IHRoaXNcbiAgICAgIG5vdyA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKVxuICAgICAgZHQgPSAobm93IC0gbGFzdCkgLyAxMDAwOyAgICAvLyBkdXJhdGlvbiBpbiBzZWNvbmRzXG4gICAgICBfc2NlbmUudXBkYXRlKGR0KVxuICAgICAgX2NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIF9jb250ZXh0LmNhbnZhcy53aWR0aCwgX2NvbnRleHQuY2FudmFzLmhlaWdodClcbiAgICAgIF9jb250ZXh0LmJlZ2luUGF0aCgpXG4gICAgICBfY29udGV4dC5zYXZlKClcbiAgICAgIF9zY2VuZS5yZW5kZXIoX2NvbnRleHQsIGR0KVxuICAgICAgX2NvbnRleHQucmVzdG9yZSgpXG4gICAgICBsYXN0ID0gbm93O1xuICAgICAgaWYgKHJ1bm5pbmcpXG4gICAgICAgIHRoaXMuaWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnJhbWUpXG4gICAgICBlbHNlXG4gICAgICAgIHRoaXMuaWQgPSBudWxsXG4gICAgfVxuXG4gICAgdGhpcy5pZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShmcmFtZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIHRoaXMucnVubmluZyA9IGZhbHNlXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2VuZ2luZS5qcyIsImZ1bmN0aW9uIHRvUG9pbnQoY2FudmFzLCBldnQpIHtcbiAgY29uc3QgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgcmV0dXJuIHtcbiAgICB4OiBldnQuY2xpZW50WCAtIHJlY3QubGVmdCxcbiAgICB5OiBldnQuY2xpZW50WSAtIHJlY3QudG9wXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcCB7XG4gIGNvbnN0cnVjdG9yIChjYW52YXMpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhc1xuICAgIHRoaXMuYXQgPSB7eDogMCwgeTogMH1cbiAgICB0aGlzLmRyYXdpbmcgPSBudWxsXG4gICAgdGhpcy5wYXRoID0gW11cblxuICAgIHRoaXMubW92ZSA9IHRoaXMubW92ZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5zdGFydCA9IHRoaXMuc3RhcnQuYmluZCh0aGlzKVxuICAgIHRoaXMuZW5kID0gdGhpcy5lbmQuYmluZCh0aGlzKVxuICB9XG5cbiAgbW92ZSAoZSkge1xuICAgIGlmICh0aGlzLmRyYXdpbmcgIT0gbnVsbCkge1xuICAgICAgdGhpcy5kcmF3aW5nLnRvID0gdG9Qb2ludCh0aGlzLmNhbnZhcywgZSlcbiAgICB9XG4gIH1cblxuICBzdGFydCAoZSkge1xuICAgIGNvbnN0IHBvaW50ID0gdG9Qb2ludCh0aGlzLmNhbnZhcywgZSlcbiAgICB0aGlzLmRyYXdpbmcgPSB7IGZyb206IHBvaW50LCB0bzogcG9pbnQgfVxuICB9XG5cbiAgZW5kIChlKSB7XG4gICAgaWYgKHRoaXMuZHJhd2luZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLmRyYXdpbmcudG8gPSB0b1BvaW50KHRoaXMuY2FudmFzLCBlKVxuICAgICAgdGhpcy5wYXRoLnB1c2godGhpcy5kcmF3aW5nKVxuICAgICAgdGhpcy5kcmF3aW5nID0gbnVsbFxuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL21hcC5qcyIsImltcG9ydCBzZWdtZW50Q29saWRlIGZyb20gJy4vY29saWRlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW11bGF0b3Ige1xuICBjb25zdHJ1Y3RvciAobWFwKSB7XG4gICAgdGhpcy54ID0gNDBcbiAgICB0aGlzLnkgPSAyMDBcbiAgICB0aGlzLm1hcCA9IG1hcFxuICB9XG5cbiAgc2V0dHVwICgpIHtcblxuICB9XG5cbiAgdXBkYXRlIChkdCkge1xuICAgIGNvbnN0IHt4LCB5LCBtYXB9ID0gdGhpc1xuICAgIGNvbnN0IG5ld1ggPSB4ICsgODAqZHRcbiAgICBpZiAoIXRoaXMuY29saWRlKHt4OiBuZXdYLCB5fSkpIHtcbiAgICAgIHRoaXMueCA9IG5ld1hcbiAgICB9XG4gIH1cblxuICBjb2xpZGUgKHRvKSB7XG4gICAgY29uc3Qgc2VnQSAgPSB7IGZyb206IHsgeDogdGhpcy54LCB5OiB0aGlzLnkgfSwgdG8gfVxuICAgIGZvciAobGV0IHNlZ0Igb2YgdGhpcy5tYXAucGF0aCkge1xuICAgICAgaWYgKHNlZ21lbnRDb2xpZGUoc2VnQSwgc2VnQikpIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmVuZGVyIChjdHgsIGR0KSB7XG4gICAgY3R4LmZvbnQgPSBcIjE0cHggQXJpYWxcIjtcbiAgICBjdHguZmlsbFRleHQoYGZwczogJHtNYXRoLnJvdW5kKDEvZHQpfWAsMiwxNCk7XG4gICAgdGhpcy5kcmF3Q2FyKGN0eCwgZHQpXG4gICAgdGhpcy5kcmF3TWFwKGN0eCwgZHQpXG4gIH1cblxuICBkcmF3Q2FyKGN0eCwgZHQpIHtcbiAgICBjb25zdCB7eCwgeX0gPSB0aGlzXG4gICAgY3R4LnJlY3QoeC0xMywgeS03LCAyNiwgMTQpO1xuICAgIGN0eC5maWxsKCk7XG4gIH1cblxuICBkcmF3TWFwKGN0eCwgZHQpIHtcbiAgICBmb3IgKGxldCB7ZnJvbSwgdG99IG9mIHRoaXMubWFwLnBhdGgpIHtcbiAgICAgIGN0eC5tb3ZlVG8oZnJvbS54LCBmcm9tLnkpXG4gICAgICBjdHgubGluZVRvKHRvLngsIHRvLnkpXG4gICAgfVxuICAgIGlmICh0aGlzLm1hcC5kcmF3aW5nICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHtmcm9tLCB0b30gPSB0aGlzLm1hcC5kcmF3aW5nXG4gICAgICBjdHgubW92ZVRvKGZyb20ueCwgZnJvbS55KVxuICAgICAgY3R4LmxpbmVUbyh0by54LCB0by55KVxuICAgIH1cbiAgICBjdHguc3Ryb2tlKCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zaW11bGF0b3IuanMiLCJpbXBvcnQgR2FtZUxvb3AgZnJvbSAnLi9hcHAvZW5naW5lJ1xuaW1wb3J0IFNpbXVsYXRvciBmcm9tICcuL2FwcC9zaW11bGF0b3InXG5pbXBvcnQgTWFwIGZyb20gJy4vYXBwL21hcCdcblxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpXG5jb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbmNvbnN0IG1hcCA9IG5ldyBNYXAoY2FudmFzKVxuXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBtYXAubW92ZSwgZmFsc2UpXG5cbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1hcC5zdGFydCwgZmFsc2UpXG5cbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBtYXAuZW5kLCBmYWxzZSlcblxuY29uc3QgZ2FtZSA9IG5ldyBHYW1lTG9vcCgpXG4gIC5mcHMoNjApXG4gIC5zY2VuZShuZXcgU2ltdWxhdG9yKG1hcCkpXG4gIC5hdHRhY2goY29udGV4dClcbiAgLnJ1bigpXG5cblxud2luZG93LmdhbWUgPSBnYW1lOyAvL3RvIGRlYnVnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAuanMiLCJpbXBvcnQge2NoZWNrSW50ZXJzZWN0aW9uLCBjb2xpbmVhclBvaW50V2l0aGluU2VnbWVudH0gZnJvbSAnbGluZS1pbnRlcnNlY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbGlkZSAoYSwgYikge1xuICBjb25zdCB7IHR5cGUsIHBvaW50IH0gPSBjaGVja0ludGVyc2VjdGlvbihcbiAgICBhLmZyb20ueCwgYS5mcm9tLnksIGEudG8ueCwgYS50by55LFxuICAgIGIuZnJvbS54LCBiLmZyb20ueSwgYi50by54LCBiLnRvLnlcbiAgKVxuXG4gIGlmICh0eXBlID09ICdjb2xpbmVhcicpIHJldHVybiB0cnVlXG5cbiAgaWYgKHR5cGUgPT0gJ2ludGVyc2VjdGluZycpIHJldHVybiB0cnVlXG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvY29saWRlLmpzIiwiZXhwb3J0cy5jaGVja0ludGVyc2VjdGlvbiA9IHJlcXVpcmUoJy4vbGliL2NoZWNrLWludGVyc2VjdGlvbicpO1xuZXhwb3J0cy5jb2xpbmVhclBvaW50V2l0aGluU2VnbWVudCA9IHJlcXVpcmUoJy4vbGliL2NvbGluZWFyLXBvaW50LXdpdGhpbi1zZWdtZW50Jyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L2xpbmUtaW50ZXJzZWN0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuKiBDaGVjayBob3cgdHdvIGxpbmUgc2VnbWVudHMgaW50ZXJzZWN0IGVhY2hvdGhlci4gTGluZSBzZWdtZW50cyBhcmUgcmVwcmVzZW50ZWRcbiogYXMgKHgxLCB5MSktKHgyLCB5MikgYW5kICh4MywgeTMpLSh4NCwgeTQpLlxuKlxuKiBAcGFyYW0ge251bWJlcn0geDFcbiogQHBhcmFtIHtudW1iZXJ9IHkxXG4qIEBwYXJhbSB7bnVtYmVyfSB4MlxuKiBAcGFyYW0ge251bWJlcn0geTJcbiogQHBhcmFtIHtudW1iZXJ9IHgzXG4qIEBwYXJhbSB7bnVtYmVyfSB5M1xuKiBAcGFyYW0ge251bWJlcn0geDRcbiogQHBhcmFtIHtudW1iZXJ9IHk0XG4qIEByZXR1cm4ge29iamVjdH0gT2JqZWN0IGRlc2NyaWJpbmcgaW50ZXJzZWN0aW9uIHRoYXQgbG9va3MgbGlrZVxuKiAgICB7XG4qICAgICAgdHlwZTogbm9uZXxwYXJhbGxlbHxjb2xpbmVhcnxpbnRlcnNlY3RpbmcsXG4qICAgICAgcG9pbnQ6IHt4LCB5fSAtIG9ubHkgZGVmaW5lZCB3aGVuIHR5cGUgPT0gaW50ZXJzZWN0aW5nXG4qICAgIH1cbiovXG5mdW5jdGlvbiBjaGVja0ludGVyc2VjdGlvbih4MSwgeTEsIHgyLCB5MiwgeDMsIHkzLCB4NCwgeTQpIHtcbiAgdmFyIGRlbm9tID0gKCh5NCAtIHkzKSAqICh4MiAtIHgxKSkgLSAoKHg0IC0geDMpICogKHkyIC0geTEpKTtcbiAgdmFyIG51bWVBID0gKCh4NCAtIHgzKSAqICh5MSAtIHkzKSkgLSAoKHk0IC0geTMpICogKHgxIC0geDMpKTtcbiAgdmFyIG51bWVCID0gKCh4MiAtIHgxKSAqICh5MSAtIHkzKSkgLSAoKHkyIC0geTEpICogKHgxIC0geDMpKTtcblxuICBpZiAoZGVub20gPT0gMCkge1xuICAgIGlmIChudW1lQSA9PSAwICYmIG51bWVCID09IDApIHtcbiAgICAgIHJldHVybiBjb2xpbmVhcigpO1xuICAgIH1cbiAgICByZXR1cm4gcGFyYWxsZWwoKTtcbiAgfVxuXG4gIHZhciB1QSA9IG51bWVBIC8gZGVub207XG4gIHZhciB1QiA9IG51bWVCIC8gZGVub207XG5cbiAgaWYgKHVBID49IDAgJiYgdUEgPD0gMSAmJiB1QiA+PSAwICYmIHVCIDw9IDEpIHtcbiAgICB2YXIgcG9pbnQgPSB7XG4gICAgICB4OiB4MSArICh1QSAqICh4MiAtIHgxKSksXG4gICAgICB5OiB5MSArICh1QSAqICh5MiAtIHkxKSlcbiAgICB9O1xuICAgIHJldHVybiBpbnRlcnNlY3RpbmcocG9pbnQpO1xuICB9XG5cbiAgcmV0dXJuIG5vbmUoKTtcbn1cblxuZnVuY3Rpb24gY29saW5lYXIoKSB7XG4gIHJldHVybiBpbnRlcnNlY3RSZXN1bHQoJ2NvbGluZWFyJyk7XG59XG5cbmZ1bmN0aW9uIHBhcmFsbGVsKCkge1xuICByZXR1cm4gaW50ZXJzZWN0UmVzdWx0KCdwYXJhbGxlbCcpO1xufVxuXG5mdW5jdGlvbiBub25lKCkge1xuICByZXR1cm4gaW50ZXJzZWN0UmVzdWx0KCdub25lJyk7XG59XG5cbmZ1bmN0aW9uIGludGVyc2VjdGluZyhwb2ludCkge1xuICB2YXIgcmVzdWx0ID0gaW50ZXJzZWN0UmVzdWx0KCdpbnRlcnNlY3RpbmcnKTtcbiAgcmVzdWx0LnBvaW50ID0gcG9pbnQ7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGludGVyc2VjdFJlc3VsdCh0eXBlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogdHlwZVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrSW50ZXJzZWN0aW9uO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9saW5lLWludGVyc2VjdC9saWIvY2hlY2staW50ZXJzZWN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuKiBBc3N1bWluZyBhIHBvaW50IGlzIG9uIHNhbWUgbGluZSBhcyBhIGxpbmUgc2VnbWVudCwgdGVsbCBpZiB0aGF0IHBvaW50IGlzXG4qIG9uIHRoZSBsaW5lIHNlZ21lbnQuXG4qXG4qIEBwYXJhbSB7bnVtYmVyfSBwb2ludFggLSBYIG9mIHBvaW50XG4qIEBwYXJhbSB7bnVtYmVyfSBwb2ludFkgLSBZIG9mIHBvaW50XG4qIEBwYXJhbSB7bnVtYmVyfSBzdGFydFggLSBYIG9mIGxpbmUgc2VnbWVudCBzdGFydFxuKiBAcGFyYW0ge251bWJlcn0gc3RhcnRZIC0gWSBvZiBsaW5lIHNlZ21lbnQgc3RhcnRcbiogQHBhcmFtIHtudW1iZXJ9IGVuZFggICAtIFggb2YgbGluZSBzZWdtZW50IGVuZFxuKiBAcGFyYW0ge251bWJlcn0gZW5kWSAgIC0gWSBvZiBsaW5lIHNlZ21lbnQgZW5kXG4qIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgcG9pbnQgaXMgd2l0aGluIHNlZ21lbnQsIGZhbHNlIG90aGVyd2lzZS5cbiovXG5mdW5jdGlvbiBjb2xpbmVhclBvaW50V2l0aGluU2VnbWVudChwb2ludFgsIHBvaW50WSwgc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFkpIHtcbiAgaWYgKHN0YXJ0WCAhPSBlbmRYKSB7XG4gICAgaWYgKHN0YXJ0WCA8PSBwb2ludFggJiYgcG9pbnRYIDw9IGVuZFgpIHJldHVybiB0cnVlO1xuICAgIGlmIChzdGFydFggPj0gcG9pbnRYICYmIHBvaW50WCA+PSBlbmRYKSByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoc3RhcnRZIDw9IHBvaW50WSAmJiBwb2ludFkgPD0gZW5kWSkgcmV0dXJuIHRydWU7XG4gICAgaWYgKHN0YXJ0WSA+PSBwb2ludFkgJiYgcG9pbnRZID49IGVuZFkpIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb2xpbmVhclBvaW50V2l0aGluU2VnbWVudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vbGluZS1pbnRlcnNlY3QvbGliL2NvbGluZWFyLXBvaW50LXdpdGhpbi1zZWdtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=