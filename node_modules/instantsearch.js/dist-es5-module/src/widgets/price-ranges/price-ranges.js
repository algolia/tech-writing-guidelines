'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = priceRanges;

var _preactCompat = require('preact-compat');

var _preactCompat2 = _interopRequireDefault(_preactCompat);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _PriceRanges = require('../../components/PriceRanges/PriceRanges.js');

var _PriceRanges2 = _interopRequireDefault(_PriceRanges);

var _connectPriceRanges = require('../../connectors/price-ranges/connectPriceRanges.js');

var _connectPriceRanges2 = _interopRequireDefault(_connectPriceRanges);

var _defaultTemplates = require('./defaultTemplates.js');

var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);

var _utils = require('../../lib/utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bem = (0, _utils.bemHelper)('ais-price-ranges');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      templates = _ref.templates,
      renderState = _ref.renderState,
      collapsible = _ref.collapsible,
      cssClasses = _ref.cssClasses,
      labels = _ref.labels,
      currency = _ref.currency,
      autoHideContainer = _ref.autoHideContainer;
  return function (_ref2, isFirstRendering) {
    var refine = _ref2.refine,
        items = _ref2.items,
        instantSearchInstance = _ref2.instantSearchInstance;

    if (isFirstRendering) {
      renderState.templateProps = (0, _utils.prepareTemplateProps)({
        defaultTemplates: _defaultTemplates2.default,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    var shouldAutoHideContainer = autoHideContainer && items.length === 0;

    (0, _preactCompat.render)(_preactCompat2.default.createElement(_PriceRanges2.default, {
      collapsible: collapsible,
      cssClasses: cssClasses,
      currency: currency,
      facetValues: items,
      labels: labels,
      refine: refine,
      shouldAutoHideContainer: shouldAutoHideContainer,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};

var usage = 'Usage:\npriceRanges({\n  container,\n  attributeName,\n  [ currency=$ ],\n  [ cssClasses.{root,header,body,list,item,active,link,form,label,input,currency,separator,button,footer} ],\n  [ templates.{header,item,footer} ],\n  [ labels.{currency,separator,button} ],\n  [ autoHideContainer=true ],\n  [ collapsible=false ]\n})';

/**
 * @typedef {Object} PriceRangeClasses
 * @property  {string|string[]} [root] CSS class to add to the root element.
 * @property  {string|string[]} [header] CSS class to add to the header element.
 * @property  {string|string[]} [body] CSS class to add to the body element.
 * @property  {string|string[]} [list] CSS class to add to the wrapping list element.
 * @property  {string|string[]} [item] CSS class to add to each item element.
 * @property  {string|string[]} [active] CSS class to add to the active item element.
 * @property  {string|string[]} [link] CSS class to add to each link element.
 * @property  {string|string[]} [form] CSS class to add to the form element.
 * @property  {string|string[]} [label] CSS class to add to each wrapping label of the form.
 * @property  {string|string[]} [input] CSS class to add to each input of the form.
 * @property  {string|string[]} [currency] CSS class to add to each currency element of the form.
 * @property  {string|string[]} [separator] CSS class to add to the separator of the form.
 * @property  {string|string[]} [button] CSS class to add to the submit button of the form.
 * @property  {string|string[]} [footer] CSS class to add to the footer element.
 */

/**
 * @typedef {Object} PriceRangeLabels
 * @property  {string} [separator] Separator label, between min and max.
 * @property  {string} [button] Button label.
 */

/**
 * @typedef {Object} PriceRangeTemplates
 * @property  {string|function({from: number, to: number, currency: string})} [item] Item template. Template data: `from`, `to` and `currency`
 */

/**
 * @typedef {Object} PriceRangeWidgetOptions
 * @property  {string|HTMLElement} container Valid CSS Selector as a string or DOMElement.
 * @property  {string} attributeName Name of the attribute for faceting.
 * @property  {PriceRangeTemplates} [templates] Templates to use for the widget.
 * @property  {string} [currency='$'] The currency to display.
 * @property  {PriceRangeLabels} [labels] Labels to use for the widget.
 * @property  {boolean} [autoHideContainer=true] Hide the container when no refinements available.
 * @property  {PriceRangeClasses} [cssClasses] CSS classes to add.
 * @property  {boolean|{collapsed: boolean}} [collapsible=false] Hide the widget body and footer when clicking on header.
 */

/**
 * Price ranges widget lets the user choose from of a set of predefined ranges. The ranges are
 * displayed in a list.
 *
 * @requirements
 * The attribute passed to `attributeName` must be declared as an
 * [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting)
 * in your Algolia settings.
 *
 * The values inside this attribute must be JavaScript numbers (not strings).
 * @type {WidgetFactory}
 * @devNovel PriceRanges
 * @category filter
 * @param {PriceRangeWidgetOptions} $0 The PriceRanges widget options.
 * @return {Widget} A new instance of PriceRanges widget.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.priceRanges({
 *     container: '#price-ranges',
 *     attributeName: 'price',
 *     labels: {
 *       currency: '$',
 *       separator: 'to',
 *       button: 'Go'
 *     },
 *     templates: {
 *       header: 'Price'
 *     }
 *   })
 * );
 */
function priceRanges() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      attributeName = _ref3.attributeName,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates,
      _ref3$collapsible = _ref3.collapsible,
      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
      _ref3$labels = _ref3.labels,
      userLabels = _ref3$labels === undefined ? {} : _ref3$labels,
      _ref3$currency = _ref3.currency,
      userCurrency = _ref3$currency === undefined ? '$' : _ref3$currency,
      _ref3$autoHideContain = _ref3.autoHideContainer,
      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain;

  if (!container) {
    throw new Error(usage);
  }

  var containerNode = (0, _utils.getContainerNode)(container);

  var labels = _extends({
    button: 'Go',
    separator: 'to'
  }, userLabels);

  var cssClasses = {
    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
    header: (0, _classnames2.default)(bem('header'), userCssClasses.header),
    body: (0, _classnames2.default)(bem('body'), userCssClasses.body),
    list: (0, _classnames2.default)(bem('list'), userCssClasses.list),
    link: (0, _classnames2.default)(bem('link'), userCssClasses.link),
    item: (0, _classnames2.default)(bem('item'), userCssClasses.item),
    active: (0, _classnames2.default)(bem('item', 'active'), userCssClasses.active),
    form: (0, _classnames2.default)(bem('form'), userCssClasses.form),
    label: (0, _classnames2.default)(bem('label'), userCssClasses.label),
    input: (0, _classnames2.default)(bem('input'), userCssClasses.input),
    currency: (0, _classnames2.default)(bem('currency'), userCssClasses.currency),
    button: (0, _classnames2.default)(bem('button'), userCssClasses.button),
    separator: (0, _classnames2.default)(bem('separator'), userCssClasses.separator),
    footer: (0, _classnames2.default)(bem('footer'), userCssClasses.footer)
  };

  // before we had opts.currency, you had to pass labels.currency
  var currency = userLabels.currency !== undefined ? userLabels.currency : userCurrency;

  var specializedRenderer = renderer({
    containerNode: containerNode,
    templates: templates,
    renderState: {},
    collapsible: collapsible,
    cssClasses: cssClasses,
    labels: labels,
    currency: currency,
    autoHideContainer: autoHideContainer
  });

  try {
    var makeWidget = (0, _connectPriceRanges2.default)(specializedRenderer, function () {
      return (0, _preactCompat.unmountComponentAtNode)(containerNode);
    });
    return makeWidget({ attributeName: attributeName });
  } catch (e) {
    throw new Error(usage);
  }
}