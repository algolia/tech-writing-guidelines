'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _preactCompat = require('preact-compat');

var _preactCompat2 = _interopRequireDefault(_preactCompat);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pit = function Pit(_ref) {
  var style = _ref.style,
      children = _ref.children;

  // first, end & middle
  var positionValue = Math.round(parseFloat(style.left));
  var shouldDisplayValue = (0, _includes2.default)([0, 50, 100], positionValue);

  // Children could be an array, unwrap the value if it's the case
  // see: https://github.com/developit/preact-compat/issues/436
  var value = Array.isArray(children) ? children[0] : children;
  var pitValue = Math.round(parseFloat(value) * 100) / 100;

  return _preactCompat2.default.createElement(
    'div',
    {
      style: _extends({}, style, { marginLeft: positionValue === 100 ? '-2px' : 0 }),
      className: (0, _classnames2.default)('ais-range-slider--marker ais-range-slider--marker-horizontal', {
        'ais-range-slider--marker-large': shouldDisplayValue
      })
    },
    shouldDisplayValue ? _preactCompat2.default.createElement(
      'div',
      { className: 'ais-range-slider--value' },
      pitValue
    ) : null
  );
};

exports.default = Pit;