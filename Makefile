all: install serve

serve:
	bundle exec foreman start

install:
	bundle install
	yarn install


build:
	yarn install
	bundle exec middleman build

.PHONY: build
