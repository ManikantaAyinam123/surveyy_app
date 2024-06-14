namespace :elasticsearch do
  desc "Create Elasticsearch index for Voter model"
  task create_voters_index: :environment do
    Voter.__elasticsearch__.create_index!(force: true)
    puts "Voter index created."
  end
end