# class Voter < ApplicationRecord
# include Elasticsearch::Model
# include Elasticsearch::Model::Callbacks

# # def self.search(search)
# #   if search
# #     find(:all, :conditions => ['name LIKE ?', "%#{search}%"])
# #   else
# #     find(:all)
# #   end
# # end

#   settings do
#     mappings dynamic: false do
#       indexes :voter_name, type: :string
#     #   indexes :title, type: :string, analyzer: :english
#     #   indexes :body, type: :text, analyzer: :english
#     #   indexes :tags, type: :string, analyzer: :english
#     #   indexes :published, type: :boolean
#     end
#   end


# 	  def self.search_published(query)
# 	  self.search({
# 	    query: {
# 	      bool: {
# 	        must: [
# 	        {
# 	          multi_match: {
# 	            query: query,
# 	            fields: [:voter_name]
# 	          }
# 	        },
# 	        {
# 	          match: {
# 	            published: true
# 	          }
# 	        }]
# 	      }
# 	    }
# 	  })
# 	end
# end
# class Voter < ApplicationRecord
#   include Elasticsearch::Model
#   include Elasticsearch::Model::Callbacks

#   settings do
#     mappings dynamic: false do
#       indexes :voter_name, type: :text

#       # indexes :published, type: :boolean
#     end
#   end

#   def self.search_published(query)
#     self.search({
#       query: {
#         bool: {
#           must: [
#             {
#               multi_match: {
#                 query: query,
#                 fields: [:voter_name]
#               }
#             },
#             # {
#             #   match: {
#             #     published: true
#             #   }
#             # }
#           ]
#         }
#       }
#     })
#   end
# end
class Voter < ApplicationRecord
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  settings do
    mappings dynamic: false do
      indexes :voter_name, type: :text
      indexes :booth_name, type: :keyword
      # indexes :published, type: :boolean
    end
  end

  # def self.search_published(booth_name, voter_name)
  
  #   self.search({
  #     query: {
  #       bool: {
  #         filter: [
  #           {
  #            match_phrase: { booth_name: booth_name }
  #             # wildcard: { booth_name: "*#{booth_name}*" }
  #              # match: { booth_name: { query: booth_name, fuzziness: "AUTO" } }
  #           }
  #         ],
  #         must: [
  #           {
  #             match_phrase: { voter_name: voter_name }
  #              # wildcard: { voter_name: "*#{voter_name}*" }
  #               # match: { voter_name: { query: voter_name, fuzziness: "AUTO" } }

  #           }
  #         ]
  #       }
  #     }
  #   })
  # end
def self.search_published(booth_name, voter_name)
  self.search({
    query: {
      bool: {
        must: [
          {
            bool: {
              should: [
                { wildcard: { booth_name: "*#{booth_name}*" } },
                { prefix: { booth_name: booth_name } },
                { match: { booth_name: { query: booth_name, fuzziness: "AUTO" } } }
              ]
            }
          },
          {
            bool: {
              should: [
                { wildcard: { voter_name: "*#{voter_name}*" } },
                { prefix: { voter_name: voter_name } },
                { match: { voter_name: { query: voter_name, fuzziness: "AUTO" } } }
              ]
            }
          }
        ]
      }
    }
  })
end
end







# Elasticsearch::Model.client.transport.logger = Logger.new(STDOUT)