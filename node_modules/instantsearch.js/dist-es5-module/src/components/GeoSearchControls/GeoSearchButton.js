'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preactCompat = require('preact-compat');

var _preactCompat2 = _interopRequireDefault(_preactCompat);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GeoSearchButton = function GeoSearchButton(_ref) {
  var className = _ref.className,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      children = _ref.children;
  return _preactCompat2.default.createElement(
    'button',
    { className: className, onClick: onClick, disabled: disabled },
    children
  );
};

GeoSearchButton.defaultProps = {
  disabled: false
};

exports.default = GeoSearchButton;