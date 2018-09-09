var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'preact-compat';
import PropTypes from 'prop-types';

import Template from './Template';
import autoHideContainerHOC from '../decorators/autoHideContainer.js';
import headerFooterHOC from '../decorators/headerFooter.js';

var MenuSelect = function (_Component) {
  _inherits(MenuSelect, _Component);

  function MenuSelect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MenuSelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MenuSelect.__proto__ || Object.getPrototypeOf(MenuSelect)).call.apply(_ref, [this].concat(args))), _this), _this.handleSelectChange = function (_ref2) {
      var value = _ref2.target.value;

      _this.props.refine(value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MenuSelect, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          cssClasses = _props.cssClasses,
          templateProps = _props.templateProps,
          items = _props.items;

      var _ref3 = items.find(function (item) {
        return item.isRefined;
      }) || {
        value: ''
      },
          selectedValue = _ref3.value;

      return React.createElement(
        'select',
        {
          className: cssClasses.select,
          value: selectedValue,
          onChange: this.handleSelectChange
        },
        React.createElement(
          'option',
          { value: '', className: cssClasses.option },
          React.createElement(Template, _extends({ templateKey: 'seeAllOption' }, templateProps))
        ),
        items.map(function (item) {
          return React.createElement(
            'option',
            {
              key: item.value,
              value: item.value,
              className: cssClasses.option
            },
            React.createElement(Template, _extends({ data: item, templateKey: 'item' }, templateProps))
          );
        })
      );
    }
  }]);

  return MenuSelect;
}(Component);

export default autoHideContainerHOC(headerFooterHOC(MenuSelect));