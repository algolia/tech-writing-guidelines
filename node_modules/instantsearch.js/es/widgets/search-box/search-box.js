var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import forEach from 'lodash/forEach';
import cx from 'classnames';
import { bemHelper, getContainerNode, renderTemplate } from '../../lib/utils';
import connectSearchBox from '../../connectors/search-box/connectSearchBox';
import defaultTemplates from './defaultTemplates';

var bem = bemHelper('ais-search-box');
var KEY_ENTER = 13;
var KEY_SUPPRESS = 8;

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      placeholder = _ref.placeholder,
      poweredBy = _ref.poweredBy,
      templates = _ref.templates,
      autofocus = _ref.autofocus,
      searchOnEnterKeyPressOnly = _ref.searchOnEnterKeyPressOnly,
      wrapInput = _ref.wrapInput,
      reset = _ref.reset,
      magnifier = _ref.magnifier,
      loadingIndicator = _ref.loadingIndicator;
  return function (_ref2, isFirstRendering) {
    var refine = _ref2.refine,
        clear = _ref2.clear,
        query = _ref2.query,
        onHistoryChange = _ref2.onHistoryChange,
        isSearchStalled = _ref2.isSearchStalled;

    if (isFirstRendering) {
      var INPUT_EVENT = window.addEventListener ? 'input' : 'propertychange';
      var input = createInput(containerNode);
      var isInputTargeted = input === containerNode;
      var queryFromInput = query;

      if (isInputTargeted) {
        // To replace the node, we need to create an intermediate node
        var placeholderNode = document.createElement('div');
        input.parentNode.insertBefore(placeholderNode, input);
        var parentNode = input.parentNode;
        var wrappedInput = wrapInput ? wrapInputFn(input, cssClasses) : input;
        parentNode.replaceChild(wrappedInput, placeholderNode);

        var initialInputValue = input.value;

        // if the input contains a value, we provide it to the state
        if (initialInputValue) {
          queryFromInput = initialInputValue;
          refine(initialInputValue, false);
        }
      } else {
        var _wrappedInput = wrapInput ? wrapInputFn(input, cssClasses) : input;
        containerNode.appendChild(_wrappedInput);
      }

      if (magnifier) addMagnifier(input, magnifier, templates);
      if (reset) addReset(input, reset, templates, clear);
      if (loadingIndicator) addLoadingIndicator(input, loadingIndicator, templates);

      addDefaultAttributesToInput(placeholder, input, queryFromInput, cssClasses);

      // Optional "powered by Algolia" widget
      if (poweredBy) {
        addPoweredBy(input, poweredBy, templates);
      }

      // When the page is coming from BFCache
      // (https://developer.mozilla.org/en-US/docs/Working_with_BFCache)
      // then we force the input value to be the current query
      // Otherwise, this happens:
      // - <input> autocomplete = off (default)
      // - search $query
      // - navigate away
      // - use back button
      // - input query is empty (because <input> autocomplete = off)
      window.addEventListener('pageshow', function () {
        input.value = queryFromInput;
      });

      // Update value when query change outside of the input
      onHistoryChange(function (fullState) {
        input.value = fullState.query || '';
      });

      if (autofocus === true || autofocus === 'auto' && queryFromInput === '') {
        input.focus();
        input.setSelectionRange(queryFromInput.length, queryFromInput.length);
      }

      // search on enter
      if (searchOnEnterKeyPressOnly) {
        addListener(input, INPUT_EVENT, function (e) {
          refine(getValue(e), false);
        });
        addListener(input, 'keyup', function (e) {
          if (e.keyCode === KEY_ENTER) refine(getValue(e));
        });
      } else {
        addListener(input, INPUT_EVENT, getInputValueAndCall(refine));

        // handle IE8 weirdness where BACKSPACE key will not trigger an input change..
        // can be removed as soon as we remove support for it
        if (INPUT_EVENT === 'propertychange' || window.attachEvent) {
          addListener(input, 'keyup', ifKey(KEY_SUPPRESS, getInputValueAndCall(refine)));
        }
      }
    } else {
      renderAfterInit({
        containerNode: containerNode,
        query: query,
        loadingIndicator: loadingIndicator,
        isSearchStalled: isSearchStalled
      });
    }

    if (reset) {
      var resetBtnSelector = '.' + cx(bem('reset-wrapper'));
      // hide reset button when there is no query
      var resetButton = containerNode.tagName === 'INPUT' ? containerNode.parentNode.querySelector(resetBtnSelector) : containerNode.querySelector(resetBtnSelector);
      resetButton.style.display = query && query.trim() ? 'block' : 'none';
    }
  };
};

function renderAfterInit(_ref3) {
  var containerNode = _ref3.containerNode,
      query = _ref3.query,
      loadingIndicator = _ref3.loadingIndicator,
      isSearchStalled = _ref3.isSearchStalled;

  var input = getInput(containerNode);
  var isFocused = document.activeElement === input;
  if (!isFocused && query !== input.value) {
    input.value = query;
  }

  if (loadingIndicator) {
    var rootElement = containerNode.tagName === 'INPUT' ? containerNode.parentNode : containerNode.firstChild;
    if (isSearchStalled) {
      rootElement.classList.add('ais-stalled-search');
    } else {
      rootElement.classList.remove('ais-stalled-search');
    }
  }
}

var disposer = function disposer(containerNode) {
  return function () {
    var range = document.createRange(); // IE10+
    range.selectNodeContents(containerNode);
    range.deleteContents();
  };
};

var usage = 'Usage:\nsearchBox({\n  container,\n  [ placeholder ],\n  [ cssClasses.{input,poweredBy} ],\n  [ poweredBy=false || poweredBy.{template, cssClasses.{root,link}} ],\n  [ wrapInput ],\n  [ autofocus ],\n  [ searchOnEnterKeyPressOnly ],\n  [ queryHook ]\n  [ reset=true || reset.{template, cssClasses.{root}} ]\n})';

/**
 * @typedef {Object} SearchBoxPoweredByCSSClasses
 * @property  {string|string[]} [root] CSS class to add to the root element.
 * @property  {string|string[]} [link] CSS class to add to the link element.
 */

/**
 * @typedef {Object} SearchBoxPoweredByOption
 * @property {function|string} template Template used for displaying the link. Can accept a function or a Hogan string.
 * @property {SearchBoxPoweredByCSSClasses} [cssClasses] CSS classes added to the powered-by badge.
 */

/**
 * @typedef {Object} SearchBoxResetOption
 * @property {function|string} template Template used for displaying the button. Can accept a function or a Hogan string.
 * @property {{root: string}} [cssClasses] CSS classes added to the reset button.
 */

/**
 * @typedef {Object} SearchBoxLoadingIndicatorOption
 * @property {function|string} template Template used for displaying the button. Can accept a function or a Hogan string.
 * @property {{root: string}} [cssClasses] CSS classes added to the loading-indicator element.
 */

/**
 * @typedef {Object} SearchBoxCSSClasses
 * @property  {string|string[]} [root] CSS class to add to the
 * wrapping `<div>` (if `wrapInput` set to `true`).
 * @property  {string|string[]} [input] CSS class to add to the input.
 */

/**
 * @typedef {Object} SearchBoxMagnifierOption
 * @property {function|string} template Template used for displaying the magnifier. Can accept a function or a Hogan string.
 * @property {{root: string}} [cssClasses] CSS classes added to the magnifier.
 */

/**
 * @typedef {Object} SearchBoxWidgetOptions
 * @property  {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget. If the CSS selector or the HTMLElement is an existing input, the widget will use it.
 * @property  {string} [placeholder] Input's placeholder.
 * @property  {boolean|SearchBoxPoweredByOption} [poweredBy=false] Define if a "powered by Algolia" link should be added near the input.
 * @property  {boolean|SearchBoxResetOption} [reset=true] Define if a reset button should be added in the input when there is a query.
 * @property  {boolean|SearchBoxMagnifierOption} [magnifier=true] Define if a magnifier should be added at beginning of the input to indicate a search input.
 * @property  {boolean|SearchBoxLoadingIndicatorOption} [loadingIndicator=false] Define if a loading indicator should be added at beginning of the input to indicate that search is currently stalled.
 * @property  {boolean} [wrapInput=true] Wrap the input in a `div.ais-search-box`.
 * @property  {boolean|string} [autofocus="auto"] autofocus on the input.
 * @property  {boolean} [searchOnEnterKeyPressOnly=false] If set, trigger the search
 * once `<Enter>` is pressed only.
 * @property  {SearchBoxCSSClasses} [cssClasses] CSS classes to add.
 * @property  {function} [queryHook] A function that will be called every time a new search would be done. You
 * will get the query as first parameter and a search(query) function to call as the second parameter.
 * This queryHook can be used to debounce the number of searches done from the searchBox.
 */

/**
 * The searchbox widget is used to let the user set a text based query.
 *
 * This is usually the  main entry point to start the search in an instantsearch context. For that
 * reason is usually placed on top, and not hidden so that the user can start searching right
 * away.
 *
 * @type {WidgetFactory}
 * @devNovel SearchBox
 * @category basic
 * @param {SearchBoxWidgetOptions} $0 Options used to configure a SearchBox widget.
 * @return {Widget} Creates a new instance of the SearchBox widget.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.searchBox({
 *     container: '#q',
 *     placeholder: 'Search for products',
 *     autofocus: false,
 *     poweredBy: true,
 *     reset: true,
 *     loadingIndicator: false
 *   })
 * );
 */
export default function searchBox() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref4.container,
      _ref4$placeholder = _ref4.placeholder,
      placeholder = _ref4$placeholder === undefined ? '' : _ref4$placeholder,
      _ref4$cssClasses = _ref4.cssClasses,
      cssClasses = _ref4$cssClasses === undefined ? {} : _ref4$cssClasses,
      _ref4$poweredBy = _ref4.poweredBy,
      poweredBy = _ref4$poweredBy === undefined ? false : _ref4$poweredBy,
      _ref4$wrapInput = _ref4.wrapInput,
      wrapInput = _ref4$wrapInput === undefined ? true : _ref4$wrapInput,
      _ref4$autofocus = _ref4.autofocus,
      autofocus = _ref4$autofocus === undefined ? 'auto' : _ref4$autofocus,
      _ref4$searchOnEnterKe = _ref4.searchOnEnterKeyPressOnly,
      searchOnEnterKeyPressOnly = _ref4$searchOnEnterKe === undefined ? false : _ref4$searchOnEnterKe,
      _ref4$reset = _ref4.reset,
      reset = _ref4$reset === undefined ? true : _ref4$reset,
      _ref4$magnifier = _ref4.magnifier,
      magnifier = _ref4$magnifier === undefined ? true : _ref4$magnifier,
      _ref4$loadingIndicato = _ref4.loadingIndicator,
      loadingIndicator = _ref4$loadingIndicato === undefined ? false : _ref4$loadingIndicato,
      queryHook = _ref4.queryHook;

  if (!container) {
    throw new Error(usage);
  }

  var containerNode = getContainerNode(container);

  // Only possible values are 'auto', true and false
  if (typeof autofocus !== 'boolean') {
    autofocus = 'auto';
  }

  // Convert to object if only set to true
  if (poweredBy === true) {
    poweredBy = {};
  }

  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    placeholder: placeholder,
    poweredBy: poweredBy,
    templates: defaultTemplates,
    autofocus: autofocus,
    searchOnEnterKeyPressOnly: searchOnEnterKeyPressOnly,
    wrapInput: wrapInput,
    reset: reset,
    magnifier: magnifier,
    loadingIndicator: loadingIndicator
  });

  try {
    var makeWidget = connectSearchBox(specializedRenderer, disposer(containerNode));
    return makeWidget({ queryHook: queryHook });
  } catch (e) {
    throw new Error(usage);
  }
}

// the 'input' event is triggered when the input value changes
// in any case: typing, copy pasting with mouse..
// 'onpropertychange' is the IE8 alternative until we support IE8
// but it's flawed: http://help.dottoro.com/ljhxklln.php

function createInput(containerNode) {
  // Returns reference to targeted input if present, or create a new one
  if (containerNode.tagName === 'INPUT') {
    return containerNode;
  }
  return document.createElement('input');
}

function getInput(containerNode) {
  // Returns reference to targeted input if present, or look for it inside
  if (containerNode.tagName === 'INPUT') {
    return containerNode;
  }
  return containerNode.querySelector('input');
}

function wrapInputFn(input, cssClasses) {
  // Wrap input in a .ais-search-box div
  var wrapper = document.createElement('div');
  var CSSClassesToAdd = cx(bem(null), cssClasses.root).split(' ');
  CSSClassesToAdd.forEach(function (cssClass) {
    return wrapper.classList.add(cssClass);
  });
  wrapper.appendChild(input);
  return wrapper;
}

function addListener(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn);
  } else {
    el.attachEvent('on' + type, fn);
  }
}

function getValue(e) {
  return (e.currentTarget ? e.currentTarget : e.srcElement).value;
}

function ifKey(expectedKeyCode, func) {
  return function (actualEvent) {
    return actualEvent.keyCode === expectedKeyCode && func(actualEvent);
  };
}

function getInputValueAndCall(func) {
  return function (actualEvent) {
    return func(getValue(actualEvent));
  };
}

function addDefaultAttributesToInput(placeholder, input, query, cssClasses) {
  var defaultAttributes = {
    autocapitalize: 'off',
    autocomplete: 'off',
    autocorrect: 'off',
    placeholder: placeholder,
    role: 'textbox',
    spellcheck: 'false',
    type: 'text',
    value: query
  };

  // Overrides attributes if not already set
  forEach(defaultAttributes, function (value, key) {
    if (input.hasAttribute(key)) {
      return;
    }
    input.setAttribute(key, value);
  });

  // Add classes
  var CSSClassesToAdd = cx(bem('input'), cssClasses.input).split(' ');
  CSSClassesToAdd.forEach(function (cssClass) {
    return input.classList.add(cssClass);
  });
}

/**
 * Adds a reset element in the searchbox widget. When this reset element is clicked on
 * it should reset the query.
 * @private
 * @param {HTMLElement} input the DOM node of the input of the searchbox
 * @param {object} reset the user options (cssClasses and template)
 * @param {object} $2 the default templates
 * @param {function} clearFunction function called when the element is activated (clicked)
 * @returns {undefined} returns nothing
 */
function addReset(input, reset, _ref5, clearFunction) {
  var resetTemplate = _ref5.reset;

  reset = _extends({
    cssClasses: {},
    template: resetTemplate
  }, reset);

  var resetCSSClasses = {
    root: cx(bem('reset'), reset.cssClasses.root)
  };

  var stringNode = renderTemplate({
    templateKey: 'template',
    templates: reset,
    data: {
      cssClasses: resetCSSClasses
    }
  });

  var htmlNode = createNodeFromString(stringNode, cx(bem('reset-wrapper')));

  input.parentNode.appendChild(htmlNode);

  htmlNode.addEventListener('click', function (event) {
    event.preventDefault();
    clearFunction();
  });
}

/**
 * Adds a magnifying glass in the searchbox widget
 * @private
 * @param {HTMLElement} input the DOM node of the input of the searchbox
 * @param {object} magnifier the user options (cssClasses and template)
 * @param {object} $2 the default templates
 * @returns {undefined} returns nothing
 */
function addMagnifier(input, magnifier, _ref6) {
  var magnifierTemplate = _ref6.magnifier;

  magnifier = _extends({
    cssClasses: {},
    template: magnifierTemplate
  }, magnifier);

  var magnifierCSSClasses = {
    root: cx(bem('magnifier'), magnifier.cssClasses.root)
  };

  var stringNode = renderTemplate({
    templateKey: 'template',
    templates: magnifier,
    data: {
      cssClasses: magnifierCSSClasses
    }
  });

  var htmlNode = createNodeFromString(stringNode, cx(bem('magnifier-wrapper')));

  input.parentNode.appendChild(htmlNode);
}

function addLoadingIndicator(input, loadingIndicator, _ref7) {
  var loadingIndicatorTemplate = _ref7.loadingIndicator;

  loadingIndicator = _extends({
    cssClasses: {},
    template: loadingIndicatorTemplate
  }, loadingIndicator);

  var loadingIndicatorCSSClasses = {
    root: cx(bem('loading-indicator'), loadingIndicator.cssClasses.root)
  };

  var stringNode = renderTemplate({
    templateKey: 'template',
    templates: loadingIndicator,
    data: {
      cssClasses: loadingIndicatorCSSClasses
    }
  });

  var htmlNode = createNodeFromString(stringNode, cx(bem('loading-indicator-wrapper')));

  input.parentNode.appendChild(htmlNode);
}

/**
 * Adds a powered by in the searchbox widget
 * @private
 * @param {HTMLElement} input the DOM node of the input of the searchbox
 * @param {object} poweredBy the user options (cssClasses and template)
 * @param {object} templates the default templates
 * @returns {undefined} returns nothing
 */
function addPoweredBy(input, poweredBy, _ref8) {
  var poweredbyTemplate = _ref8.poweredBy;

  // Default values
  poweredBy = _extends({
    cssClasses: {},
    template: poweredbyTemplate
  }, poweredBy);

  var poweredByCSSClasses = {
    root: cx(bem('powered-by'), poweredBy.cssClasses.root),
    link: cx(bem('powered-by-link'), poweredBy.cssClasses.link)
  };

  var url = 'https://www.algolia.com/?' + 'utm_source=instantsearch.js&' + 'utm_medium=website&' + ('utm_content=' + location.hostname + '&') + 'utm_campaign=poweredby';

  var stringNode = renderTemplate({
    templateKey: 'template',
    templates: poweredBy,
    data: {
      cssClasses: poweredByCSSClasses,
      url: url
    }
  });

  var htmlNode = createNodeFromString(stringNode);

  input.parentNode.insertBefore(htmlNode, input.nextSibling);
}

// Cross-browser way to create a DOM node from a string. We wrap in
// a `span` to make sure we have one and only one node.
function createNodeFromString(stringNode) {
  var rootClassname = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var tmpNode = document.createElement('div');
  tmpNode.innerHTML = '<span class="' + rootClassname + '">' + stringNode.trim() + '</span>';
  return tmpNode.firstChild;
}