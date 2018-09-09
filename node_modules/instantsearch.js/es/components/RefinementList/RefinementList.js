var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React, { Component } from 'preact-compat';
import cx from 'classnames';
import { isSpecialClick } from '../../lib/utils.js';

import Template from '../Template.js';
import RefinementListItem from './RefinementListItem.js';
import isEqual from 'lodash/isEqual';

import SearchBox from '../SearchBox';

import autoHideContainerHOC from '../../decorators/autoHideContainer.js';
import headerFooterHOC from '../../decorators/headerFooter.js';

export var RawRefinementList = function (_Component) {
  _inherits(RawRefinementList, _Component);

  function RawRefinementList(props) {
    _classCallCheck(this, RawRefinementList);

    var _this = _possibleConstructorReturn(this, (RawRefinementList.__proto__ || Object.getPrototypeOf(RawRefinementList)).call(this, props));

    _this.handleItemClick = _this.handleItemClick.bind(_this);
    return _this;
  }

  _createClass(RawRefinementList, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var isStateDifferent = nextState !== this.state;
      var isFacetValuesDifferent = !isEqual(this.props.facetValues, nextProps.facetValues);
      var shouldUpdate = isStateDifferent || isFacetValuesDifferent;
      return shouldUpdate;
    }
  }, {
    key: 'refine',
    value: function refine(facetValueToRefine, isRefined) {
      this.props.toggleRefinement(facetValueToRefine, isRefined);
    }
  }, {
    key: '_generateFacetItem',
    value: function _generateFacetItem(facetValue) {
      var subItems = void 0;
      var hasChildren = facetValue.data && facetValue.data.length > 0;
      if (hasChildren) {
        subItems = React.createElement(RawRefinementList, _extends({}, this.props, {
          depth: this.props.depth + 1,
          facetValues: facetValue.data
        }));
      }

      var url = this.props.createURL(facetValue.value);
      var templateData = _extends({}, facetValue, {
        url: url,
        cssClasses: this.props.cssClasses
      });

      var cssClassItem = cx(this.props.cssClasses.item, _defineProperty({}, this.props.cssClasses.active, facetValue.isRefined));

      var key = facetValue.value;

      if (facetValue.isRefined !== undefined) {
        key += '/' + facetValue.isRefined;
      }

      if (facetValue.count !== undefined) {
        key += '/' + facetValue.count;
      }

      return React.createElement(RefinementListItem, {
        facetValueToRefine: facetValue.value,
        handleClick: this.handleItemClick,
        isRefined: facetValue.isRefined,
        itemClassName: cssClassItem,
        key: key,
        subItems: subItems,
        templateData: templateData,
        templateKey: 'item',
        templateProps: this.props.templateProps
      });
    }

    // Click events on DOM tree like LABEL > INPUT will result in two click events
    // instead of one.
    // No matter the framework, see https://www.google.com/search?q=click+label+twice
    //
    // Thus making it hard to distinguish activation from deactivation because both click events
    // are very close. Debounce is a solution but hacky.
    //
    // So the code here checks if the click was done on or in a LABEL. If this LABEL
    // has a checkbox inside, we ignore the first click event because we will get another one.
    //
    // We also check if the click was done inside a link and then e.preventDefault() because we already
    // handle the url
    //
    // Finally, we always stop propagation of the event to avoid multiple levels RefinementLists to fail: click
    // on child would click on parent also

  }, {
    key: 'handleItemClick',
    value: function handleItemClick(_ref) {
      var facetValueToRefine = _ref.facetValueToRefine,
          originalEvent = _ref.originalEvent,
          isRefined = _ref.isRefined;

      if (isSpecialClick(originalEvent)) {
        // do not alter the default browser behavior
        // if one special key is down
        return;
      }

      if (originalEvent.target.tagName === 'INPUT') {
        this.refine(facetValueToRefine, isRefined);
        return;
      }

      var parent = originalEvent.target;

      while (parent !== originalEvent.currentTarget) {
        if (parent.tagName === 'LABEL' && (parent.querySelector('input[type="checkbox"]') || parent.querySelector('input[type="radio"]'))) {
          return;
        }

        if (parent.tagName === 'A' && parent.href) {
          originalEvent.preventDefault();
        }

        parent = parent.parentNode;
      }

      originalEvent.stopPropagation();

      this.refine(facetValueToRefine, isRefined);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.searchbox && !nextProps.isFromSearch) {
        this.searchbox.clearInput();
      }
    }
  }, {
    key: 'refineFirstValue',
    value: function refineFirstValue() {
      var firstValue = this.props.facetValues[0];
      if (firstValue) {
        var actualValue = firstValue.value;
        this.props.toggleRefinement(actualValue);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // Adding `-lvl0` classes
      var cssClassList = [this.props.cssClasses.list];
      if (this.props.cssClasses.depth) {
        cssClassList.push('' + this.props.cssClasses.depth + this.props.depth);
      }

      var showMoreBtn = this.props.showMore === true && this.props.canToggleShowMore ? React.createElement(Template, _extends({
        rootProps: { onClick: this.props.toggleShowMore },
        templateKey: 'show-more-' + (this.props.isShowingMore ? 'active' : 'inactive')
      }, this.props.templateProps)) : undefined;

      var shouldDisableSearchInput = this.props.searchIsAlwaysActive !== true && !(this.props.isFromSearch || !this.props.hasExhaustiveItems);
      var searchInput = this.props.searchFacetValues ? React.createElement(SearchBox, {
        ref: function ref(i) {
          _this2.searchbox = i;
        },
        placeholder: this.props.searchPlaceholder,
        onChange: this.props.searchFacetValues,
        onValidate: function onValidate() {
          return _this2.refineFirstValue();
        },
        disabled: shouldDisableSearchInput
      }) : null;

      var noResults = this.props.searchFacetValues && this.props.isFromSearch && this.props.facetValues.length === 0 ? React.createElement(Template, _extends({ templateKey: 'noResults' }, this.props.templateProps)) : null;

      return React.createElement(
        'div',
        { className: cx(cssClassList) },
        searchInput,
        this.props.facetValues.map(this._generateFacetItem, this),
        noResults,
        showMoreBtn
      );
    }
  }]);

  return RawRefinementList;
}(Component);

RawRefinementList.defaultProps = {
  cssClasses: {},
  depth: 0
};

export default autoHideContainerHOC(headerFooterHOC(RawRefinementList));