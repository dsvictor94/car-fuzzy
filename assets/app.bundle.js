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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = colide;

var _lineIntersect = __webpack_require__(6);

function colide(a, b) {
  var _checkIntersection = (0, _lineIntersect.checkIntersection)(a.from.x, a.from.y, a.to.x, a.to.y, b.from.x, b.from.y, b.to.x, b.to.y),
      type = _checkIntersection.type,
      point = _checkIntersection.point;

  if (type == 'colinear') return true;

  if (type == 'intersecting') return point;

  return false;
}

/***/ }),
/* 1 */
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
        if (dt < 1) {
          // if too slow skip render and update
          _scene.update(dt);
          _context.clearRect(0, 0, _context.canvas.width, _context.canvas.height);
          _context.beginPath();
          _context.save();
          _scene.render(_context, dt);
          _context.restore();
        }
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
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colide = __webpack_require__(0);

var _colide2 = _interopRequireDefault(_colide);

var _sensor = __webpack_require__(5);

var _sensor2 = _interopRequireDefault(_sensor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SENSOR_RANGE = 100;
var CAR_LENGTH = 36;
var CAR_WIDTH = 14;

var Simulator = function () {
  function Simulator(map) {
    _classCallCheck(this, Simulator);

    this.x = 400;
    this.y = 200;
    this.a = Math.PI / 4; // car angle
    this.o = -Math.PI / 10; // steering wheel angle
    this.velocity = 40;
    this.map = map;
    this.sensorA = new _sensor2.default(this, SENSOR_RANGE, 0);
    this.sensorB = new _sensor2.default(this, SENSOR_RANGE, Math.PI / 4);
    this.sensorC = new _sensor2.default(this, SENSOR_RANGE, -Math.PI / 4);

    window.simulator = this;
  }

  _createClass(Simulator, [{
    key: 'settup',
    value: function settup() {}
  }, {
    key: 'update',
    value: function update(dt) {
      var x = this.x,
          y = this.y,
          a = this.a,
          velocity = this.velocity,
          o = this.o,
          map = this.map;

      var radiosOfRotation = CAR_LENGTH / 2 / Math.tan(o);
      var newX = x + dt * velocity * Math.cos(a + velocity * dt / radiosOfRotation);
      var newY = y + dt * velocity * Math.sin(a + velocity * dt / radiosOfRotation);
      if (!this.colide({ x: newX, y: newY })) {
        this.x = newX;
        this.y = newY;
        this.a += velocity * dt / radiosOfRotation;
      }
      this.sensorA.update();
      this.sensorB.update();
      this.sensorC.update();
    }
  }, {
    key: 'colide',
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
    key: 'render',
    value: function render(ctx, dt) {
      ctx.font = "14px Arial";
      ctx.fillText('fps: ' + Math.round(1 / dt), 2, 14);

      //this.sensorA.render(ctx)
      //this.sensorB.render(ctx)
      //this.sensorC.render(ctx)

      this.drawCar(ctx, dt);
      this.drawMap(ctx, dt);
    }
  }, {
    key: 'drawCar',
    value: function drawCar(ctx, dt) {
      var x = this.x,
          y = this.y,
          a = this.a,
          o = this.o;


      var r = CAR_LENGTH / 2 / Math.tan(o);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(a);

      // car body
      ctx.rect(-7, -CAR_WIDTH / 2, CAR_LENGTH, CAR_WIDTH);
      // rear wheels
      ctx.rect(-3, -CAR_WIDTH / 2 - 2, 6, 2);
      ctx.rect(-3, CAR_WIDTH / 2, 6, 2);

      // ctx.moveTo(0, 0)
      // ctx.lineTo(0, r)

      ctx.save();
      ctx.translate(CAR_LENGTH - 14, -CAR_WIDTH / 2 - 1);
      ctx.rotate(Math.atan((CAR_LENGTH - 14) / (r + CAR_WIDTH)));
      // ctx.moveTo(0, 0)
      // ctx.lineTo(0, r-10)
      ctx.rect(-3, -1, 6, 2);
      ctx.restore();
      ctx.save();
      ctx.translate(CAR_LENGTH - 14, CAR_WIDTH / 2 + 1);
      ctx.rotate(Math.atan((CAR_LENGTH - 14) / r));
      // ctx.moveTo(0, 0)
      // ctx.lineTo(0, r)
      ctx.rect(-3, -1, 6, 2);
      ctx.restore();

      ctx.fill();
      ctx.restore();
    }
  }, {
    key: 'drawMap',
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _engine = __webpack_require__(1);

var _engine2 = _interopRequireDefault(_engine);

var _simulator = __webpack_require__(3);

var _simulator2 = _interopRequireDefault(_simulator);

var _map = __webpack_require__(2);

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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colide = __webpack_require__(0);

var _colide2 = _interopRequireDefault(_colide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sensor = function () {
  function Sensor(simulator, size, angle) {
    _classCallCheck(this, Sensor);

    this.simulator = simulator;
    this.size = size;
    this.angle = angle;

    this.dist = 255;
  }

  _createClass(Sensor, [{
    key: 'sensorSegment',
    value: function sensorSegment() {
      var _simulator = this.simulator,
          x = _simulator.x,
          y = _simulator.y;
      var s = this.size,
          a = this.angle;

      return { from: { x: x, y: y }, to: { x: x + s * Math.cos(a), y: y + s * Math.sin(a) } };
    }
  }, {
    key: 'update',
    value: function update() {
      var segA = this.sensorSegment();
      var _segA$from = segA.from,
          x = _segA$from.x,
          y = _segA$from.y;


      var dist = this.size;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.simulator.map.path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var segB = _step.value;

          var point = (0, _colide2.default)(segA, segB);
          if (point === false) continue;
          if (point === true) return 0;
          var cx = point.x,
              cy = point.y;

          var segDist = Math.sqrt((cx - x) ** 2 + (cy - y) ** 2);
          if (segDist < dist) dist = segDist;
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

      this.dist = parseInt(255 * dist / this.size);
    }
  }, {
    key: 'render',
    value: function render(ctx) {
      var _sensorSegment = this.sensorSegment(),
          from = _sensorSegment.from,
          to = _sensorSegment.to;

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = 'rgb(' + (255 - this.dist) + ', 0, 0)';
      ctx.stroke();
    }
  }]);

  return Sensor;
}();

exports.default = Sensor;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports.checkIntersection = __webpack_require__(7);
exports.colinearPointWithinSegment = __webpack_require__(8);


/***/ }),
/* 7 */
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
/* 8 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTg0YTZiODc4NmViNmZiZTk5ZmQiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvZW5naW5lLmpzIiwid2VicGFjazovLy8uL2FwcC9tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NpbXVsYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NlbnNvci5qcyIsIndlYnBhY2s6Ly8vLi4vfi9saW5lLWludGVyc2VjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9saW5lLWludGVyc2VjdC9saWIvY2hlY2staW50ZXJzZWN0aW9uLmpzIiwid2VicGFjazovLy8uLi9+L2xpbmUtaW50ZXJzZWN0L2xpYi9jb2xpbmVhci1wb2ludC13aXRoaW4tc2VnbWVudC5qcyJdLCJuYW1lcyI6WyJjb2xpZGUiLCJhIiwiYiIsImZyb20iLCJ4IiwieSIsInRvIiwidHlwZSIsInBvaW50IiwiR2FtZUxvb3AiLCJydW5uaW5nIiwiaWQiLCJmcHMiLCJiaW5kIiwic2NlbmUiLCJhdHRhY2giLCJydW4iLCJfZnBzIiwiX3NjZW5lIiwiY29udGV4dCIsIl9jb250ZXh0Iiwibm93IiwiZHQiLCJsYXN0Iiwid2luZG93IiwicGVyZm9ybWFuY2UiLCJzZXR0dXAiLCJmcmFtZSIsInVwZGF0ZSIsImNsZWFyUmVjdCIsImNhbnZhcyIsIndpZHRoIiwiaGVpZ2h0IiwiYmVnaW5QYXRoIiwic2F2ZSIsInJlbmRlciIsInJlc3RvcmUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0b1BvaW50IiwiZXZ0IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNsaWVudFgiLCJsZWZ0IiwiY2xpZW50WSIsInRvcCIsIk1hcCIsImF0IiwiZHJhd2luZyIsInBhdGgiLCJtb3ZlIiwic3RhcnQiLCJlbmQiLCJlIiwicHVzaCIsIlNFTlNPUl9SQU5HRSIsIkNBUl9MRU5HVEgiLCJDQVJfV0lEVEgiLCJTaW11bGF0b3IiLCJtYXAiLCJNYXRoIiwiUEkiLCJvIiwidmVsb2NpdHkiLCJzZW5zb3JBIiwic2Vuc29yQiIsInNlbnNvckMiLCJzaW11bGF0b3IiLCJyYWRpb3NPZlJvdGF0aW9uIiwidGFuIiwibmV3WCIsImNvcyIsIm5ld1kiLCJzaW4iLCJzZWdBIiwic2VnQiIsImN0eCIsImZvbnQiLCJmaWxsVGV4dCIsInJvdW5kIiwiZHJhd0NhciIsImRyYXdNYXAiLCJyIiwidHJhbnNsYXRlIiwicm90YXRlIiwiYXRhbiIsImZpbGwiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZ2V0Q29udGV4dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJnYW1lIiwiU2Vuc29yIiwic2l6ZSIsImFuZ2xlIiwiZGlzdCIsInMiLCJzZW5zb3JTZWdtZW50IiwiY3giLCJjeSIsInNlZ0Rpc3QiLCJzcXJ0IiwicGFyc2VJbnQiLCJzdHJva2VTdHlsZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O2tCQzlEd0JBLE07O0FBRnhCOztBQUVlLFNBQVNBLE1BQVQsQ0FBaUJDLENBQWpCLEVBQW9CQyxDQUFwQixFQUF1QjtBQUFBLDJCQUNa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QUFVLE9BQU87QUFDakIsVUFBVSxPQUFPO0FBQ2pCLFVBQVUsT0FBTztBQUNqQixVQUFVLE9BQU87QUFDakIsVUFBVSxPQUFPO0FBQ2pCLFVBQVUsT0FBTztBQUNqQixVQUFVLE9BQU87QUFDakIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQSxlQUFlLEtBQUs7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxPQUFPO0FBQ2pCLFVBQVUsT0FBTztBQUNqQixVQUFVLE9BQU87QUFDakIsVUFBVSxPQUFPO0FBQ2pCLFVBQVUsT0FBTztBQUNqQixVQUFVLE9BQU87QUFDakIsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYXNzZXRzXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMTg0YTZiODc4NmViNmZiZTk5ZmQiLCJpbXBvcnQge2NoZWNrSW50ZXJzZWN0aW9uLCBjb2xpbmVhclBvaW50V2l0aGluU2VnbWVudH0gZnJvbSAnbGluZS1pbnRlcnNlY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbGlkZSAoYSwgYikge1xuICBjb25zdCB7IHR5cGUsIHBvaW50IH0gPSBjaGVja0ludGVyc2VjdGlvbihcbiAgICBhLmZyb20ueCwgYS5mcm9tLnksIGEudG8ueCwgYS50by55LFxuICAgIGIuZnJvbS54LCBiLmZyb20ueSwgYi50by54LCBiLnRvLnlcbiAgKVxuXG4gIGlmICh0eXBlID09ICdjb2xpbmVhcicpIHJldHVybiB0cnVlXG5cbiAgaWYgKHR5cGUgPT0gJ2ludGVyc2VjdGluZycpIHJldHVybiBwb2ludFxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2NvbGlkZS5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVMb29wIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ydW5uaW5nID0gZmFsc2VcbiAgICB0aGlzLmlkID0gbnVsbFxuICAgIC8vYmluZHNcbiAgICB0aGlzLmZwcyA9IHRoaXMuZnBzLmJpbmQodGhpcylcbiAgICB0aGlzLnNjZW5lID0gdGhpcy5zY2VuZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5hdHRhY2ggPSB0aGlzLmF0dGFjaC5iaW5kKHRoaXMpXG4gICAgdGhpcy5ydW4gPSB0aGlzLnJ1bi5iaW5kKHRoaXMpXG4gIH1cblxuICBmcHMgKGZwcykge1xuICAgIHRoaXMuX2ZwcyA9IGZwc1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzY2VuZSAoc2NlbmUpIHtcbiAgICB0aGlzLl9zY2VuZSA9IHNjZW5lXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGF0dGFjaCAoY29udGV4dCkge1xuICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJ1biAoKSB7XG4gICAgdGhpcy5ydW5uaW5nID0gdHJ1ZVxuICAgIGxldCBub3csIGR0LCBsYXN0ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpXG4gICAgdGhpcy5fc2NlbmUuc2V0dHVwKClcblxuICAgIGNvbnN0IGZyYW1lID0gKCkgPT4ge1xuICAgICAgY29uc3QgeyBfY29udGV4dCwgX3NjZW5lLCBydW5uaW5nIH0gPSB0aGlzXG4gICAgICBub3cgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KClcbiAgICAgIGR0ID0gKG5vdyAtIGxhc3QpIC8gMTAwMDsgICAgLy8gZHVyYXRpb24gaW4gc2Vjb25kc1xuICAgICAgaWYgKGR0IDwgMSkgeyAvLyBpZiB0b28gc2xvdyBza2lwIHJlbmRlciBhbmQgdXBkYXRlXG4gICAgICAgIF9zY2VuZS51cGRhdGUoZHQpXG4gICAgICAgIF9jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBfY29udGV4dC5jYW52YXMud2lkdGgsIF9jb250ZXh0LmNhbnZhcy5oZWlnaHQpXG4gICAgICAgIF9jb250ZXh0LmJlZ2luUGF0aCgpXG4gICAgICAgIF9jb250ZXh0LnNhdmUoKVxuICAgICAgICBfc2NlbmUucmVuZGVyKF9jb250ZXh0LCBkdClcbiAgICAgICAgX2NvbnRleHQucmVzdG9yZSgpXG4gICAgICB9XG4gICAgICBsYXN0ID0gbm93O1xuICAgICAgaWYgKHJ1bm5pbmcpXG4gICAgICAgIHRoaXMuaWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnJhbWUpXG4gICAgICBlbHNlXG4gICAgICAgIHRoaXMuaWQgPSBudWxsXG4gICAgfVxuXG4gICAgdGhpcy5pZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShmcmFtZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIHRoaXMucnVubmluZyA9IGZhbHNlXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2VuZ2luZS5qcyIsImZ1bmN0aW9uIHRvUG9pbnQoY2FudmFzLCBldnQpIHtcbiAgY29uc3QgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgcmV0dXJuIHtcbiAgICB4OiBldnQuY2xpZW50WCAtIHJlY3QubGVmdCxcbiAgICB5OiBldnQuY2xpZW50WSAtIHJlY3QudG9wXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcCB7XG4gIGNvbnN0cnVjdG9yIChjYW52YXMpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhc1xuICAgIHRoaXMuYXQgPSB7eDogMCwgeTogMH1cbiAgICB0aGlzLmRyYXdpbmcgPSBudWxsXG4gICAgdGhpcy5wYXRoID0gW11cblxuICAgIHRoaXMubW92ZSA9IHRoaXMubW92ZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5zdGFydCA9IHRoaXMuc3RhcnQuYmluZCh0aGlzKVxuICAgIHRoaXMuZW5kID0gdGhpcy5lbmQuYmluZCh0aGlzKVxuICB9XG5cbiAgbW92ZSAoZSkge1xuICAgIGlmICh0aGlzLmRyYXdpbmcgIT0gbnVsbCkge1xuICAgICAgdGhpcy5kcmF3aW5nLnRvID0gdG9Qb2ludCh0aGlzLmNhbnZhcywgZSlcbiAgICB9XG4gIH1cblxuICBzdGFydCAoZSkge1xuICAgIGNvbnN0IHBvaW50ID0gdG9Qb2ludCh0aGlzLmNhbnZhcywgZSlcbiAgICB0aGlzLmRyYXdpbmcgPSB7IGZyb206IHBvaW50LCB0bzogcG9pbnQgfVxuICB9XG5cbiAgZW5kIChlKSB7XG4gICAgaWYgKHRoaXMuZHJhd2luZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLmRyYXdpbmcudG8gPSB0b1BvaW50KHRoaXMuY2FudmFzLCBlKVxuICAgICAgdGhpcy5wYXRoLnB1c2godGhpcy5kcmF3aW5nKVxuICAgICAgdGhpcy5kcmF3aW5nID0gbnVsbFxuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL21hcC5qcyIsImltcG9ydCBzZWdtZW50Q29saWRlIGZyb20gJy4vY29saWRlJ1xuaW1wb3J0IFNlbnNvciBmcm9tICcuL3NlbnNvcidcblxuY29uc3QgU0VOU09SX1JBTkdFID0gMTAwXG5jb25zdCBDQVJfTEVOR1RIID0gMzZcbmNvbnN0IENBUl9XSURUSCA9IDE0XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbXVsYXRvciB7XG4gIGNvbnN0cnVjdG9yIChtYXApIHtcbiAgICB0aGlzLnggPSA0MDBcbiAgICB0aGlzLnkgPSAyMDBcbiAgICB0aGlzLmEgPSBNYXRoLlBJLzQgLy8gY2FyIGFuZ2xlXG4gICAgdGhpcy5vID0gLU1hdGguUEkvMTAgLy8gc3RlZXJpbmcgd2hlZWwgYW5nbGVcbiAgICB0aGlzLnZlbG9jaXR5ID0gNDBcbiAgICB0aGlzLm1hcCA9IG1hcFxuICAgIHRoaXMuc2Vuc29yQSA9IG5ldyBTZW5zb3IodGhpcywgU0VOU09SX1JBTkdFLCAwKVxuICAgIHRoaXMuc2Vuc29yQiA9IG5ldyBTZW5zb3IodGhpcywgU0VOU09SX1JBTkdFLCBNYXRoLlBJLzQpXG4gICAgdGhpcy5zZW5zb3JDID0gbmV3IFNlbnNvcih0aGlzLCBTRU5TT1JfUkFOR0UsIC1NYXRoLlBJLzQpXG5cbiAgICB3aW5kb3cuc2ltdWxhdG9yID0gdGhpc1xuICB9XG5cbiAgc2V0dHVwICgpIHtcblxuICB9XG5cbiAgdXBkYXRlIChkdCkge1xuICAgIGNvbnN0IHt4LCB5LCBhLCB2ZWxvY2l0eSwgbywgbWFwfSA9IHRoaXNcbiAgICBjb25zdCByYWRpb3NPZlJvdGF0aW9uID0gKENBUl9MRU5HVEgvMikvTWF0aC50YW4obylcbiAgICBjb25zdCBuZXdYID0geCArIGR0KnZlbG9jaXR5Kk1hdGguY29zKGErdmVsb2NpdHkqZHQvcmFkaW9zT2ZSb3RhdGlvbilcbiAgICBjb25zdCBuZXdZID0geSArIGR0KnZlbG9jaXR5Kk1hdGguc2luKGErdmVsb2NpdHkqZHQvcmFkaW9zT2ZSb3RhdGlvbilcbiAgICBpZiAoIXRoaXMuY29saWRlKHt4OiBuZXdYLCB5OiBuZXdZfSkpIHtcbiAgICAgIHRoaXMueCA9IG5ld1hcbiAgICAgIHRoaXMueSA9IG5ld1lcbiAgICAgIHRoaXMuYSArPSB2ZWxvY2l0eSpkdC9yYWRpb3NPZlJvdGF0aW9uXG4gICAgfVxuICAgIHRoaXMuc2Vuc29yQS51cGRhdGUoKVxuICAgIHRoaXMuc2Vuc29yQi51cGRhdGUoKVxuICAgIHRoaXMuc2Vuc29yQy51cGRhdGUoKVxuICB9XG5cblxuICBjb2xpZGUgKHRvKSB7XG4gICAgY29uc3Qgc2VnQSAgPSB7IGZyb206IHsgeDogdGhpcy54LCB5OiB0aGlzLnkgfSwgdG8gfVxuICAgIGZvciAobGV0IHNlZ0Igb2YgdGhpcy5tYXAucGF0aCkge1xuICAgICAgaWYgKHNlZ21lbnRDb2xpZGUoc2VnQSwgc2VnQikpIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmVuZGVyIChjdHgsIGR0KSB7XG4gICAgY3R4LmZvbnQgPSBcIjE0cHggQXJpYWxcIjtcbiAgICBjdHguZmlsbFRleHQoYGZwczogJHtNYXRoLnJvdW5kKDEvZHQpfWAsMiwxNCk7XG5cbiAgICAvL3RoaXMuc2Vuc29yQS5yZW5kZXIoY3R4KVxuICAgIC8vdGhpcy5zZW5zb3JCLnJlbmRlcihjdHgpXG4gICAgLy90aGlzLnNlbnNvckMucmVuZGVyKGN0eClcblxuICAgIHRoaXMuZHJhd0NhcihjdHgsIGR0KVxuICAgIHRoaXMuZHJhd01hcChjdHgsIGR0KVxuICB9XG5cbiAgZHJhd0NhcihjdHgsIGR0KSB7XG4gICAgY29uc3Qge3gsIHksIGEsIG99ID0gdGhpc1xuXG4gICAgY29uc3QgciA9IChDQVJfTEVOR1RILzIpL01hdGgudGFuKG8pXG5cbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LnRyYW5zbGF0ZSh4LCB5KVxuICAgIGN0eC5yb3RhdGUoYSlcblxuICAgIC8vIGNhciBib2R5XG4gICAgY3R4LnJlY3QoLTcsIC1DQVJfV0lEVEgvMiwgQ0FSX0xFTkdUSCwgQ0FSX1dJRFRIKVxuICAgIC8vIHJlYXIgd2hlZWxzXG4gICAgY3R4LnJlY3QoLTMsIC1DQVJfV0lEVEgvMiAtIDIsIDYsIDIpXG4gICAgY3R4LnJlY3QoLTMsICBDQVJfV0lEVEgvMiwgNiwgMilcblxuICAgIC8vIGN0eC5tb3ZlVG8oMCwgMClcbiAgICAvLyBjdHgubGluZVRvKDAsIHIpXG5cbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LnRyYW5zbGF0ZShDQVJfTEVOR1RIIC0gMTQsIC1DQVJfV0lEVEgvMiAtIDEpXG4gICAgY3R4LnJvdGF0ZShNYXRoLmF0YW4oKENBUl9MRU5HVEggLSAxNCkvKHIgKyBDQVJfV0lEVEgpKSlcbiAgICAvLyBjdHgubW92ZVRvKDAsIDApXG4gICAgLy8gY3R4LmxpbmVUbygwLCByLTEwKVxuICAgIGN0eC5yZWN0KC0zLCAtMSwgNiwgMilcbiAgICBjdHgucmVzdG9yZSgpXG4gICAgY3R4LnNhdmUoKVxuICAgIGN0eC50cmFuc2xhdGUoQ0FSX0xFTkdUSCAtIDE0LCBDQVJfV0lEVEgvMiArIDEpXG4gICAgY3R4LnJvdGF0ZShNYXRoLmF0YW4oKENBUl9MRU5HVEggLSAxNCkvcikpXG4gICAgLy8gY3R4Lm1vdmVUbygwLCAwKVxuICAgIC8vIGN0eC5saW5lVG8oMCwgcilcbiAgICBjdHgucmVjdCgtMywgLTEsIDYsIDIpXG4gICAgY3R4LnJlc3RvcmUoKVxuXG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHgucmVzdG9yZSgpXG4gIH1cblxuICBkcmF3TWFwKGN0eCwgZHQpIHtcbiAgICBmb3IgKGxldCB7ZnJvbSwgdG99IG9mIHRoaXMubWFwLnBhdGgpIHtcbiAgICAgIGN0eC5tb3ZlVG8oZnJvbS54LCBmcm9tLnkpXG4gICAgICBjdHgubGluZVRvKHRvLngsIHRvLnkpXG4gICAgfVxuICAgIGlmICh0aGlzLm1hcC5kcmF3aW5nICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHtmcm9tLCB0b30gPSB0aGlzLm1hcC5kcmF3aW5nXG4gICAgICBjdHgubW92ZVRvKGZyb20ueCwgZnJvbS55KVxuICAgICAgY3R4LmxpbmVUbyh0by54LCB0by55KVxuICAgIH1cbiAgICBjdHguc3Ryb2tlKCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zaW11bGF0b3IuanMiLCJpbXBvcnQgR2FtZUxvb3AgZnJvbSAnLi9hcHAvZW5naW5lJ1xuaW1wb3J0IFNpbXVsYXRvciBmcm9tICcuL2FwcC9zaW11bGF0b3InXG5pbXBvcnQgTWFwIGZyb20gJy4vYXBwL21hcCdcblxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpXG5jb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbmNvbnN0IG1hcCA9IG5ldyBNYXAoY2FudmFzKVxuXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBtYXAubW92ZSwgZmFsc2UpXG5cbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1hcC5zdGFydCwgZmFsc2UpXG5cbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBtYXAuZW5kLCBmYWxzZSlcblxuY29uc3QgZ2FtZSA9IG5ldyBHYW1lTG9vcCgpXG4gIC5mcHMoNjApXG4gIC5zY2VuZShuZXcgU2ltdWxhdG9yKG1hcCkpXG4gIC5hdHRhY2goY29udGV4dClcbiAgLnJ1bigpXG5cblxud2luZG93LmdhbWUgPSBnYW1lOyAvL3RvIGRlYnVnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAuanMiLCJpbXBvcnQgc2VnbWVudENvbGlkZSBmcm9tICcuL2NvbGlkZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Vuc29yIHtcbiAgY29uc3RydWN0b3IgKHNpbXVsYXRvciwgc2l6ZSwgYW5nbGUpIHtcbiAgICB0aGlzLnNpbXVsYXRvciA9IHNpbXVsYXRvclxuICAgIHRoaXMuc2l6ZSA9IHNpemVcbiAgICB0aGlzLmFuZ2xlID0gYW5nbGVcblxuICAgIHRoaXMuZGlzdCA9IDI1NVxuICB9XG5cbiAgc2Vuc29yU2VnbWVudCAoKSB7XG4gICAgY29uc3Qge3gsIHl9ID0gdGhpcy5zaW11bGF0b3JcbiAgICBjb25zdCB7c2l6ZTogcywgYW5nbGU6IGF9ID0gdGhpc1xuICAgIHJldHVybiB7IGZyb206IHt4LCB5fSwgdG86IHsgeDogeCtzKk1hdGguY29zKGEpLCB5OiB5K3MqTWF0aC5zaW4oYSkgfX1cbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBzZWdBID0gdGhpcy5zZW5zb3JTZWdtZW50KClcbiAgICBjb25zdCB7eCwgeX0gPSBzZWdBLmZyb21cblxuICAgIGxldCBkaXN0ID0gdGhpcy5zaXplXG4gICAgZm9yIChsZXQgc2VnQiBvZiB0aGlzLnNpbXVsYXRvci5tYXAucGF0aCkge1xuICAgICAgY29uc3QgcG9pbnQgPSBzZWdtZW50Q29saWRlKHNlZ0EsIHNlZ0IpXG4gICAgICBpZiAocG9pbnQgPT09IGZhbHNlKSBjb250aW51ZVxuICAgICAgaWYgKHBvaW50ID09PSB0cnVlKSByZXR1cm4gMFxuICAgICAgY29uc3Qge3g6Y3gsIHk6Y3l9ID0gcG9pbnRcbiAgICAgIGNvbnN0IHNlZ0Rpc3QgPSBNYXRoLnNxcnQoKGN4LXgpKioyICsgKGN5LXkpKioyKVxuICAgICAgaWYgKHNlZ0Rpc3QgPCBkaXN0KSBkaXN0ID0gc2VnRGlzdFxuICAgIH1cbiAgICB0aGlzLmRpc3QgPSBwYXJzZUludCgyNTUqZGlzdC90aGlzLnNpemUpXG4gIH1cblxuICByZW5kZXIoY3R4KSB7XG4gICAgY29uc3Qge2Zyb20sIHRvfSA9IHRoaXMuc2Vuc29yU2VnbWVudCgpXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4Lm1vdmVUbyhmcm9tLngsIGZyb20ueSlcbiAgICBjdHgubGluZVRvKHRvLngsIHRvLnkpXG4gICAgY3R4LnN0cm9rZVN0eWxlPWByZ2IoJHsyNTUgLSB0aGlzLmRpc3R9LCAwLCAwKWA7XG4gICAgY3R4LnN0cm9rZSgpXG4gIH1cblxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2Vuc29yLmpzIiwiZXhwb3J0cy5jaGVja0ludGVyc2VjdGlvbiA9IHJlcXVpcmUoJy4vbGliL2NoZWNrLWludGVyc2VjdGlvbicpO1xuZXhwb3J0cy5jb2xpbmVhclBvaW50V2l0aGluU2VnbWVudCA9IHJlcXVpcmUoJy4vbGliL2NvbGluZWFyLXBvaW50LXdpdGhpbi1zZWdtZW50Jyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L2xpbmUtaW50ZXJzZWN0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuKiBDaGVjayBob3cgdHdvIGxpbmUgc2VnbWVudHMgaW50ZXJzZWN0IGVhY2hvdGhlci4gTGluZSBzZWdtZW50cyBhcmUgcmVwcmVzZW50ZWRcbiogYXMgKHgxLCB5MSktKHgyLCB5MikgYW5kICh4MywgeTMpLSh4NCwgeTQpLlxuKlxuKiBAcGFyYW0ge251bWJlcn0geDFcbiogQHBhcmFtIHtudW1iZXJ9IHkxXG4qIEBwYXJhbSB7bnVtYmVyfSB4MlxuKiBAcGFyYW0ge251bWJlcn0geTJcbiogQHBhcmFtIHtudW1iZXJ9IHgzXG4qIEBwYXJhbSB7bnVtYmVyfSB5M1xuKiBAcGFyYW0ge251bWJlcn0geDRcbiogQHBhcmFtIHtudW1iZXJ9IHk0XG4qIEByZXR1cm4ge29iamVjdH0gT2JqZWN0IGRlc2NyaWJpbmcgaW50ZXJzZWN0aW9uIHRoYXQgbG9va3MgbGlrZVxuKiAgICB7XG4qICAgICAgdHlwZTogbm9uZXxwYXJhbGxlbHxjb2xpbmVhcnxpbnRlcnNlY3RpbmcsXG4qICAgICAgcG9pbnQ6IHt4LCB5fSAtIG9ubHkgZGVmaW5lZCB3aGVuIHR5cGUgPT0gaW50ZXJzZWN0aW5nXG4qICAgIH1cbiovXG5mdW5jdGlvbiBjaGVja0ludGVyc2VjdGlvbih4MSwgeTEsIHgyLCB5MiwgeDMsIHkzLCB4NCwgeTQpIHtcbiAgdmFyIGRlbm9tID0gKCh5NCAtIHkzKSAqICh4MiAtIHgxKSkgLSAoKHg0IC0geDMpICogKHkyIC0geTEpKTtcbiAgdmFyIG51bWVBID0gKCh4NCAtIHgzKSAqICh5MSAtIHkzKSkgLSAoKHk0IC0geTMpICogKHgxIC0geDMpKTtcbiAgdmFyIG51bWVCID0gKCh4MiAtIHgxKSAqICh5MSAtIHkzKSkgLSAoKHkyIC0geTEpICogKHgxIC0geDMpKTtcblxuICBpZiAoZGVub20gPT0gMCkge1xuICAgIGlmIChudW1lQSA9PSAwICYmIG51bWVCID09IDApIHtcbiAgICAgIHJldHVybiBjb2xpbmVhcigpO1xuICAgIH1cbiAgICByZXR1cm4gcGFyYWxsZWwoKTtcbiAgfVxuXG4gIHZhciB1QSA9IG51bWVBIC8gZGVub207XG4gIHZhciB1QiA9IG51bWVCIC8gZGVub207XG5cbiAgaWYgKHVBID49IDAgJiYgdUEgPD0gMSAmJiB1QiA+PSAwICYmIHVCIDw9IDEpIHtcbiAgICB2YXIgcG9pbnQgPSB7XG4gICAgICB4OiB4MSArICh1QSAqICh4MiAtIHgxKSksXG4gICAgICB5OiB5MSArICh1QSAqICh5MiAtIHkxKSlcbiAgICB9O1xuICAgIHJldHVybiBpbnRlcnNlY3RpbmcocG9pbnQpO1xuICB9XG5cbiAgcmV0dXJuIG5vbmUoKTtcbn1cblxuZnVuY3Rpb24gY29saW5lYXIoKSB7XG4gIHJldHVybiBpbnRlcnNlY3RSZXN1bHQoJ2NvbGluZWFyJyk7XG59XG5cbmZ1bmN0aW9uIHBhcmFsbGVsKCkge1xuICByZXR1cm4gaW50ZXJzZWN0UmVzdWx0KCdwYXJhbGxlbCcpO1xufVxuXG5mdW5jdGlvbiBub25lKCkge1xuICByZXR1cm4gaW50ZXJzZWN0UmVzdWx0KCdub25lJyk7XG59XG5cbmZ1bmN0aW9uIGludGVyc2VjdGluZyhwb2ludCkge1xuICB2YXIgcmVzdWx0ID0gaW50ZXJzZWN0UmVzdWx0KCdpbnRlcnNlY3RpbmcnKTtcbiAgcmVzdWx0LnBvaW50ID0gcG9pbnQ7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGludGVyc2VjdFJlc3VsdCh0eXBlKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogdHlwZVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrSW50ZXJzZWN0aW9uO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9saW5lLWludGVyc2VjdC9saWIvY2hlY2staW50ZXJzZWN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuKiBBc3N1bWluZyBhIHBvaW50IGlzIG9uIHNhbWUgbGluZSBhcyBhIGxpbmUgc2VnbWVudCwgdGVsbCBpZiB0aGF0IHBvaW50IGlzXG4qIG9uIHRoZSBsaW5lIHNlZ21lbnQuXG4qXG4qIEBwYXJhbSB7bnVtYmVyfSBwb2ludFggLSBYIG9mIHBvaW50XG4qIEBwYXJhbSB7bnVtYmVyfSBwb2ludFkgLSBZIG9mIHBvaW50XG4qIEBwYXJhbSB7bnVtYmVyfSBzdGFydFggLSBYIG9mIGxpbmUgc2VnbWVudCBzdGFydFxuKiBAcGFyYW0ge251bWJlcn0gc3RhcnRZIC0gWSBvZiBsaW5lIHNlZ21lbnQgc3RhcnRcbiogQHBhcmFtIHtudW1iZXJ9IGVuZFggICAtIFggb2YgbGluZSBzZWdtZW50IGVuZFxuKiBAcGFyYW0ge251bWJlcn0gZW5kWSAgIC0gWSBvZiBsaW5lIHNlZ21lbnQgZW5kXG4qIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgcG9pbnQgaXMgd2l0aGluIHNlZ21lbnQsIGZhbHNlIG90aGVyd2lzZS5cbiovXG5mdW5jdGlvbiBjb2xpbmVhclBvaW50V2l0aGluU2VnbWVudChwb2ludFgsIHBvaW50WSwgc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFkpIHtcbiAgaWYgKHN0YXJ0WCAhPSBlbmRYKSB7XG4gICAgaWYgKHN0YXJ0WCA8PSBwb2ludFggJiYgcG9pbnRYIDw9IGVuZFgpIHJldHVybiB0cnVlO1xuICAgIGlmIChzdGFydFggPj0gcG9pbnRYICYmIHBvaW50WCA+PSBlbmRYKSByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoc3RhcnRZIDw9IHBvaW50WSAmJiBwb2ludFkgPD0gZW5kWSkgcmV0dXJuIHRydWU7XG4gICAgaWYgKHN0YXJ0WSA+PSBwb2ludFkgJiYgcG9pbnRZID49IGVuZFkpIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb2xpbmVhclBvaW50V2l0aGluU2VnbWVudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vbGluZS1pbnRlcnNlY3QvbGliL2NvbGluZWFyLXBvaW50LXdpdGhpbi1zZWdtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=