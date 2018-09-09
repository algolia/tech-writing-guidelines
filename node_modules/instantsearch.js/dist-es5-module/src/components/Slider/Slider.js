'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RawSlider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _times = require('lodash/times');

var _times2 = _interopRequireDefault(_times);

var _range = require('lodash/range');

var _range2 = _interopRequireDefault(_range);

var _has = require('lodash/has');

var _has2 = _interopRequireDefault(_has);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _preactCompat = require('preact-compat');

var _preactCompat2 = _interopRequireDefault(_preactCompat);

var _preactRheostat = require('preact-rheostat');

var _preactRheostat2 = _interopRequireDefault(_preactRheostat);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Pit = require('./Pit.js');

var _Pit2 = _interopRequireDefault(_Pit);

var _autoHideContainer = require('../../decorators/autoHideContainer.js');

var _autoHideContainer2 = _interopRequireDefault(_autoHideContainer);

var _headerFooter = require('../../decorators/headerFooter.js');

var _headerFooter2 = _interopRequireDefault(_headerFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RawSlider = exports.RawSlider = function (_Component) {
  _inherits(RawSlider, _Component);

  function RawSlider() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RawSlider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RawSlider.__proto__ || Object.getPrototypeOf(RawSlider)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (_ref2) {
      var values = _ref2.values;

      if (!_this.isDisabled) {
        _this.props.refine(values);
      }
    }, _this.createHandleComponent = function (tooltips) {
      return function (props) {
        // display only two decimals after comma,
        // and apply `tooltips.format()` if any`
        var roundedValue = Math.round(parseFloat(props['aria-valuenow']) * 100) / 100;
        var value = (0, _has2.default)(tooltips, 'format') ? tooltips.format(roundedValue) : roundedValue;

        var className = (0, _classnames2.default)('ais-range-slider--handle', props.className, {
          'ais-range-slider--handle-lower': props['data-handle-key'] === 0,
          'ais-range-slider--handle-upper': props['data-handle-key'] === 1
        });

        return _preactCompat2.default.createElement(
          'div',
          _extends({}, props, { className: className }),
          tooltips ? _preactCompat2.default.createElement(
            'div',
            { className: 'ais-range-slider--tooltip' },
            value
          ) : null
        );
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RawSlider, [{
    key: 'computeDefaultPitPoints',


    // creates an array number where to display a pit point on the slider
    value: function computeDefaultPitPoints(_ref3) {
      var min = _ref3.min,
          max = _ref3.max;

      var totalLength = max - min;
      var steps = 34;
      var stepsLength = totalLength / steps;

      var pitPoints = [min].concat(_toConsumableArray((0, _times2.default)(steps - 1, function (step) {
        return min + stepsLength * (step + 1);
      })), [max]);

      return pitPoints;
    }

    // creates an array of values where the slider should snap to

  }, {
    key: 'computeSnapPoints',
    value: function computeSnapPoints(_ref4) {
      var min = _ref4.min,
          max = _ref4.max,
          step = _ref4.step;

      if (!step) return undefined;
      return [].concat(_toConsumableArray((0, _range2.default)(min, max, step)), [max]);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          tooltips = _props.tooltips,
          step = _props.step,
          pips = _props.pips,
          values = _props.values;

      var _ref5 = this.isDisabled ? { min: this.props.min, max: this.props.max + 0.001 } : this.props,
          min = _ref5.min,
          max = _ref5.max;

      var snapPoints = this.computeSnapPoints({ min: min, max: max, step: step });
      var pitPoints = pips === false ? [] : this.computeDefaultPitPoints({ min: min, max: max });

      return _preactCompat2.default.createElement(
        'div',
        { className: this.isDisabled ? 'ais-range-slider--disabled' : '' },
        _preactCompat2.default.createElement(_preactRheostat2.default, {
          handle: this.createHandleComponent(tooltips),
          onChange: this.handleChange,
          min: min,
          max: max,
          pitComponent: _Pit2.default,
          pitPoints: pitPoints,
          snap: true,
          snapPoints: snapPoints,
          values: this.isDisabled ? [min, max] : values,
          disabled: this.isDisabled
        })
      );
    }
  }, {
    key: 'isDisabled',
    get: function get() {
      return this.props.min >= this.props.max;
    }
  }]);

  return RawSlider;
}(_preactCompat.Component);

exports.default = (0, _autoHideContainer2.default)((0, _headerFooter2.default)(RawSlider));