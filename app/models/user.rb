class User < ActiveRecord::Base
	require 'digest/md5'

	acts_as_authentic

	#attr_accessible :login, :name, :role, :password, :password_confirmation

	validates :name,  :presence => true, 
                    :length => {:minimum => 1, :maximum => 128}

	validates :login, :presence => true, 
                    :length => {:minimum => 3, :maximum => 128},
                    :uniqueness => true,
                    :format => {:with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i}	


	def encrypt_password
		self.password = Digest::MD5.hexdigest( password )
	end
end