var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React, { Component } from 'preact-compat';

import Template from '../Template.js';

import headerFooterHOC from '../../decorators/headerFooter.js';
import autoHideContainerHOC from '../../decorators/autoHideContainer';

import { isSpecialClick } from '../../lib/utils.js';
import map from 'lodash/map';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';

export var RawCurrentRefinedValues = function (_Component) {
  _inherits(RawCurrentRefinedValues, _Component);

  function RawCurrentRefinedValues() {
    _classCallCheck(this, RawCurrentRefinedValues);

    return _possibleConstructorReturn(this, (RawCurrentRefinedValues.__proto__ || Object.getPrototypeOf(RawCurrentRefinedValues)).apply(this, arguments));
  }

  _createClass(RawCurrentRefinedValues, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !isEqual(this.props.refinements, nextProps.refinements);
    }
  }, {
    key: '_clearAllElement',
    value: function _clearAllElement(position, requestedPosition) {
      if (requestedPosition !== position) {
        return undefined;
      }

      var _props = this.props,
          refinements = _props.refinements,
          cssClasses = _props.cssClasses;

      return React.createElement(
        'a',
        {
          className: refinements && refinements.length > 0 ? cssClasses.clearAll : cssClasses.clearAll + ' ' + cssClasses.clearAll + '-disabled',
          href: this.props.clearAllURL,
          onClick: handleClick(this.props.clearAllClick)
        },
        React.createElement(Template, _extends({ templateKey: 'clearAll' }, this.props.templateProps))
      );
    }
  }, {
    key: '_refinementElement',
    value: function _refinementElement(refinement, i) {
      var attribute = this.props.attributes[refinement.attributeName] || {};
      var templateData = getTemplateData(attribute, refinement, this.props.cssClasses);
      var customTemplateProps = getCustomTemplateProps(attribute);
      var key = refinement.attributeName + (refinement.operator ? refinement.operator : ':') + (refinement.exclude ? refinement.exclude : '') + refinement.name;
      return React.createElement(
        'div',
        { className: this.props.cssClasses.item, key: key },
        React.createElement(
          'a',
          {
            className: this.props.cssClasses.link,
            href: this.props.clearRefinementURLs[i],
            onClick: handleClick(this.props.clearRefinementClicks[i])
          },
          React.createElement(Template, _extends({
            data: templateData,
            templateKey: 'item'
          }, this.props.templateProps, customTemplateProps))
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var refinements = map(this.props.refinements, function (r, i) {
        return _this2._refinementElement(r, i);
      });
      return React.createElement(
        'div',
        null,
        this._clearAllElement('before', this.props.clearAllPosition),
        React.createElement(
          'div',
          { className: this.props.cssClasses.list },
          refinements
        ),
        this._clearAllElement('after', this.props.clearAllPosition)
      );
    }
  }]);

  return RawCurrentRefinedValues;
}(Component);

function getCustomTemplateProps(attribute) {
  var customTemplateProps = {};
  if (attribute.template !== undefined) {
    customTemplateProps.templates = {
      item: attribute.template
    };
  }
  if (attribute.transformData !== undefined) {
    customTemplateProps.transformData = attribute.transformData;
  }
  return customTemplateProps;
}

function getTemplateData(attribute, _refinement, cssClasses) {
  var templateData = cloneDeep(_refinement);

  templateData.cssClasses = cssClasses;
  if (attribute.label !== undefined) {
    templateData.label = attribute.label;
  }
  if (templateData.operator !== undefined) {
    templateData.displayOperator = templateData.operator;
    if (templateData.operator === '>=') {
      templateData.displayOperator = '&ge;';
    }
    if (templateData.operator === '<=') {
      templateData.displayOperator = '&le;';
    }
  }

  return templateData;
}

function handleClick(cb) {
  return function (e) {
    if (isSpecialClick(e)) {
      // do not alter the default browser behavior
      // if one special key is down
      return;
    }
    e.preventDefault();
    cb();
  };
}

export default autoHideContainerHOC(headerFooterHOC(RawCurrentRefinedValues));