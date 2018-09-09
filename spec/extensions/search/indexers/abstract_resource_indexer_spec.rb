require 'spec_helper'
require 'extensions/search/indexers/abstract_resource_indexer'
require 'lib/sitemap_tree'

describe AbstractResourceIndexer do
  context 'abstract indexer' do
    subject { AbstractResourceIndexer.new(nil, {
        docs: {
          languages: [],
          librairies: []
        }
    }.to_ostruct(nil), nil, nil) }
    it 'should index all languages variants' do
      expect(subject.get_language('javascript')).to eq ['javascript', 'js']
      expect(subject.get_language('swift')).to eq [
        'swift',
        'ios',
        'iosis',
        'iosinstantsearch'
      ]

      expect(subject.get_language(['javascript', 'swift'])).to eq [
        'javascript',
        'js',
        'swift',
        'ios',
        'iosis',
        'iosinstantsearch'
      ]

      sitemap_tree = SitemapTree.new(nil)
      sitemap_tree.add({destination_path: 'doc/test/test1.html', metadata: {locals: {language: {code: 'javascript'}}}}.to_ostruct(nil))

      page1 = sitemap_tree.from_url('doc/test/test1')

      expect(subject.get_language(page1)).to eq ['javascript', 'js']
    end
  end
end