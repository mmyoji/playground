class CreateAdminUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :admin_users do |t|
      t.string :username,        null: false
      t.string :email,           null: false
      t.string :password_digest, null: false

      t.timestamps
    end

    add_index :admin_users, :username, unique: true
    add_index :admin_users, :email,    unique: true
  end
end
