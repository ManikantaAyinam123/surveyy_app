class CreateVoters < ActiveRecord::Migration[7.1]
  def change
    create_table :voters do |t|
      t.string :voter_name
      t.integer :age
      t.string :sex
      t.string :state
      t.string :constituency
      t.boolean :casted
      t.string :party
      t.string :figured_by

      t.timestamps
    end
  end
end
