require 'rvm/capistrano' # Для работы rvm
require 'bundler/capistrano' # Для работы bundler. При изменении гемов bundler автоматически обновит все гемы на сервере, чтобы они в точности соответствовали гемам разработчика.

set :application, "betlog"
set :rails_env, "production"
set :domain, "oleg@betlog.net" # Это необходимо для деплоя через ssh. Именно ради этого я настоятельно советовал сразу же залить на сервер свой ключ, чтобы не вводить паролей.
set :deploy_to, "/var/www/#{application}"
  set :use_sudo, false
set :unicorn_conf, "#{deploy_to}/current/config/unicorn.rb"
set :unicorn_pid, "#{deploy_to}/shared/pids/unicorn.pid"

set :rvm_ruby_string, 'ruby-2.0.0-p247' # Это указание на то, какой Ruby интерпретатор мы будем использовать.

set :scm, :git # Используем git. Можно, конечно, использовать что-нибудь другое - svn, например, но общая рекомендация для всех кто не использует git - используйте git.
set :repository,  "git@github.com:oleglukashev/betlog.git" # Путь до вашего репозитария. Кстати, забор кода с него происходит уже не от вас, а от сервера, поэтому стоит создать пару rsa ключ
set :branch, "master" # Ветка из которой будем тянуть код для деплоя.
set :deploy_via, :remote_cache # Указание на то, что стоит хранить кеш репозитария локально и с каждым деплоем лишь подтягивать произведенные изменения. Очень актуально для больших и тяжелых

role :web, domain
role :app, domain
role :db,  domain, :primary => true

before 'deploy:setup', 'rvm:install_rvm', 'rvm:install_ruby' # интеграция rvm с capistrano настолько хороша, что при выполнении cap deploy:setup установит себя и указанный в rvm_ruby_string

after 'deploy:update_code', :roles => :app do
	# Здесь для примера вставлен только один конфиг с приватными данными - database.yml. Обычно для таких вещей создают папку /srv/myapp/shared/config и кладут файлы туда. При каждом деплое со
	run "rm -f #{current_release}/config/database.yml"
	run "ln -s #{deploy_to}/shared/config/database.yml #{current_release}/config/database.yml"
end

# Далее идут правила для перезапуска unicorn. Их стоит просто принять на веру - они работают.
# В случае с Rails 3 приложениями стоит заменять bundle exec unicorn_rails на bundle exec unicorn
namespace :deploy do
	task :restart do
    run "if [ -f #{unicorn_pid} ] && [ -e /proc/$(cat #{unicorn_pid}) ]; then kill -USR2 `cat #{unicorn_pid}`; else cd #{deploy_to}/current && bundle exec unicorn_rails -c #{unicorn_conf} -E #{rails_env} -D; fi"
 	end
 	task :start do
 		run "bundle exec unicorn_rails -c #{unicorn_conf} -E #{rails_env} -D; fi"
	end
	task :stop do
		run "if [ -f #{unicorn_pid} ] && [ -e /proc/$(cat #{unicorn_pid}) ]; then kill -QUIT `cat #{unicorn_pid}`; fi"
	end
end
