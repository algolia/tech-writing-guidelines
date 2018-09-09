'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = currentRefinedValues;

var _preactCompat = require('preact-compat');

var _preactCompat2 = _interopRequireDefault(_preactCompat);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isBoolean = require('lodash/isBoolean');

var _isBoolean2 = _interopRequireDefault(_isBoolean);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _reduce = require('lodash/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _CurrentRefinedValues = require('../../components/CurrentRefinedValues/CurrentRefinedValues.js');

var _CurrentRefinedValues2 = _interopRequireDefault(_CurrentRefinedValues);

var _connectCurrentRefinedValues = require('../../connectors/current-refined-values/connectCurrentRefinedValues.js');

var _connectCurrentRefinedValues2 = _interopRequireDefault(_connectCurrentRefinedValues);

var _defaultTemplates = require('./defaultTemplates');

var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);

var _utils = require('../../lib/utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bem = (0, _utils.bemHelper)('ais-current-refined-values');

var renderer = function renderer(_ref) {
  var autoHideContainer = _ref.autoHideContainer,
      clearAllPosition = _ref.clearAllPosition,
      collapsible = _ref.collapsible,
      containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      transformData = _ref.transformData,
      templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var attributes = _ref2.attributes,
        clearAllClick = _ref2.clearAllClick,
        clearAllURL = _ref2.clearAllURL,
        refine = _ref2.refine,
        createURL = _ref2.createURL,
        refinements = _ref2.refinements,
        instantSearchInstance = _ref2.instantSearchInstance;

    if (isFirstRendering) {
      renderState.templateProps = (0, _utils.prepareTemplateProps)({
        transformData: transformData,
        defaultTemplates: _defaultTemplates2.default,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    var shouldAutoHideContainer = autoHideContainer && refinements && refinements.length === 0;

    var clearRefinementClicks = refinements.map(function (refinement) {
      return refine.bind(null, refinement);
    });
    var clearRefinementURLs = refinements.map(function (refinement) {
      return createURL(refinement);
    });

    (0, _preactCompat.render)(_preactCompat2.default.createElement(_CurrentRefinedValues2.default, {
      attributes: attributes,
      clearAllClick: clearAllClick,
      clearAllPosition: clearAllPosition,
      clearAllURL: clearAllURL,
      clearRefinementClicks: clearRefinementClicks,
      clearRefinementURLs: clearRefinementURLs,
      collapsible: collapsible,
      cssClasses: cssClasses,
      refinements: refinements,
      shouldAutoHideContainer: shouldAutoHideContainer,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};

var usage = 'Usage:\ncurrentRefinedValues({\n  container,\n  [ attributes: [{name[, label, template, transformData]}] ],\n  [ onlyListedAttributes = false ],\n  [ clearAll = \'before\' ] // One of [\'before\', \'after\', false]\n  [ templates.{header,item,clearAll,footer} ],\n  [ transformData.{item} ],\n  [ autoHideContainer = true ],\n  [ cssClasses.{root, header, body, clearAll, list, item, link, count, footer} = {} ],\n  [ collapsible = false ]\n  [ clearsQuery = false ]\n})';

/**
 * @typedef {Object} CurrentRefinedValuesCSSClasses
 * @property {string} [root] CSS classes added to the root element.
 * @property {string} [header] CSS classes added to the header element.
 * @property {string} [body] CSS classes added to the body element.
 * @property {string} [clearAll] CSS classes added to the clearAll element.
 * @property {string} [list] CSS classes added to the list element.
 * @property {string} [item] CSS classes added to the item element.
 * @property {string} [link] CSS classes added to the link element.
 * @property {string} [count] CSS classes added to the count element.
 * @property {string} [footer] CSS classes added to the footer element.
 */

/**
 * @typedef {Object} CurrentRefinedValuesAttributes
 * @property {string} name Required attribute name.
 * @property {string} label Attribute label (passed to the item template).
 * @property {string|function(object):string} template Attribute specific template.
 * @property {function(object):object} transformData Attribute specific transformData.
 */

/**
 * @typedef {Object} CurrentRefinedValuesTemplates
 * @property {string|function(object):string} [header] Header template.
 * @property {string|function(object):string} [item] Item template.
 * @property {string|function(object):string} [clearAll] Clear all template.
 * @property {string|function(object):string} [footer] Footer template.
 */

/**
 * @typedef {Object} CurrentRefinedValuesTransforms
 * @property {function(object):object} [item] Method to change the object passed to the `item` template.
 */

/**
 * @typedef {Object} CurrentRefinedValuesWidgetOptions
 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget
 * @property {CurrentRefinedValuesAttributes[]} [attributes = []] Label definitions for the
 * different filters.
 * @property {boolean} [onlyListedAttributes=false] Only use the declared attributes. By default, the widget
 * displays the refinements for the whole search state. If true, the list of attributes in `attributes` is used.
 * @property {'before'|'after'|boolean} [clearAll='before'] Defines the clear all button position.
 * By default, it is placed before the set of current filters. If the value is false, the button
 * won't be added in the widget.
 * @property {CurrentRefinedValuesTemplates} [templates] Templates to use for the widget.
 * @property {CurrentRefinedValuesTransforms} [transformData] Set of functions to transform
 * the data passed to the templates.
 * @property {boolean} [autoHideContainer=true] Hides the widget when there are no current refinements.
 * @property {CurrentRefinedValuesCSSClasses} [cssClasses] CSS classes to be added.
 * @property {boolean|{collapsed: boolean}} [collapsible=false] Makes the widget collapsible. The user can then
 * choose to hide the content of the widget. This option can also be an object with the property collapsed. If this
 * property is `true`, then the widget is hidden during the first rendering.
 * @property {boolean} [clearsQuery=false] If true, the clear all button also clears the active search query.
 */

/**
 * The current refined values widget has two purposes:
 *
 *  - give the user a synthetic view of the current filters.
 *  - give the user the ability to remove a filter.
 *
 * This widget is usually in the top part of the search UI.
 * @type {WidgetFactory}
 * @devNovel CurrentRefinedValues
 * @category clear-filter
 * @param {CurrentRefinedValuesWidgetOptions} $0 The CurrentRefinedValues widget options.
 * @returns {Object} A new CurrentRefinedValues widget instance.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.currentRefinedValues({
 *     container: '#current-refined-values',
 *     clearAll: 'after',
 *     clearsQuery: true,
 *     attributes: [
 *       {name: 'free_shipping', label: 'Free shipping'},
 *       {name: 'price', label: 'Price'},
 *       {name: 'brand', label: 'Brand'},
 *       {name: 'category', label: 'Category'},
 *     ],
 *     onlyListedAttributes: true,
 *   })
 * );
 */
function currentRefinedValues(_ref3) {
  var container = _ref3.container,
      _ref3$attributes = _ref3.attributes,
      attributes = _ref3$attributes === undefined ? [] : _ref3$attributes,
      _ref3$onlyListedAttri = _ref3.onlyListedAttributes,
      onlyListedAttributes = _ref3$onlyListedAttri === undefined ? false : _ref3$onlyListedAttri,
      _ref3$clearAll = _ref3.clearAll,
      clearAll = _ref3$clearAll === undefined ? 'before' : _ref3$clearAll,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates,
      transformData = _ref3.transformData,
      _ref3$autoHideContain = _ref3.autoHideContainer,
      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
      _ref3$collapsible = _ref3.collapsible,
      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
      _ref3$clearsQuery = _ref3.clearsQuery,
      clearsQuery = _ref3$clearsQuery === undefined ? false : _ref3$clearsQuery;

  var transformDataOK = (0, _isUndefined2.default)(transformData) || (0, _isFunction2.default)(transformData) || (0, _isPlainObject2.default)(transformData) && (0, _isFunction2.default)(transformData.item);

  var templatesKeys = ['header', 'item', 'clearAll', 'footer'];
  var templatesOK = (0, _isPlainObject2.default)(templates) && (0, _reduce2.default)(templates, function (res, val, key) {
    return res && templatesKeys.indexOf(key) !== -1 && ((0, _isString2.default)(val) || (0, _isFunction2.default)(val));
  }, true);

  var userCssClassesKeys = ['root', 'header', 'body', 'clearAll', 'list', 'item', 'link', 'count', 'footer'];
  var userCssClassesOK = (0, _isPlainObject2.default)(userCssClasses) && (0, _reduce2.default)(userCssClasses, function (res, val, key) {
    return res && userCssClassesKeys.indexOf(key) !== -1 && (0, _isString2.default)(val) || (0, _isArray2.default)(val);
  }, true);

  var showUsage = false || !((0, _isString2.default)(container) || (0, _utils.isDomElement)(container)) || !(0, _isArray2.default)(attributes) || !(0, _isBoolean2.default)(onlyListedAttributes) || [false, 'before', 'after'].indexOf(clearAll) === -1 || !(0, _isPlainObject2.default)(templates) || !templatesOK || !transformDataOK || !(0, _isBoolean2.default)(autoHideContainer) || !userCssClassesOK;

  if (showUsage) {
    throw new Error(usage);
  }

  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
    header: (0, _classnames2.default)(bem('header'), userCssClasses.header),
    body: (0, _classnames2.default)(bem('body'), userCssClasses.body),
    clearAll: (0, _classnames2.default)(bem('clear-all'), userCssClasses.clearAll),
    list: (0, _classnames2.default)(bem('list'), userCssClasses.list),
    item: (0, _classnames2.default)(bem('item'), userCssClasses.item),
    link: (0, _classnames2.default)(bem('link'), userCssClasses.link),
    count: (0, _classnames2.default)(bem('count'), userCssClasses.count),
    footer: (0, _classnames2.default)(bem('footer'), userCssClasses.footer)
  };

  var specializedRenderer = renderer({
    containerNode: containerNode,
    clearAllPosition: clearAll,
    collapsible: collapsible,
    cssClasses: cssClasses,
    autoHideContainer: autoHideContainer,
    renderState: {},
    templates: templates,
    transformData: transformData
  });

  try {
    var makeCurrentRefinedValues = (0, _connectCurrentRefinedValues2.default)(specializedRenderer, function () {
      return (0, _preactCompat.unmountComponentAtNode)(containerNode);
    });
    return makeCurrentRefinedValues({
      attributes: attributes,
      onlyListedAttributes: onlyListedAttributes,
      clearAll: clearAll,
      clearsQuery: clearsQuery
    });
  } catch (e) {
    throw new Error(usage);
  }
}