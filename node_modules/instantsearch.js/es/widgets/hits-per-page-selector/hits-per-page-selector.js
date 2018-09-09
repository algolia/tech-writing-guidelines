import React, { render, unmountComponentAtNode } from 'preact-compat';
import cx from 'classnames';

import find from 'lodash/find';

import Selector from '../../components/Selector.js';
import connectHitsPerPage from '../../connectors/hits-per-page/connectHitsPerPage.js';

import { bemHelper, getContainerNode } from '../../lib/utils.js';

var bem = bemHelper('ais-hits-per-page-selector');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      autoHideContainer = _ref.autoHideContainer;
  return function (_ref2, isFirstRendering) {
    var items = _ref2.items,
        refine = _ref2.refine,
        hasNoResults = _ref2.hasNoResults;

    if (isFirstRendering) return;

    var _ref3 = find(items, function (_ref4) {
      var isRefined = _ref4.isRefined;
      return isRefined;
    }) || {},
        currentValue = _ref3.value;

    render(React.createElement(Selector, {
      cssClasses: cssClasses,
      currentValue: currentValue,
      options: items,
      setValue: refine,
      shouldAutoHideContainer: autoHideContainer && hasNoResults
    }), containerNode);
  };
};

var usage = 'Usage:\nhitsPerPageSelector({\n  container,\n  items,\n  [ cssClasses.{root,select,item}={} ],\n  [ autoHideContainer=false ]\n})';

/**
 * @typedef {Object} HitsPerPageSelectorCSSClasses
 * @property {string|string[]} [root] CSS classes added to the outer `<div>`.
 * @property {string|string[]} [select] CSS classes added to the parent `<select>`.
 * @property {string|string[]} [item] CSS classes added to each `<option>`.
 */

/**
 * @typedef {Object} HitsPerPageSelectorItems
 * @property {number} value number of hits to display per page.
 * @property {string} label Label to display in the option.
 * @property {boolean} default The default hits per page on first search.
 */

/**
 * @typedef {Object} HitsPerPageSelectorWidgetOptions
 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
 * @property {HitsPerPageSelectorItems[]} items Array of objects defining the different values and labels.
 * @property {boolean} [autoHideContainer=false] Hide the container when no results match.
 * @property {HitsPerPageSelectorCSSClasses} [cssClasses] CSS classes to be added.
 */

/**
 * The hitsPerPageSelector widget gives the user the ability to change the number of results
 * displayed in the hits widget.
 *
 * You can specify the default hits per page using a boolean in the items[] array. If none is specified, this first hits per page option will be picked.
 * @type {WidgetFactory}
 * @devNovel HitsPerPageSelector
 * @category basic
 * @param {HitsPerPageSelectorWidgetOptions} $0 The options of the HitPerPageSelector widget.
 * @return {Widget} A new instance of the HitPerPageSelector widget.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.hitsPerPageSelector({
 *     container: '#hits-per-page-selector',
 *     items: [
 *       {value: 3, label: '3 per page', default: true},
 *       {value: 6, label: '6 per page'},
 *       {value: 12, label: '12 per page'},
 *     ]
 *   })
 * );
 */
export default function hitsPerPageSelector() {
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref5.container,
      items = _ref5.items,
      _ref5$cssClasses = _ref5.cssClasses,
      userCssClasses = _ref5$cssClasses === undefined ? {} : _ref5$cssClasses,
      _ref5$autoHideContain = _ref5.autoHideContainer,
      autoHideContainer = _ref5$autoHideContain === undefined ? false : _ref5$autoHideContain;

  if (!container) {
    throw new Error(usage);
  }

  var containerNode = getContainerNode(container);

  var cssClasses = {
    root: cx(bem(null), userCssClasses.root),
    // We use the same class to avoid regression on existing website. It needs to be replaced
    // eventually by `bem('select')
    select: cx(bem(null), userCssClasses.select),
    item: cx(bem('item'), userCssClasses.item)
  };

  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    autoHideContainer: autoHideContainer
  });

  try {
    var makeHitsPerPageSelector = connectHitsPerPage(specializedRenderer, function () {
      return unmountComponentAtNode(containerNode);
    });
    return makeHitsPerPageSelector({ items: items });
  } catch (e) {
    throw new Error(usage);
  }
}