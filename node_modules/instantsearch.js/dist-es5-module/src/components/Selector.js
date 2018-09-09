'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RawSelector = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _preactCompat = require('preact-compat');

var _preactCompat2 = _interopRequireDefault(_preactCompat);

var _autoHideContainer = require('../decorators/autoHideContainer.js');

var _autoHideContainer2 = _interopRequireDefault(_autoHideContainer);

var _headerFooter = require('../decorators/headerFooter.js');

var _headerFooter2 = _interopRequireDefault(_headerFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RawSelector = exports.RawSelector = function (_Component) {
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


      return _preactCompat2.default.createElement(
        'select',
        {
          className: this.props.cssClasses.select,
          onChange: this.handleChange,
          value: '' + currentValue
        },
        options.map(function (option) {
          return _preactCompat2.default.createElement(
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
}(_preactCompat.Component);

exports.default = (0, _autoHideContainer2.default)((0, _headerFooter2.default)(RawSelector));