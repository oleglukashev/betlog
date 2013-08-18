class User < ActiveRecord::Base
	require 'digest/md5'

	acts_as_authentic

	attr_accessible :login, :name, :role, :password, :password_confirmation

	

	

  validates :password, :presence => true,
                       :confirmation => true,
                       :length => {:within => 6..40},
                       :on => :create
  validates :password, :confirmation => true,
                       :length => {:within => 6..40},
                       :allow_blank => true,
                       :on => :update

	def encrypt_password
		self.password = Digest::MD5.hexdigest( password )
	end
end