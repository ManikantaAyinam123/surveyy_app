Rails.application.routes.draw do
  get 'home/index'
  root 'home#index'
  
  # Namespace your API routes under /api
 
    devise_for :admin_users, ActiveAdmin::Devise.config
    ActiveAdmin.routes(self)
 
    resources :users
  
    post '/admin/uploads/import_file', to: 'uploads#import_file', as: 'import_file_admin_uploads'
    post '/admin/voters/import_file', to: 'voters#import_file', as: 'import_file_admin_voters'
   namespace :api do
    post '/auth/login', to: 'authentication#login'
    resources :voters do
      collection do
        get :search_by_name
        get :filter_casted_status
        get :search_by_constituency
        get :search_by_booth_name
      end
    end

    resources :uploads do
      collection do
        get :search_by_name
        get :filter_casted_status
      end
    end
  end

  # Catch-all route for React Router, but exclude /api paths
  get '*path', to: 'home#index', constraints: ->(request) { !request.path.start_with?('/api') }, via: :all
end
