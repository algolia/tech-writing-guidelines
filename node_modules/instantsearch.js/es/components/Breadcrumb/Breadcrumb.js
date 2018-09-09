var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'preact-compat';
import PropTypes from 'prop-types';
import Template from '../Template.js';
import autoHideContainerHOC from '../../decorators/autoHideContainer.js';

var itemsPropType = PropTypes.arrayOf(PropTypes.shape({
  name: PropTypes.string,
  value: PropTypes.string
}));

var Breadcrumb = function (_PureComponent) {
  _inherits(Breadcrumb, _PureComponent);

  function Breadcrumb() {
    _classCallCheck(this, Breadcrumb);

    return _possibleConstructorReturn(this, (Breadcrumb.__proto__ || Object.getPrototypeOf(Breadcrumb)).apply(this, arguments));
  }

  _createClass(Breadcrumb, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          createURL = _props.createURL,
          items = _props.items,
          refine = _props.refine,
          cssClasses = _props.cssClasses;


      var breadcrumb = items.map(function (item, idx) {
        var isLast = idx === items.length - 1;
        var label = isLast ? React.createElement(
          'a',
          { className: cssClasses.disabledLabel + ' ' + cssClasses.label },
          item.name
        ) : React.createElement(
          'a',
          {
            className: cssClasses.label,
            href: createURL(item.value),
            onClick: function onClick(e) {
              e.preventDefault();
              refine(item.value);
            }
          },
          item.name
        );

        return [React.createElement(Template, _extends({
          key: item.name + idx,
          rootProps: { className: cssClasses.separator },
          templateKey: 'separator'
        }, _this2.props.templateProps)), label];
      });

      var homeClassNames = items.length > 0 ? [cssClasses.home, cssClasses.label] : [cssClasses.disabledLabel, cssClasses.home, cssClasses.label];

      var homeOnClickHandler = function homeOnClickHandler(e) {
        e.preventDefault();
        refine(null);
      };

      var homeUrl = createURL(null);

      return React.createElement(
        'div',
        { className: cssClasses.root },
        React.createElement(
          'a',
          {
            className: homeClassNames.join(' '),
            href: homeUrl,
            onClick: homeOnClickHandler
          },
          React.createElement(Template, _extends({ templateKey: 'home' }, this.props.templateProps))
        ),
        breadcrumb
      );
    }
  }]);

  return Breadcrumb;
}(PureComponent);

export default autoHideContainerHOC(Breadcrumb);