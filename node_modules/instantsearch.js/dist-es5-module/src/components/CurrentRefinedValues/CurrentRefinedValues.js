'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RawCurrentRefinedValues = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _preactCompat = require('preact-compat');

var _preactCompat2 = _interopRequireDefault(_preactCompat);

var _Template = require('../Template.js');

var _Template2 = _interopRequireDefault(_Template);

var _headerFooter = require('../../decorators/headerFooter.js');

var _headerFooter2 = _interopRequireDefault(_headerFooter);

var _autoHideContainer = require('../../decorators/autoHideContainer');

var _autoHideContainer2 = _interopRequireDefault(_autoHideContainer);

var _utils = require('../../lib/utils.js');

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RawCurrentRefinedValues = exports.RawCurrentRefinedValues = function (_Component) {
  _inherits(RawCurrentRefinedValues, _Component);

  function RawCurrentRefinedValues() {
    _classCallCheck(this, RawCurrentRefinedValues);

    return _possibleConstructorReturn(this, (RawCurrentRefinedValues.__proto__ || Object.getPrototypeOf(RawCurrentRefinedValues)).apply(this, arguments));
  }

  _createClass(RawCurrentRefinedValues, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _isEqual2.default)(this.props.refinements, nextProps.refinements);
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

      return _preactCompat2.default.createElement(
        'a',
        {
          className: refinements && refinements.length > 0 ? cssClasses.clearAll : cssClasses.clearAll + ' ' + cssClasses.clearAll + '-disabled',
          href: this.props.clearAllURL,
          onClick: handleClick(this.props.clearAllClick)
        },
        _preactCompat2.default.createElement(_Template2.default, _extends({ templateKey: 'clearAll' }, this.props.templateProps))
      );
    }
  }, {
    key: '_refinementElement',
    value: function _refinementElement(refinement, i) {
      var attribute = this.props.attributes[refinement.attributeName] || {};
      var templateData = getTemplateData(attribute, refinement, this.props.cssClasses);
      var customTemplateProps = getCustomTemplateProps(attribute);
      var key = refinement.attributeName + (refinement.operator ? refinement.operator : ':') + (refinement.exclude ? refinement.exclude : '') + refinement.name;
      return _preactCompat2.default.createElement(
        'div',
        { className: this.props.cssClasses.item, key: key },
        _preactCompat2.default.createElement(
          'a',
          {
            className: this.props.cssClasses.link,
            href: this.props.clearRefinementURLs[i],
            onClick: handleClick(this.props.clearRefinementClicks[i])
          },
          _preactCompat2.default.createElement(_Template2.default, _extends({
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

      var refinements = (0, _map2.default)(this.props.refinements, function (r, i) {
        return _this2._refinementElement(r, i);
      });
      return _preactCompat2.default.createElement(
        'div',
        null,
        this._clearAllElement('before', this.props.clearAllPosition),
        _preactCompat2.default.createElement(
          'div',
          { className: this.props.cssClasses.list },
          refinements
        ),
        this._clearAllElement('after', this.props.clearAllPosition)
      );
    }
  }]);

  return RawCurrentRefinedValues;
}(_preactCompat.Component);

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
  var templateData = (0, _cloneDeep2.default)(_refinement);

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
    if ((0, _utils.isSpecialClick)(e)) {
      // do not alter the default browser behavior
      // if one special key is down
      return;
    }
    e.preventDefault();
    cb();
  };
}

exports.default = (0, _autoHideContainer2.default)((0, _headerFooter2.default)(RawCurrentRefinedValues));