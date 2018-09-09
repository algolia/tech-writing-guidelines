'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../lib/utils');

var _connectRange = require('../range/connectRange');

var _connectRange2 = _interopRequireDefault(_connectRange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _utils.deprecate)(_connectRange2.default, '\'connectRangeSlider\' was replaced by \'connectRange\'.\n  Please see https://community.algolia.com/instantsearch.js/v2/connectors/connectRange.html');