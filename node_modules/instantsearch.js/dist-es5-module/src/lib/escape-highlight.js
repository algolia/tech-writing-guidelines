'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tagConfig = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = escapeHits;
exports.escapeFacets = escapeFacets;

var _reduce = require('lodash/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _escape = require('lodash/escape');

var _escape2 = _interopRequireDefault(_escape);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var tagConfig = exports.tagConfig = {
  highlightPreTag: '__ais-highlight__',
  highlightPostTag: '__/ais-highlight__'
};

function replaceWithEmAndEscape(value) {
  return (0, _escape2.default)(value).replace(new RegExp(tagConfig.highlightPreTag, 'g'), '<em>').replace(new RegExp(tagConfig.highlightPostTag, 'g'), '</em>');
}

function recursiveEscape(input) {
  if ((0, _isPlainObject2.default)(input) && typeof input.value !== 'string') {
    return (0, _reduce2.default)(input, function (acc, item, key) {
      return _extends({}, acc, _defineProperty({}, key, recursiveEscape(item)));
    }, {});
  }

  if ((0, _isArray2.default)(input)) {
    return input.map(recursiveEscape);
  }

  return _extends({}, input, {
    value: replaceWithEmAndEscape(input.value)
  });
}

function escapeHits(hits) {
  if (hits.__escaped === undefined) {
    hits = hits.map(function (hit) {
      if (hit._highlightResult) {
        hit._highlightResult = recursiveEscape(hit._highlightResult);
      }

      if (hit._snippetResult) {
        hit._snippetResult = recursiveEscape(hit._snippetResult);
      }

      return hit;
    });
    hits.__escaped = true;
  }

  return hits;
}

function escapeFacets(facetHits) {
  return facetHits.map(function (h) {
    return _extends({}, h, {
      highlighted: replaceWithEmAndEscape(h.highlighted)
    });
  });
}