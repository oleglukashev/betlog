#encoding: utf-8
class AddBookmakersRows < ActiveRecord::Migration
  def up
    Bookmaker.create( :name => 'Marathon', :rating => 0 )
  end
  def down
    Bookmaker.all.each { |item| item.destroy }
  end
end
