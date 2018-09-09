import React, { render, unmountComponentAtNode } from 'preact-compat';
import ClearAllWithHOCs from '../../components/ClearAll/ClearAll.js';
import cx from 'classnames';

import { bemHelper, getContainerNode, prepareTemplateProps } from '../../lib/utils.js';

import connectClearAll from '../../connectors/clear-all/connectClearAll.js';

import defaultTemplates from './defaultTemplates.js';

var bem = bemHelper('ais-clear-all');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      collapsible = _ref.collapsible,
      autoHideContainer = _ref.autoHideContainer,
      renderState = _ref.renderState,
      templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var refine = _ref2.refine,
        hasRefinements = _ref2.hasRefinements,
        createURL = _ref2.createURL,
        instantSearchInstance = _ref2.instantSearchInstance;

    if (isFirstRendering) {
      renderState.templateProps = prepareTemplateProps({
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    var shouldAutoHideContainer = autoHideContainer && !hasRefinements;

    render(React.createElement(ClearAllWithHOCs, {
      refine: refine,
      collapsible: collapsible,
      cssClasses: cssClasses,
      hasRefinements: hasRefinements,
      shouldAutoHideContainer: shouldAutoHideContainer,
      templateProps: renderState.templateProps,
      url: createURL()
    }), containerNode);
  };
};

var usage = 'Usage:\nclearAll({\n  container,\n  [ cssClasses.{root,header,body,footer,link}={} ],\n  [ templates.{header,link,footer}={link: \'Clear all\'} ],\n  [ autoHideContainer=true ],\n  [ collapsible=false ],\n  [ excludeAttributes=[] ]\n})';
/**
 * @typedef {Object} ClearAllCSSClasses
 * @property {string|string[]} [root] CSS class to add to the root element.
 * @property {string|string[]} [header] CSS class to add to the header element.
 * @property {string|string[]} [body] CSS class to add to the body element.
 * @property {string|string[]} [footer] CSS class to add to the footer element.
 * @property {string|string[]} [link] CSS class to add to the link element.
 */

/**
 * @typedef {Object} ClearAllTemplates
 * @property {string|function(object):string} [header] Header template.
 * @property {string|function(object):string} [link] Link template.
 * @property {string|function(object):string} [footer] Footer template.
 */

/**
 * @typedef {Object} ClearAllWidgetOptions
 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
 * @property {string[]} [excludeAttributes] List of attributes names to exclude from clear actions.
 * @property {ClearAllTemplates} [templates] Templates to use for the widget.
 * @property {boolean} [autoHideContainer=true] Hide the container when there are no refinements to clear.
 * @property {ClearAllCSSClasses} [cssClasses] CSS classes to be added.
 * @property {boolean|{collapsed: boolean}} [collapsible=false] Makes the widget collapsible. The user can then.
 * choose to hide the content of the widget. This option can also be an object with the property collapsed. If this
 * property is `true`, then the widget is hidden during the first rendering.
 * @property {boolean} [clearsQuery = false] If true, the widget will also clear the query.
 */

/**
 * The clear all widget gives the user the ability to clear all the refinements currently
 * applied on the results. It is equivalent to the reset button of a form.
 *
 * The current refined values widget can display a button that has the same behavior.
 * @type {WidgetFactory}
 * @devNovel ClearAll
 * @category clear-filter
 * @param {ClearAllWidgetOptions} $0 The ClearAll widget options.
 * @returns {Widget} A new instance of the ClearAll widget.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.clearAll({
 *     container: '#clear-all',
 *     templates: {
 *       link: 'Reset everything'
 *     },
 *     autoHideContainer: false,
 *     clearsQuery: true,
 *   })
 * );
 */
export default function clearAll(_ref3) {
  var container = _ref3.container,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === undefined ? defaultTemplates : _ref3$templates,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
      _ref3$collapsible = _ref3.collapsible,
      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
      _ref3$autoHideContain = _ref3.autoHideContainer,
      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain,
      _ref3$excludeAttribut = _ref3.excludeAttributes,
      excludeAttributes = _ref3$excludeAttribut === undefined ? [] : _ref3$excludeAttribut,
      _ref3$clearsQuery = _ref3.clearsQuery,
      clearsQuery = _ref3$clearsQuery === undefined ? false : _ref3$clearsQuery;

  if (!container) {
    throw new Error(usage);
  }

  var containerNode = getContainerNode(container);

  var cssClasses = {
    root: cx(bem(null), userCssClasses.root),
    header: cx(bem('header'), userCssClasses.header),
    body: cx(bem('body'), userCssClasses.body),
    footer: cx(bem('footer'), userCssClasses.footer),
    link: cx(bem('link'), userCssClasses.link)
  };

  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    collapsible: collapsible,
    autoHideContainer: autoHideContainer,
    renderState: {},
    templates: templates
  });

  try {
    var makeWidget = connectClearAll(specializedRenderer, function () {
      return unmountComponentAtNode(containerNode);
    });
    return makeWidget({ excludeAttributes: excludeAttributes, clearsQuery: clearsQuery });
  } catch (e) {
    throw new Error(usage);
  }
}