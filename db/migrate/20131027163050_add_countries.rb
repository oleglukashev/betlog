#encoding: utf-8
class AddCountries < ActiveRecord::Migration
  def up
  	create_table :countries do |t|
      t.string :name, :null => false
      t.integer :sport_id, :null => false

      t.timestamps
    end
  end
  def down
  	drop_table :countries
  end
end
