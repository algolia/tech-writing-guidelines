'use strict';

var _InstantSearch = require('../InstantSearch');

var _InstantSearch2 = _interopRequireDefault(_InstantSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('InstantSearch lifecycle', function () {
  it('emits an error if the API returns an error', function () {
    var search = new _InstantSearch2.default({
      // correct credentials so that the client does not retry
      appId: 'latency',
      apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
      // the index name does not exist so that we get an error
      indexName: 'DOESNOTEXIST'
    });

    var sendError = void 0;
    var reject = void 0;
    var waitForError = new Promise(function (resolve, r) {
      sendError = resolve;
      reject = r;
    });

    search.on('error', function (e) {
      try {
        expect(e).toEqual(expect.any(Error));
      } catch (err) {
        reject(err);
      }
      sendError();
    });

    search.addWidget({
      render: function render() {}
    });

    search.start();

    return waitForError;
  });
}); // import algoliaSearchHelper from 'algoliasearch-helper';