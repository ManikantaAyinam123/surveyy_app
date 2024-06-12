class RecreateVotersTable < ActiveRecord::Migration[7.1]
  def change
    # Drop the existing voters table
    drop_table :voters if ActiveRecord::Base.connection.table_exists?(:voters)

    # Create a new voters table with the desired structure
    create_table :voters do |t|
      t.string :voter_name
      t.integer :age
      t.string :gender
      t.string :house_number
      t.string :mobile_No
      t.string :booth_name
      t.boolean :casted
      t.string :figured_by

      t.timestamps
    end
  end
end

