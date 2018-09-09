'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hits;

var _preactCompat = require('preact-compat');

var _preactCompat2 = _interopRequireDefault(_preactCompat);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Hits = require('../../components/Hits.js');

var _Hits2 = _interopRequireDefault(_Hits);

var _connectHits = require('../../connectors/hits/connectHits.js');

var _connectHits2 = _interopRequireDefault(_connectHits);

var _defaultTemplates = require('./defaultTemplates.js');

var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);

var _utils = require('../../lib/utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bem = (0, _utils.bemHelper)('ais-hits');

var renderer = function renderer(_ref) {
  var renderState = _ref.renderState,
      cssClasses = _ref.cssClasses,
      containerNode = _ref.containerNode,
      transformData = _ref.transformData,
      templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var receivedHits = _ref2.hits,
        results = _ref2.results,
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

    (0, _preactCompat.render)(_preactCompat2.default.createElement(_Hits2.default, {
      cssClasses: cssClasses,
      hits: receivedHits,
      results: results,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};

var usage = 'Usage:\nhits({\n  container,\n  [ cssClasses.{root,empty,item}={} ],\n  [ templates.{empty,item} | templates.{empty, allItems} ],\n  [ transformData.{empty,item} | transformData.{empty, allItems} ],\n})';

/**
 * @typedef {Object} HitsCSSClasses
 * @property {string|string[]} [root] CSS class to add to the wrapping element.
 * @property {string|string[]} [empty] CSS class to add to the wrapping element when no results.
 * @property {string|string[]} [item] CSS class to add to each result.
 */

/**
 * @typedef {Object} HitsTemplates
 * @property {string|function(object):string} [empty=''] Template to use when there are no results.
 * @property {string|function(object):string} [item=''] Template to use for each result. This template will receive an object containing a single record. The record will have a new property `__hitIndex` for the position of the record in the list of displayed hits.
 * @property {string|function(object):string} [allItems=''] Template to use for the list of all results. (Can't be used with `item` template). This template will receive a complete SearchResults result object, this object contains the key hits that contains all the records retrieved.
 */

/**
 * @typedef {Object} HitsTransforms
 * @property {function(object):object} [empty] Method used to change the object passed to the `empty` template.
 * @property {function(object):object} [item] Method used to change the object passed to the `item` template.
 * @property {function(object):object} [allItems] Method used to change the object passed to the `allItems` template.
 */

/**
 * @typedef {Object} HitsWidgetOptions
 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
 * @property {HitsTemplates} [templates] Templates to use for the widget.
 * @property {HitsTransforms} [transformData] Method to change the object passed to the templates.
 * @property {HitsCSSClasses} [cssClasses] CSS classes to add.
 * @property {boolean} [escapeHits = false] Escape HTML entities from hits string values.
 */

/**
 * Display the list of results (hits) from the current search.
 *
 * This is a traditional display of the hits. It has to be implemented
 * together with a pagination widget, to let the user browse the results
 * beyond the first page.
 * @type {WidgetFactory}
 * @devNovel Hits
 * @category basic
 * @param {HitsWidgetOptions} $0 Options of the Hits widget.
 * @return {Widget} A new instance of Hits widget.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.hits({
 *     container: '#hits-container',
 *     templates: {
 *       empty: 'No results',
 *       item: '<strong>Hit {{objectID}}</strong>: {{{_highlightResult.name.value}}}'
 *     },
 *     escapeHits: true,
 *   })
 * );
 */
function hits(_ref3) {
  var container = _ref3.container,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates,
      transformData = _ref3.transformData,
      _ref3$escapeHits = _ref3.escapeHits,
      escapeHits = _ref3$escapeHits === undefined ? false : _ref3$escapeHits;

  if (!container) {
    throw new Error('Must provide a container.' + usage);
  }

  if (templates.item && templates.allItems) {
    throw new Error('Must contain only allItems OR item template.' + usage);
  }

  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
    item: (0, _classnames2.default)(bem('item'), userCssClasses.item),
    empty: (0, _classnames2.default)(bem(null, 'empty'), userCssClasses.empty)
  };

  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    transformData: transformData,
    templates: templates
  });

  try {
    var makeHits = (0, _connectHits2.default)(specializedRenderer, function () {
      return (0, _preactCompat.unmountComponentAtNode)(containerNode);
    });
    return makeHits({ escapeHits: escapeHits });
  } catch (e) {
    throw new Error(usage);
  }
}