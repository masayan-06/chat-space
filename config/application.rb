require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace
  class Application < Rails::Application
    #スタイルシート・ヘルパー・Javascript・アプリケーションをテストするためのファイル
    #'rails g'コマンドでコントローラを作成すると生成されるが、今回は必要ない
    #生成されないようにしておく
    config.generators do |g| 
      g.stylesheets false
      g.javascripts false
      g.helper false
      g.test_framework false
    end
  end
end
