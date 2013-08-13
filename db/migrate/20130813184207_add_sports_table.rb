class AddSportsTable < ActiveRecord::Migration
  def up
  	create_table :sports do |t|
      t.string :name, :null => false
      
      t.timestamps 
    end
  end

  def down
  	drop_table :sports
  end
end
