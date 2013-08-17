#encoding: utf-8
class AddUsersTable < ActiveRecord::Migration
  def up
  	create_table :users do |t|
      t.string :login, :null => false
      t.string :name, :null => false
      t.string :password, :null => false
      t.string :role, :default => 'user'
      t.integer :login_count, :default => 0, :null => false
      t.datetime :last_request_at
      t.datetime :last_login_at
      t.datetime :current_login_at
      t.string :last_login_ip
      t.string :current_login_ip
      t.timestamps 
    end
  end

  def down
  	drop_table :users
  end
end
