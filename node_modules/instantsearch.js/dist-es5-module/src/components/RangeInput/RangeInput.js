'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RawRangeInput = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preactCompat = require('preact-compat');

var _preactCompat2 = _interopRequireDefault(_preactCompat);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _autoHideContainer = require('../../decorators/autoHideContainer.js');

var _autoHideContainer2 = _interopRequireDefault(_autoHideContainer);

var _headerFooter = require('../../decorators/headerFooter.js');

var _headerFooter2 = _interopRequireDefault(_headerFooter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RawRangeInput = exports.RawRangeInput = function (_Component) {
  _inherits(RawRangeInput, _Component);

  function RawRangeInput(props) {
    _classCallCheck(this, RawRangeInput);

    var _this = _possibleConstructorReturn(this, (RawRangeInput.__proto__ || Object.getPrototypeOf(RawRangeInput)).call(this, props));

    _this.onChange = function (name) {
      return function (event) {
        _this.setState(_defineProperty({}, name, event.currentTarget.value));
      };
    };

    _this.onSubmit = function (event) {
      event.preventDefault();

      _this.props.refine([_this.state.min, _this.state.max]);
    };

    _this.state = {
      min: props.values.min,
      max: props.values.max
    };
    return _this;
  }

  _createClass(RawRangeInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        min: nextProps.values.min,
        max: nextProps.values.max
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          minValue = _state.min,
          maxValue = _state.max;
      var _props = this.props,
          min = _props.min,
          max = _props.max,
          step = _props.step,
          cssClasses = _props.cssClasses,
          labels = _props.labels;

      var isDisabled = min >= max;

      return _preactCompat2.default.createElement(
        'form',
        { className: cssClasses.form, onSubmit: this.onSubmit },
        _preactCompat2.default.createElement(
          'fieldset',
          { className: cssClasses.fieldset },
          _preactCompat2.default.createElement(
            'label',
            { className: cssClasses.labelMin },
            _preactCompat2.default.createElement('input', {
              className: cssClasses.inputMin,
              type: 'number',
              min: min,
              max: max,
              step: step,
              value: minValue,
              onChange: this.onChange('min'),
              placeholder: min,
              disabled: isDisabled
            })
          ),
          _preactCompat2.default.createElement(
            'span',
            { className: cssClasses.separator },
            labels.separator
          ),
          _preactCompat2.default.createElement(
            'label',
            { className: cssClasses.labelMax },
            _preactCompat2.default.createElement('input', {
              className: cssClasses.inputMax,
              type: 'number',
              min: min,
              max: max,
              step: step,
              value: maxValue,
              onChange: this.onChange('max'),
              placeholder: max,
              disabled: isDisabled
            })
          ),
          _preactCompat2.default.createElement(
            'button',
            {
              role: 'button',
              className: cssClasses.submit,
              disabled: isDisabled
            },
            labels.submit
          )
        )
      );
    }
  }]);

  return RawRangeInput;
}(_preactCompat.Component);

exports.default = (0, _autoHideContainer2.default)((0, _headerFooter2.default)(RawRangeInput));