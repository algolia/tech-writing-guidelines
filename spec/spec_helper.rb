require 'rspec'
require 'middleman-core'
require 'middleman-core/rack'

# encoding: utf-8
$LOAD_PATH << File.expand_path('../..', __FILE__)

# Pull in all of the gems including those in the `test` group
require 'bundler'
Bundler.require :default, :test, :development, :debug
