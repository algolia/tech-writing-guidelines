require 'spec_helper'
require 'lib/sitemap_tree'

describe SitemapTree do
  context 'building SitemapTree' do
    subject { SitemapTree.new(nil) }

    it 'should add resources to the tree' do
      subject.add({destination_path: 'doc/test/test1.html'}.to_ostruct(nil))
      subject.add({destination_path: 'doc/test/test2/test22.html'}.to_ostruct(nil))
      subject.add({destination_path: 'doc/test/test2/test13.html'}.to_ostruct(nil))

      expect(subject.flatten.size).to eq 3
    end

    it 'should not add js and css resources' do
      subject.add({destination_path: 'doc/test/test1.js'}.to_ostruct(nil))
      subject.add({destination_path: 'doc/test/test2/test22.css'}.to_ostruct(nil))

      expect(subject.flatten.size).to eq 0
    end

    it 'should find dir' do
      subject.add({destination_path: 'doc/test/test1.html'}.to_ostruct(nil))
      subject.add({destination_path: 'doc/test/test2/test22.html'}.to_ostruct(nil))
      subject.add({destination_path: 'doc/test/test2/test13.html'}.to_ostruct(nil))

      expect(subject.find(['doc']).class.name).to eq 'SitemapTree'
      expect(subject.find(['doc', 'test', 'test2']).class.name).to eq 'SitemapTree'
    end

    it 'should load sitemap_tree from url, partial urls and resource' do
      subject.add({destination_path: 'doc/test/test1.html'}.to_ostruct(nil))
      subject.add({destination_path: 'doc/test/test2/test22.html'}.to_ostruct(nil))
      subject.add({destination_path: 'doc/test/test2/test13.html'}.to_ostruct(nil))

      expect(subject.from_url('doc/test').class.name).to eq 'SitemapTree'
      expect(subject.from_url('doc/test/test1').class.name).to eq 'SitemapTree'
      expect(subject.from_resource({destination_path: 'doc/test/test1.html'}.to_ostruct(nil)).class.name).to eq 'SitemapTree'
    end


    it 'should access parent, children, sibling, ancestors' do
      subject.add({destination_path: 'doc/test/test1.html'}.to_ostruct(nil))
      subject.add({destination_path: 'doc/test/test2/test22.html'}.to_ostruct(nil))
      subject.add({destination_path: 'doc/test/test2/test13.html'}.to_ostruct(nil))

      tree = subject.from_url('doc/test/test2')

      expect(tree.get_parent.get_parent.get_url_part).to eq 'doc'
      expect(tree.get_children.size).to eq 2
      expect(tree.get_children[0].siblings.size).to eq 2
      expect(tree.get_children[0].siblings[0].get_url_part).to eq 'test22'
      expect(tree.ancestor('doc').get_url_part).to eq 'doc'
      expect(tree.ancestor('doc', 1).get_url_part).to eq 'test'
    end

    it 'should get the final url with a / at the beginning and end' do
      subject.add({destination_path: 'doc/test/test1.html'}.to_ostruct(nil))

      tree = subject.from_url('doc/test/test1')

      expect(tree.get_final_url).to eq '/doc/test/test1/'
    end
  end
end