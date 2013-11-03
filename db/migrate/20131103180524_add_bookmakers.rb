class AddBookmakers < ActiveRecord::Migration
  def up
  	create_table :bookmakers do |t|
      t.string :name, :null => false
      t.float :rating, :null => false

      t.timestamps
    end
  end

  def down
  	drop_table :bookmakers
  end
end
