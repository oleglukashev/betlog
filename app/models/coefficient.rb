class Coefficient < ActiveRecord::Base
  belongs_to :bookmaker

  def bookmaker_name
    bookmaker = Bookmaker.find(self.bookmaker_id)
    bookmaker[:name]
  end
end
