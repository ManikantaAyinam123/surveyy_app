class ChangeDataType < ActiveRecord::Migration[7.1]
  def change
     remove_column :voters, :mobile_No, :string
     add_column :voters, :mobile_number, :bigint
  end
end
