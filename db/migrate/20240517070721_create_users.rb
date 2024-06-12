class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :user_type
      t.string :username
      t.string :email
      t.integer :password
      t.integer :password_confirmation

      t.timestamps
    end
  end
end
