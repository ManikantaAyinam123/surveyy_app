class AddDetailsToUploads < ActiveRecord::Migration[7.1]
  def change
    add_column :uploads, :voter_name, :string
    add_column :uploads, :age, :integer
    add_column :uploads, :sex, :string
    add_column :uploads, :state, :string
    add_column :uploads, :constituency, :string
    add_column :uploads, :casted, :boolean
    add_column :uploads, :party, :string
    add_column :uploads, :figured_by, :string
  end
end
