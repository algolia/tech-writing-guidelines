'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _preactCompat = require('preact-compat');

var _preactCompat2 = _interopRequireDefault(_preactCompat);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Template = require('../Template');

var _Template2 = _interopRequireDefault(_Template);

var _GeoSearchButton = require('./GeoSearchButton');

var _GeoSearchButton2 = _interopRequireDefault(_GeoSearchButton);

var _GeoSearchToggle = require('./GeoSearchToggle');

var _GeoSearchToggle2 = _interopRequireDefault(_GeoSearchToggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GeoSearchControls = function GeoSearchControls(_ref) {
  var cssClasses = _ref.cssClasses,
      enableRefineControl = _ref.enableRefineControl,
      enableClearMapRefinement = _ref.enableClearMapRefinement,
      isRefineOnMapMove = _ref.isRefineOnMapMove,
      isRefinedWithMap = _ref.isRefinedWithMap,
      hasMapMoveSinceLastRefine = _ref.hasMapMoveSinceLastRefine,
      onRefineToggle = _ref.onRefineToggle,
      onRefineClick = _ref.onRefineClick,
      onClearClick = _ref.onClearClick,
      templateProps = _ref.templateProps;
  return _preactCompat2.default.createElement(
    'div',
    null,
    enableRefineControl && _preactCompat2.default.createElement(
      'div',
      { className: cssClasses.control },
      isRefineOnMapMove || !hasMapMoveSinceLastRefine ? _preactCompat2.default.createElement(
        _GeoSearchToggle2.default,
        {
          classNameLabel: (0, _classnames2.default)(cssClasses.toggleLabel, isRefineOnMapMove && cssClasses.toggleLabelActive),
          classNameInput: cssClasses.toggleInput,
          checked: isRefineOnMapMove,
          onToggle: onRefineToggle
        },
        _preactCompat2.default.createElement(_Template2.default, _extends({}, templateProps, {
          templateKey: 'toggle',
          rootTagName: 'span'
        }))
      ) : _preactCompat2.default.createElement(
        _GeoSearchButton2.default,
        {
          className: cssClasses.redo,
          disabled: !hasMapMoveSinceLastRefine,
          onClick: onRefineClick
        },
        _preactCompat2.default.createElement(_Template2.default, _extends({}, templateProps, {
          templateKey: 'redo',
          rootTagName: 'span'
        }))
      )
    ),
    !enableRefineControl && !isRefineOnMapMove && _preactCompat2.default.createElement(
      'div',
      { className: cssClasses.control },
      _preactCompat2.default.createElement(
        _GeoSearchButton2.default,
        {
          className: cssClasses.redo,
          disabled: !hasMapMoveSinceLastRefine,
          onClick: onRefineClick
        },
        _preactCompat2.default.createElement(_Template2.default, _extends({}, templateProps, {
          templateKey: 'redo',
          rootTagName: 'span'
        }))
      )
    ),
    enableClearMapRefinement && isRefinedWithMap && _preactCompat2.default.createElement(
      _GeoSearchButton2.default,
      { className: cssClasses.clear, onClick: onClearClick },
      _preactCompat2.default.createElement(_Template2.default, _extends({}, templateProps, { templateKey: 'clear', rootTagName: 'span' }))
    )
  );
};

var CSSClassesPropTypes = _propTypes2.default.shape({
  control: _propTypes2.default.string.isRequired,
  toggleLabel: _propTypes2.default.string.isRequired,
  toggleLabelActive: _propTypes2.default.string.isRequired,
  toggleInput: _propTypes2.default.string.isRequired,
  redo: _propTypes2.default.string.isRequired,
  clear: _propTypes2.default.string.isRequired
});

exports.default = GeoSearchControls;