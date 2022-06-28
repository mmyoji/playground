class TweakUsers < ActiveRecord::Migration[5.2]
  def up
    change_column :users, :username, :string, limit: 32

    add_index :users, :username, unique: true
    add_index :users, :email,    unique: true
  end

  def down
    remove_index :users, :email
    remove_index :users, :username

    change_column :users, :username, :string
  end
end
