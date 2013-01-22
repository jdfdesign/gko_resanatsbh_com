source :rubygems

gem 'iconv'

group :assets do
 gem 'sass-rails', '~> 3.2.6'
 gem 'coffee-rails', '~> 3.2.2'
 gem 'uglifier', '>= 1.0.3'
end

prod_location = 'git@github.com:jdfdesign/gko_cms3.git'

group :production do
	gem 'gko_core', :git => prod_location
	gem 'gko_auth', :git => prod_location
	gem 'gko_images', :git => prod_location
	gem 'gko_documents', :git => prod_location
	gem 'gko_inquiries', :git => prod_location
	gem 'gko_features', :git => prod_location
end

#group :development do
#  gem "gko_core", :path => File.expand_path('~/Github/gko_cms3/gko_core', __FILE__)
#  gem "gko_auth", :path => File.expand_path('~/Github/gko_cms3/gko_auth', __FILE__)
#  gem "gko_images", :path => File.expand_path('~/Github/gko_cms3/gko_images', __FILE__)
#  gem "gko_documents", :path => File.expand_path('~/Github/gko_cms3/gko_documents', __FILE__)
#  gem "gko_inquiries", :path => File.expand_path('~/Github/gko_cms3/gko_inquiries', __FILE__)
#  gem "gko_features", :path => File.expand_path('~/Github/gko_cms3/gko_features', __FILE__)
#end