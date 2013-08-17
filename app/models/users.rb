class Users < ActiveRecord::Base
  attr_accessible :login, :email, :crypted_password, :password_salt, :role, :login_count, :last_request_at, :last_login_at, :current_login_at, :last_login_ip, :current_login_ip 
end