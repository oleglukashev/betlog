class AddCoefficients < ActiveRecord::Migration
  def up
  	create_table :coefficients do |t|
      t.integer :event_id, :null => false
      t.integer :bookmaker_id, :null => false
      t.float :first
      t.float :draw
      t.float :second
      t.float :first_or_draw
      t.float :first_or_second
      t.float :draw_or_second
      t.float :first_fora
      t.float :second_fora
      t.float :total_less
      t.float :total_more

      t.timestamps
    end
  end

  def down
  	drop_table :coefficients
  end
end
