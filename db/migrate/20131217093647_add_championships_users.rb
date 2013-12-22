class AddChampionshipsUsers < ActiveRecord::Migration
  def up
    create_table :championships_users, id: false do |t|
      t.belongs_to :championship
      t.belongs_to :user
    end
  end

  def down
    drop_table :championships_users
  end
end
