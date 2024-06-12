class AddBoothNameToUploads < ActiveRecord::Migration[7.1]
  def change
    add_column :uploads, :booth_name, :string
  end
end
