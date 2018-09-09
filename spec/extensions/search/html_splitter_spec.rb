require 'spec_helper'
require 'extensions/search/html_splitter'
require 'nokogiri'

describe HtmlSplitter do
  context 'simple html page' do
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
          <h2 id="title-2">Title 2</h2>
          <p>Paragraph 2</p>
          <h3 id="title-2_1">Title 2.1</h3>
          <p>Paragraph 2.1</p>
        </body>
      </html>
      HTML
    end

    subject { HtmlSplitter.new }

    it 'should split into paragraphs' do
      records = subject.split_html(html, {})
      expect(records.length).to eq 6
      expect(records[0]).to eq({
        hierarchy: {
          lvl0: 'Title 1',
          lvl1: nil,
          lvl2: nil,
          lvl3: nil,
          content: nil
        },
        content: 'Paragraph 1',
        objectID: ' -  - 0',
        snippet: nil,
        is_snippet: false,
        node_i: 0,
        anchor: 'title-1',
        url_with_anchor: '#title-1',
        url_without_variable_with_anchor: '#title-1'
      })
      expect(records[3]).to eq({
        hierarchy: {
          lvl0: 'Title 1',
          lvl1: 'Title 1.2',
          lvl2: 'Title 1.2.1',
          lvl3: nil,
          content: nil
        },
        content: 'Paragraph 1.2.1',
        objectID: ' -  - 3',
        snippet: nil,
        is_snippet: false,
        node_i: 3,
        anchor: 'title-1_2_1',
        url_with_anchor: '#title-1_2_1',
        url_without_variable_with_anchor: '#title-1_2_1'
      })
    end

    let(:html2) do
      <<-HTML
      <html>
        <head></head>
        <body>
          <h2 id="title-1">Title 1</h2>
          <p class="search-ignore">Paragraph 1</p>
          <h3 id="title-1_1">Title 1.1</h3>
          <p>Paragraph 1.1</p>
          <h3 id="title-1_2">Title 1.2</h3>
          <p>Paragraph 1.2</p>
          <h4 id="title-1_2_1">Title 1.2.1</h4>
          <p>Paragraph 1.2.1</p>
          <h2 id="title-2">Title 2</h2>
          <p>Paragraph 2</p>
          <h3 id="title-2_1">Title 2.1</h3>
          <p>Paragraph 2.1</p>
          <p class="nav-tabs">Paragraph 2.2</p>
          <p class="intro">Paragraph 2.3</p>
          <p class="card-container">Paragraph 2.4</p>
          <p class="search-ignore">Paragraph 2.5</p>
          <p class="edit-link">Paragraph 2.6</p>
          <p class="copy-link">Paragraph 2.7</p>
        </body>
      </html>
      HTML
    end

    it 'should not create records for excluded selectors and ignore nav tabs' do
      records = subject.split_html(html2, {})
      expect(records.length).to eq 5
      expect(records[0]).to eq({
        hierarchy: {
          lvl0: 'Title 1',
          lvl1: 'Title 1.1',
          lvl2: nil,
          lvl3: nil,
          content: nil
        },
        content: 'Paragraph 1.1',
        objectID: ' -  - 0',
        snippet: nil,
        is_snippet: false,
        node_i: 0,
        anchor: 'title-1_1',
        url_with_anchor: '#title-1_1',
        url_without_variable_with_anchor: '#title-1_1'
      })
      expect(records[2]).to eq({
        hierarchy: {
          lvl0: 'Title 1',
          lvl1: 'Title 1.2',
          lvl2: 'Title 1.2.1',
          lvl3: nil,
          content: nil,
        },
        content: 'Paragraph 1.2.1',
        objectID: ' -  - 2',
        snippet: nil,
        is_snippet: false,
        node_i: 2,
        anchor: 'title-1_2_1',
        url_with_anchor: '#title-1_2_1',
        url_without_variable_with_anchor: '#title-1_2_1'
      })
    end

    let(:html3) do
      <<-HTML
      <html>
        <head></head>
        <body>
          <h2 id="title-1">Title 1</h2>
          <div class="snippet-wrapper"><p class="copy-link circle-link text-sm text-demi text-center pos-abt z-1"><a href="#" class="btn btn-danger no-padding text-center" target="_blank" rel="noopener"><i class="icon-copy"></i><span class="tooltip nowrap color-white text-sm text-demi pos-abt"><span class="tooltip-bg pos-abt fill-bunting"></span>Copy</span></a></p><div class="snippet-header"><ul class="nav nav-tabs"><li class="active"><a href="#snippet_json" data-toggle="tab">json</a></li></ul></div><div id="snippet_json" class="tab-pane snippet active" data-language="json"><div class="highlight"><pre class="highlight json"><code><span class="p">[</span><span class="w">
            </span><span class="p">{</span><span class="w">
              </span><span class="s2">"name"</span><span class="p">:</span><span class="w"> </span><span class="s2">"Catherine Missal"</span><span class="p">,</span><span class="w">
              </span><span class="s2">"rating"</span><span class="p">:</span><span class="w"> </span><span class="mi">4875</span><span class="p">,</span><span class="w">
              </span><span class="s2">"image_path"</span><span class="p">:</span><span class="w"> </span><span class="s2">"/g3fsRgEoMxaqPayIMtGDWERqJ6A.jpg"</span><span class="p">,</span><span class="w">
              </span><span class="s2">"alternative_name"</span><span class="p">:</span><span class="w"> </span><span class="kc">null</span><span class="p">,</span><span class="w">
              </span><span class="s2">"objectID"</span><span class="p">:</span><span class="w"> </span><span class="s2">"551486300"</span><span class="w">
            </span><span class="p">},</span><span class="w">
            </span><span class="p">[</span><span class="err">...</span><span class="p">]</span><span class="w">
          </span><span class="p">]</span><span class="w">
          </span></code></pre></div></div></div>
        </body>
      </html>
      HTML
    end

    it 'should handle snippets' do
      records = subject.split_html(html3, {})

      expect(records.size).to eq 1
      expect(records[0][:is_snippet]).to eq true
      expect(records[0][:snippet_language]).to eq 'json'
      expect(records[0][:snippet_language_weight]).to eq 0
      expect(records[0][:raw_snippet].to_s).to include('snippet-wrapper')

    end

    it 'should create records that contains the base record' do
      records = subject.split_html(html3, {test: 'test'})

      expect(records.size).to eq 1
      expect(records[0][:test]).to eq 'test'
    end
  end

  context 'anchors' do
    let(:html4) do
      <<-HTML
      <html>
        <head></head>
        <body>
          <div>
            <p id="test">Paragraph 0</p>
  
            <div id="test1">
              <p>Paragraph 1</p>
            </div>
            
            
            <p>
              <span id="test2">
                Paragraph 2
              </span>
            </p>
  
            <div name="test3">
              <div>
                <p>Paragraph 3</p>
              </div>
            </div>
  
            <div>
                <div id="test4"></div>
                <p>Paragraph 4</p>
            </div>
          </div>
          
          <p>Paragraph 5</p>
        </body>
      </html>
      HTML
    end

    subject { HtmlSplitter.new }

    it 'should get anchors correctly' do
      doc = Nokogiri::HTML(html4)
      paragraphs = (doc / 'p')

      expect(subject.get_anchor(paragraphs[0])).to eq 'test'
      expect(subject.get_anchor(paragraphs[1])).to eq 'test1'
      expect(subject.get_anchor(paragraphs[2])).to eq 'test2'
      expect(subject.get_anchor(paragraphs[3])).to eq 'test3'
      expect(subject.get_anchor(paragraphs[4])).to eq 'test4'
      expect(subject.get_anchor(paragraphs[5])).to eq nil
    end
  end
end
