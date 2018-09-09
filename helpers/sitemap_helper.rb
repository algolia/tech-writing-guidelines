module SitemapHelper
  def guides_flatten
    @@guides ||= sitemap_tree.from_url('doc/guides').flatten
    @@guides
  end

  def get_all_languages
    @all_languages ||= app_data.docs.librairies.map{|l| l.code} + app_data.docs.languages.map{|l| l.code} + app_data.docs.frameworks.map{|l| l.code}
  end

  def get_resource_languages(r)
    all_languages = get_all_languages
    languages = r.siblings.map{|c| c.get_url_part}
    languages = (all_languages.include?(languages[0])) ? languages : []

    if r.get_val.metadata[:page][:languages]
      languages = r.get_val.metadata[:page][:languages]
    end

    languages.sort!{|x, y| all_languages.index(x) <=> all_languages.index(y)}
  end
end

