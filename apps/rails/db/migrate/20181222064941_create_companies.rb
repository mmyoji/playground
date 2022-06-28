class CreateCompanies < ActiveRecord::Migration[5.2]
  def change
    create_table :companies do |t|
      t.string :name,     null: false
      t.string :tel,      null: false
      t.string :email,    null: false
      t.text :address,    null: false
      t.date :founded_at, null: false

      t.timestamps
    end
  end
end
