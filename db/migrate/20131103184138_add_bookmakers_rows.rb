class AddBookmakersRows < ActiveRecord::Migration
  def up
    Bookmakers.create( :name => 'Marathon', :rating => 0 )
  end
  def down
    Bookmakers.all.each { |item| item.destroy }
  end
end
