class AddSportsRows < ActiveRecord::Migration
  def up
    Sports.create( :name => 'Футбол')
    Sports.create( :name => 'Хоккей')
    Sports.create( :name => 'Баскетбол')
    Sports.create( :name => 'Теннис')
    Sports.create( :name => 'Воллейбол')
    Sports.create( :name => 'Гандбол')
    Sports.create( :name => 'Регби')
    Sports.create( :name => 'Бокс')
  end
  def down
    Sports.all.each { |item| item.destroy }
  end
end
