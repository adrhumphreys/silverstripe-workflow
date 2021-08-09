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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/bundles/bundle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/boot/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _registerComponents = __webpack_require__("./client/src/boot/registerComponents.js");

var _registerComponents2 = _interopRequireDefault(_registerComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.document.addEventListener('DOMContentLoaded', function () {
  (0, _registerComponents2.default)();
});

/***/ }),

/***/ "./client/src/boot/registerComponents.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Injector = __webpack_require__(0);

var _Injector2 = _interopRequireDefault(_Injector);

var _WorkflowWidget = __webpack_require__("./client/src/components/WorkflowWidget.jsx");

var _WorkflowWidget2 = _interopRequireDefault(_WorkflowWidget);

var _WorkflowButton = __webpack_require__("./client/src/components/WorkflowButton.jsx");

var _WorkflowButton2 = _interopRequireDefault(_WorkflowButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  _Injector2.default.component.registerMany({
    WorkflowWidget: _WorkflowWidget2.default,
    WorkflowButton: _WorkflowButton2.default
  });
};

/***/ }),

/***/ "./client/src/bundles/bundle.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__("./client/src/legacy/entwine/index.js");

__webpack_require__("./client/src/boot/index.js");

/***/ }),

/***/ "./client/src/components/WorkflowButton.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Component = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Injector = __webpack_require__(0);

var _helper = __webpack_require__("./client/src/helper.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WorkflowStep = function WorkflowStep(_ref) {
    var id = _ref.id,
        title = _ref.title,
        onClick = _ref.onClick,
        selectedId = _ref.selectedId;
    return _react2.default.createElement(
        "button",
        { type: "button", className: "workflow__state", onClick: onClick },
        title,
        selectedId === id ? "selected" : "not selected"
    );
};

var WorkflowOptions = function WorkflowOptions(_ref2) {
    var steps = _ref2.steps,
        selectedId = _ref2.selectedId,
        createOnClick = _ref2.createOnClick;

    var renderedSteps = steps.map(function (s) {
        return _react2.default.createElement(WorkflowStep, _extends({
            key: s.id
        }, s, {
            onClick: createOnClick(s.id),
            selectedId: selectedId
        }));
    });

    return _react2.default.createElement(
        "div",
        null,
        renderedSteps
    );
};

var WorkflowButton = function WorkflowButton(_ref3) {
    var recordId = _ref3.recordId,
        recordType = _ref3.recordType,
        selectedStepId = _ref3.selectedStepId,
        steps = _ref3.steps,
        PopoverField = _ref3.PopoverField,
        route = _ref3.route;

    var _useState = (0, _react.useState)(selectedStepId),
        _useState2 = _slicedToArray(_useState, 2),
        selectedId = _useState2[0],
        setSelectedId = _useState2[1];

    var _useState3 = (0, _react.useState)(false),
        _useState4 = _slicedToArray(_useState3, 2),
        open = _useState4[0],
        setOpen = _useState4[1];

    var toggleCallback = function toggleCallback() {
        return setOpen(!open);
    };

    var selectedSteps = steps.filter(function (s) {
        return s.id === selectedId;
    });
    var selectedStep = Array.isArray(selectedSteps) && selectedSteps.length > 0 ? selectedSteps[0] : null;
    var title = selectedStep ? "" + selectedStep.title : "Workflow";

    var popoverProps = {
        id: "workflow-widget-" + recordType + "-" + recordId,
        buttonClassName: "font-icon-tree",
        title: title,
        data: {
            popoverTitle: "Edit workflow state",
            buttonTooltip: "Edit workflow state",
            placement: "top",
            trigger: "focus"
        }
    };

    console.log(steps);
    console.log(selectedId);
    console.log(selectedStepId);

    var createOnClick = function createOnClick(stepId) {
        return function () {
            setSelectedId(stepId);
            (0, _helper.sendSelectedStep)({
                route: route,
                stepId: stepId,
                recordId: recordId,
                recordType: recordType
            });
        };
    };

    return _react2.default.createElement(
        "div",
        { className: "workflow-widget" },
        _react2.default.createElement(
            PopoverField,
            popoverProps,
            _react2.default.createElement(WorkflowOptions, {
                steps: steps,
                setSelectedId: setSelectedId,
                selectedId: selectedId,
                createOnClick: createOnClick
            })
        )
    );
};

WorkflowButton.propTypes = {
    PopoverField: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]).isRequired
};

exports.Component = WorkflowButton;
exports.default = (0, _Injector.inject)(["PopoverField"])(WorkflowButton);

/***/ }),

/***/ "./client/src/components/WorkflowWidget.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Component = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Injector = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WorkflowWidget = function WorkflowWidget(props) {
    console.log(props);
    var actualProps = props.actualProps,
        WorkflowButton = props.WorkflowButton;

    return _react2.default.createElement(WorkflowButton, actualProps);
};

exports.Component = WorkflowWidget;
exports.default = (0, _Injector.inject)(["WorkflowButton"])(WorkflowWidget);

/***/ }),

/***/ "./client/src/helper.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var sendSelectedStep = exports.sendSelectedStep = function sendSelectedStep(_ref) {
  var route = _ref.route,
      stepId = _ref.stepId,
      recordId = _ref.recordId,
      recordType = _ref.recordType;

  fetch(route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      stepId: stepId,
      recordId: recordId,
      recordType: recordType
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.error) {
      alert(data.error);
    }
  });
};

/***/ }),

/***/ "./client/src/legacy/entwine/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(4);

var _jquery2 = _interopRequireDefault(_jquery);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Injector = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jquery2.default.entwine("ss", function ($) {
  $(".js-injector-boot .workflow-widget").entwine({
    onmatch: function onmatch() {
      var context = {};
      var WorkflowWidget = (0, _Injector.loadComponent)("WorkflowWidget", context);
      var props = JSON.parse(this.attr("data-state"));

      _reactDom2.default.render(_react2.default.createElement(WorkflowWidget, props), this[0]);
    },
    onunmatch: function onunmatch() {
      _reactDom2.default.unmountComponentAtNode(this[0]);
    }
  });
});

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = Injector;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = PropTypes;

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = ReactDom;

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map