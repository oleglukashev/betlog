class Coefficients < ActiveRecord::Base

  def bookmaker_name
    bookmaker = Bookmakers.find(self.bookmaker_id)
    bookmaker[:name]
  end
end
