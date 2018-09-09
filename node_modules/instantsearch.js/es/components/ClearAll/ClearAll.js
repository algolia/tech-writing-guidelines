var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React, { Component } from 'preact-compat';
import Template from '../Template.js';
import { isSpecialClick } from '../../lib/utils.js';

import autoHideContainer from '../../decorators/autoHideContainer.js';
import headerFooter from '../../decorators/headerFooter.js';

export var RawClearAll = function (_Component) {
  _inherits(RawClearAll, _Component);

  function RawClearAll() {
    _classCallCheck(this, RawClearAll);

    return _possibleConstructorReturn(this, (RawClearAll.__proto__ || Object.getPrototypeOf(RawClearAll)).apply(this, arguments));
  }

  _createClass(RawClearAll, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.handleClick = this.handleClick.bind(this);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.url !== nextProps.url || this.props.hasRefinements !== nextProps.hasRefinements;
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      if (isSpecialClick(e)) {
        // do not alter the default browser behavior
        // if one special key is down
        return;
      }
      e.preventDefault();
      this.props.refine();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          hasRefinements = _props.hasRefinements,
          cssClasses = _props.cssClasses;

      var data = { hasRefinements: hasRefinements };

      return React.createElement(
        'a',
        {
          className: hasRefinements ? cssClasses.link : cssClasses.link + ' ' + cssClasses.link + '-disabled',
          href: this.props.url,
          onClick: this.handleClick
        },
        React.createElement(Template, _extends({
          data: data,
          templateKey: 'link'
        }, this.props.templateProps))
      );
    }
  }]);

  return RawClearAll;
}(Component);

export default autoHideContainer(headerFooter(RawClearAll));