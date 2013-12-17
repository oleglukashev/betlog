class Bookmaker < ActiveRecord::Base
  has_many :coefficient

	validates :name,  :presence => true,
                    :length => {:minimum => 1, :maximum => 128}

end
