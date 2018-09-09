var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'preact-compat';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';
import cx from 'classnames';

var Pit = function Pit(_ref) {
  var style = _ref.style,
      children = _ref.children;

  // first, end & middle
  var positionValue = Math.round(parseFloat(style.left));
  var shouldDisplayValue = includes([0, 50, 100], positionValue);

  // Children could be an array, unwrap the value if it's the case
  // see: https://github.com/developit/preact-compat/issues/436
  var value = Array.isArray(children) ? children[0] : children;
  var pitValue = Math.round(parseFloat(value) * 100) / 100;

  return React.createElement(
    'div',
    {
      style: _extends({}, style, { marginLeft: positionValue === 100 ? '-2px' : 0 }),
      className: cx('ais-range-slider--marker ais-range-slider--marker-horizontal', {
        'ais-range-slider--marker-large': shouldDisplayValue
      })
    },
    shouldDisplayValue ? React.createElement(
      'div',
      { className: 'ais-range-slider--value' },
      pitValue
    ) : null
  );
};

export default Pit;