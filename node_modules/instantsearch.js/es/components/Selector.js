var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React, { Component } from 'preact-compat';

import autoHideContainer from '../decorators/autoHideContainer.js';
import headerFooter from '../decorators/headerFooter.js';

export var RawSelector = function (_Component) {
  _inherits(RawSelector, _Component);

  function RawSelector() {
    _classCallCheck(this, RawSelector);

    return _possibleConstructorReturn(this, (RawSelector.__proto__ || Object.getPrototypeOf(RawSelector)).apply(this, arguments));
  }

  _createClass(RawSelector, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.handleChange = this.handleChange.bind(this);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      this.props.setValue(event.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          currentValue = _props.currentValue,
          options = _props.options;


      return React.createElement(
        'select',
        {
          className: this.props.cssClasses.select,
          onChange: this.handleChange,
          value: '' + currentValue
        },
        options.map(function (option) {
          return React.createElement(
            'option',
            {
              className: _this2.props.cssClasses.item,
              key: option.label + option.value,
              value: '' + option.value
            },
            option.label
          );
        })
      );
    }
  }]);

  return RawSelector;
}(Component);

export default autoHideContainer(headerFooter(RawSelector));