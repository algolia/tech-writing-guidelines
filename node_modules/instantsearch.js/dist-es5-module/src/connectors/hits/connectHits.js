'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectHits;

var _escapeHighlight = require('../../lib/escape-highlight.js');

var _escapeHighlight2 = _interopRequireDefault(_escapeHighlight);

var _utils = require('../../lib/utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usage = 'Usage:\nvar customHits = connectHits(function render(params, isFirstRendering) {\n  // params = {\n  //   hits,\n  //   results,\n  //   instantSearchInstance,\n  //   widgetParams,\n  // }\n});\nsearch.addWidget(\n  customHits({\n    [ escapeHits = false ]\n  })\n);\nFull documentation available at https://community.algolia.com/instantsearch.js/v2/connectors/connectHits.html\n';

/**
 * @typedef {Object} HitsRenderingOptions
 * @property {Object[]} hits The matched hits from Algolia API.
 * @property {Object} results The complete results response from Algolia API.
 * @property {Object} widgetParams All original widget options forwarded to the `renderFn`.
 */

/**
 * @typedef {Object} CustomHitsWidgetOptions
 * @property {boolean} [escapeHits = false] If true, escape HTML tags from `hits[i]._highlightResult`.
 */

/**
 * **Hits** connector provides the logic to create custom widgets that will render the results retrieved from Algolia.
 * @type {Connector}
 * @param {function(HitsRenderingOptions, boolean)} renderFn Rendering function for the custom **Hits** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomHitsWidgetOptions)} Re-usable widget factory for a custom **Hits** widget.
 * @example
 * // custom `renderFn` to render the custom Hits widget
 * function renderFn(HitsRenderingOptions) {
 *   HitsRenderingOptions.widgetParams.containerNode.html(
 *     HitsRenderingOptions.hits.map(function(hit) {
 *       return '<div>' + hit._highlightResult.name.value + '</div>';
 *     })
 *   );
 * }
 *
 * // connect `renderFn` to Hits logic
 * var customHits = instantsearch.connectors.connectHits(renderFn);
 *
 * // mount widget on the page
 * search.addWidget(
 *   customHits({
 *     containerNode: $('#custom-hits-container'),
 *   })
 * );
 */
function connectHits(renderFn, unmountFn) {
  (0, _utils.checkRendering)(renderFn, usage);

  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      getConfiguration: function getConfiguration() {
        return widgetParams.escapeHits ? _escapeHighlight.tagConfig : undefined;
      },
      init: function init(_ref) {
        var instantSearchInstance = _ref.instantSearchInstance;

        renderFn({
          hits: [],
          results: undefined,
          instantSearchInstance: instantSearchInstance,
          widgetParams: widgetParams
        }, true);
      },
      render: function render(_ref2) {
        var results = _ref2.results,
            instantSearchInstance = _ref2.instantSearchInstance;

        if (widgetParams.escapeHits && results.hits && results.hits.length > 0) {
          results.hits = (0, _escapeHighlight2.default)(results.hits);
        }

        renderFn({
          hits: results.hits,
          results: results,
          instantSearchInstance: instantSearchInstance,
          widgetParams: widgetParams
        }, false);
      },
      dispose: function dispose() {
        unmountFn();
      }
    };
  };
}