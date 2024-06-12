class ApplicationController < ActionController::Base
  # require 'cancan'
  protect_from_forgery with: :null_session
  rescue_from CanCan::AccessDenied do |exception|
    render json: { errors: exception.message}
     end
 #    include CanCan::ControllerAdditions

 #  rescue_from CanCan::AccessDenied do |exception|
 #    redirect_to root_url, alert: exception.message

 # end
#  rescue_from CanCan::AccessDenied do |exception|
#   exception.default_message = "You are not authorized to perform this task"
#   respond_to do |format|
#     format.json { head :forbidden }
#     format.html { redirect_to root_path, alert: exception.message }
#   end
# end
     def current_ability
      @current_ability ||= Ability.new(@current_user)
    end

   def not_found
    render json: { error: 'not_found' }
  end
  def authorize_request
     
    header = header.split(' ').last if header
    header = request.headers['Authorization']
      
    begin
      @decoded = JsonWebToken.decode(header)
      @current_user = User.find(@decoded[:user_id])
      
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e.message }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: { errors: "Invalid token" }, status: :unauthorized
    end
  end
end