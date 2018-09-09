require 'better_errors'
require 'extensions/custom_extension'
require 'lib/hash_ostruct'
require 'lib/middleman_optims'
require 'dotenv'

Dotenv.load

set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'

ignore 'templates/*'
ignore 'layouts/*'
ignore 'partials/*'
ignore '**.yml'
ignore '404.html'


page '*', layout: 'guide'

#app.logger.level = :debug
redirects = []

if not build? and config[:stage] == 'develop'
  use ::Rack::OnboardingRackMiddleware
end

activate :custom_extension
activate :syntax
activate :directory_indexes

activate :external_pipeline,
  name: :webpack,
  command: build? ? "yarn run build" : "yarn run start",
  source: ".tmp/dist",
  latency: 1

set(:port, 4568)
set :haml, { :ugly => true, :format => :html5 }
set :markdown_engine, :kramdown
set :markdown, parse_block_html: true, fenced_code_blocks: true, input: 'GFM', with_toc_data: true, smartypants: true, hard_wrap: false
set :show_exceptions, false

configure :server do
  set :debug_assets, true
  #activate :livereload
  use BetterErrors::Middleware
  BetterErrors.application_root = __dir__
end

# Build-specific configuration
configure :build do
  activate :minify_html
  activate :asset_hash
  activate :autoprefixer
  activate :gzip
end

# Legacy Redirects
app_data.redirects.each do |redirect|
  redirects.push({ from: redirect.from, to: redirect.to })
end

ready do
  no_redirect = ENV['NO_REDIRECTS'] && (ENV['NO_REDIRECTS'] == 'true')
  is_travis_pr_build = ENV['TRAVIS_PULL_REQUEST'] && (ENV['TRAVIS_PULL_REQUEST'] != 'false')

  if not no_redirect and not is_travis_pr_build
    redirects.each do |r|
      redirect r[:from][1..-1], to: r[:to]
    end
  end

  proxy '/_redirects', 'templates/redirects', locals: {redirects: redirects}, ignore: true

  sitemap.ensure_resource_list_updated!
  app.sitemap.ensure_resource_list_updated!

  app_data.set_auto_reload_files((not build?))
end