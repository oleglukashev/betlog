#encoding: utf-8
class AddCoefficients < ActiveRecord::Migration
  def up
  	create_table :coefficients do |t|
      t.belongs_to :event
      t.float :first
      t.float :draw
      t.float :second
      t.float :first_or_draw
      t.float :first_or_second
      t.float :draw_or_second
      t.float :first_fora
      t.float :second_fora
      t.float :coeff_first_fora
      t.float :coeff_second_fora
      t.float :total_less
      t.float :total_more
      t.float :coeff_first_total
      t.float :coeff_second_total
      t.belongs_to :bookmaker

      t.timestamps
    end
  end

  def down
  	drop_table :coefficients
  end
end
