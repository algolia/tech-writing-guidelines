var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React, { Component } from 'preact-compat';
import defaultsDeep from 'lodash/defaultsDeep';
import { isSpecialClick } from '../../lib/utils.js';

import autoHideContainerHOC from '../../decorators/autoHideContainer.js';

import PaginationLink from './PaginationLink.js';

import cx from 'classnames';

var RawPagination = function (_Component) {
  _inherits(RawPagination, _Component);

  function RawPagination(props) {
    _classCallCheck(this, RawPagination);

    var _this = _possibleConstructorReturn(this, (RawPagination.__proto__ || Object.getPrototypeOf(RawPagination)).call(this, defaultsDeep(props, RawPagination.defaultProps)));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(RawPagination, [{
    key: 'pageLink',
    value: function pageLink(_ref) {
      var label = _ref.label,
          ariaLabel = _ref.ariaLabel,
          pageNumber = _ref.pageNumber,
          _ref$additionalClassN = _ref.additionalClassName,
          additionalClassName = _ref$additionalClassN === undefined ? null : _ref$additionalClassN,
          _ref$isDisabled = _ref.isDisabled,
          isDisabled = _ref$isDisabled === undefined ? false : _ref$isDisabled,
          _ref$isActive = _ref.isActive,
          isActive = _ref$isActive === undefined ? false : _ref$isActive,
          createURL = _ref.createURL;

      var cssClasses = {
        item: cx(this.props.cssClasses.item, additionalClassName),
        link: cx(this.props.cssClasses.link)
      };
      if (isDisabled) {
        cssClasses.item = cx(cssClasses.item, this.props.cssClasses.disabled);
      } else if (isActive) {
        cssClasses.item = cx(cssClasses.item, this.props.cssClasses.active);
      }

      var url = createURL && !isDisabled ? createURL(pageNumber) : '#';

      return React.createElement(PaginationLink, {
        ariaLabel: ariaLabel,
        cssClasses: cssClasses,
        handleClick: this.handleClick,
        isDisabled: isDisabled,
        key: label + pageNumber + ariaLabel,
        label: label,
        pageNumber: pageNumber,
        url: url
      });
    }
  }, {
    key: 'previousPageLink',
    value: function previousPageLink(_ref2) {
      var isFirstPage = _ref2.isFirstPage,
          currentPage = _ref2.currentPage,
          createURL = _ref2.createURL;

      return this.pageLink({
        ariaLabel: 'Previous',
        additionalClassName: this.props.cssClasses.previous,
        isDisabled: this.props.nbHits === 0 || isFirstPage,
        label: this.props.labels.previous,
        pageNumber: currentPage - 1,
        createURL: createURL
      });
    }
  }, {
    key: 'nextPageLink',
    value: function nextPageLink(_ref3) {
      var isLastPage = _ref3.isLastPage,
          currentPage = _ref3.currentPage,
          createURL = _ref3.createURL;

      return this.pageLink({
        ariaLabel: 'Next',
        additionalClassName: this.props.cssClasses.next,
        isDisabled: this.props.nbHits === 0 || isLastPage,
        label: this.props.labels.next,
        pageNumber: currentPage + 1,
        createURL: createURL
      });
    }
  }, {
    key: 'firstPageLink',
    value: function firstPageLink(_ref4) {
      var isFirstPage = _ref4.isFirstPage,
          createURL = _ref4.createURL;

      return this.pageLink({
        ariaLabel: 'First',
        additionalClassName: this.props.cssClasses.first,
        isDisabled: this.props.nbHits === 0 || isFirstPage,
        label: this.props.labels.first,
        pageNumber: 0,
        createURL: createURL
      });
    }
  }, {
    key: 'lastPageLink',
    value: function lastPageLink(_ref5) {
      var isLastPage = _ref5.isLastPage,
          nbPages = _ref5.nbPages,
          createURL = _ref5.createURL;

      return this.pageLink({
        ariaLabel: 'Last',
        additionalClassName: this.props.cssClasses.last,
        isDisabled: this.props.nbHits === 0 || isLastPage,
        label: this.props.labels.last,
        pageNumber: nbPages - 1,
        createURL: createURL
      });
    }
  }, {
    key: 'pages',
    value: function pages(_ref6) {
      var _this2 = this;

      var currentPage = _ref6.currentPage,
          _pages = _ref6.pages,
          createURL = _ref6.createURL;

      return _pages.map(function (pageNumber) {
        return _this2.pageLink({
          ariaLabel: pageNumber + 1,
          additionalClassName: _this2.props.cssClasses.page,
          isActive: pageNumber === currentPage,
          label: pageNumber + 1,
          pageNumber: pageNumber,
          createURL: createURL
        });
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(pageNumber, event) {
      if (isSpecialClick(event)) {
        // do not alter the default browser behavior
        // if one special key is down
        return;
      }
      event.preventDefault();
      this.props.setCurrentPage(pageNumber);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'ul',
        { className: this.props.cssClasses.root },
        this.props.showFirstLast && this.firstPageLink(this.props),
        this.previousPageLink(this.props),
        this.pages(this.props),
        this.nextPageLink(this.props),
        this.props.showFirstLast && this.lastPageLink(this.props)
      );
    }
  }]);

  return RawPagination;
}(Component);

export { RawPagination };


RawPagination.defaultProps = {
  nbHits: 0,
  currentPage: 0,
  nbPages: 0
};

export default autoHideContainerHOC(RawPagination);