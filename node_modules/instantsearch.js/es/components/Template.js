var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'preact-compat';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { isReactElement, renderTemplate } from '../lib/utils';

export var PureTemplate = function (_Component) {
  _inherits(PureTemplate, _Component);

  function PureTemplate() {
    _classCallCheck(this, PureTemplate);

    return _possibleConstructorReturn(this, (PureTemplate.__proto__ || Object.getPrototypeOf(PureTemplate)).apply(this, arguments));
  }

  _createClass(PureTemplate, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !isEqual(this.props.data, nextProps.data) || this.props.templateKey !== nextProps.templateKey || !isEqual(this.props.rootProps, nextProps.rootProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var RootTagName = this.props.rootTagName;
      var useCustomCompileOptions = this.props.useCustomCompileOptions[this.props.templateKey];
      var compileOptions = useCustomCompileOptions ? this.props.templatesConfig.compileOptions : {};

      var content = renderTemplate({
        templates: this.props.templates,
        templateKey: this.props.templateKey,
        compileOptions: compileOptions,
        helpers: this.props.templatesConfig.helpers,
        data: this.props.data
      });

      if (content === null) {
        // Adds a noscript to the DOM but virtual DOM is null
        // See http://facebook.github.io/react/docs/component-specs.html#render
        return null;
      }

      if (isReactElement(content)) {
        throw new Error('Support for templates as React elements has been removed, please use react-instantsearch');
      }

      return React.createElement(RootTagName, _extends({}, this.props.rootProps, {
        dangerouslySetInnerHTML: { __html: content }
      }));
    }
  }]);

  return PureTemplate;
}(Component);

PureTemplate.defaultProps = {
  data: {},
  rootTagName: 'div',
  useCustomCompileOptions: {},
  templates: {},
  templatesConfig: {}
};

function transformData(fn, templateKey, originalData) {
  if (!fn) {
    return originalData;
  }

  var clonedData = cloneDeep(originalData);

  var data = void 0;
  var typeFn = typeof fn === 'undefined' ? 'undefined' : _typeof(fn);
  if (typeFn === 'function') {
    data = fn(clonedData);
  } else if (typeFn === 'object') {
    // ex: transformData: {hit, empty}
    if (fn[templateKey]) {
      data = fn[templateKey](clonedData);
    } else {
      // if the templateKey doesn't exist, just use the
      // original data
      data = originalData;
    }
  } else {
    throw new Error('transformData must be a function or an object, was ' + typeFn + ' (key : ' + templateKey + ')');
  }

  var dataType = typeof data === 'undefined' ? 'undefined' : _typeof(data);
  var expectedType = typeof originalData === 'undefined' ? 'undefined' : _typeof(originalData);
  if (dataType !== expectedType) {
    throw new Error('`transformData` must return a `' + expectedType + '`, got `' + dataType + '`.');
  }
  return data;
}

// Resolve transformData before Template, so transformData is always called
// even if the data is the same. Allowing you to dynamically inject conditions in
// transformData that will force re-rendering
var withTransformData = function withTransformData(TemplateToWrap) {
  return function (props) {
    var data = props.data === undefined ? {} : props.data; // eslint-disable-line react/prop-types
    return React.createElement(TemplateToWrap, _extends({}, props, {
      data: transformData(props.transformData, props.templateKey, data) // eslint-disable-line react/prop-types
    }));
  };
};

export default withTransformData(PureTemplate);