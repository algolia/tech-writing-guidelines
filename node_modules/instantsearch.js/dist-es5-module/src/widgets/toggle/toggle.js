'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggle;

var _preactCompat = require('preact-compat');

var _preactCompat2 = _interopRequireDefault(_preactCompat);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _defaultTemplates = require('./defaultTemplates.js');

var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);

var _RefinementList = require('../../components/RefinementList/RefinementList.js');

var _RefinementList2 = _interopRequireDefault(_RefinementList);

var _connectToggle = require('../../connectors/toggle/connectToggle.js');

var _connectToggle2 = _interopRequireDefault(_connectToggle);

var _utils = require('../../lib/utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bem = (0, _utils.bemHelper)('ais-toggle');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      collapsible = _ref.collapsible,
      autoHideContainer = _ref.autoHideContainer,
      renderState = _ref.renderState,
      templates = _ref.templates,
      transformData = _ref.transformData;
  return function (_ref2, isFirstRendering) {
    var value = _ref2.value,
        createURL = _ref2.createURL,
        refine = _ref2.refine,
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

    var shouldAutoHideContainer = autoHideContainer && (value.count === 0 || value.count === null);

    (0, _preactCompat.render)(_preactCompat2.default.createElement(_RefinementList2.default, {
      collapsible: collapsible,
      createURL: createURL,
      cssClasses: cssClasses,
      facetValues: [value],
      shouldAutoHideContainer: shouldAutoHideContainer,
      templateProps: renderState.templateProps,
      toggleRefinement: function toggleRefinement(name, isRefined) {
        return refine({ isRefined: isRefined });
      }
    }), containerNode);
  };
};

var usage = 'Usage:\ntoggle({\n  container,\n  attributeName,\n  label,\n  [ values={on: true, off: undefined} ],\n  [ cssClasses.{root,header,body,footer,list,item,active,label,checkbox,count} ],\n  [ templates.{header,item,footer} ],\n  [ transformData.{item} ],\n  [ autoHideContainer=true ],\n  [ collapsible=false ]\n})';

/**
 * @typedef {Object} ToggleWidgetCSSClasses
 * @property  {string|string[]} [root] CSS class to add to the root element.
 * @property  {string|string[]} [header] CSS class to add to the header element.
 * @property  {string|string[]} [body] CSS class to add to the body element.
 * @property  {string|string[]} [footer] CSS class to add to the footer element.
 * @property  {string|string[]} [list] CSS class to add to the list element.
 * @property  {string|string[]} [item] CSS class to add to each item element.
 * @property  {string|string[]} [active] CSS class to add to each active element.
 * @property  {string|string[]} [label] CSS class to add to each
 * label element (when using the default template).
 * @property  {string|string[]} [checkbox] CSS class to add to each
 * checkbox element (when using the default template).
 * @property  {string|string[]} [count] CSS class to add to each count.
 */

/**
 * @typedef {Object} ToggleWidgetTransforms
 * @property  {function(Object):Object} item Function to change the object passed to the `item`. template
 */

/**
 * @typedef {Object} ToggleWidgetTemplates
 * @property  {string|function} header Header template.
 * @property  {string|function} item Item template, provided with `name`, `count`, `isRefined`, `url` data properties.
 * count is always the number of hits that would be shown if you toggle the widget. We also provide
 * `onFacetValue` and `offFacetValue` objects with according counts.
 * @property  {string|function} footer Footer template.
 */

/**
 * @typedef {Object} ToggleWidgetValues
 * @property  {string|number|boolean} on Value to filter on when checked.
 * @property  {string|number|boolean} off Value to filter on when unchecked.
 * element (when using the default template). By default when switching to `off`, no refinement will be asked. So you
 * will get both `true` and `false` results. If you set the off value to `false` then you will get only objects
 * having `false` has a value for the selected attribute.
 */

/**
 * @typedef {Object} ToggleWidgetCollapsibleOption
 * @property {boolean} collapsed If set to true, the widget will be collapsed at first rendering.
 */

/**
 * @typedef {Object} ToggleWidgetOptions
 * @property {string|HTMLElement} container Place where to insert the widget in your webpage.
 * @property {string} attributeName Name of the attribute for faceting (eg. "free_shipping").
 * @property {string} label Human-readable name of the filter (eg. "Free Shipping").
 * @property {ToggleWidgetValues} [values={on: true, off: undefined}] Values that the widget can set.
 * @property {ToggleWidgetTemplates} [templates] Templates to use for the widget.
 * @property {ToggleWidgetTransforms} [transformData] Object that contains the functions to be applied on the data * before being used for templating. Valid keys are `body` for the body template.
 * @property {boolean} [autoHideContainer=true] Make the widget hides itself when there is no results matching.
 * @property {ToggleWidgetCSSClasses} [cssClasses] CSS classes to add.
 * @property {boolean|ToggleWidgetCollapsibleOption} collapsible If set to true, the widget can be collapsed. This parameter can also be
 * an object, with the property collapsed, if you want the toggle to be collapsed initially.
 */

/**
 * The toggle widget lets the user either:
 *  - switch between two values for a single facetted attribute (free_shipping / not_free_shipping)
 *  - toggle a faceted value on and off (only 'canon' for brands)
 *
 * This widget is particularly useful if you have a boolean value in the records.
 *
 * @requirements
 * The attribute passed to `attributeName` must be declared as an
 * [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting)
 * in your Algolia settings.
 *
 * @type {WidgetFactory}
 * @devNovel Toggle
 * @category filter
 * @param {ToggleWidgetOptions} $0 Options for the Toggle widget.
 * @return {Widget} A new instance of the Toggle widget
 * @example
 * search.addWidget(
 *   instantsearch.widgets.toggle({
 *     container: '#free-shipping',
 *     attributeName: 'free_shipping',
 *     label: 'Free Shipping',
 *     values: {
 *       on: true,
 *     },
 *     templates: {
 *       header: 'Shipping'
 *     }
 *   })
 * );
 */
function toggle() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      attributeName = _ref3.attributeName,
      label = _ref3.label,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates,
      transformData = _ref3.transformData,
      _ref3$autoHideContain = _ref3.autoHideContainer,
      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain,
      _ref3$collapsible = _ref3.collapsible,
      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
      _ref3$values = _ref3.values,
      userValues = _ref3$values === undefined ? { on: true, off: undefined } : _ref3$values;

  if (!container) {
    throw new Error(usage);
  }

  var containerNode = (0, _utils.getContainerNode)(container);

  var cssClasses = {
    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
    header: (0, _classnames2.default)(bem('header'), userCssClasses.header),
    body: (0, _classnames2.default)(bem('body'), userCssClasses.body),
    footer: (0, _classnames2.default)(bem('footer'), userCssClasses.footer),
    list: (0, _classnames2.default)(bem('list'), userCssClasses.list),
    item: (0, _classnames2.default)(bem('item'), userCssClasses.item),
    active: (0, _classnames2.default)(bem('item', 'active'), userCssClasses.active),
    label: (0, _classnames2.default)(bem('label'), userCssClasses.label),
    checkbox: (0, _classnames2.default)(bem('checkbox'), userCssClasses.checkbox),
    count: (0, _classnames2.default)(bem('count'), userCssClasses.count)
  };

  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    collapsible: collapsible,
    autoHideContainer: autoHideContainer,
    renderState: {},
    templates: templates,
    transformData: transformData
  });

  try {
    var makeWidget = (0, _connectToggle2.default)(specializedRenderer, function () {
      return (0, _preactCompat.unmountComponentAtNode)(containerNode);
    });
    return makeWidget({ attributeName: attributeName, label: label, values: userValues });
  } catch (e) {
    throw new Error(usage);
  }
}