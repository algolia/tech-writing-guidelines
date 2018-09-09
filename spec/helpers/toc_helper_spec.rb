require 'spec_helper'
require 'helpers/toc_helper'

describe TocHelper do
  context 'render toc' do
    let(:context) { Class.new {
      include TocHelper
    }.new}

    let(:html) do
      <<-HTML
        <html>
          <head></head>
          <body>
            <h2 id="title-1">Title 1</h2>
            <p>Paragraph 1</p>
            <h3 id="title-1_1">Title 1.1</h3>
            <p>Paragraph 1.1</p>
            <h3 id="title-1_2">Title 1.2</h3>
            <p>Paragraph 1.2</p>
            <h4 id="title-1_2_1">Title 1.2.1</h4>
            <p>Paragraph 1.2.1</p>
            <section class="full-toc">
              <h2 id="title-2">Title 2</h2>
              <p>Paragraph 2</p>
              <h3 id="title-2_1">Title 2.1</h3>
              <p>Paragraph 2.1</p>
            </section>
          </body>
        </html>
      HTML
    end

    it 'should get title for pages' do
      titles = context.get_titles_for_page(html, 'h2')

      expect(titles.class.name).to eq 'Array'
      expect(titles.size).to eq 2
      expect(titles[0][:value]).to eq 'Title 1'
      expect(titles[0][:anchor]).to eq 'title-1'
    end

    it 'should get guide toc' do
      toc = context.get_guide_toc(html)

      expect(toc.class.name).to eq 'Array'
      expect(toc.size).to eq 2

      expect(toc[0][:value]).to eq 'Title 1'
      expect(toc[0][:anchor]).to eq 'title-1'
      expect(toc[0][:children].size).to eq 0
      expect(toc[1][:value]).to eq 'Title 2'
      expect(toc[1][:anchor]).to eq 'title-2'
      expect(toc[1][:children].size).to eq 1

      expect(toc[1][:children][0][:value]).to eq 'Title 2.1'
      expect(toc[1][:children][0][:anchor]).to eq 'title-2_1'
    end
  end
end