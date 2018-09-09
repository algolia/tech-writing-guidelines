var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React, { Component } from 'preact-compat';

var PriceRangesForm = function (_Component) {
  _inherits(PriceRangesForm, _Component);

  function PriceRangesForm(props) {
    _classCallCheck(this, PriceRangesForm);

    var _this = _possibleConstructorReturn(this, (PriceRangesForm.__proto__ || Object.getPrototypeOf(PriceRangesForm)).call(this, props));

    _this.state = {
      from: props.currentRefinement.from,
      to: props.currentRefinement.to
    };
    return _this;
  }

  _createClass(PriceRangesForm, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        from: props.currentRefinement.from,
        to: props.currentRefinement.to
      });
    }
  }, {
    key: 'getInput',
    value: function getInput(type) {
      var _this2 = this;

      return React.createElement(
        'label',
        { className: this.props.cssClasses.label },
        React.createElement(
          'span',
          { className: this.props.cssClasses.currency },
          this.props.labels.currency,
          ' '
        ),
        React.createElement('input', {
          className: this.props.cssClasses.input,
          onChange: function onChange(e) {
            return _this2.setState(_defineProperty({}, type, e.target.value));
          },
          ref: function ref(input) {
            return _this2[type] = input;
          },
          type: 'number',
          value: this.state[type]
        })
      );
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      var from = this.from.value !== '' ? parseInt(this.from.value, 10) : undefined;
      var to = this.to.value !== '' ? parseInt(this.to.value, 10) : undefined;

      this.props.refine({ from: from, to: to }, event);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var fromInput = this.getInput('from');
      var toInput = this.getInput('to');
      var onSubmit = this.handleSubmit;
      return React.createElement(
        'form',
        {
          className: this.props.cssClasses.form,
          onSubmit: onSubmit,
          ref: function ref(form) {
            return _this3.form = form;
          }
        },
        fromInput,
        React.createElement(
          'span',
          { className: this.props.cssClasses.separator },
          ' ',
          this.props.labels.separator,
          ' '
        ),
        toInput,
        React.createElement(
          'button',
          { className: this.props.cssClasses.button, type: 'submit' },
          this.props.labels.button
        )
      );
    }
  }]);

  return PriceRangesForm;
}(Component);

PriceRangesForm.defaultProps = {
  cssClasses: {},
  labels: {}
};

export default PriceRangesForm;