class CreateStaffMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :staff_members do |t|
      t.references :company, foreign_key: true, null: false
      t.string :username,        null: false
      t.string :email,           null: false
      t.string :password_digest, null: false

      t.timestamps
    end

    add_index :staff_members, :username, unique: true
    add_index :staff_members, :email,    unique: true
  end
end
