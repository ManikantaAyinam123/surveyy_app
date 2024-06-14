class VoterSerializer < ActiveModel::Serializer
  # attributes :id
  attributes :id, :voter_name, :age, :gender, :house_number, :booth_name, :casted, :figured_by, :mobile_number 
 
end
