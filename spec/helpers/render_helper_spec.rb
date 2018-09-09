require 'spec_helper'
require 'helpers/render_helper'

describe RenderHelper do
  context 'render page with language' do
    let(:context) { Class.new {
      include RenderHelper

      def current_page
        {
            metadata: {
                locals: {
                    language: 'php'
                }
            }
        }.to_ostruct(nil)
      end
    }.new }

    it 'should get current language when exist' do
      expect(context.get_current_language).to eq 'php'
    end

    it 'should parse erb using echo' do
      expect(context.echo "t<%= 'es' %>t").to eq 'test'
    end

    it 'should have locals in echo' do
      expect(context.echo "<%= language %>").to eq 'php'
    end

    it 'should generate edit link' do
      expect(context.edit_link('filename')).to include('github.com')
      expect(context.edit_link('filename')).to include('<a')
      expect(context.edit_link('filename')).to include('filename')
    end
  end

  context 'render page without language' do
    let(:context) { Class.new {
      include RenderHelper
    }.new}

    it 'should have a nil current language' do
      expect(context.get_current_language).to eq nil
    end

    it 'should anchorize' do
      expect(context.anchorize('Just A-test1 * ')).to eq 'just-a-test1-*-'
    end

    it 'should generate id' do
      expect(context.generate_id('test test1')).to eq 'test-test1'
      expect(context.generate_id('test test1')).to eq 'test-test1-2'
    end
  end
end