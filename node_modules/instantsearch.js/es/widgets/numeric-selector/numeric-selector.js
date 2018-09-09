import React, { render, unmountComponentAtNode } from 'preact-compat';
import cx from 'classnames';

import Selector from '../../components/Selector.js';
import connectNumericSelector from '../../connectors/numeric-selector/connectNumericSelector.js';

import { bemHelper, getContainerNode } from '../../lib/utils.js';

var bem = bemHelper('ais-numeric-selector');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      autoHideContainer = _ref.autoHideContainer,
      cssClasses = _ref.cssClasses;
  return function (_ref2, isFirstRendering) {
    var currentRefinement = _ref2.currentRefinement,
        refine = _ref2.refine,
        hasNoResults = _ref2.hasNoResults,
        options = _ref2.options;

    if (isFirstRendering) return;

    render(React.createElement(Selector, {
      cssClasses: cssClasses,
      currentValue: currentRefinement,
      options: options,
      setValue: refine,
      shouldAutoHideContainer: autoHideContainer && hasNoResults
    }), containerNode);
  };
};

var usage = 'Usage: numericSelector({\n  container,\n  attributeName,\n  options,\n  cssClasses.{root,select,item},\n  autoHideContainer\n})';

/**
 * @typedef {Object} NumericOption
 * @property {number} value The numerical value to refine with.
 * If the value is `undefined` or `"undefined"`, the option resets the filter.
 * @property {string} label Label to display in the option.
 */

/**
 * @typedef {Object} NumericSelectorCSSClasses
 * @property {string|string[]} [root] CSS classes added to the outer `<div>`.
 * @property {string|string[]} [select] CSS classes added to the parent `<select>`.
 * @property {string|string[]} [item] CSS classes added to each `<option>`.
 */

/**
 * @typedef {Object} NumericSelectorWidgetOptions
 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
 * @property {string} attributeName Name of the numeric attribute to use.
 * @property {NumericOption[]} options Array of objects defining the different values and labels.
 * @property {string} [operator='='] The operator to use to refine.
 * @property {boolean} [autoHideContainer=false] Hide the container when no results match.
 * @property {NumericSelectorCSSClasses} [cssClasses] CSS classes to be added.
 */

/**
 * This widget lets the user choose between numerical refinements from a dropdown menu.
 *
 * @requirements
 * The attribute passed to `attributeName` must be declared as an
 * [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting)
 * in your Algolia settings.
 *
 * The values inside this attribute must be JavaScript numbers and not strings.
 * @type {WidgetFactory}
 * @devNovel NumericSelector
 * @category filter
 * @param {NumericSelectorWidgetOptions} $0 The NumericSelector widget options.
 * @return {Widget} A new instance of NumericSelector widget.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.numericSelector({
 *     container: '#rating-selector',
 *     attributeName: 'rating',
 *     operator: '=',
 *     options: [
 *       {label: 'All products'},
 *       {label: 'Only 5 star products', value: 5},
 *       {label: 'Only 4 star products', value: 4},
 *       {label: 'Only 3 star products', value: 3},
 *       {label: 'Only 2 star products', value: 2},
 *       {label: 'Only 1 star products', value: 1},
 *     ]
 *   })
 * );
 */
export default function numericSelector(_ref3) {
  var container = _ref3.container,
      _ref3$operator = _ref3.operator,
      operator = _ref3$operator === undefined ? '=' : _ref3$operator,
      attributeName = _ref3.attributeName,
      options = _ref3.options,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
      _ref3$autoHideContain = _ref3.autoHideContainer,
      autoHideContainer = _ref3$autoHideContain === undefined ? false : _ref3$autoHideContain;

  var containerNode = getContainerNode(container);
  if (!container || !options || options.length === 0 || !attributeName) {
    throw new Error(usage);
  }

  var cssClasses = {
    root: cx(bem(null), userCssClasses.root),
    // We use the same class to avoid regression on existing website. It needs to be replaced
    // eventually by `bem('select')
    select: cx(bem(null), userCssClasses.select),
    item: cx(bem('item'), userCssClasses.item)
  };

  var specializedRenderer = renderer({
    autoHideContainer: autoHideContainer,
    containerNode: containerNode,
    cssClasses: cssClasses
  });

  try {
    var makeNumericSelector = connectNumericSelector(specializedRenderer, function () {
      return unmountComponentAtNode(containerNode);
    });
    return makeNumericSelector({ operator: operator, attributeName: attributeName, options: options });
  } catch (e) {
    throw new Error(usage);
  }
}