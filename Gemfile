source :rubygems
source 'http://rubygems.org'

gem 'iconv'

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.1.5.rc1'
  gem 'coffee-rails', '~> 3.1.1'
  gem 'uglifier', '>= 1.0.3'
end
group :production do
  gem 'gko_core', '= 0.1.05', :git => 'git@github.com:jdfdesign/gko-cms-31.git'
  gem 'gko_auth', :git => 'git@github.com:jdfdesign/gko-cms-31.git'
  gem 'gko_images', :git => 'git@github.com:jdfdesign/gko-cms-31.git'
  gem 'gko_documents', :git => 'git@github.com:jdfdesign/gko-cms-31.git'
  gem 'gko_inquiries', :git => 'git@github.com:jdfdesign/gko-cms-31.git'
  gem 'gko_features', :git => 'git@github.com:jdfdesign/gko-cms-31.git'
end
#group :development do
#  gem "gko_core", :path => File.expand_path('../../gko_cms_html/gko_core', __FILE__)
#  gem "gko_auth", :path => File.expand_path('../../gko_cms_html/gko_auth', __FILE__)
#  gem "gko_images", :path => File.expand_path('../../gko_cms_html/gko_images', __FILE__)
#  gem "gko_documents", :path => File.expand_path('../../gko_cms_html/gko_documents', __FILE__)
#  gem "gko_inquiries", :path => File.expand_path('../../gko_cms_html/gko_inquiries', __FILE__)
#  gem "gko_features", :path => File.expand_path('../../gko_cms_html/gko_features', __FILE__)
#  gem 'rails-dev-boost', :git => 'git://github.com/thedarkone/rails-dev-boost.git', :require =>   'rails_development_boost' 
#end    
