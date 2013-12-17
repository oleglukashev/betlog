#encoding: utf-8
class AddSportsRows < ActiveRecord::Migration
  def up
    Sport.create( :name => 'Футбол')
    Sport.create( :name => 'Хоккей')
    Sport.create( :name => 'Баскетбол')
    Sport.create( :name => 'Теннис')
    Sport.create( :name => 'Воллейбол')
    Sport.create( :name => 'Гандбол')
    Sport.create( :name => 'Регби')
    Sport.create( :name => 'Бокс')
  end
  def down
    Sport.all.each { |item| item.destroy }
  end
end
