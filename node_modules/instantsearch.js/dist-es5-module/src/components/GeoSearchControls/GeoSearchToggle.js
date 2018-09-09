'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preactCompat = require('preact-compat');

var _preactCompat2 = _interopRequireDefault(_preactCompat);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GeoSearchToggle = function GeoSearchToggle(_ref) {
  var classNameLabel = _ref.classNameLabel,
      classNameInput = _ref.classNameInput,
      checked = _ref.checked,
      onToggle = _ref.onToggle,
      children = _ref.children;
  return _preactCompat2.default.createElement(
    'label',
    { className: classNameLabel },
    _preactCompat2.default.createElement('input', {
      className: classNameInput,
      type: 'checkbox',
      checked: checked,
      onChange: onToggle
    }),
    children
  );
};

exports.default = GeoSearchToggle;