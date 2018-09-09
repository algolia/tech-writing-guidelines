'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preactCompat = require('preact-compat');

var _preactCompat2 = _interopRequireDefault(_preactCompat);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Template = require('../Template.js');

var _Template2 = _interopRequireDefault(_Template);

var _autoHideContainer = require('../../decorators/autoHideContainer.js');

var _autoHideContainer2 = _interopRequireDefault(_autoHideContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var itemsPropType = _propTypes2.default.arrayOf(_propTypes2.default.shape({
  name: _propTypes2.default.string,
  value: _propTypes2.default.string
}));

var Breadcrumb = function (_PureComponent) {
  _inherits(Breadcrumb, _PureComponent);

  function Breadcrumb() {
    _classCallCheck(this, Breadcrumb);

    return _possibleConstructorReturn(this, (Breadcrumb.__proto__ || Object.getPrototypeOf(Breadcrumb)).apply(this, arguments));
  }

  _createClass(Breadcrumb, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          createURL = _props.createURL,
          items = _props.items,
          refine = _props.refine,
          cssClasses = _props.cssClasses;


      var breadcrumb = items.map(function (item, idx) {
        var isLast = idx === items.length - 1;
        var label = isLast ? _preactCompat2.default.createElement(
          'a',
          { className: cssClasses.disabledLabel + ' ' + cssClasses.label },
          item.name
        ) : _preactCompat2.default.createElement(
          'a',
          {
            className: cssClasses.label,
            href: createURL(item.value),
            onClick: function onClick(e) {
              e.preventDefault();
              refine(item.value);
            }
          },
          item.name
        );

        return [_preactCompat2.default.createElement(_Template2.default, _extends({
          key: item.name + idx,
          rootProps: { className: cssClasses.separator },
          templateKey: 'separator'
        }, _this2.props.templateProps)), label];
      });

      var homeClassNames = items.length > 0 ? [cssClasses.home, cssClasses.label] : [cssClasses.disabledLabel, cssClasses.home, cssClasses.label];

      var homeOnClickHandler = function homeOnClickHandler(e) {
        e.preventDefault();
        refine(null);
      };

      var homeUrl = createURL(null);

      return _preactCompat2.default.createElement(
        'div',
        { className: cssClasses.root },
        _preactCompat2.default.createElement(
          'a',
          {
            className: homeClassNames.join(' '),
            href: homeUrl,
            onClick: homeOnClickHandler
          },
          _preactCompat2.default.createElement(_Template2.default, _extends({ templateKey: 'home' }, this.props.templateProps))
        ),
        breadcrumb
      );
    }
  }]);

  return Breadcrumb;
}(_preactCompat.PureComponent);

exports.default = (0, _autoHideContainer2.default)(Breadcrumb);