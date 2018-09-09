import React, { render, unmountComponentAtNode } from 'preact-compat';
import cx from 'classnames';

import RefinementList from '../../components/RefinementList/RefinementList.js';
import connectNumericRefinementList from '../../connectors/numeric-refinement-list/connectNumericRefinementList.js';
import defaultTemplates from './defaultTemplates.js';

import { bemHelper, prepareTemplateProps, getContainerNode } from '../../lib/utils.js';

var bem = bemHelper('ais-refinement-list');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      collapsible = _ref.collapsible,
      autoHideContainer = _ref.autoHideContainer,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      transformData = _ref.transformData,
      templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var createURL = _ref2.createURL,
        instantSearchInstance = _ref2.instantSearchInstance,
        refine = _ref2.refine,
        items = _ref2.items,
        hasNoResults = _ref2.hasNoResults;

    if (isFirstRendering) {
      renderState.templateProps = prepareTemplateProps({
        transformData: transformData,
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    render(React.createElement(RefinementList, {
      collapsible: collapsible,
      createURL: createURL,
      cssClasses: cssClasses,
      facetValues: items,
      shouldAutoHideContainer: autoHideContainer && hasNoResults,
      templateProps: renderState.templateProps,
      toggleRefinement: refine
    }), containerNode);
  };
};

var usage = 'Usage:\nnumericRefinementList({\n  container,\n  attributeName,\n  options,\n  [ cssClasses.{root,header,body,footer,list,item,active,label,radio,count} ],\n  [ templates.{header,item,footer} ],\n  [ transformData.{item} ],\n  [ autoHideContainer ],\n  [ collapsible=false ]\n})';

/**
 * @typedef {Object} NumericRefinementListCSSClasses
 * @property {string|string[]} [root] CSS class to add to the root element.
 * @property {string|string[]} [header] CSS class to add to the header element.
 * @property {string|string[]} [body] CSS class to add to the body element.
 * @property {string|string[]} [footer] CSS class to add to the footer element.
 * @property {string|string[]} [list] CSS class to add to the list element.
 * @property {string|string[]} [label] CSS class to add to each link element.
 * @property {string|string[]} [item] CSS class to add to each item element.
 * @property {string|string[]} [radio] CSS class to add to each radio element (when using the default template).
 * @property {string|string[]} [active] CSS class to add to each active element.
 */

/**
 * @typedef {Object} NumericRefinementListTemplates
 * @property {string|function} [header] Header template.
 * @property {string|function} [item] Item template, provided with `label` (the name in the configuration), `isRefined`, `url`, `value` (the setting for the filter) data properties.
 * @property {string|function} [footer] Footer template.
 */

/**
 * @typedef {Object} NumericRefinementListOption
 * @property {string} name Name of the option.
 * @property {number} [start] Low bound of the option (>=).
 * @property {number} [end] High bound of the option (<=).
 */

/**
 * @typedef {Object} NumericRefinementListTransforms
 * @property {function({name: string, isRefined: boolean, url: string}):object} item Transforms the data for a single item to render.
 */

/**
 * @typedef {Object} NumericRefinementListWidgetOptions
 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
 * @property {string} attributeName Name of the attribute for filtering.
 * @property {NumericRefinementListOption[]} options List of all the options.
 * @property {NumericRefinementListTemplates} [templates] Templates to use for the widget.
 * @property {NumericRefinementListTransforms} [transformData] Functions to change the data passes to the templates. Only item can be set.
 * @property {boolean} [autoHideContainer=true] Hide the container when no results match.
 * @property {NumericRefinementListCSSClasses} [cssClasses] CSS classes to add to the wrapping elements.
 * @property {boolean|{collapsible: boolean}} [collapsible=false] Hide the widget body and footer when clicking on header.
 */

/**
 * The numeric refinement list is a widget that displays a list of numeric filters in a list. Those numeric filters
 * are pre-configured with creating the widget.
 *
 * @requirements
 * The attribute passed to `attributeName` must be declared as an [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting) in your
 * Algolia settings.
 *
 * The values inside this attribute must be JavaScript numbers and not strings.
 *
 * @type {WidgetFactory}
 * @devNovel NumericRefinementList
 * @category filter
 * @param {NumericRefinementListWidgetOptions} $0 The NumericRefinementList widget options
 * @return {Widget} Creates a new instance of the NumericRefinementList widget.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.numericRefinementList({
 *     container: '#popularity',
 *     attributeName: 'popularity',
 *     options: [
 *       {name: 'All'},
 *       {end: 500, name: 'less than 500'},
 *       {start: 500, end: 2000, name: 'between 500 and 2000'},
 *       {start: 2000, name: 'more than 2000'}
 *     ],
 *     templates: {
 *       header: 'Popularity'
 *     }
 *   })
 * );
 */
export default function numericRefinementList() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      attributeName = _ref3.attributeName,
      options = _ref3.options,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === undefined ? defaultTemplates : _ref3$templates,
      _ref3$collapsible = _ref3.collapsible,
      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
      transformData = _ref3.transformData,
      _ref3$autoHideContain = _ref3.autoHideContainer,
      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain;

  if (!container || !attributeName || !options) {
    throw new Error(usage);
  }

  var containerNode = getContainerNode(container);

  var cssClasses = {
    root: cx(bem(null), userCssClasses.root),
    header: cx(bem('header'), userCssClasses.header),
    body: cx(bem('body'), userCssClasses.body),
    footer: cx(bem('footer'), userCssClasses.footer),
    list: cx(bem('list'), userCssClasses.list),
    item: cx(bem('item'), userCssClasses.item),
    label: cx(bem('label'), userCssClasses.label),
    radio: cx(bem('radio'), userCssClasses.radio),
    active: cx(bem('item', 'active'), userCssClasses.active)
  };

  var specializedRenderer = renderer({
    containerNode: containerNode,
    collapsible: collapsible,
    autoHideContainer: autoHideContainer,
    cssClasses: cssClasses,
    renderState: {},
    transformData: transformData,
    templates: templates
  });
  try {
    var makeNumericRefinementList = connectNumericRefinementList(specializedRenderer, function () {
      return unmountComponentAtNode(containerNode);
    });
    return makeNumericRefinementList({ attributeName: attributeName, options: options });
  } catch (e) {
    throw new Error(usage);
  }
}