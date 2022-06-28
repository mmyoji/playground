class AddConfirmationColumnsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :confirmation_token, :string, after: :password_digest
    add_column :users, :confirmed_at, :datetime, after: :confirmation_token
  end
end
