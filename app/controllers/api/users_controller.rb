class Api::UsersController < ApplicationController
    before_action :authorize_request, except: :create
  before_action :find_user, except: %i[create index]
	  # before_action :authorize_request
	  #  protect_from_forgery with: :null_session, only: [:create, :update, :destroy]
  # before_action :find_user, except: %i[create index]
 def index
 
  	@users = User.all
    render json: @users, status: :ok
  end
  def show
    render json: @user, status: :ok
  end
  def create
  # binding.pry
  @user = User.new(user_params)
  if @user.save
      render json: @user, status: :created
    else
      render json: { errors: @user.errors.full_messages },
             status: :unprocessable_entity
    end
  end
  def update
    unless @user.update(user_params)
      render json: { errors: @user.errors.full_messages },
             status: :unprocessable_entity
    end
  end
def destroy
    @user.destroy
  end

  private

def user_params
  	 params.permit(
      :user_type, :username, :email, :password, :password_confirmation
    )





  end
end
