#encoding: utf-8
class AddEventsTable < ActiveRecord::Migration
  def up
  	create_table :events do |t|
      t.integer :championships_id, :null => false
      t.string :opponent_1, :null => false
      t.string :opponent_2, :null => false
      t.timestamps :date, :null => false
      
      t.timestamps 
    end
  end

  def down
  	drop_table :events
  end
end
