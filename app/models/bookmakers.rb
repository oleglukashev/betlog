class Bookmakers < ActiveRecord::Base
	validates :name,  :presence => true,
                    :length => {:minimum => 1, :maximum => 128}

end
