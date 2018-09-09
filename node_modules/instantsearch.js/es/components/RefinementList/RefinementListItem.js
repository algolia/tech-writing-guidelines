var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React, { Component } from 'preact-compat';

import Template from '../Template.js';
import isEqual from 'lodash/isEqual';

var RefinementListItem = function (_Component) {
  _inherits(RefinementListItem, _Component);

  function RefinementListItem() {
    _classCallCheck(this, RefinementListItem);

    return _possibleConstructorReturn(this, (RefinementListItem.__proto__ || Object.getPrototypeOf(RefinementListItem)).apply(this, arguments));
  }

  _createClass(RefinementListItem, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.handleClick = this.handleClick.bind(this);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !isEqual(this.props, nextProps);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(originalEvent) {
      this.props.handleClick({
        facetValueToRefine: this.props.facetValueToRefine,
        isRefined: this.props.isRefined,
        originalEvent: originalEvent
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: this.props.itemClassName, onClick: this.handleClick },
        React.createElement(Template, _extends({
          data: this.props.templateData,
          templateKey: this.props.templateKey
        }, this.props.templateProps)),
        this.props.subItems
      );
    }
  }]);

  return RefinementListItem;
}(Component);

export default RefinementListItem;