var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import times from 'lodash/times';
import range from 'lodash/range';
import has from 'lodash/has';

import PropTypes from 'prop-types';

import React, { Component } from 'preact-compat';

import Rheostat from 'preact-rheostat';
import cx from 'classnames';

import Pit from './Pit.js';

import autoHideContainerHOC from '../../decorators/autoHideContainer.js';
import headerFooterHOC from '../../decorators/headerFooter.js';

export var RawSlider = function (_Component) {
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
        var value = has(tooltips, 'format') ? tooltips.format(roundedValue) : roundedValue;

        var className = cx('ais-range-slider--handle', props.className, {
          'ais-range-slider--handle-lower': props['data-handle-key'] === 0,
          'ais-range-slider--handle-upper': props['data-handle-key'] === 1
        });

        return React.createElement(
          'div',
          _extends({}, props, { className: className }),
          tooltips ? React.createElement(
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

      var pitPoints = [min].concat(_toConsumableArray(times(steps - 1, function (step) {
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
      return [].concat(_toConsumableArray(range(min, max, step)), [max]);
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

      return React.createElement(
        'div',
        { className: this.isDisabled ? 'ais-range-slider--disabled' : '' },
        React.createElement(Rheostat, {
          handle: this.createHandleComponent(tooltips),
          onChange: this.handleChange,
          min: min,
          max: max,
          pitComponent: Pit,
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
}(Component);

export default autoHideContainerHOC(headerFooterHOC(RawSlider));