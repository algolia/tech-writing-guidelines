all: install serve

serve:
	bundle exec middleman start

install:
	bundle install
	yarn install


build:
	yarn install
	bundle exec middleman build

.PHONY: build
