#encoding: utf-8
class AddChampionshipsTable < ActiveRecord::Migration
  def up
  	create_table :championships do |t|
      t.string :name, :null => false
      t.belongs_to :country
      t.belongs_to :sport

      t.timestamps
    end
  end

  def down
  	drop_table :championships
  end
end
