var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'preact-compat';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Template from '../Template';
import GeoSearchButton from './GeoSearchButton';
import GeoSearchToggle from './GeoSearchToggle';

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
  return React.createElement(
    'div',
    null,
    enableRefineControl && React.createElement(
      'div',
      { className: cssClasses.control },
      isRefineOnMapMove || !hasMapMoveSinceLastRefine ? React.createElement(
        GeoSearchToggle,
        {
          classNameLabel: cx(cssClasses.toggleLabel, isRefineOnMapMove && cssClasses.toggleLabelActive),
          classNameInput: cssClasses.toggleInput,
          checked: isRefineOnMapMove,
          onToggle: onRefineToggle
        },
        React.createElement(Template, _extends({}, templateProps, {
          templateKey: 'toggle',
          rootTagName: 'span'
        }))
      ) : React.createElement(
        GeoSearchButton,
        {
          className: cssClasses.redo,
          disabled: !hasMapMoveSinceLastRefine,
          onClick: onRefineClick
        },
        React.createElement(Template, _extends({}, templateProps, {
          templateKey: 'redo',
          rootTagName: 'span'
        }))
      )
    ),
    !enableRefineControl && !isRefineOnMapMove && React.createElement(
      'div',
      { className: cssClasses.control },
      React.createElement(
        GeoSearchButton,
        {
          className: cssClasses.redo,
          disabled: !hasMapMoveSinceLastRefine,
          onClick: onRefineClick
        },
        React.createElement(Template, _extends({}, templateProps, {
          templateKey: 'redo',
          rootTagName: 'span'
        }))
      )
    ),
    enableClearMapRefinement && isRefinedWithMap && React.createElement(
      GeoSearchButton,
      { className: cssClasses.clear, onClick: onClearClick },
      React.createElement(Template, _extends({}, templateProps, { templateKey: 'clear', rootTagName: 'span' }))
    )
  );
};

var CSSClassesPropTypes = PropTypes.shape({
  control: PropTypes.string.isRequired,
  toggleLabel: PropTypes.string.isRequired,
  toggleLabelActive: PropTypes.string.isRequired,
  toggleInput: PropTypes.string.isRequired,
  redo: PropTypes.string.isRequired,
  clear: PropTypes.string.isRequired
});

export default GeoSearchControls;