class AddChampionshipsTable < ActiveRecord::Migration
  def up
  	create_table :championships do |t|
      t.string :name, :null => false
      t.integer :sport_id, :null => false
      
      t.timestamps 
    end
  end

  def down
  	drop_table :championships
  end
end
