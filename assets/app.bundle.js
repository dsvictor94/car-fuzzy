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

var _lineIntersect = __webpack_require__(8);

function colide(a, b) {
  var _checkIntersection = (0, _lineIntersect.checkIntersection)(a.from.x, a.from.y, a.to.x, a.to.y, b.from.x, b.from.y, b.to.x, b.to.y),
      type = _checkIntersection.type,
      point = _checkIntersection.point;

  if (type === 'colinear') return true;

  if (type === 'intersecting') return point;

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
    // binds
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
      var now = void 0;
      var dt = void 0;
      var last = window.performance.now();

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
        if (running) {
          _this.id = window.requestAnimationFrame(frame);
        } else {
          _this.id = null;
        }
      };

      this.id = window.requestAnimationFrame(frame);
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

var _sensor = __webpack_require__(7);

var _sensor2 = _interopRequireDefault(_sensor);

var _brain = __webpack_require__(5);

var _brain2 = _interopRequireDefault(_brain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SENSOR_RANGE = 100;
var CAR_LENGTH = 36;
var CAR_WIDTH = 14;

var Simulator = function () {
  function Simulator(map) {
    _classCallCheck(this, Simulator);

    this.x = 40;
    this.y = 20;
    this.a = Math.PI / 6; // car angle
    this.o = 0; // steering wheel angle
    this.velocity = 40;

    this.map = map;
    this.brain = new _brain2.default(this);

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
          o = this.o;

      var radiosOfRotation = CAR_LENGTH / 2 / Math.tan(o);
      var newX = x + dt * velocity * Math.cos(a + velocity * dt / radiosOfRotation);
      var newY = y + dt * velocity * Math.sin(a + velocity * dt / radiosOfRotation);
      if (!this.colide({ x: newX, y: newY })) {
        this.x = newX;
        this.y = newY;
        this.a += velocity * dt / radiosOfRotation;

        this.sensorA.update();
        this.sensorB.update();
        this.sensorC.update();
      }

      this.brain.think();
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
      ctx.font = '14px Arial';
      ctx.fillText('fps: ' + Math.round(1 / dt), 2, 14);

      this.sensorA.render(ctx);
      this.sensorB.render(ctx);
      this.sensorC.render(ctx);

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

canvas.addEventListener('mousemove', map.move, false);

canvas.addEventListener('mousedown', map.start, false);

canvas.addEventListener('mouseup', map.end, false);

var game = new _engine2.default().fps(60).scene(new _simulator2.default(map)).attach(context).run();

window.game = game; // to debug

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fuzzy = __webpack_require__(6);

var fuzzy = _interopRequireWildcard(_fuzzy);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Brain = function () {
  function Brain(simulator) {
    _classCallCheck(this, Brain);

    this.simulator = simulator;
  }

  _createClass(Brain, [{
    key: 'think',
    value: function think() {
      var _simulator = this.simulator,
          F = _simulator.sensorA,
          R = _simulator.sensorB,
          L = _simulator.sensorC;
      // variavel: objeto a frente -> quantificadores (MP, P, D, MD)

      var MPF = fuzzy.reverseGrade(F.dist, 0, 70);
      var PF = fuzzy.triangle(F.dist, 50, 100, 150);
      var DF = fuzzy.triangle(F.dist, 100, 150, 200);
      var MDF = fuzzy.grade(F.dist, 150, 200);
      // variavel: objeto a direita -> quantificadores (MP, P, D, MD)
      var MPD = fuzzy.reverseGrade(R.dist, 0, 70);
      var PD = fuzzy.triangle(R.dist, 50, 100, 150);
      var DD = fuzzy.triangle(R.dist, 100, 150, 200);
      var MDD = fuzzy.grade(R.dist, 150, 200);
      // variavel: objeto a esquerda -> quantificadores (MP, P, D, MD)
      var MPE = fuzzy.reverseGrade(L.dist, 0, 70);
      var PE = fuzzy.triangle(L.dist, 50, 100, 150);
      var DE = fuzzy.triangle(L.dist, 100, 150, 200);
      var MDE = fuzzy.grade(L.dist, 150, 200);

      console.log('F', F.dist, MPF, PF, DF, MDF);
      console.log('D', R.dist, MPD, PD, DD, MDD);
      console.log('E', L.dist, MPE, PE, DE, MDE);
      // regras
      // variavel: girar -> quantificadores MD, D, N, E, ME

      // MPF MPD MPE => ME ok
      // MPF MPD  PE => ME ok
      // MPF MPD  DE => ME ok
      // MPF MPD MDE => ME ok
      // MPF  PD MPE => MD ok
      // MPF  PD  PE => ME ok
      // MPF  PD  DE => ME ok
      // MPF  PD MDE => ME ok
      // MPF  DD MPE => MD ok
      // MPF  DD  PE => MD ok
      // MPF  DD  DE => MD ok
      // MPF  DD MDE => ME ok
      // MPF MDD MPE => MD ok
      // MPF MDD  PE => MD ok
      // MPF MDD  DE => MD ok
      // MPF MDD MDE => MD ok

      //  PF MPD MPE => N  ok
      //  PF MPD  PE => E  ok
      //  PF MPD  DE => E  ok
      //  PF MPD MDE => E  ok
      //  PF  PD MPE => D  ok
      //  PF  PD  PE => D  ok
      //  PF  PD  DE => E  ok
      //  PF  PD MDE => E  ok
      //  PF  DD MPE => D  ok
      //  PF  DD  PE => D  ok
      //  PF  DD  DE => D  ok
      //  PF  DD MDE => E  ok
      //  PF MDD MPE => D  ok
      //  PF MDD  PE => D  ok
      //  PF MDD  DE => MD ok
      //  PF MDD MDE => MD ok

      //  DF MPD MPE => N  ok
      //  DF MPD  PE => N  ok
      //  DF MPD  DE => E  ok
      //  DF MPD MDE => E  ok
      //  DF  PD MPE => N  ok
      //  DF  PD  PE => N  ok
      //  DF  PD  DE => E  ok
      //  DF  PD MDE => E  ok
      //  DF  DD MPE => D  ok
      //  DF  DD  PE => D  ok
      //  DF  DD  DE => N  ok
      //  DF  DD MDE => E  ok
      //  DF MDD MPE => MD ok
      //  DF MDD  PE => D  ok
      //  DF MDD  DE => D  ok
      //  DF MDD MDE => D  ok

      // MDF MPD MPE => N  ok
      // MDF MPD  PE => D  ok
      // MDF MPD  DE => ME ok
      // MDF MPD MDE => ME ok
      // MDF  PD MPE => D  ok
      // MDF  PD  PE => N  ok
      // MDF  PD  DE => E  ok
      // MDF  PD MDE => E  ok
      // MDF  DD MPE => MD ok
      // MDF  DD  PE => D  ok
      // MDF  DD  DE => N  ok
      // MDF  DD MDE => E  ok
      // MDF MDD MPE => MD ok
      // MDF MDD  PE => MD ok
      // MDF MDD  DE => D  ok
      // MDF MDD MDE => N  ok

      var GMD = fuzzy.or(fuzzy.and(MPF, DD, MPE), fuzzy.and(MPF, DD, PE), fuzzy.and(MPF, DD, DE), fuzzy.and(MPF, MDD, MPE), fuzzy.and(MPF, MDD, PE), fuzzy.and(MPF, MDD, DE), fuzzy.and(MPF, MDD, MDE), fuzzy.and(PF, MDD, DE), fuzzy.and(PF, MDD, MDE), fuzzy.and(MDF, DD, MPE), fuzzy.and(MDF, MDD, MPE), fuzzy.and(MDF, MDD, PE), fuzzy.and(MPF, PD, MPE));

      var GME = fuzzy.or(fuzzy.and(MPF, MPD, MPE), fuzzy.and(MPF, MPD, PE), fuzzy.and(MPF, MPD, DE), fuzzy.and(MPF, PD, PE), fuzzy.and(MPF, PD, DE), fuzzy.and(MPF, PD, MDE), fuzzy.and(MPF, DD, MDE), fuzzy.and(MPF, MPD, DE), fuzzy.and(MPF, MPD, MDE));

      var GD = fuzzy.or(fuzzy.and(PF, PD, MPE), fuzzy.and(PF, PD, PE), fuzzy.and(PF, DD, MPE), fuzzy.and(PF, DD, PE), fuzzy.and(PF, DD, DE), fuzzy.and(PF, MDD, MPE), fuzzy.and(PF, MDD, PE), fuzzy.and(DF, DD, MPE), fuzzy.and(DF, DD, PE), fuzzy.and(DF, MDD, PE), fuzzy.and(DF, MDD, DE), fuzzy.and(DF, MDD, MDE), fuzzy.and(MDF, MPD, PE), fuzzy.and(MDF, PD, MPE), fuzzy.and(MDF, DD, PE), fuzzy.and(MDF, MDD, DE));

      var GE = fuzzy.or(fuzzy.and(PF, MPD, PE), fuzzy.and(PF, MPD, DE), fuzzy.and(PF, MPD, MDE), fuzzy.and(PF, PD, DE), fuzzy.and(PF, PD, MDE), fuzzy.and(PF, DD, MDE), fuzzy.and(DF, MPD, DE), fuzzy.and(DF, MPD, MPE), fuzzy.and(DF, PD, DE), fuzzy.and(DF, PD, MDE), fuzzy.and(DF, DD, MDE), fuzzy.and(MDF, PD, DE), fuzzy.and(MDF, PD, MDE), fuzzy.and(MDF, DD, MDE));

      var GN = fuzzy.or(fuzzy.and(PF, MPD, MPE), fuzzy.and(DF, MPD, MPE), fuzzy.and(PF, MPD, PE), fuzzy.and(DF, PD, MPE), fuzzy.and(DF, PD, PE), fuzzy.and(DF, DD, DE), fuzzy.and(MDF, MPD, MPE), fuzzy.and(MDF, PD, PE), fuzzy.and(MDF, DD, DE), fuzzy.and(MDF, MDD, MDE));

      this.simulator.o = fuzzy.defuzzify(function (v) {
        var cGME = fuzzy.reverseGrade(v, -Math.PI / 4, -Math.PI / 6);
        var cGE = fuzzy.triangle(v, -Math.PI / 4, -Math.PI / 6, 0);
        var cGN = fuzzy.triangle(v, -Math.PI / 6, 0, Math.PI / 6);
        var cGD = fuzzy.triangle(v, 0, Math.PI / 6, Math.PI / 4);
        var cGMD = fuzzy.grade(v, Math.PI / 6, Math.PI / 4);

        return fuzzy.or(fuzzy.and(cGME, GME), fuzzy.and(cGE, GE), fuzzy.and(cGN, GN), fuzzy.and(cGD, GD), fuzzy.and(cGMD, GMD));
      }, -Math.PI / 4, Math.PI / 4);
    }
  }]);

  return Brain;
}();

exports.default = Brain;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.grade = grade;
exports.reverseGrade = reverseGrade;
exports.triangle = triangle;
exports.trapezoid = trapezoid;
exports.and = and;
exports.or = or;
exports.not = not;
exports.defuzzify = defuzzify;
function grade(value, p1, p2) {
  if (value < p1) return 0;
  if (value > p2) return 1;
  return (value - p1) / (p2 - p1);
}

function reverseGrade(value, p1, p2) {
  return 1 - grade(value, p1, p2);
}

function triangle(value, p1, p2, p3) {
  if (value < p2) return grade(value, p1, p2);
  return reverseGrade(value, p2, p3);
}

function trapezoid(value, p1, p2, p3, p4) {
  if (value < p2) return grade(value, p1, p2);
  return reverseGrade(value, p3, p4);
}

function and() {
  return Math.min.apply(Math, arguments);
}

function or() {
  return Math.max.apply(Math, arguments);
}

function not(a) {
  return 1 - a;
}

var DEFAULT_ITERATIONS = 100;
function defuzzify(f, min, max, iterations) {
  var step = (max - min) / (iterations || DEFAULT_ITERATIONS);
  var num = 0;
  var den = 0;
  for (var i = min; i < max; i += step) {
    var v = f(i);
    num += v * i;
    den += v;
  }
  return num / den;
}

/***/ }),
/* 7 */
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
          y = _simulator.y,
          ca = _simulator.a;

      x += 20 * Math.cos(ca);
      y += 20 * Math.sin(ca);
      var s = this.size,
          a = this.angle;

      return { from: { x: x, y: y }, to: { x: x + s * Math.cos(a + ca), y: y + s * Math.sin(a + ca) } };
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

      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = 'rgb(' + (255 - this.dist) + ', 0, 0)';

      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.restore();
    }
  }]);

  return Sensor;
}();

exports.default = Sensor;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports.checkIntersection = __webpack_require__(9);
exports.colinearPointWithinSegment = __webpack_require__(10);


/***/ }),
/* 9 */
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
/* 10 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDI0NmQxMzlmY2NiMDc5YjQ5MWQiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvZW5naW5lLmpzIiwid2VicGFjazovLy8uL2FwcC9tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NpbXVsYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2JyYWluLmpzIiwid2VicGFjazovLy8uL2FwcC9mdXp6eS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2Vuc29yLmpzIiwid2VicGFjazovLy8uLi9+L2xpbmUtaW50ZXJzZWN0L2luZGV4LmpzIiwid2VicGFjazovLy8uLi9+L2xpbmUtaW50ZXJzZWN0L2xpYi9jaGVjay1pbnRlcnNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4uL34vbGluZS1pbnRlcnNlY3QvbGliL2NvbGluZWFyLXBvaW50LXdpdGhpbi1zZWdtZW50LmpzIl0sIm5hbWVzIjpbImNvbGlkZSIsImEiLCJiIiwiZnJvbSIsIngiLCJ5IiwidG8iLCJ0eXBlIiwicG9pbnQiLCJHYW1lTG9vcCIsInJ1bm5pbmciLCJpZCIsImZwcyIsImJpbmQiLCJzY2VuZSIsImF0dGFjaCIsInJ1biIsIl9mcHMiLCJfc2NlbmUiLCJjb250ZXh0IiwiX2NvbnRleHQiLCJub3ciLCJkdCIsImxhc3QiLCJ3aW5kb3ciLCJwZXJmb3JtYW5jZSIsInNldHR1cCIsImZyYW1lIiwidXBkYXRlIiwiY2xlYXJSZWN0IiwiY2FudmFzIiwid2lkdGgiLCJoZWlnaHQiLCJiZWdpblBhdGgiLCJzYXZlIiwicmVuZGVyIiwicmVzdG9yZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInRvUG9pbnQiLCJldnQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY2xpZW50WCIsImxlZnQiLCJjbGllbnRZIiwidG9wIiwiTWFwIiwiYXQiLCJkcmF3aW5nIiwicGF0aCIsIm1vdmUiLCJzdGFydCIsImVuZCIsImUiLCJwdXNoIiwiU0VOU09SX1JBTkdFIiwiQ0FSX0xFTkdUSCIsIkNBUl9XSURUSCIsIlNpbXVsYXRvciIsIm1hcCIsIk1hdGgiLCJQSSIsIm8iLCJ2ZWxvY2l0eSIsImJyYWluIiwic2Vuc29yQSIsInNlbnNvckIiLCJzZW5zb3JDIiwic2ltdWxhdG9yIiwicmFkaW9zT2ZSb3RhdGlvbiIsInRhbiIsIm5ld1giLCJjb3MiLCJuZXdZIiwic2luIiwidGhpbmsiLCJzZWdBIiwic2VnQiIsImN0eCIsImZvbnQiLCJmaWxsVGV4dCIsInJvdW5kIiwiZHJhd0NhciIsImRyYXdNYXAiLCJyIiwidHJhbnNsYXRlIiwicm90YXRlIiwiYXRhbiIsImZpbGwiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZ2V0Q29udGV4dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJnYW1lIiwiZnV6enkiLCJCcmFpbiIsIkYiLCJSIiwiTCIsIk1QRiIsInJldmVyc2VHcmFkZSIsImRpc3QiLCJQRiIsInRyaWFuZ2xlIiwiREYiLCJNREYiLCJncmFkZSIsIk1QRCIsIlBEIiwiREQiLCJNREQiLCJNUEUiLCJQRSIsIkRFIiwiTURFIiwiY29uc29sZSIsImxvZyIsIkdNRCIsIm9yIiwiYW5kIiwiR01FIiwiR0QiLCJHRSIsIkdOIiwiZGVmdXp6aWZ5IiwiY0dNRSIsInYiLCJjR0UiLCJjR04iLCJjR0QiLCJjR01EIiwidHJhcGV6b2lkIiwibm90IiwidmFsdWUiLCJwMSIsInAyIiwicDMiLCJwNCIsIm1pbiIsIm1heCIsIkRFRkFVTFRfSVRFUkFUSU9OUyIsImYiLCJpdGVyYXRpb25zIiwic3RlcCIsIm51bSIsImRlbiIsImkiLCJTZW5zb3IiLCJzaXplIiwiYW5nbGUiLCJjYSIsInMiLCJzZW5zb3JTZWdtZW50IiwiY3giLCJjeSIsInNlZ0Rpc3QiLCJzcXJ0IiwicGFyc2VJbnQiLCJzdHJva2VTdHlsZSJdLCJtYXBwaW5ncyI6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Q0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxPQUFPO0FBQ2pCLFVBQVUsT0FBTztBQUNqQixVQUFVLE9BQU87QUFDakIsVUFBVSxPQUFPO0FBQ2pCLFVBQVUsT0FBTztBQUNqQixVQUFVLE9BQU87QUFDakIsVUFBVSxPQUFPO0FBQ2pCLFVBQVUsT0FBTztBQUNqQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBLGVBQWUsS0FBSztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLE9BQU87QUFDakIsVUFBVSxPQUFPO0FBQ2pCLFVBQVUsT0FBTztBQUNqQixVQUFVLE9BQU87QUFDakIsVUFBVSxPQUFPO0FBQ2pCLFVBQVUsT0FBTztBQUNqQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHNcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkMjQ2ZDEzOWZjY2IwNzliNDkxZCIsImltcG9ydCB7Y2hlY2tJbnRlcnNlY3Rpb259IGZyb20gJ2xpbmUtaW50ZXJzZWN0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb2xpZGUgKGEsIGIpIHtcbiAgY29uc3QgeyB0eXBlLCBwb2ludCB9ID0gY2hlY2tJbnRlcnNlY3Rpb24oXG4gICAgYS5mcm9tLngsIGEuZnJvbS55LCBhLnRvLngsIGEudG8ueSxcbiAgICBiLmZyb20ueCwgYi5mcm9tLnksIGIudG8ueCwgYi50by55XG4gIClcblxuICBpZiAodHlwZSA9PT0gJ2NvbGluZWFyJykgcmV0dXJuIHRydWVcblxuICBpZiAodHlwZSA9PT0gJ2ludGVyc2VjdGluZycpIHJldHVybiBwb2ludFxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2NvbGlkZS5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVMb29wIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMucnVubmluZyA9IGZhbHNlXG4gICAgdGhpcy5pZCA9IG51bGxcbiAgICAvLyBiaW5kc1xuICAgIHRoaXMuZnBzID0gdGhpcy5mcHMuYmluZCh0aGlzKVxuICAgIHRoaXMuc2NlbmUgPSB0aGlzLnNjZW5lLmJpbmQodGhpcylcbiAgICB0aGlzLmF0dGFjaCA9IHRoaXMuYXR0YWNoLmJpbmQodGhpcylcbiAgICB0aGlzLnJ1biA9IHRoaXMucnVuLmJpbmQodGhpcylcbiAgfVxuXG4gIGZwcyAoZnBzKSB7XG4gICAgdGhpcy5fZnBzID0gZnBzXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHNjZW5lIChzY2VuZSkge1xuICAgIHRoaXMuX3NjZW5lID0gc2NlbmVcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYXR0YWNoIChjb250ZXh0KSB7XG4gICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcnVuICgpIHtcbiAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlXG4gICAgbGV0IG5vd1xuICAgIGxldCBkdFxuICAgIGxldCBsYXN0ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpXG5cbiAgICB0aGlzLl9zY2VuZS5zZXR0dXAoKVxuXG4gICAgY29uc3QgZnJhbWUgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7IF9jb250ZXh0LCBfc2NlbmUsIHJ1bm5pbmcgfSA9IHRoaXNcbiAgICAgIG5vdyA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKVxuICAgICAgZHQgPSAobm93IC0gbGFzdCkgLyAxMDAwICAgIC8vIGR1cmF0aW9uIGluIHNlY29uZHNcbiAgICAgIGlmIChkdCA8IDEpIHsgLy8gaWYgdG9vIHNsb3cgc2tpcCByZW5kZXIgYW5kIHVwZGF0ZVxuICAgICAgICBfc2NlbmUudXBkYXRlKGR0KVxuICAgICAgICBfY29udGV4dC5jbGVhclJlY3QoMCwgMCwgX2NvbnRleHQuY2FudmFzLndpZHRoLCBfY29udGV4dC5jYW52YXMuaGVpZ2h0KVxuICAgICAgICBfY29udGV4dC5iZWdpblBhdGgoKVxuICAgICAgICBfY29udGV4dC5zYXZlKClcbiAgICAgICAgX3NjZW5lLnJlbmRlcihfY29udGV4dCwgZHQpXG4gICAgICAgIF9jb250ZXh0LnJlc3RvcmUoKVxuICAgICAgfVxuICAgICAgbGFzdCA9IG5vd1xuICAgICAgaWYgKHJ1bm5pbmcpIHsgdGhpcy5pZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnJhbWUpIH0gZWxzZSB7IHRoaXMuaWQgPSBudWxsIH1cbiAgICB9XG5cbiAgICB0aGlzLmlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmcmFtZSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIHRoaXMucnVubmluZyA9IGZhbHNlXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2VuZ2luZS5qcyIsImZ1bmN0aW9uIHRvUG9pbnQgKGNhbnZhcywgZXZ0KSB7XG4gIGNvbnN0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgcmV0dXJuIHtcbiAgICB4OiBldnQuY2xpZW50WCAtIHJlY3QubGVmdCxcbiAgICB5OiBldnQuY2xpZW50WSAtIHJlY3QudG9wXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwIHtcbiAgY29uc3RydWN0b3IgKGNhbnZhcykge1xuICAgIHRoaXMuY2FudmFzID0gY2FudmFzXG4gICAgdGhpcy5hdCA9IHt4OiAwLCB5OiAwfVxuICAgIHRoaXMuZHJhd2luZyA9IG51bGxcbiAgICB0aGlzLnBhdGggPSBbXVxuXG4gICAgdGhpcy5tb3ZlID0gdGhpcy5tb3ZlLmJpbmQodGhpcylcbiAgICB0aGlzLnN0YXJ0ID0gdGhpcy5zdGFydC5iaW5kKHRoaXMpXG4gICAgdGhpcy5lbmQgPSB0aGlzLmVuZC5iaW5kKHRoaXMpXG4gIH1cblxuICBtb3ZlIChlKSB7XG4gICAgaWYgKHRoaXMuZHJhd2luZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLmRyYXdpbmcudG8gPSB0b1BvaW50KHRoaXMuY2FudmFzLCBlKVxuICAgIH1cbiAgfVxuXG4gIHN0YXJ0IChlKSB7XG4gICAgY29uc3QgcG9pbnQgPSB0b1BvaW50KHRoaXMuY2FudmFzLCBlKVxuICAgIHRoaXMuZHJhd2luZyA9IHsgZnJvbTogcG9pbnQsIHRvOiBwb2ludCB9XG4gIH1cblxuICBlbmQgKGUpIHtcbiAgICBpZiAodGhpcy5kcmF3aW5nICE9IG51bGwpIHtcbiAgICAgIHRoaXMuZHJhd2luZy50byA9IHRvUG9pbnQodGhpcy5jYW52YXMsIGUpXG4gICAgICB0aGlzLnBhdGgucHVzaCh0aGlzLmRyYXdpbmcpXG4gICAgICB0aGlzLmRyYXdpbmcgPSBudWxsXG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvbWFwLmpzIiwiaW1wb3J0IHNlZ21lbnRDb2xpZGUgZnJvbSAnLi9jb2xpZGUnXG5pbXBvcnQgU2Vuc29yIGZyb20gJy4vc2Vuc29yJ1xuaW1wb3J0IEJyYWluIGZyb20gJy4vYnJhaW4nXG5cbmNvbnN0IFNFTlNPUl9SQU5HRSA9IDEwMFxuY29uc3QgQ0FSX0xFTkdUSCA9IDM2XG5jb25zdCBDQVJfV0lEVEggPSAxNFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW11bGF0b3Ige1xuICBjb25zdHJ1Y3RvciAobWFwKSB7XG4gICAgdGhpcy54ID0gNDBcbiAgICB0aGlzLnkgPSAyMFxuICAgIHRoaXMuYSA9IE1hdGguUEkgLyA2IC8vIGNhciBhbmdsZVxuICAgIHRoaXMubyA9IDAgLy8gc3RlZXJpbmcgd2hlZWwgYW5nbGVcbiAgICB0aGlzLnZlbG9jaXR5ID0gNDBcblxuICAgIHRoaXMubWFwID0gbWFwXG4gICAgdGhpcy5icmFpbiA9IG5ldyBCcmFpbih0aGlzKVxuXG4gICAgdGhpcy5zZW5zb3JBID0gbmV3IFNlbnNvcih0aGlzLCBTRU5TT1JfUkFOR0UsIDApXG4gICAgdGhpcy5zZW5zb3JCID0gbmV3IFNlbnNvcih0aGlzLCBTRU5TT1JfUkFOR0UsIE1hdGguUEkgLyA0KVxuICAgIHRoaXMuc2Vuc29yQyA9IG5ldyBTZW5zb3IodGhpcywgU0VOU09SX1JBTkdFLCAtTWF0aC5QSSAvIDQpXG5cbiAgICB3aW5kb3cuc2ltdWxhdG9yID0gdGhpc1xuICB9XG5cbiAgc2V0dHVwICgpIHtcblxuICB9XG5cbiAgdXBkYXRlIChkdCkge1xuICAgIGNvbnN0IHsgeCwgeSwgYSwgdmVsb2NpdHksIG8gfSA9IHRoaXNcbiAgICBjb25zdCByYWRpb3NPZlJvdGF0aW9uID0gKENBUl9MRU5HVEggLyAyKSAvIE1hdGgudGFuKG8pXG4gICAgY29uc3QgbmV3WCA9IHggKyBkdCAqIHZlbG9jaXR5ICogTWF0aC5jb3MoYSArIHZlbG9jaXR5ICogZHQgLyByYWRpb3NPZlJvdGF0aW9uKVxuICAgIGNvbnN0IG5ld1kgPSB5ICsgZHQgKiB2ZWxvY2l0eSAqIE1hdGguc2luKGEgKyB2ZWxvY2l0eSAqIGR0IC8gcmFkaW9zT2ZSb3RhdGlvbilcbiAgICBpZiAoIXRoaXMuY29saWRlKHsgeDogbmV3WCwgeTogbmV3WSB9KSkge1xuICAgICAgdGhpcy54ID0gbmV3WFxuICAgICAgdGhpcy55ID0gbmV3WVxuICAgICAgdGhpcy5hICs9IHZlbG9jaXR5ICogZHQgLyByYWRpb3NPZlJvdGF0aW9uXG5cbiAgICAgIHRoaXMuc2Vuc29yQS51cGRhdGUoKVxuICAgICAgdGhpcy5zZW5zb3JCLnVwZGF0ZSgpXG4gICAgICB0aGlzLnNlbnNvckMudXBkYXRlKClcbiAgICB9XG5cbiAgICB0aGlzLmJyYWluLnRoaW5rKClcbiAgfVxuXG4gIGNvbGlkZSAodG8pIHtcbiAgICBjb25zdCBzZWdBID0geyBmcm9tOiB7IHg6IHRoaXMueCwgeTogdGhpcy55IH0sIHRvIH1cbiAgICBmb3IgKGxldCBzZWdCIG9mIHRoaXMubWFwLnBhdGgpIHtcbiAgICAgIGlmIChzZWdtZW50Q29saWRlKHNlZ0EsIHNlZ0IpKSByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJlbmRlciAoY3R4LCBkdCkge1xuICAgIGN0eC5mb250ID0gJzE0cHggQXJpYWwnXG4gICAgY3R4LmZpbGxUZXh0KGBmcHM6ICR7TWF0aC5yb3VuZCgxIC8gZHQpfWAsIDIsIDE0KVxuXG4gICAgdGhpcy5zZW5zb3JBLnJlbmRlcihjdHgpXG4gICAgdGhpcy5zZW5zb3JCLnJlbmRlcihjdHgpXG4gICAgdGhpcy5zZW5zb3JDLnJlbmRlcihjdHgpXG5cbiAgICB0aGlzLmRyYXdDYXIoY3R4LCBkdClcbiAgICB0aGlzLmRyYXdNYXAoY3R4LCBkdClcbiAgfVxuXG4gIGRyYXdDYXIgKGN0eCwgZHQpIHtcbiAgICBjb25zdCB7eCwgeSwgYSwgb30gPSB0aGlzXG5cbiAgICBjb25zdCByID0gKENBUl9MRU5HVEggLyAyKSAvIE1hdGgudGFuKG8pXG5cbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LnRyYW5zbGF0ZSh4LCB5KVxuICAgIGN0eC5yb3RhdGUoYSlcblxuICAgIC8vIGNhciBib2R5XG4gICAgY3R4LnJlY3QoLTcsIC1DQVJfV0lEVEggLyAyLCBDQVJfTEVOR1RILCBDQVJfV0lEVEgpXG4gICAgLy8gcmVhciB3aGVlbHNcbiAgICBjdHgucmVjdCgtMywgLUNBUl9XSURUSCAvIDIgLSAyLCA2LCAyKVxuICAgIGN0eC5yZWN0KC0zLCBDQVJfV0lEVEggLyAyLCA2LCAyKVxuXG4gICAgLy8gY3R4Lm1vdmVUbygwLCAwKVxuICAgIC8vIGN0eC5saW5lVG8oMCwgcilcblxuICAgIGN0eC5zYXZlKClcbiAgICBjdHgudHJhbnNsYXRlKENBUl9MRU5HVEggLSAxNCwgLUNBUl9XSURUSCAvIDIgLSAxKVxuICAgIGN0eC5yb3RhdGUoTWF0aC5hdGFuKChDQVJfTEVOR1RIIC0gMTQpIC8gKHIgKyBDQVJfV0lEVEgpKSlcbiAgICAvLyBjdHgubW92ZVRvKDAsIDApXG4gICAgLy8gY3R4LmxpbmVUbygwLCByLTEwKVxuICAgIGN0eC5yZWN0KC0zLCAtMSwgNiwgMilcbiAgICBjdHgucmVzdG9yZSgpXG4gICAgY3R4LnNhdmUoKVxuICAgIGN0eC50cmFuc2xhdGUoQ0FSX0xFTkdUSCAtIDE0LCBDQVJfV0lEVEggLyAyICsgMSlcbiAgICBjdHgucm90YXRlKE1hdGguYXRhbigoQ0FSX0xFTkdUSCAtIDE0KSAvIHIpKVxuICAgIC8vIGN0eC5tb3ZlVG8oMCwgMClcbiAgICAvLyBjdHgubGluZVRvKDAsIHIpXG4gICAgY3R4LnJlY3QoLTMsIC0xLCA2LCAyKVxuICAgIGN0eC5yZXN0b3JlKClcblxuICAgIGN0eC5maWxsKClcbiAgICBjdHgucmVzdG9yZSgpXG4gIH1cblxuICBkcmF3TWFwIChjdHgsIGR0KSB7XG4gICAgZm9yIChsZXQgeyBmcm9tLCB0byB9IG9mIHRoaXMubWFwLnBhdGgpIHtcbiAgICAgIGN0eC5tb3ZlVG8oZnJvbS54LCBmcm9tLnkpXG4gICAgICBjdHgubGluZVRvKHRvLngsIHRvLnkpXG4gICAgfVxuICAgIGlmICh0aGlzLm1hcC5kcmF3aW5nICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHtmcm9tLCB0b30gPSB0aGlzLm1hcC5kcmF3aW5nXG4gICAgICBjdHgubW92ZVRvKGZyb20ueCwgZnJvbS55KVxuICAgICAgY3R4LmxpbmVUbyh0by54LCB0by55KVxuICAgIH1cbiAgICBjdHguc3Ryb2tlKClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NpbXVsYXRvci5qcyIsImltcG9ydCBHYW1lTG9vcCBmcm9tICcuL2FwcC9lbmdpbmUnXG5pbXBvcnQgU2ltdWxhdG9yIGZyb20gJy4vYXBwL3NpbXVsYXRvcidcbmltcG9ydCBNYXAgZnJvbSAnLi9hcHAvbWFwJ1xuXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJylcbmNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuXG5jb25zdCBtYXAgPSBuZXcgTWFwKGNhbnZhcylcblxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1hcC5tb3ZlLCBmYWxzZSlcblxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG1hcC5zdGFydCwgZmFsc2UpXG5cbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbWFwLmVuZCwgZmFsc2UpXG5cbmNvbnN0IGdhbWUgPSBuZXcgR2FtZUxvb3AoKVxuICAuZnBzKDYwKVxuICAuc2NlbmUobmV3IFNpbXVsYXRvcihtYXApKVxuICAuYXR0YWNoKGNvbnRleHQpXG4gIC5ydW4oKVxuXG53aW5kb3cuZ2FtZSA9IGdhbWUgLy8gdG8gZGVidWdcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC5qcyIsImltcG9ydCAqIGFzIGZ1enp5IGZyb20gJy4vZnV6enknXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJyYWluIHtcbiAgY29uc3RydWN0b3IgKHNpbXVsYXRvcikge1xuICAgIHRoaXMuc2ltdWxhdG9yID0gc2ltdWxhdG9yXG4gIH1cblxuICB0aGluayAoKSB7XG4gICAgY29uc3QgeyBzZW5zb3JBOiBGLCBzZW5zb3JCOiBSLCBzZW5zb3JDOiBMIH0gPSB0aGlzLnNpbXVsYXRvclxuICAgIC8vIHZhcmlhdmVsOiBvYmpldG8gYSBmcmVudGUgLT4gcXVhbnRpZmljYWRvcmVzIChNUCwgUCwgRCwgTUQpXG4gICAgY29uc3QgTVBGID0gZnV6enkucmV2ZXJzZUdyYWRlKEYuZGlzdCwgMCwgNzApXG4gICAgY29uc3QgUEYgPSBmdXp6eS50cmlhbmdsZShGLmRpc3QsIDUwLCAxMDAsIDE1MClcbiAgICBjb25zdCBERiA9IGZ1enp5LnRyaWFuZ2xlKEYuZGlzdCwgMTAwLCAxNTAsIDIwMClcbiAgICBjb25zdCBNREYgPSBmdXp6eS5ncmFkZShGLmRpc3QsIDE1MCwgMjAwKVxuICAgIC8vIHZhcmlhdmVsOiBvYmpldG8gYSBkaXJlaXRhIC0+IHF1YW50aWZpY2Fkb3JlcyAoTVAsIFAsIEQsIE1EKVxuICAgIGNvbnN0IE1QRCA9IGZ1enp5LnJldmVyc2VHcmFkZShSLmRpc3QsIDAsIDcwKVxuICAgIGNvbnN0IFBEID0gZnV6enkudHJpYW5nbGUoUi5kaXN0LCA1MCwgMTAwLCAxNTApXG4gICAgY29uc3QgREQgPSBmdXp6eS50cmlhbmdsZShSLmRpc3QsIDEwMCwgMTUwLCAyMDApXG4gICAgY29uc3QgTUREID0gZnV6enkuZ3JhZGUoUi5kaXN0LCAxNTAsIDIwMClcbiAgICAvLyB2YXJpYXZlbDogb2JqZXRvIGEgZXNxdWVyZGEgLT4gcXVhbnRpZmljYWRvcmVzIChNUCwgUCwgRCwgTUQpXG4gICAgY29uc3QgTVBFID0gZnV6enkucmV2ZXJzZUdyYWRlKEwuZGlzdCwgMCwgNzApXG4gICAgY29uc3QgUEUgPSBmdXp6eS50cmlhbmdsZShMLmRpc3QsIDUwLCAxMDAsIDE1MClcbiAgICBjb25zdCBERSA9IGZ1enp5LnRyaWFuZ2xlKEwuZGlzdCwgMTAwLCAxNTAsIDIwMClcbiAgICBjb25zdCBNREUgPSBmdXp6eS5ncmFkZShMLmRpc3QsIDE1MCwgMjAwKVxuXG4gICAgY29uc29sZS5sb2coJ0YnLCBGLmRpc3QsIE1QRiwgUEYsIERGLCBNREYpXG4gICAgY29uc29sZS5sb2coJ0QnLCBSLmRpc3QsIE1QRCwgUEQsIERELCBNREQpXG4gICAgY29uc29sZS5sb2coJ0UnLCBMLmRpc3QsIE1QRSwgUEUsIERFLCBNREUpXG4gICAgLy8gcmVncmFzXG4gICAgLy8gdmFyaWF2ZWw6IGdpcmFyIC0+IHF1YW50aWZpY2Fkb3JlcyBNRCwgRCwgTiwgRSwgTUVcblxuICAgIC8vIE1QRiBNUEQgTVBFID0+IE1FIG9rXG4gICAgLy8gTVBGIE1QRCAgUEUgPT4gTUUgb2tcbiAgICAvLyBNUEYgTVBEICBERSA9PiBNRSBva1xuICAgIC8vIE1QRiBNUEQgTURFID0+IE1FIG9rXG4gICAgLy8gTVBGICBQRCBNUEUgPT4gTUQgb2tcbiAgICAvLyBNUEYgIFBEICBQRSA9PiBNRSBva1xuICAgIC8vIE1QRiAgUEQgIERFID0+IE1FIG9rXG4gICAgLy8gTVBGICBQRCBNREUgPT4gTUUgb2tcbiAgICAvLyBNUEYgIEREIE1QRSA9PiBNRCBva1xuICAgIC8vIE1QRiAgREQgIFBFID0+IE1EIG9rXG4gICAgLy8gTVBGICBERCAgREUgPT4gTUQgb2tcbiAgICAvLyBNUEYgIEREIE1ERSA9PiBNRSBva1xuICAgIC8vIE1QRiBNREQgTVBFID0+IE1EIG9rXG4gICAgLy8gTVBGIE1ERCAgUEUgPT4gTUQgb2tcbiAgICAvLyBNUEYgTUREICBERSA9PiBNRCBva1xuICAgIC8vIE1QRiBNREQgTURFID0+IE1EIG9rXG5cbiAgICAvLyAgUEYgTVBEIE1QRSA9PiBOICBva1xuICAgIC8vICBQRiBNUEQgIFBFID0+IEUgIG9rXG4gICAgLy8gIFBGIE1QRCAgREUgPT4gRSAgb2tcbiAgICAvLyAgUEYgTVBEIE1ERSA9PiBFICBva1xuICAgIC8vICBQRiAgUEQgTVBFID0+IEQgIG9rXG4gICAgLy8gIFBGICBQRCAgUEUgPT4gRCAgb2tcbiAgICAvLyAgUEYgIFBEICBERSA9PiBFICBva1xuICAgIC8vICBQRiAgUEQgTURFID0+IEUgIG9rXG4gICAgLy8gIFBGICBERCBNUEUgPT4gRCAgb2tcbiAgICAvLyAgUEYgIEREICBQRSA9PiBEICBva1xuICAgIC8vICBQRiAgREQgIERFID0+IEQgIG9rXG4gICAgLy8gIFBGICBERCBNREUgPT4gRSAgb2tcbiAgICAvLyAgUEYgTUREIE1QRSA9PiBEICBva1xuICAgIC8vICBQRiBNREQgIFBFID0+IEQgIG9rXG4gICAgLy8gIFBGIE1ERCAgREUgPT4gTUQgb2tcbiAgICAvLyAgUEYgTUREIE1ERSA9PiBNRCBva1xuXG4gICAgLy8gIERGIE1QRCBNUEUgPT4gTiAgb2tcbiAgICAvLyAgREYgTVBEICBQRSA9PiBOICBva1xuICAgIC8vICBERiBNUEQgIERFID0+IEUgIG9rXG4gICAgLy8gIERGIE1QRCBNREUgPT4gRSAgb2tcbiAgICAvLyAgREYgIFBEIE1QRSA9PiBOICBva1xuICAgIC8vICBERiAgUEQgIFBFID0+IE4gIG9rXG4gICAgLy8gIERGICBQRCAgREUgPT4gRSAgb2tcbiAgICAvLyAgREYgIFBEIE1ERSA9PiBFICBva1xuICAgIC8vICBERiAgREQgTVBFID0+IEQgIG9rXG4gICAgLy8gIERGICBERCAgUEUgPT4gRCAgb2tcbiAgICAvLyAgREYgIEREICBERSA9PiBOICBva1xuICAgIC8vICBERiAgREQgTURFID0+IEUgIG9rXG4gICAgLy8gIERGIE1ERCBNUEUgPT4gTUQgb2tcbiAgICAvLyAgREYgTUREICBQRSA9PiBEICBva1xuICAgIC8vICBERiBNREQgIERFID0+IEQgIG9rXG4gICAgLy8gIERGIE1ERCBNREUgPT4gRCAgb2tcblxuICAgIC8vIE1ERiBNUEQgTVBFID0+IE4gIG9rXG4gICAgLy8gTURGIE1QRCAgUEUgPT4gRCAgb2tcbiAgICAvLyBNREYgTVBEICBERSA9PiBNRSBva1xuICAgIC8vIE1ERiBNUEQgTURFID0+IE1FIG9rXG4gICAgLy8gTURGICBQRCBNUEUgPT4gRCAgb2tcbiAgICAvLyBNREYgIFBEICBQRSA9PiBOICBva1xuICAgIC8vIE1ERiAgUEQgIERFID0+IEUgIG9rXG4gICAgLy8gTURGICBQRCBNREUgPT4gRSAgb2tcbiAgICAvLyBNREYgIEREIE1QRSA9PiBNRCBva1xuICAgIC8vIE1ERiAgREQgIFBFID0+IEQgIG9rXG4gICAgLy8gTURGICBERCAgREUgPT4gTiAgb2tcbiAgICAvLyBNREYgIEREIE1ERSA9PiBFICBva1xuICAgIC8vIE1ERiBNREQgTVBFID0+IE1EIG9rXG4gICAgLy8gTURGIE1ERCAgUEUgPT4gTUQgb2tcbiAgICAvLyBNREYgTUREICBERSA9PiBEICBva1xuICAgIC8vIE1ERiBNREQgTURFID0+IE4gIG9rXG5cbiAgICBjb25zdCBHTUQgPSBmdXp6eS5vcihcbiAgICAgIGZ1enp5LmFuZChNUEYsIERELCBNUEUpLFxuICAgICAgZnV6enkuYW5kKE1QRiwgREQsIFBFKSxcbiAgICAgIGZ1enp5LmFuZChNUEYsIERELCBERSksXG4gICAgICBmdXp6eS5hbmQoTVBGLCBNREQsIE1QRSksXG4gICAgICBmdXp6eS5hbmQoTVBGLCBNREQsIFBFKSxcbiAgICAgIGZ1enp5LmFuZChNUEYsIE1ERCwgREUpLFxuICAgICAgZnV6enkuYW5kKE1QRiwgTURELCBNREUpLFxuICAgICAgZnV6enkuYW5kKFBGLCBNREQsIERFKSxcbiAgICAgIGZ1enp5LmFuZChQRiwgTURELCBNREUpLFxuICAgICAgZnV6enkuYW5kKE1ERiwgREQsIE1QRSksXG4gICAgICBmdXp6eS5hbmQoTURGLCBNREQsIE1QRSksXG4gICAgICBmdXp6eS5hbmQoTURGLCBNREQsIFBFKSxcbiAgICAgIGZ1enp5LmFuZChNUEYsIFBELCBNUEUpXG4gICAgKVxuXG4gICAgY29uc3QgR01FID0gZnV6enkub3IoXG4gICAgICBmdXp6eS5hbmQoTVBGLCBNUEQsIE1QRSksXG4gICAgICBmdXp6eS5hbmQoTVBGLCBNUEQsIFBFKSxcbiAgICAgIGZ1enp5LmFuZChNUEYsIE1QRCwgREUpLFxuICAgICAgZnV6enkuYW5kKE1QRiwgUEQsIFBFKSxcbiAgICAgIGZ1enp5LmFuZChNUEYsIFBELCBERSksXG4gICAgICBmdXp6eS5hbmQoTVBGLCBQRCwgTURFKSxcbiAgICAgIGZ1enp5LmFuZChNUEYsIERELCBNREUpLFxuICAgICAgZnV6enkuYW5kKE1QRiwgTVBELCBERSksXG4gICAgICBmdXp6eS5hbmQoTVBGLCBNUEQsIE1ERSlcbiAgICApXG5cbiAgICBjb25zdCBHRCA9IGZ1enp5Lm9yKFxuICAgICAgZnV6enkuYW5kKFBGLCBQRCwgTVBFKSxcbiAgICAgIGZ1enp5LmFuZChQRiwgUEQsIFBFKSxcbiAgICAgIGZ1enp5LmFuZChQRiwgREQsIE1QRSksXG4gICAgICBmdXp6eS5hbmQoUEYsIERELCBQRSksXG4gICAgICBmdXp6eS5hbmQoUEYsIERELCBERSksXG4gICAgICBmdXp6eS5hbmQoUEYsIE1ERCwgTVBFKSxcbiAgICAgIGZ1enp5LmFuZChQRiwgTURELCBQRSksXG4gICAgICBmdXp6eS5hbmQoREYsIERELCBNUEUpLFxuICAgICAgZnV6enkuYW5kKERGLCBERCwgUEUpLFxuICAgICAgZnV6enkuYW5kKERGLCBNREQsIFBFKSxcbiAgICAgIGZ1enp5LmFuZChERiwgTURELCBERSksXG4gICAgICBmdXp6eS5hbmQoREYsIE1ERCwgTURFKSxcbiAgICAgIGZ1enp5LmFuZChNREYsIE1QRCwgUEUpLFxuICAgICAgZnV6enkuYW5kKE1ERiwgUEQsIE1QRSksXG4gICAgICBmdXp6eS5hbmQoTURGLCBERCwgUEUpLFxuICAgICAgZnV6enkuYW5kKE1ERiwgTURELCBERSlcbiAgICApXG5cbiAgICBjb25zdCBHRSA9IGZ1enp5Lm9yKFxuICAgICAgZnV6enkuYW5kKFBGLCBNUEQsIFBFKSxcbiAgICAgIGZ1enp5LmFuZChQRiwgTVBELCBERSksXG4gICAgICBmdXp6eS5hbmQoUEYsIE1QRCwgTURFKSxcbiAgICAgIGZ1enp5LmFuZChQRiwgUEQsIERFKSxcbiAgICAgIGZ1enp5LmFuZChQRiwgUEQsIE1ERSksXG4gICAgICBmdXp6eS5hbmQoUEYsIERELCBNREUpLFxuICAgICAgZnV6enkuYW5kKERGLCBNUEQsIERFKSxcbiAgICAgIGZ1enp5LmFuZChERiwgTVBELCBNUEUpLFxuICAgICAgZnV6enkuYW5kKERGLCBQRCwgREUpLFxuICAgICAgZnV6enkuYW5kKERGLCBQRCwgTURFKSxcbiAgICAgIGZ1enp5LmFuZChERiwgREQsIE1ERSksXG4gICAgICBmdXp6eS5hbmQoTURGLCBQRCwgREUpLFxuICAgICAgZnV6enkuYW5kKE1ERiwgUEQsIE1ERSksXG4gICAgICBmdXp6eS5hbmQoTURGLCBERCwgTURFKVxuICAgIClcblxuICAgIGNvbnN0IEdOID0gZnV6enkub3IoXG4gICAgICBmdXp6eS5hbmQoUEYsIE1QRCwgTVBFKSxcbiAgICAgIGZ1enp5LmFuZChERiwgTVBELCBNUEUpLFxuICAgICAgZnV6enkuYW5kKFBGLCBNUEQsIFBFKSxcbiAgICAgIGZ1enp5LmFuZChERiwgUEQsIE1QRSksXG4gICAgICBmdXp6eS5hbmQoREYsIFBELCBQRSksXG4gICAgICBmdXp6eS5hbmQoREYsIERELCBERSksXG4gICAgICBmdXp6eS5hbmQoTURGLCBNUEQsIE1QRSksXG4gICAgICBmdXp6eS5hbmQoTURGLCBQRCwgUEUpLFxuICAgICAgZnV6enkuYW5kKE1ERiwgREQsIERFKSxcbiAgICAgIGZ1enp5LmFuZChNREYsIE1ERCwgTURFKVxuICAgIClcblxuICAgIHRoaXMuc2ltdWxhdG9yLm8gPSBmdXp6eS5kZWZ1enppZnkodiA9PiB7XG4gICAgICBjb25zdCBjR01FID0gZnV6enkucmV2ZXJzZUdyYWRlKHYsIC1NYXRoLlBJIC8gNCwgLU1hdGguUEkgLyA2KVxuICAgICAgY29uc3QgY0dFID0gZnV6enkudHJpYW5nbGUodiwgLU1hdGguUEkgLyA0LCAtTWF0aC5QSSAvIDYsIDApXG4gICAgICBjb25zdCBjR04gPSBmdXp6eS50cmlhbmdsZSh2LCAtTWF0aC5QSSAvIDYsIDAsIE1hdGguUEkgLyA2KVxuICAgICAgY29uc3QgY0dEID0gZnV6enkudHJpYW5nbGUodiwgMCwgTWF0aC5QSSAvIDYsIE1hdGguUEkgLyA0KVxuICAgICAgY29uc3QgY0dNRCA9IGZ1enp5LmdyYWRlKHYsIE1hdGguUEkgLyA2LCBNYXRoLlBJIC8gNClcblxuICAgICAgcmV0dXJuIGZ1enp5Lm9yKFxuICAgICAgICBmdXp6eS5hbmQoY0dNRSwgR01FKSxcbiAgICAgICAgZnV6enkuYW5kKGNHRSwgR0UpLFxuICAgICAgICBmdXp6eS5hbmQoY0dOLCBHTiksXG4gICAgICAgIGZ1enp5LmFuZChjR0QsIEdEKSxcbiAgICAgICAgZnV6enkuYW5kKGNHTUQsIEdNRClcbiAgICAgIClcbiAgICB9LCAtTWF0aC5QSSAvIDQsIE1hdGguUEkgLyA0KVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvYnJhaW4uanMiLCJleHBvcnQgZnVuY3Rpb24gZ3JhZGUgKHZhbHVlLCBwMSwgcDIpIHtcbiAgaWYgKHZhbHVlIDwgcDEpIHJldHVybiAwXG4gIGlmICh2YWx1ZSA+IHAyKSByZXR1cm4gMVxuICByZXR1cm4gKHZhbHVlIC0gcDEpIC8gKHAyIC0gcDEpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXZlcnNlR3JhZGUgKHZhbHVlLCBwMSwgcDIpIHtcbiAgcmV0dXJuIDEgLSBncmFkZSh2YWx1ZSwgcDEsIHAyKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJpYW5nbGUgKHZhbHVlLCBwMSwgcDIsIHAzKSB7XG4gIGlmICh2YWx1ZSA8IHAyKSByZXR1cm4gZ3JhZGUodmFsdWUsIHAxLCBwMilcbiAgcmV0dXJuIHJldmVyc2VHcmFkZSh2YWx1ZSwgcDIsIHAzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJhcGV6b2lkICh2YWx1ZSwgcDEsIHAyLCBwMywgcDQpIHtcbiAgaWYgKHZhbHVlIDwgcDIpIHJldHVybiBncmFkZSh2YWx1ZSwgcDEsIHAyKVxuICByZXR1cm4gcmV2ZXJzZUdyYWRlKHZhbHVlLCBwMywgcDQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbmQgKC4uLnZhbHVlcykge1xuICByZXR1cm4gTWF0aC5taW4oLi4udmFsdWVzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb3IgKC4uLnZhbHVlcykge1xuICByZXR1cm4gTWF0aC5tYXgoLi4udmFsdWVzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm90IChhKSB7XG4gIHJldHVybiAxIC0gYVxufVxuXG5jb25zdCBERUZBVUxUX0lURVJBVElPTlMgPSAxMDBcbmV4cG9ydCBmdW5jdGlvbiBkZWZ1enppZnkgKGYsIG1pbiwgbWF4LCBpdGVyYXRpb25zKSB7XG4gIGNvbnN0IHN0ZXAgPSAobWF4IC0gbWluKSAvIChpdGVyYXRpb25zIHx8IERFRkFVTFRfSVRFUkFUSU9OUylcbiAgbGV0IG51bSA9IDBcbiAgbGV0IGRlbiA9IDBcbiAgZm9yIChsZXQgaSA9IG1pbjsgaSA8IG1heDsgaSArPSBzdGVwKSB7XG4gICAgY29uc3QgdiA9IGYoaSlcbiAgICBudW0gKz0gdiAqIGlcbiAgICBkZW4gKz0gdlxuICB9XG4gIHJldHVybiBudW0gLyBkZW5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9mdXp6eS5qcyIsImltcG9ydCBzZWdtZW50Q29saWRlIGZyb20gJy4vY29saWRlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZW5zb3Ige1xuICBjb25zdHJ1Y3RvciAoc2ltdWxhdG9yLCBzaXplLCBhbmdsZSkge1xuICAgIHRoaXMuc2ltdWxhdG9yID0gc2ltdWxhdG9yXG4gICAgdGhpcy5zaXplID0gc2l6ZVxuICAgIHRoaXMuYW5nbGUgPSBhbmdsZVxuXG4gICAgdGhpcy5kaXN0ID0gMjU1XG4gIH1cblxuICBzZW5zb3JTZWdtZW50ICgpIHtcbiAgICBsZXQge3gsIHksIGE6IGNhfSA9IHRoaXMuc2ltdWxhdG9yXG4gICAgeCArPSAyMCAqIE1hdGguY29zKGNhKVxuICAgIHkgKz0gMjAgKiBNYXRoLnNpbihjYSlcbiAgICBjb25zdCB7c2l6ZTogcywgYW5nbGU6IGF9ID0gdGhpc1xuICAgIHJldHVybiB7IGZyb206IHsgeCwgeSB9LCB0bzogeyB4OiB4ICsgcyAqIE1hdGguY29zKGEgKyBjYSksIHk6IHkgKyBzICogTWF0aC5zaW4oYSArIGNhKSB9IH1cbiAgfVxuXG4gIHVwZGF0ZSAoKSB7XG4gICAgY29uc3Qgc2VnQSA9IHRoaXMuc2Vuc29yU2VnbWVudCgpXG4gICAgY29uc3Qge3gsIHl9ID0gc2VnQS5mcm9tXG5cbiAgICBsZXQgZGlzdCA9IHRoaXMuc2l6ZVxuICAgIGZvciAobGV0IHNlZ0Igb2YgdGhpcy5zaW11bGF0b3IubWFwLnBhdGgpIHtcbiAgICAgIGNvbnN0IHBvaW50ID0gc2VnbWVudENvbGlkZShzZWdBLCBzZWdCKVxuICAgICAgaWYgKHBvaW50ID09PSBmYWxzZSkgY29udGludWVcbiAgICAgIGlmIChwb2ludCA9PT0gdHJ1ZSkgcmV0dXJuIDBcbiAgICAgIGNvbnN0IHt4OiBjeCwgeTogY3l9ID0gcG9pbnRcbiAgICAgIGNvbnN0IHNlZ0Rpc3QgPSBNYXRoLnNxcnQoKGN4IC0geCkgKiogMiArIChjeSAtIHkpICoqIDIpXG4gICAgICBpZiAoc2VnRGlzdCA8IGRpc3QpIGRpc3QgPSBzZWdEaXN0XG4gICAgfVxuICAgIHRoaXMuZGlzdCA9IHBhcnNlSW50KDI1NSAqIGRpc3QgLyB0aGlzLnNpemUpXG4gIH1cblxuICByZW5kZXIgKGN0eCkge1xuICAgIGNvbnN0IHtmcm9tLCB0b30gPSB0aGlzLnNlbnNvclNlZ21lbnQoKVxuICAgIGN0eC5zYXZlKClcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBgcmdiKCR7MjU1IC0gdGhpcy5kaXN0fSwgMCwgMClgXG5cbiAgICBjdHgubW92ZVRvKGZyb20ueCwgZnJvbS55KVxuICAgIGN0eC5saW5lVG8odG8ueCwgdG8ueSlcbiAgICBjdHguc3Ryb2tlKClcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHgucmVzdG9yZSgpXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zZW5zb3IuanMiLCJleHBvcnRzLmNoZWNrSW50ZXJzZWN0aW9uID0gcmVxdWlyZSgnLi9saWIvY2hlY2staW50ZXJzZWN0aW9uJyk7XG5leHBvcnRzLmNvbGluZWFyUG9pbnRXaXRoaW5TZWdtZW50ID0gcmVxdWlyZSgnLi9saWIvY29saW5lYXItcG9pbnQtd2l0aGluLXNlZ21lbnQnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL34vbGluZS1pbnRlcnNlY3QvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4qIENoZWNrIGhvdyB0d28gbGluZSBzZWdtZW50cyBpbnRlcnNlY3QgZWFjaG90aGVyLiBMaW5lIHNlZ21lbnRzIGFyZSByZXByZXNlbnRlZFxuKiBhcyAoeDEsIHkxKS0oeDIsIHkyKSBhbmQgKHgzLCB5MyktKHg0LCB5NCkuXG4qXG4qIEBwYXJhbSB7bnVtYmVyfSB4MVxuKiBAcGFyYW0ge251bWJlcn0geTFcbiogQHBhcmFtIHtudW1iZXJ9IHgyXG4qIEBwYXJhbSB7bnVtYmVyfSB5MlxuKiBAcGFyYW0ge251bWJlcn0geDNcbiogQHBhcmFtIHtudW1iZXJ9IHkzXG4qIEBwYXJhbSB7bnVtYmVyfSB4NFxuKiBAcGFyYW0ge251bWJlcn0geTRcbiogQHJldHVybiB7b2JqZWN0fSBPYmplY3QgZGVzY3JpYmluZyBpbnRlcnNlY3Rpb24gdGhhdCBsb29rcyBsaWtlXG4qICAgIHtcbiogICAgICB0eXBlOiBub25lfHBhcmFsbGVsfGNvbGluZWFyfGludGVyc2VjdGluZyxcbiogICAgICBwb2ludDoge3gsIHl9IC0gb25seSBkZWZpbmVkIHdoZW4gdHlwZSA9PSBpbnRlcnNlY3RpbmdcbiogICAgfVxuKi9cbmZ1bmN0aW9uIGNoZWNrSW50ZXJzZWN0aW9uKHgxLCB5MSwgeDIsIHkyLCB4MywgeTMsIHg0LCB5NCkge1xuICB2YXIgZGVub20gPSAoKHk0IC0geTMpICogKHgyIC0geDEpKSAtICgoeDQgLSB4MykgKiAoeTIgLSB5MSkpO1xuICB2YXIgbnVtZUEgPSAoKHg0IC0geDMpICogKHkxIC0geTMpKSAtICgoeTQgLSB5MykgKiAoeDEgLSB4MykpO1xuICB2YXIgbnVtZUIgPSAoKHgyIC0geDEpICogKHkxIC0geTMpKSAtICgoeTIgLSB5MSkgKiAoeDEgLSB4MykpO1xuXG4gIGlmIChkZW5vbSA9PSAwKSB7XG4gICAgaWYgKG51bWVBID09IDAgJiYgbnVtZUIgPT0gMCkge1xuICAgICAgcmV0dXJuIGNvbGluZWFyKCk7XG4gICAgfVxuICAgIHJldHVybiBwYXJhbGxlbCgpO1xuICB9XG5cbiAgdmFyIHVBID0gbnVtZUEgLyBkZW5vbTtcbiAgdmFyIHVCID0gbnVtZUIgLyBkZW5vbTtcblxuICBpZiAodUEgPj0gMCAmJiB1QSA8PSAxICYmIHVCID49IDAgJiYgdUIgPD0gMSkge1xuICAgIHZhciBwb2ludCA9IHtcbiAgICAgIHg6IHgxICsgKHVBICogKHgyIC0geDEpKSxcbiAgICAgIHk6IHkxICsgKHVBICogKHkyIC0geTEpKVxuICAgIH07XG4gICAgcmV0dXJuIGludGVyc2VjdGluZyhwb2ludCk7XG4gIH1cblxuICByZXR1cm4gbm9uZSgpO1xufVxuXG5mdW5jdGlvbiBjb2xpbmVhcigpIHtcbiAgcmV0dXJuIGludGVyc2VjdFJlc3VsdCgnY29saW5lYXInKTtcbn1cblxuZnVuY3Rpb24gcGFyYWxsZWwoKSB7XG4gIHJldHVybiBpbnRlcnNlY3RSZXN1bHQoJ3BhcmFsbGVsJyk7XG59XG5cbmZ1bmN0aW9uIG5vbmUoKSB7XG4gIHJldHVybiBpbnRlcnNlY3RSZXN1bHQoJ25vbmUnKTtcbn1cblxuZnVuY3Rpb24gaW50ZXJzZWN0aW5nKHBvaW50KSB7XG4gIHZhciByZXN1bHQgPSBpbnRlcnNlY3RSZXN1bHQoJ2ludGVyc2VjdGluZycpO1xuICByZXN1bHQucG9pbnQgPSBwb2ludDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gaW50ZXJzZWN0UmVzdWx0KHR5cGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiB0eXBlXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tJbnRlcnNlY3Rpb247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9+L2xpbmUtaW50ZXJzZWN0L2xpYi9jaGVjay1pbnRlcnNlY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4qIEFzc3VtaW5nIGEgcG9pbnQgaXMgb24gc2FtZSBsaW5lIGFzIGEgbGluZSBzZWdtZW50LCB0ZWxsIGlmIHRoYXQgcG9pbnQgaXNcbiogb24gdGhlIGxpbmUgc2VnbWVudC5cbipcbiogQHBhcmFtIHtudW1iZXJ9IHBvaW50WCAtIFggb2YgcG9pbnRcbiogQHBhcmFtIHtudW1iZXJ9IHBvaW50WSAtIFkgb2YgcG9pbnRcbiogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0WCAtIFggb2YgbGluZSBzZWdtZW50IHN0YXJ0XG4qIEBwYXJhbSB7bnVtYmVyfSBzdGFydFkgLSBZIG9mIGxpbmUgc2VnbWVudCBzdGFydFxuKiBAcGFyYW0ge251bWJlcn0gZW5kWCAgIC0gWCBvZiBsaW5lIHNlZ21lbnQgZW5kXG4qIEBwYXJhbSB7bnVtYmVyfSBlbmRZICAgLSBZIG9mIGxpbmUgc2VnbWVudCBlbmRcbiogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBwb2ludCBpcyB3aXRoaW4gc2VnbWVudCwgZmFsc2Ugb3RoZXJ3aXNlLlxuKi9cbmZ1bmN0aW9uIGNvbGluZWFyUG9pbnRXaXRoaW5TZWdtZW50KHBvaW50WCwgcG9pbnRZLCBzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSkge1xuICBpZiAoc3RhcnRYICE9IGVuZFgpIHtcbiAgICBpZiAoc3RhcnRYIDw9IHBvaW50WCAmJiBwb2ludFggPD0gZW5kWCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKHN0YXJ0WCA+PSBwb2ludFggJiYgcG9pbnRYID49IGVuZFgpIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGlmIChzdGFydFkgPD0gcG9pbnRZICYmIHBvaW50WSA8PSBlbmRZKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoc3RhcnRZID49IHBvaW50WSAmJiBwb2ludFkgPj0gZW5kWSkgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbGluZWFyUG9pbnRXaXRoaW5TZWdtZW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vfi9saW5lLWludGVyc2VjdC9saWIvY29saW5lYXItcG9pbnQtd2l0aGluLXNlZ21lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=