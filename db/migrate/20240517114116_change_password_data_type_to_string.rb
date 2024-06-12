class ChangePasswordDataTypeToString < ActiveRecord::Migration[7.1]
  def change
     change_column :users, :password, :string
    change_column :users, :password_confirmation, :string
  end
end
