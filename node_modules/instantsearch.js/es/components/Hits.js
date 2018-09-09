var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React, { Component } from 'preact-compat';
import map from 'lodash/map';
import Template from './Template.js';
import hasKey from 'lodash/has';
import cx from 'classnames';

var Hits = function (_Component) {
  _inherits(Hits, _Component);

  function Hits() {
    _classCallCheck(this, Hits);

    return _possibleConstructorReturn(this, (Hits.__proto__ || Object.getPrototypeOf(Hits)).apply(this, arguments));
  }

  _createClass(Hits, [{
    key: 'renderWithResults',
    value: function renderWithResults() {
      var _this2 = this;

      var renderedHits = map(this.props.hits, function (hit, position) {
        var data = _extends({}, hit, {
          __hitIndex: position
        });
        return React.createElement(Template, _extends({
          data: data,
          key: data.objectID,
          rootProps: { className: _this2.props.cssClasses.item },
          templateKey: 'item'
        }, _this2.props.templateProps));
      });

      return React.createElement(
        'div',
        { className: this.props.cssClasses.root },
        renderedHits
      );
    }
  }, {
    key: 'renderAllResults',
    value: function renderAllResults() {
      var className = cx(this.props.cssClasses.root, this.props.cssClasses.allItems);

      return React.createElement(Template, _extends({
        data: this.props.results,
        rootProps: { className: className },
        templateKey: 'allItems'
      }, this.props.templateProps));
    }
  }, {
    key: 'renderNoResults',
    value: function renderNoResults() {
      var className = cx(this.props.cssClasses.root, this.props.cssClasses.empty);
      return React.createElement(Template, _extends({
        data: this.props.results,
        rootProps: { className: className },
        templateKey: 'empty'
      }, this.props.templateProps));
    }
  }, {
    key: 'render',
    value: function render() {
      var hasResults = this.props.results.hits.length > 0;
      var hasAllItemsTemplate = hasKey(this.props, 'templateProps.templates.allItems');

      if (!hasResults) {
        return this.renderNoResults();
      }

      // If a allItems template is defined, it takes precedence over our looping
      // through hits
      if (hasAllItemsTemplate) {
        return this.renderAllResults();
      }

      return this.renderWithResults();
    }
  }]);

  return Hits;
}(Component);

Hits.defaultProps = {
  results: { hits: [] }
};

export default Hits;