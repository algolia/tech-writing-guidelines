module TocHelper
  def get_h3s_toc(node)
    node.css('h3').map do |c_node|
      {
          level: c_node.name[1].to_i,
          value: c_node.children.map { |child| child.to_s }.join,
          anchor: c_node['id']
      }
    end
  end

  def get_toc(page_content, options = {})
    doc = Nokogiri::HTML(page_content)
    toc = []
    options = {full_toc_container: '.full-toc', show_subheadings: false }.merge(options)
    (doc / 'h2').each do |h_node|
      full_toc_container = h_node.ancestors(options[:full_toc_container]).first
      h = {
          value: h_node.children.map { |child| child.to_s }.join,
          anchor: h_node['id'],
          children: options[:show_subheadings] && !full_toc_container.nil? ? get_h3s_toc(full_toc_container) : []
      }
      toc.push(h)
    end
    toc
  end

  def get_guide_toc(page_content, options = {})
    get_toc(page_content, { show_subheadings: true, full_toc_container: '.full-toc' }.merge(options))
  end

  def get_scrollspy_toc(page_content, options = {})
    get_toc(page_content, { show_subheadings: false, full_toc_container: 'section:not(.no-scrollspy-full-toc)' }.merge(options))
  end

  def get_titles_for_page(page_content, tag)
    doc = Nokogiri::HTML(page_content)
    (doc / tag).map do |h_node|
      {
          value: h_node.children.map { |child| child.to_s }.join,
          anchor: h_node['id']
      }
    end
  end

  def build_toc(content)
    @@toc ||= {}
    return @@toc[content] if @@toc[content]

    doc = Nokogiri::HTML(content)
    h1 = []
    toc = []
    (doc / 'h1, h2, h3, h4').each do |h_node|
      h = {
          level: h_node.name[1].to_i,
          value: h_node.children.map { |child| child.to_s }.join.gsub(/(\{\#.+?\})/, ''),
          anchor: h_node['id'],
          children: []
      }
      if toc.empty?
        toc << h
        next
      end
      while toc.size > 0 && h[:level] <= toc.last[:level]
        tmp = toc.pop
        h1 << tmp if tmp[:level] == 1
      end
      if toc.empty?
        toc << h
      else
        toc.last[:children] << h
        toc << h
      end
    end
    @@toc[content] = h1 + toc.select { |h| h[:level] == 1 }
  end
end
