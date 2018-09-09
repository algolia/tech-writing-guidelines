'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = menuSelect;

var _preactCompat = require('preact-compat');

var _preactCompat2 = _interopRequireDefault(_preactCompat);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _connectMenu = require('../../connectors/menu/connectMenu');

var _connectMenu2 = _interopRequireDefault(_connectMenu);

var _defaultTemplates = require('./defaultTemplates');

var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);

var _MenuSelect = require('../../components/MenuSelect');

var _MenuSelect2 = _interopRequireDefault(_MenuSelect);

var _utils = require('../../lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bem = (0, _utils.bemHelper)('ais-menu-select');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      autoHideContainer = _ref.autoHideContainer,
      renderState = _ref.renderState,
      templates = _ref.templates,
      transformData = _ref.transformData;
  return function (_ref2, isFirstRendering) {
    var refine = _ref2.refine,
        items = _ref2.items,
        canRefine = _ref2.canRefine,
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

    var shouldAutoHideContainer = autoHideContainer && !canRefine;

    (0, _preactCompat.render)(_preactCompat2.default.createElement(_MenuSelect2.default, {
      cssClasses: cssClasses,
      items: items,
      refine: refine,
      templateProps: renderState.templateProps,
      shouldAutoHideContainer: shouldAutoHideContainer,
      canRefine: canRefine
    }), containerNode);
  };
};

var usage = 'Usage:\nmenuSelect({\n  container,\n  attributeName,\n  [ sortBy=[\'name:asc\'] ],\n  [ limit=10 ],\n  [ cssClasses.{root,select,option,header,footer} ]\n  [ templates.{header,item,footer,seeAllOption} ],\n  [ transformData.{item} ],\n  [ autoHideContainer ]\n})';

/**
 * @typedef {Object} MenuSelectCSSClasses
 * @property {string|string[]} [root] CSS class to add to the root element.
 * @property {string|string[]} [header] CSS class to add to the header element.
 * @property {string|string[]} [select] CSS class to add to the select element.
 * @property {string|string[]} [option] CSS class to add to the option element.
 * @property {string|string[]} [footer] CSS class to add to the footer element.
 */

/**
 * @typedef {Object} MenuSelectTemplates
 * @property {string|function} [header] Header template.
 * @property {string|function(label: string, count: number, isRefined: boolean, value: string)} [item] Item template, provided with `label`, `count`, `isRefined` and `value` data properties.
 * @property {string} [seeAllOption='See all'] Label of the see all option in the select.
 * @property {string|function} [footer] Footer template.
 */

/**
 * @typedef {Object} MenuSelectTransforms
 * @property {function} [item] Method to change the object passed to the `item` template.
 */

/**
 * @typedef {Object} MenuSelectWidgetOptions
 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
 * @property {string} attributeName Name of the attribute for faceting
 * @property {string[]|function} [sortBy=['name:asc']] How to sort refinements. Possible values: `count|isRefined|name:asc|name:desc`.
 *
 * You can also use a sort function that behaves like the standard Javascript [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Syntax).
 * @property {MenuSelectTemplates} [templates] Customize the output through templating.
 * @property {string} [limit=10] How many facets values to retrieve.
 * @property {MenuSelectTransforms} [transformData] Set of functions to update the data before passing them to the templates.
 * @property {boolean} [autoHideContainer=true] Hide the container when there are no items in the menu select.
 * @property {MenuSelectCSSClasses} [cssClasses] CSS classes to add to the wrapping elements.
 */

/**
 * Create a menu select out of a facet
 * @type {WidgetFactory}
 * @category filter
 * @param {MenuSelectWidgetOptions} $0 The Menu select widget options.
 * @return {Widget} Creates a new instance of the Menu select widget.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.menuSelect({
 *     container: '#categories-menuSelect',
 *     attributeName: 'hierarchicalCategories.lvl0',
 *     limit: 10,
 *     templates: {
 *       header: 'Categories'
 *     }
 *   })
 * );
 */
function menuSelect(_ref3) {
  var container = _ref3.container,
      attributeName = _ref3.attributeName,
      _ref3$sortBy = _ref3.sortBy,
      sortBy = _ref3$sortBy === undefined ? ['name:asc'] : _ref3$sortBy,
      _ref3$limit = _ref3.limit,
      limit = _ref3$limit === undefined ? 10 : _ref3$limit,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates,
      transformData = _ref3.transformData,
      _ref3$autoHideContain = _ref3.autoHideContainer,
      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain;

  if (!container || !attributeName) {
    throw new Error(usage);
  }

  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
    header: (0, _classnames2.default)(bem('header'), userCssClasses.header),
    footer: (0, _classnames2.default)(bem('footer'), userCssClasses.footer),
    select: (0, _classnames2.default)(bem('select'), userCssClasses.select),
    option: (0, _classnames2.default)(bem('option'), userCssClasses.option)
  };

  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    autoHideContainer: autoHideContainer,
    renderState: {},
    templates: templates,
    transformData: transformData
  });

  try {
    var makeWidget = (0, _connectMenu2.default)(specializedRenderer);
    return makeWidget({ attributeName: attributeName, limit: limit, sortBy: sortBy });
  } catch (e) {
    throw new Error(usage);
  }
}