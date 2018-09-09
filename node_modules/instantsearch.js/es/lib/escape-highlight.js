var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import reduce from 'lodash/reduce';
import escape from 'lodash/escape';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';

export var tagConfig = {
  highlightPreTag: '__ais-highlight__',
  highlightPostTag: '__/ais-highlight__'
};

function replaceWithEmAndEscape(value) {
  return escape(value).replace(new RegExp(tagConfig.highlightPreTag, 'g'), '<em>').replace(new RegExp(tagConfig.highlightPostTag, 'g'), '</em>');
}

function recursiveEscape(input) {
  if (isPlainObject(input) && typeof input.value !== 'string') {
    return reduce(input, function (acc, item, key) {
      return _extends({}, acc, _defineProperty({}, key, recursiveEscape(item)));
    }, {});
  }

  if (isArray(input)) {
    return input.map(recursiveEscape);
  }

  return _extends({}, input, {
    value: replaceWithEmAndEscape(input.value)
  });
}

export default function escapeHits(hits) {
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

export function escapeFacets(facetHits) {
  return facetHits.map(function (h) {
    return _extends({}, h, {
      highlighted: replaceWithEmAndEscape(h.highlighted)
    });
  });
}