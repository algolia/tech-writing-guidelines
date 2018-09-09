'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hierarchicalMenu;

var _preactCompat = require('preact-compat');

var _preactCompat2 = _interopRequireDefault(_preactCompat);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _connectHierarchicalMenu = require('../../connectors/hierarchical-menu/connectHierarchicalMenu');

var _connectHierarchicalMenu2 = _interopRequireDefault(_connectHierarchicalMenu);

var _RefinementList = require('../../components/RefinementList/RefinementList.js');

var _RefinementList2 = _interopRequireDefault(_RefinementList);

var _defaultTemplates = require('./defaultTemplates.js');

var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);

var _utils = require('../../lib/utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bem = (0, _utils.bemHelper)('ais-hierarchical-menu');

var renderer = function renderer(_ref) {
  var autoHideContainer = _ref.autoHideContainer,
      collapsible = _ref.collapsible,
      cssClasses = _ref.cssClasses,
      containerNode = _ref.containerNode,
      transformData = _ref.transformData,
      templates = _ref.templates,
      renderState = _ref.renderState;
  return function (_ref2, isFirstRendering) {
    var createURL = _ref2.createURL,
        items = _ref2.items,
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

    var shouldAutoHideContainer = autoHideContainer && items.length === 0;

    (0, _preactCompat.render)(_preactCompat2.default.createElement(_RefinementList2.default, {
      collapsible: collapsible,
      createURL: createURL,
      cssClasses: cssClasses,
      facetValues: items,
      shouldAutoHideContainer: shouldAutoHideContainer,
      templateProps: renderState.templateProps,
      toggleRefinement: refine
    }), containerNode);
  };
};

var usage = 'Usage:\nhierarchicalMenu({\n  container,\n  attributes,\n  [ separator=\' > \' ],\n  [ rootPath ],\n  [ showParentLevel=false ],\n  [ limit=10 ],\n  [ sortBy=[\'name:asc\'] ],\n  [ cssClasses.{root , header, body, footer, list, depth, item, active, link}={} ],\n  [ templates.{header, item, footer} ],\n  [ transformData.{item} ],\n  [ autoHideContainer=true ],\n  [ collapsible=false ]\n})';
/**
 * @typedef {Object} HierarchicalMenuCSSClasses
 * @property {string|string[]} [root] CSS class to add to the root element.
 * @property {string|string[]} [header] CSS class to add to the header element.
 * @property {string|string[]} [body] CSS class to add to the body element.
 * @property {string|string[]} [footer] CSS class to add to the footer element.
 * @property {string|string[]} [list] CSS class to add to the list element.
 * @property {string|string[]} [item] CSS class to add to each item element.
 * @property {string|string[]} [depth] CSS class to add to each item element to denote its depth. The actual level will be appended to the given class name (ie. if `depth` is given, the widget will add `depth0`, `depth1`, ... according to the level of each item).
 * @property {string|string[]} [active] CSS class to add to each active element.
 * @property {string|string[]} [link] CSS class to add to each link (when using the default template).
 * @property {string|string[]} [count] CSS class to add to each count element (when using the default template).
 */

/**
 * @typedef {Object} HierarchicalMenuTemplates
 * @property {string|function(object):string} [header=''] Header template (root level only).
 * @property {string|function(object):string} [item] Item template, provided with `name`, `count`, `isRefined`, `url` data properties.
 * @property {string|function(object):string} [footer=''] Footer template (root level only).
 */

/**
 * @typedef {Object} HierarchicalMenuTransforms
 * @property {function(object):object} [item] Method to change the object passed to the `item`. template
 */

/**
 * @typedef {Object} HierarchicalMenuWidgetOptions
 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
 * @property {string[]} attributes Array of attributes to use to generate the hierarchy of the menu.
 * @property {number} [limit=10] How much facet values to get.
 * @property {string} [separator=" > "] Separator used in the attributes to separate level values.
 * @property {string} [rootPath] Prefix path to use if the first level is not the root level.
 * @property {boolean} [showParentLevel=true] Show the siblings of the selected parent level of the current refined value. This
 * does not impact the root level.
 *
 * The hierarchical menu is able to show or hide the siblings with `showParentLevel`.
 *
 * With `showParentLevel` set to `true` (default):
 * - Parent lvl0
 *   - **lvl1**
 *     - **lvl2**
 *     - lvl2
 *     - lvl2
 *   - lvl 1
 *   - lvl 1
 * - Parent lvl0
 * - Parent lvl0
 *
 * With `showParentLevel` set to `false`:
 * - Parent lvl0
 *   - **lvl1**
 *     - **lvl2**
 * - Parent lvl0
 * - Parent lvl0
 * @property {string[]|function} [sortBy=['name:asc']] How to sort refinements. Possible values: `count|isRefined|name:asc|name:desc`.
 *
 * You can also use a sort function that behaves like the standard Javascript [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Syntax).
 * @property {HierarchicalMenuTemplates} [templates] Templates to use for the widget.
 * @property {HierarchicalMenuTransforms} [transformData] Set of functions to transform the data passed to the templates.
 * @property {boolean} [autoHideContainer=true] Hide the container when there are no items in the menu.
 * @property {HierarchicalMenuCSSClasses} [cssClasses] CSS classes to add to the wrapping elements.
 * @property {boolean|{collapsed: boolean}} [collapsible=false] Makes the widget collapsible. The user can then
 * choose to hide the content of the widget. This option can also be an object with the property collapsed. If this
 * property is `true`, then the widget is hidden during the first rendering.
 */

/**
 * The hierarchical menu widget is used to create a navigation based on a hierarchy of facet attributes.
 *
 * It is commonly used for categories with subcategories.
 *
 * All attributes (lvl0, lvl1 here) must be declared as [attributes for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting) in your
 * Algolia settings.
 *
 * By default, the separator we expect is ` > ` (with spaces) but you can use
 * a different one by using the `separator` option.
 * @requirements
 * Your objects must be formatted in a specific way to be
 * able to display hierarchical menus. Here's an example:
 *
 * ```javascript
 * {
 *   "objectID": "123",
 *   "name": "orange",
 *   "categories": {
 *     "lvl0": "fruits",
 *     "lvl1": "fruits > citrus"
 *   }
 * }
 * ```
 *
 * Every level must be specified entirely.
 * It's also possible to have multiple values per level, for example:
 *
 * ```javascript
 * {
 *   "objectID": "123",
 *   "name": "orange",
 *   "categories": {
 *     "lvl0": ["fruits", "vitamins"],
 *     "lvl1": ["fruits > citrus", "vitamins > C"]
 *   }
 * }
 * ```
 * @type {WidgetFactory}
 * @devNovel HierarchicalMenu
 * @category filter
 * @param {HierarchicalMenuWidgetOptions} $0 The HierarchicalMenu widget options.
 * @return {Widget} A new HierarchicalMenu widget instance.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.hierarchicalMenu({
 *     container: '#hierarchical-categories',
 *     attributes: ['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1', 'hierarchicalCategories.lvl2'],
 *     templates: {
 *       header: 'Hierarchical categories'
 *     }
 *   })
 * );
 */
function hierarchicalMenu() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      attributes = _ref3.attributes,
      _ref3$separator = _ref3.separator,
      separator = _ref3$separator === undefined ? ' > ' : _ref3$separator,
      _ref3$rootPath = _ref3.rootPath,
      rootPath = _ref3$rootPath === undefined ? null : _ref3$rootPath,
      _ref3$showParentLevel = _ref3.showParentLevel,
      showParentLevel = _ref3$showParentLevel === undefined ? true : _ref3$showParentLevel,
      _ref3$limit = _ref3.limit,
      limit = _ref3$limit === undefined ? 10 : _ref3$limit,
      _ref3$sortBy = _ref3.sortBy,
      sortBy = _ref3$sortBy === undefined ? ['name:asc'] : _ref3$sortBy,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
      _ref3$autoHideContain = _ref3.autoHideContainer,
      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates,
      _ref3$collapsible = _ref3.collapsible,
      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
      transformData = _ref3.transformData;

  if (!container || !attributes || !attributes.length) {
    throw new Error(usage);
  }

  var containerNode = (0, _utils.getContainerNode)(container);

  var cssClasses = {
    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
    header: (0, _classnames2.default)(bem('header'), userCssClasses.header),
    body: (0, _classnames2.default)(bem('body'), userCssClasses.body),
    footer: (0, _classnames2.default)(bem('footer'), userCssClasses.footer),
    list: (0, _classnames2.default)(bem('list'), userCssClasses.list),
    depth: bem('list', 'lvl'),
    item: (0, _classnames2.default)(bem('item'), userCssClasses.item),
    active: (0, _classnames2.default)(bem('item', 'active'), userCssClasses.active),
    link: (0, _classnames2.default)(bem('link'), userCssClasses.link),
    count: (0, _classnames2.default)(bem('count'), userCssClasses.count)
  };

  var specializedRenderer = renderer({
    autoHideContainer: autoHideContainer,
    collapsible: collapsible,
    cssClasses: cssClasses,
    containerNode: containerNode,
    transformData: transformData,
    templates: templates,
    renderState: {}
  });

  try {
    var makeHierarchicalMenu = (0, _connectHierarchicalMenu2.default)(specializedRenderer, function () {
      return (0, _preactCompat.unmountComponentAtNode)(containerNode);
    });
    return makeHierarchicalMenu({
      attributes: attributes,
      separator: separator,
      rootPath: rootPath,
      showParentLevel: showParentLevel,
      limit: limit,
      sortBy: sortBy
    });
  } catch (e) {
    throw new Error(usage);
  }
}