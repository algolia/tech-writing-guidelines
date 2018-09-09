var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'preact-compat';
import PropTypes from 'prop-types';
import autoHideContainerHOC from '../../decorators/autoHideContainer.js';
import headerFooterHOC from '../../decorators/headerFooter.js';

export var RawRangeInput = function (_Component) {
  _inherits(RawRangeInput, _Component);

  function RawRangeInput(props) {
    _classCallCheck(this, RawRangeInput);

    var _this = _possibleConstructorReturn(this, (RawRangeInput.__proto__ || Object.getPrototypeOf(RawRangeInput)).call(this, props));

    _this.onChange = function (name) {
      return function (event) {
        _this.setState(_defineProperty({}, name, event.currentTarget.value));
      };
    };

    _this.onSubmit = function (event) {
      event.preventDefault();

      _this.props.refine([_this.state.min, _this.state.max]);
    };

    _this.state = {
      min: props.values.min,
      max: props.values.max
    };
    return _this;
  }

  _createClass(RawRangeInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        min: nextProps.values.min,
        max: nextProps.values.max
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          minValue = _state.min,
          maxValue = _state.max;
      var _props = this.props,
          min = _props.min,
          max = _props.max,
          step = _props.step,
          cssClasses = _props.cssClasses,
          labels = _props.labels;

      var isDisabled = min >= max;

      return React.createElement(
        'form',
        { className: cssClasses.form, onSubmit: this.onSubmit },
        React.createElement(
          'fieldset',
          { className: cssClasses.fieldset },
          React.createElement(
            'label',
            { className: cssClasses.labelMin },
            React.createElement('input', {
              className: cssClasses.inputMin,
              type: 'number',
              min: min,
              max: max,
              step: step,
              value: minValue,
              onChange: this.onChange('min'),
              placeholder: min,
              disabled: isDisabled
            })
          ),
          React.createElement(
            'span',
            { className: cssClasses.separator },
            labels.separator
          ),
          React.createElement(
            'label',
            { className: cssClasses.labelMax },
            React.createElement('input', {
              className: cssClasses.inputMax,
              type: 'number',
              min: min,
              max: max,
              step: step,
              value: maxValue,
              onChange: this.onChange('max'),
              placeholder: max,
              disabled: isDisabled
            })
          ),
          React.createElement(
            'button',
            {
              role: 'button',
              className: cssClasses.submit,
              disabled: isDisabled
            },
            labels.submit
          )
        )
      );
    }
  }]);

  return RawRangeInput;
}(Component);

export default autoHideContainerHOC(headerFooterHOC(RawRangeInput));