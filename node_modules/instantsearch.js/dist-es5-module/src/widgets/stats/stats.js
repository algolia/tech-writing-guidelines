'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stats;

var _preactCompat = require('preact-compat');

var _preactCompat2 = _interopRequireDefault(_preactCompat);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Stats = require('../../components/Stats/Stats.js');

var _Stats2 = _interopRequireDefault(_Stats);

var _connectStats = require('../../connectors/stats/connectStats.js');

var _connectStats2 = _interopRequireDefault(_connectStats);

var _defaultTemplates = require('./defaultTemplates.js');

var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);

var _utils = require('../../lib/utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bem = (0, _utils.bemHelper)('ais-stats');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      collapsible = _ref.collapsible,
      autoHideContainer = _ref.autoHideContainer,
      renderState = _ref.renderState,
      templates = _ref.templates,
      transformData = _ref.transformData;
  return function (_ref2, isFirstRendering) {
    var hitsPerPage = _ref2.hitsPerPage,
        nbHits = _ref2.nbHits,
        nbPages = _ref2.nbPages,
        page = _ref2.page,
        processingTimeMS = _ref2.processingTimeMS,
        query = _ref2.query,
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

    var shouldAutoHideContainer = autoHideContainer && nbHits === 0;

    (0, _preactCompat.render)(_preactCompat2.default.createElement(_Stats2.default, {
      collapsible: collapsible,
      cssClasses: cssClasses,
      hitsPerPage: hitsPerPage,
      nbHits: nbHits,
      nbPages: nbPages,
      page: page,
      processingTimeMS: processingTimeMS,
      query: query,
      shouldAutoHideContainer: shouldAutoHideContainer,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};

var usage = 'Usage:\nstats({\n  container,\n  [ templates.{header, body, footer} ],\n  [ transformData.{body} ],\n  [ autoHideContainer=true ],\n  [ cssClasses.{root, header, body, footer, time} ],\n})';

/**
 * @typedef {Object} StatsWidgetTemplates
 * @property {string|function} [header=''] Header template.
 * @property {string|function} [body] Body template, provided with `hasManyResults`,
 * `hasNoResults`, `hasOneResult`, `hitsPerPage`, `nbHits`, `nbPages`, `page`, `processingTimeMS`, `query`.
 * @property {string|function} [footer=''] Footer template.
 */

/**
 * @typedef {Object} StatsWidgetCssClasses
 * @property {string|string[]} [root] CSS class to add to the root element.
 * @property {string|string[]} [header] CSS class to add to the header element.
 * @property {string|string[]} [body] CSS class to add to the body element.
 * @property {string|string[]} [footer] CSS class to add to the footer element.
 * @property {string|string[]} [time] CSS class to add to the element wrapping the time processingTimeMs.
 */

/**
 * @typedef {Object} StatsWidgetTransforms
 * @property {function(StatsBodyData):object} [body] Updates the content of object passed to the `body` template.
 */

/**
 * @typedef {Object} StatsBodyData
 * @property {boolean} hasManyResults True if the result set has more than one result.
 * @property {boolean} hasNoResults True if the result set has no result.
 * @property {boolean} hasOneResult True if the result set has exactly one result.
 * @property {number} hitsPerPage Number of hits per page.
 * @property {number} nbHits Number of hit in the result set.
 * @property {number} nbPages Number of pages in the result set with regard to the hitsPerPage and number of hits.
 * @property {number} page Number of the current page. First page is 0.
 * @property {number} processingTimeMS Time taken to compute the results inside the engine.
 * @property {string} query Text query currently used.
 */

/**
 * @typedef {Object} StatsWidgetOptions
 * @property {string|HTMLElement} container Place where to insert the widget in your webpage.
 * @property {StatsWidgetTemplates} [templates] Templates to use for the widget.
 * @property {StatsWidgetTransforms} [transformData] Object that contains the functions to be applied on the data * before being used for templating. Valid keys are `body` for the body template.
 * @property {boolean} [autoHideContainer=true] Make the widget hides itself when there is no results matching.
 * @property {StatsWidgetCssClasses} [cssClasses] CSS classes to add.
 */

/**
 * The `stats` widget is used to display useful insights about the current results.
 *
 * By default, it will display the **number of hits** and the time taken to compute the
 * results inside the engine.
 * @type {WidgetFactory}
 * @devNovel Stats
 * @category metadata
 * @param {StatsWidgetOptions} $0 Stats widget options. Some keys are mandatory: `container`,
 * @return {Widget} A new stats widget instance
 * @example
 * search.addWidget(
 *   instantsearch.widgets.stats({
 *     container: '#stats-container'
 *   })
 * );
 */
function stats() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
      _ref3$autoHideContain = _ref3.autoHideContainer,
      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain,
      _ref3$collapsible = _ref3.collapsible,
      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
      transformData = _ref3.transformData,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === undefined ? _defaultTemplates2.default : _ref3$templates;

  if (!container) {
    throw new Error(usage);
  }

  var containerNode = (0, _utils.getContainerNode)(container);

  var cssClasses = {
    body: (0, _classnames2.default)(bem('body'), userCssClasses.body),
    footer: (0, _classnames2.default)(bem('footer'), userCssClasses.footer),
    header: (0, _classnames2.default)(bem('header'), userCssClasses.header),
    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
    time: (0, _classnames2.default)(bem('time'), userCssClasses.time)
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
    var makeWidget = (0, _connectStats2.default)(specializedRenderer, function () {
      return (0, _preactCompat.unmountComponentAtNode)(containerNode);
    });
    return makeWidget();
  } catch (e) {
    throw new Error(usage);
  }
}