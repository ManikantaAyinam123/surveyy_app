class CreateUploads < ActiveRecord::Migration[7.1]
  def change
    create_table :uploads do |t|
      t.string :state
      t.integer :ac_no
      t.string :ac_name
      t.string :candidate_name
      t.string :sex
      t.integer :age
      t.string :category
      t.string :party
      t.string :symbol
      t.integer :general
      t.integer :postal
      t.integer :total
      t.string :percent_votes_polled
      t.integer :total_electors

      t.timestamps
    end
  end
end
