var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { render, unmountComponentAtNode } from 'preact-compat';
import cx from 'classnames';

import RefinementList from '../../components/RefinementList/RefinementList.js';
import connectStarRating from '../../connectors/star-rating/connectStarRating.js';
import defaultTemplates from './defaultTemplates.js';
import defaultLabels from './defaultLabels.js';

import { bemHelper, prepareTemplateProps, getContainerNode } from '../../lib/utils.js';

var bem = bemHelper('ais-star-rating');

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
      renderState.templateProps = prepareTemplateProps({
        transformData: transformData,
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    var shouldAutoHideContainer = autoHideContainer && hasNoResults;

    render(React.createElement(RefinementList, {
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
export default function starRating() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      attributeName = _ref3.attributeName,
      _ref3$max = _ref3.max,
      max = _ref3$max === undefined ? 5 : _ref3$max,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
      _ref3$labels = _ref3.labels,
      labels = _ref3$labels === undefined ? defaultLabels : _ref3$labels,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === undefined ? defaultTemplates : _ref3$templates,
      _ref3$collapsible = _ref3.collapsible,
      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
      transformData = _ref3.transformData,
      _ref3$autoHideContain = _ref3.autoHideContainer,
      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain;

  if (!container) {
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
    link: cx(bem('link'), userCssClasses.link),
    disabledLink: cx(bem('link', 'disabled'), userCssClasses.disabledLink),
    count: cx(bem('count'), userCssClasses.count),
    star: cx(bem('star'), userCssClasses.star),
    emptyStar: cx(bem('star', 'empty'), userCssClasses.emptyStar),
    active: cx(bem('item', 'active'), userCssClasses.active)
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
    var makeWidget = connectStarRating(specializedRenderer, function () {
      return unmountComponentAtNode(containerNode);
    });
    return makeWidget({ attributeName: attributeName, max: max });
  } catch (e) {
    throw new Error(usage);
  }
}