'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sortBySelector;

var _preactCompat = require('preact-compat');

var _preactCompat2 = _interopRequireDefault(_preactCompat);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Selector = require('../../components/Selector.js');

var _Selector2 = _interopRequireDefault(_Selector);

var _connectSortBySelector = require('../../connectors/sort-by-selector/connectSortBySelector.js');

var _connectSortBySelector2 = _interopRequireDefault(_connectSortBySelector);

var _utils = require('../../lib/utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bem = (0, _utils.bemHelper)('ais-sort-by-selector');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      autoHideContainer = _ref.autoHideContainer;
  return function (_ref2, isFirstRendering) {
    var currentRefinement = _ref2.currentRefinement,
        options = _ref2.options,
        refine = _ref2.refine,
        hasNoResults = _ref2.hasNoResults;

    if (isFirstRendering) return;

    var shouldAutoHideContainer = autoHideContainer && hasNoResults;

    (0, _preactCompat.render)(_preactCompat2.default.createElement(_Selector2.default, {
      cssClasses: cssClasses,
      currentValue: currentRefinement,
      options: options,
      setValue: refine,
      shouldAutoHideContainer: shouldAutoHideContainer
    }), containerNode);
  };
};

var usage = 'Usage:\nsortBySelector({\n  container,\n  indices,\n  [cssClasses.{root,select,item}={}],\n  [autoHideContainer=false]\n})';

/**
 * @typedef {Object} SortByWidgetCssClasses
 * @property {string|string[]} [root] CSS classes added to the outer `<div>`.
 * @property {string|string[]} [select] CSS classes added to the parent `<select>`.
 * @property {string|string[]} [item] CSS classes added to each `<option>`.
 */

/**
 * @typedef {Object} SortByIndexDefinition
 * @property {string} name The name of the index in Algolia.
 * @property {string} label The name of the index, for user usage.
 */

/**
 * @typedef {Object} SortByWidgetOptions
 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
 * @property {SortByIndexDefinition[]} indices Array of objects defining the different indices to choose from.
 * @property {boolean} [autoHideContainer=false] Hide the container when no results match.
 * @property {SortByWidgetCssClasses} [cssClasses] CSS classes to be added.
 */

/**
 * Sort by selector is a widget used for letting the user choose between different
 * indices that contains the same data with a different order / ranking formula.
 *
 * For the users it is like they are selecting a new sort order.
 * @type {WidgetFactory}
 * @devNovel SortBySelector
 * @category sort
 * @param {SortByWidgetOptions} $0 Options for the SortBySelector widget
 * @return {Widget} Creates a new instance of the SortBySelector widget.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.sortBySelector({
 *     container: '#sort-by-container',
 *     indices: [
 *       {name: 'instant_search', label: 'Most relevant'},
 *       {name: 'instant_search_price_asc', label: 'Lowest price'},
 *       {name: 'instant_search_price_desc', label: 'Highest price'}
 *     ]
 *   })
 * );
 */
function sortBySelector() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      indices = _ref3.indices,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
      _ref3$autoHideContain = _ref3.autoHideContainer,
      autoHideContainer = _ref3$autoHideContain === undefined ? false : _ref3$autoHideContain;

  if (!container) {
    throw new Error(usage);
  }

  var containerNode = (0, _utils.getContainerNode)(container);

  var cssClasses = {
    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
    // We use the same class to avoid regression on existing website. It needs to be replaced
    // eventually by `bem('select')
    select: (0, _classnames2.default)(bem(null), userCssClasses.select),
    item: (0, _classnames2.default)(bem('item'), userCssClasses.item)
  };

  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    autoHideContainer: autoHideContainer
  });

  try {
    var makeWidget = (0, _connectSortBySelector2.default)(specializedRenderer, function () {
      return (0, _preactCompat.unmountComponentAtNode)(containerNode);
    });
    return makeWidget({ indices: indices });
  } catch (e) {
    throw new Error(usage);
  }
}