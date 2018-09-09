import React, { render, unmountComponentAtNode } from 'preact-compat';
import cx from 'classnames';

import isUndefined from 'lodash/isUndefined';
import isBoolean from 'lodash/isBoolean';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import reduce from 'lodash/reduce';

import CurrentRefinedValuesWithHOCs from '../../components/CurrentRefinedValues/CurrentRefinedValues.js';
import connectCurrentRefinedValues from '../../connectors/current-refined-values/connectCurrentRefinedValues.js';
import defaultTemplates from './defaultTemplates';

import { isDomElement, bemHelper, getContainerNode, prepareTemplateProps } from '../../lib/utils.js';

var bem = bemHelper('ais-current-refined-values');

var renderer = function renderer(_ref) {
  var autoHideContainer = _ref.autoHideContainer,
      clearAllPosition = _ref.clearAllPosition,
      collapsible = _ref.collapsible,
      containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      transformData = _ref.transformData,
      templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var attributes = _ref2.attributes,
        clearAllClick = _ref2.clearAllClick,
        clearAllURL = _ref2.clearAllURL,
        refine = _ref2.refine,
        createURL = _ref2.createURL,
        refinements = _ref2.refinements,
        instantSearchInstance = _ref2.instantSearchInstance;

    if (isFirstRendering) {
      renderState.templateProps = prepareTemplateProps({
        transformData: transformData,
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    var shouldAutoHideContainer = autoHideContainer && refinements && refinements.length === 0;

    var clearRefinementClicks = refinements.map(function (refinement) {
      return refine.bind(null, refinement);
    });
    var clearRefinementURLs = refinements.map(function (refinement) {
      return createURL(refinement);
    });

    render(React.createElement(CurrentRefinedValuesWithHOCs, {
      attributes: attributes,
      clearAllClick: clearAllClick,
      clearAllPosition: clearAllPosition,
      clearAllURL: clearAllURL,
      clearRefinementClicks: clearRefinementClicks,
      clearRefinementURLs: clearRefinementURLs,
      collapsible: collapsible,
      cssClasses: cssClasses,
      refinements: refinements,
      shouldAutoHideContainer: shouldAutoHideContainer,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};

var usage = 'Usage:\ncurrentRefinedValues({\n  container,\n  [ attributes: [{name[, label, template, transformData]}] ],\n  [ onlyListedAttributes = false ],\n  [ clearAll = \'before\' ] // One of [\'before\', \'after\', false]\n  [ templates.{header,item,clearAll,footer} ],\n  [ transformData.{item} ],\n  [ autoHideContainer = true ],\n  [ cssClasses.{root, header, body, clearAll, list, item, link, count, footer} = {} ],\n  [ collapsible = false ]\n  [ clearsQuery = false ]\n})';

/**
 * @typedef {Object} CurrentRefinedValuesCSSClasses
 * @property {string} [root] CSS classes added to the root element.
 * @property {string} [header] CSS classes added to the header element.
 * @property {string} [body] CSS classes added to the body element.
 * @property {string} [clearAll] CSS classes added to the clearAll element.
 * @property {string} [list] CSS classes added to the list element.
 * @property {string} [item] CSS classes added to the item element.
 * @property {string} [link] CSS classes added to the link element.
 * @property {string} [count] CSS classes added to the count element.
 * @property {string} [footer] CSS classes added to the footer element.
 */

/**
 * @typedef {Object} CurrentRefinedValuesAttributes
 * @property {string} name Required attribute name.
 * @property {string} label Attribute label (passed to the item template).
 * @property {string|function(object):string} template Attribute specific template.
 * @property {function(object):object} transformData Attribute specific transformData.
 */

/**
 * @typedef {Object} CurrentRefinedValuesTemplates
 * @property {string|function(object):string} [header] Header template.
 * @property {string|function(object):string} [item] Item template.
 * @property {string|function(object):string} [clearAll] Clear all template.
 * @property {string|function(object):string} [footer] Footer template.
 */

/**
 * @typedef {Object} CurrentRefinedValuesTransforms
 * @property {function(object):object} [item] Method to change the object passed to the `item` template.
 */

/**
 * @typedef {Object} CurrentRefinedValuesWidgetOptions
 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget
 * @property {CurrentRefinedValuesAttributes[]} [attributes = []] Label definitions for the
 * different filters.
 * @property {boolean} [onlyListedAttributes=false] Only use the declared attributes. By default, the widget
 * displays the refinements for the whole search state. If true, the list of attributes in `attributes` is used.
 * @property {'before'|'after'|boolean} [clearAll='before'] Defines the clear all button position.
 * By default, it is placed before the set of current filters. If the value is false, the button
 * won't be added in the widget.
 * @property {CurrentRefinedValuesTemplates} [templates] Templates to use for the widget.
 * @property {CurrentRefinedValuesTransforms} [transformData] Set of functions to transform
 * the data passed to the templates.
 * @property {boolean} [autoHideContainer=true] Hides the widget when there are no current refinements.
 * @property {CurrentRefinedValuesCSSClasses} [cssClasses] CSS classes to be added.
 * @property {boolean|{collapsed: boolean}} [collapsible=false] Makes the widget collapsible. The user can then
 * choose to hide the content of the widget. This option can also be an object with the property collapsed. If this
 * property is `true`, then the widget is hidden during the first rendering.
 * @property {boolean} [clearsQuery=false] If true, the clear all button also clears the active search query.
 */

/**
 * The current refined values widget has two purposes:
 *
 *  - give the user a synthetic view of the current filters.
 *  - give the user the ability to remove a filter.
 *
 * This widget is usually in the top part of the search UI.
 * @type {WidgetFactory}
 * @devNovel CurrentRefinedValues
 * @category clear-filter
 * @param {CurrentRefinedValuesWidgetOptions} $0 The CurrentRefinedValues widget options.
 * @returns {Object} A new CurrentRefinedValues widget instance.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.currentRefinedValues({
 *     container: '#current-refined-values',
 *     clearAll: 'after',
 *     clearsQuery: true,
 *     attributes: [
 *       {name: 'free_shipping', label: 'Free shipping'},
 *       {name: 'price', label: 'Price'},
 *       {name: 'brand', label: 'Brand'},
 *       {name: 'category', label: 'Category'},
 *     ],
 *     onlyListedAttributes: true,
 *   })
 * );
 */
export default function currentRefinedValues(_ref3) {
  var container = _ref3.container,
      _ref3$attributes = _ref3.attributes,
      attributes = _ref3$attributes === undefined ? [] : _ref3$attributes,
      _ref3$onlyListedAttri = _ref3.onlyListedAttributes,
      onlyListedAttributes = _ref3$onlyListedAttri === undefined ? false : _ref3$onlyListedAttri,
      _ref3$clearAll = _ref3.clearAll,
      clearAll = _ref3$clearAll === undefined ? 'before' : _ref3$clearAll,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === undefined ? defaultTemplates : _ref3$templates,
      transformData = _ref3.transformData,
      _ref3$autoHideContain = _ref3.autoHideContainer,
      autoHideContainer = _ref3$autoHideContain === undefined ? true : _ref3$autoHideContain,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === undefined ? {} : _ref3$cssClasses,
      _ref3$collapsible = _ref3.collapsible,
      collapsible = _ref3$collapsible === undefined ? false : _ref3$collapsible,
      _ref3$clearsQuery = _ref3.clearsQuery,
      clearsQuery = _ref3$clearsQuery === undefined ? false : _ref3$clearsQuery;

  var transformDataOK = isUndefined(transformData) || isFunction(transformData) || isPlainObject(transformData) && isFunction(transformData.item);

  var templatesKeys = ['header', 'item', 'clearAll', 'footer'];
  var templatesOK = isPlainObject(templates) && reduce(templates, function (res, val, key) {
    return res && templatesKeys.indexOf(key) !== -1 && (isString(val) || isFunction(val));
  }, true);

  var userCssClassesKeys = ['root', 'header', 'body', 'clearAll', 'list', 'item', 'link', 'count', 'footer'];
  var userCssClassesOK = isPlainObject(userCssClasses) && reduce(userCssClasses, function (res, val, key) {
    return res && userCssClassesKeys.indexOf(key) !== -1 && isString(val) || isArray(val);
  }, true);

  var showUsage = false || !(isString(container) || isDomElement(container)) || !isArray(attributes) || !isBoolean(onlyListedAttributes) || [false, 'before', 'after'].indexOf(clearAll) === -1 || !isPlainObject(templates) || !templatesOK || !transformDataOK || !isBoolean(autoHideContainer) || !userCssClassesOK;

  if (showUsage) {
    throw new Error(usage);
  }

  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(bem(null), userCssClasses.root),
    header: cx(bem('header'), userCssClasses.header),
    body: cx(bem('body'), userCssClasses.body),
    clearAll: cx(bem('clear-all'), userCssClasses.clearAll),
    list: cx(bem('list'), userCssClasses.list),
    item: cx(bem('item'), userCssClasses.item),
    link: cx(bem('link'), userCssClasses.link),
    count: cx(bem('count'), userCssClasses.count),
    footer: cx(bem('footer'), userCssClasses.footer)
  };

  var specializedRenderer = renderer({
    containerNode: containerNode,
    clearAllPosition: clearAll,
    collapsible: collapsible,
    cssClasses: cssClasses,
    autoHideContainer: autoHideContainer,
    renderState: {},
    templates: templates,
    transformData: transformData
  });

  try {
    var makeCurrentRefinedValues = connectCurrentRefinedValues(specializedRenderer, function () {
      return unmountComponentAtNode(containerNode);
    });
    return makeCurrentRefinedValues({
      attributes: attributes,
      onlyListedAttributes: onlyListedAttributes,
      clearAll: clearAll,
      clearsQuery: clearsQuery
    });
  } catch (e) {
    throw new Error(usage);
  }
}