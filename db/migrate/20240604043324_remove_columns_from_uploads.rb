class RemoveColumnsFromUploads < ActiveRecord::Migration[7.1]
  def change
     remove_column :uploads, :state, :string
    remove_column :uploads, :ac_no, :integer
    remove_column :uploads, :ac_name, :string
    remove_column :uploads, :candidate_name, :string
    remove_column :uploads, :sex, :string
    remove_column :uploads, :age, :integer
    remove_column :uploads, :category, :string
    remove_column :uploads, :party, :string
    remove_column :uploads, :symbol, :string
    remove_column :uploads, :general, :integer
    remove_column :uploads, :postal, :integer
    remove_column :uploads, :total, :integer
    remove_column :uploads, :percent_votes_polled, :string
    remove_column :uploads, :total_electors, :integer
  end
end
