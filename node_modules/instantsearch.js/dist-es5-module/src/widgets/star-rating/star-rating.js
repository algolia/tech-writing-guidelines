'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = starRating;

var _preactCompat = require('preact-compat');

var _preactCompat2 = _interopRequireDefault(_preactCompat);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _RefinementList = require('../../components/RefinementList/RefinementList.js');

var _RefinementList2 = _interopRequireDefault(_RefinementList);

var _connectStarRating = require('../../connectors/star-rating/connectStarRating.js');

var _connectStarRating2 = _interopRequireDefault(_connectStarRating);

var _defaultTemplates = require('./defaultTemplates.js');

var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);

var _defaultLabels = require('./defaultLabels.js');

var _defaultLabels2 = _interopRequireDefault(_defaultLabels);

var _utils = require('../../lib/utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bem = (0, _utils.bemHelper)('ais-star-rating');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      templates = _ref.templates,
      collapsible = _ref.collapsible,
      transformData = _ref.transformData,
      autoHideContainer = _ref.autoHideContainer,
      renderState = _ref.renderState,
      labels = _ref.labels;
  return function (_ref2, isFirstRendering) {
    var refine = _ref2.refine,
        items = _ref2.items,
        createURL = _ref2.createURL,
        instantSearchInstance = _ref2.instantSearchInstance,
        hasNoResults = _ref2.hasNoResults;

    if (isFirstRendering) {
      renderState.templateProps = (0, _utils.prepareTemplateProps)({
        transformData: transformData,
        defaultTemplates: _defaultTemplates2.default,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    var shouldAutoHideContainer = autoHideContainer && hasNoResults;

    (0, _preactCompat.render)(_preactCompat2.default.createElement(_RefinementList2.default, {
      collapsible: collapsible,
      createURL: createURL,
      cssClasses: cssClasses,
      facetValues: items.map(function (item) {
        return _extends({}, item, { labels: labels });
      }),
      shouldAutoHideContainer: shouldAutoHideContainer,
      templateProps: renderState.templateProps,
      toggleRefinement: refine
    }), containerNode);
  };
};

var usage = 'Usage:\nstarRating({\n  container,\n  attributeName,\n  [ max=5 ],\n  [ cssClasses.{root,header,body,footer,list,item,active,link,disabledLink,star,emptyStar,count} ],\n  [ templates.{header,item,footer} ],\n  [ transformData.{item} ],\n  [ labels.{andUp} ],\n  [ autoHideContainer=true ],\n  [ collapsible=false ]\n})';

/**
 * @typedef {Object} StarWidgetLabels
 * @property {string} [andUp] Label used to suffix the ratings.
 */

/**
 * @typedef {Object} StarWidgetTemplates
 * @property  {string|function} [header] Header template.
 * @property  {string|function} [item] Item template, provided with `name`, `count`, `isRefined`, `url` data properties.
 * @property  {string|function} [footer] Footer template.
 */

/**
 * @typedef {Object} StarWidgetCssClasses
 * @property  {string|string[]} [root] CSS class to add to the root element.
 * @property  {string|string[]} [header] CSS class to add to the header element.
 * @property  {string|string[]} [body] CSS class to add to the body element.
 * @property  {string|string[]} [footer] CSS class to add to the footer element.
 * @property  {string|string[]} [list] CSS class to add to the list element.
 * @property  {string|string[]} [item] CSS class to add to each item element.
 * @property  {string|string[]} [link] CSS class to add to each link element.
 * @property  {string|string[]} [disabledLink] CSS class to add to each disabled link (when using the default template).
 * @property  {string|string[]} [count] CSS class to add to each counters
 * @property  {string|string[]} [star] CSS class to add to each star element (when using the default template).
 * @property  {string|string[]} [emptyStar] CSS class to add to each empty star element (when using the default template).
 * @property  {string|string[]} [active] CSS class to add to each active element.
 */

/**
 * @typedef {Object} StarWidgetCollapsibleOption
 * @property {boolean} collapsed If set to true, the widget will be collapsed at first rendering.
 */

/**
 * @typedef {Object} StarWidgetTransforms
 * @property  {function} [item] Function to change the object passed to the `item` template.
 */

/**
 * @typedef {Object} StarWidgetOptions
 * @property {string|HTMLElement} container Place where to insert the widget in your webpage.
 * @property {string} attributeName Name of the attribute in your records that contains the ratings.
 * @property {number} [max=5] The maximum rating value.
 * @property {StarWidgetLabels} [labels] Labels used by the default template.
 * @property {StarWidgetTemplates} [templates] Templates to use for the widget.
 * @property {StarWidgetTransforms} [transformData] Object that contains the functions to be applied on the data * before being used for templating. Valid keys are `body` for the body template.
 * @property {boolean} [autoHideContainer=true] Make the widget hides itself when there is no results matching.
 * @property {StarWidgetCssClasses} [cssClasses] CSS classes to add.
 * @property {boolean|StarWidgetCollapsibleOption} [collapsible=false] If set to true, the widget can be collapsed. This parameter can also be
 */

/**
 * Star rating is used for displaying grade like filters. The values are normalized within boundaries.
 *
 * The maximum value can be set (with `max`), the minimum is always 0.
 *
 * @requirements
 * The attribute passed to `attributeName` must be declared as an
 * [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting)
 * in your Algolia settings.
 *
 * The values inside this attribute must be JavaScript numbers (not strings).
 *
 * @type {WidgetFactory}
 * @devNovel StarRating
 * @category filter
 * @param {StarWidgetOptions} $0 StarRating widget options.
 * @return {Widget} A new StarRating widget instance.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.starRating({
 *     container: '#stars',
 *     attributeName: 'rating',
 *     max: 5,
 *     labels: {
 *       andUp: '& Up'
 *     }
 *   })
 * );
 */
function starRating() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      attributeName = _ref3.attributeName,
      _ref3$max = _ref3.max,
      max = _ref3$max === undefined ? 5 : _ref3$max,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
      _ref3$labels = _ref3.labels,
      labels = _ref3$labels === undefined ? _defaultLabels2.default : _ref3$labels,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates,
      _ref3$collapsible = _ref3.collapsible,
      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
      transformData = _ref3.transformData,
      _ref3$autoHideContain = _ref3.autoHideContainer,
      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain;

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
    link: (0, _classnames2.default)(bem('link'), userCssClasses.link),
    disabledLink: (0, _classnames2.default)(bem('link', 'disabled'), userCssClasses.disabledLink),
    count: (0, _classnames2.default)(bem('count'), userCssClasses.count),
    star: (0, _classnames2.default)(bem('star'), userCssClasses.star),
    emptyStar: (0, _classnames2.default)(bem('star', 'empty'), userCssClasses.emptyStar),
    active: (0, _classnames2.default)(bem('item', 'active'), userCssClasses.active)
  };

  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    collapsible: collapsible,
    autoHideContainer: autoHideContainer,
    renderState: {},
    templates: templates,
    transformData: transformData,
    labels: labels
  });

  try {
    var makeWidget = (0, _connectStarRating2.default)(specializedRenderer, function () {
      return (0, _preactCompat.unmountComponentAtNode)(containerNode);
    });
    return makeWidget({ attributeName: attributeName, max: max });
  } catch (e) {
    throw new Error(usage);
  }
}