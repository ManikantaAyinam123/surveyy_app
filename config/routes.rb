Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  resources :users

  post '/auth/login', to: 'authentication#login'
  post '/admin/uploads/import_file', to: 'uploads#import_file', as: 'import_file_admin_uploads'
  post '/admin/voters/import_file', to: 'voters#import_file', as: 'import_file_admin_voters'

#   resources :voters

# get 'voters/search_by_name', to: 'voters#search_by_name'
# get 'voters/filter_casted_status', to: 'voters#filter_casted_status'
# get '/voters/search_by_constituency', to: 'voters#search_by_constituency'
 resources :voters do
    collection do
      get :search_by_name
      get :filter_casted_status
      get :search_by_constituency
      get :search_by_booth_name
    end
  end
  # resources :uploads
  # get 'uploads/search_by_name', to: 'uploads#search_by_name'
   
    resources :uploads do
    collection do
      get :search_by_name
      get :filter_casted_status
      
    end
  end

end
