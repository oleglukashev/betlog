class Users < ActiveRecord::Base
	require 'digest/md5'

	attr_accessible :login, :name, :role, :password

	before_save :encrypt_password

	def encrypt_password
		self.password = Digest::MD5.hexdigest( password )
	end
end