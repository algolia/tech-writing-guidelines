var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { render, unmountComponentAtNode } from 'preact-compat';
import cx from 'classnames';

import Slider from '../../components/Slider/Slider.js';
import connectRange from '../../connectors/range/connectRange.js';

import { bemHelper, prepareTemplateProps, getContainerNode } from '../../lib/utils.js';

var defaultTemplates = {
  header: '',
  footer: ''
};

var bem = bemHelper('ais-range-slider');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      pips = _ref.pips,
      step = _ref.step,
      tooltips = _ref.tooltips,
      autoHideContainer = _ref.autoHideContainer,
      collapsible = _ref.collapsible,
      renderState = _ref.renderState,
      templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var refine = _ref2.refine,
        range = _ref2.range,
        start = _ref2.start,
        instantSearchInstance = _ref2.instantSearchInstance;

    if (isFirstRendering) {
      renderState.templateProps = prepareTemplateProps({
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    var minRange = range.min,
        maxRange = range.max;

    var shouldAutoHideContainer = autoHideContainer && minRange === maxRange;

    var _start = _slicedToArray(start, 2),
        minStart = _start[0],
        maxStart = _start[1];

    var minFinite = minStart === -Infinity ? minRange : minStart;
    var maxFinite = maxStart === Infinity ? maxRange : maxStart;

    // Clamp values to the range for avoid extra rendering & refinement
    // Should probably be done on the connector side, but we need to stay
    // backward compatible so we still need to pass [-Infinity, Infinity]
    var values = [minFinite > maxRange ? maxRange : minFinite, maxFinite < minRange ? minRange : maxFinite];

    render(React.createElement(Slider, {
      cssClasses: cssClasses,
      refine: refine,
      min: minRange,
      max: maxRange,
      values: values,
      tooltips: tooltips,
      step: step,
      pips: pips,
      shouldAutoHideContainer: shouldAutoHideContainer,
      collapsible: collapsible,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};

var usage = 'Usage:\nrangeSlider({\n  container,\n  attributeName,\n  [ min ],\n  [ max ],\n  [ pips = true ],\n  [ step = 1 ],\n  [ precision = 0 ],\n  [ tooltips=true ],\n  [ templates.{header, footer} ],\n  [ cssClasses.{root, header, body, footer} ],\n  [ autoHideContainer=true ],\n  [ collapsible=false ],\n});\n';

/**
 * @typedef {Object} RangeSliderTemplates
 * @property  {string|function} [header=""] Header template.
 * @property  {string|function} [footer=""] Footer template.
 */

/**
 * @typedef {Object} RangeSliderCssClasses
 * @property  {string|string[]} [root] CSS class to add to the root element.
 * @property  {string|string[]} [header] CSS class to add to the header element.
 * @property  {string|string[]} [body] CSS class to add to the body element.
 * @property  {string|string[]} [footer] CSS class to add to the footer element.
 */

/**
 * @typedef {Object} RangeSliderTooltipOptions
 * @property {function(number):string} format The function takes the raw value as input, and should return
 * a string for the label that should be used for this value.
 * `format: function(rawValue) {return '$' + Math.round(rawValue).toLocaleString()}`
 */

/**
 * @typedef {Object} RangeSliderCollapsibleOptions
 * @property  {boolean} [collapsed] Initially collapsed state of a collapsible widget.
 */

/**
 * @typedef {Object} RangeSliderWidgetOptions
 * @property  {string|HTMLElement} container CSS Selector or DOMElement to insert the widget.
 * @property  {string} attributeName Name of the attribute for faceting.
 * @property  {boolean|RangeSliderTooltipOptions} [tooltips=true] Should we show tooltips or not.
 * The default tooltip will show the raw value.
 * You can also provide an object with a format function as an attribute.
 * So that you can format the tooltip display value as you want
 * @property  {RangeSliderTemplates} [templates] Templates to use for the widget.
 * @property  {boolean} [autoHideContainer=true] Hide the container when no refinements available.
 * @property  {RangeSliderCssClasses} [cssClasses] CSS classes to add to the wrapping elements.
 * @property  {boolean} [pips=true] Show slider pips.
 * @property  {number} [precision = 0] Number of digits after decimal point to use.
 * @property  {boolean|RangeSliderCollapsibleOptions} [collapsible=false] Hide the widget body and footer when clicking on header.
 * @property  {number} [step] Every handle move will jump that number of steps.
 * @property  {number} [min] Minimal slider value, default to automatically computed from the result set.
 * @property  {number} [max] Maximal slider value, defaults to automatically computed from the result set.
 */

/**
 * The range slider is a widget which provides a user-friendly way to filter the
 * results based on a single numeric range.
 *
 * @requirements
 * The attribute passed to `attributeName` must be declared as an
 * [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting)
 * in your Algolia settings.
 *
 * The values inside this attribute must be JavaScript numbers (not strings).
 *
 * @type {WidgetFactory}
 * @devNovel RangeSlider
 * @category filter
 * @param {RangeSliderWidgetOptions} $0 RangeSlider widget options.
 * @return {Widget} A new RangeSlider widget instance.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.rangeSlider({
 *     container: '#price',
 *     attributeName: 'price',
 *     templates: {
 *       header: 'Price'
 *     },
 *     tooltips: {
 *       format: function(rawValue) {
 *         return '$' + Math.round(rawValue).toLocaleString();
 *       }
 *     }
 *   })
 * );
 */
export default function rangeSlider() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      attributeName = _ref3.attributeName,
      min = _ref3.min,
      max = _ref3.max,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === undefined ? defaultTemplates : _ref3$templates,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
      step = _ref3.step,
      _ref3$pips = _ref3.pips,
      pips = _ref3$pips === undefined ? true : _ref3$pips,
      _ref3$precision = _ref3.precision,
      precision = _ref3$precision === undefined ? 0 : _ref3$precision,
      _ref3$tooltips = _ref3.tooltips,
      tooltips = _ref3$tooltips === undefined ? true : _ref3$tooltips,
      _ref3$autoHideContain = _ref3.autoHideContainer,
      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain,
      _ref3$collapsible = _ref3.collapsible,
      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible;

  if (!container) {
    throw new Error(usage);
  }

  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(bem(null), userCssClasses.root),
    header: cx(bem('header'), userCssClasses.header),
    body: cx(bem('body'), userCssClasses.body),
    footer: cx(bem('footer'), userCssClasses.footer)
  };

  var specializedRenderer = renderer({
    containerNode: containerNode,
    step: step,
    pips: pips,
    tooltips: tooltips,
    renderState: {},
    templates: templates,
    autoHideContainer: autoHideContainer,
    collapsible: collapsible,
    cssClasses: cssClasses
  });

  try {
    var makeWidget = connectRange(specializedRenderer, function () {
      return unmountComponentAtNode(containerNode);
    });
    return makeWidget({ attributeName: attributeName, min: min, max: max, precision: precision });
  } catch (e) {
    throw new Error(usage);
  }
}