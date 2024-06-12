ActiveAdmin.register User do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :user_type, :username, :email, :password, :password_confirmation
  #
  # or
  #
  # permit_params do
  #   permitted = [:user_type, :username, :email, :password, :password_confirmation]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
    permit_params :user_type, :username, :email,  :password, :password_confirmation, :passwordnew
   # :password_digest
  #
  # or
  #
  # permit_params do
  #   permitted = [:user_type, :username, :email, :password_digest, :plaintext_password]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  


   index do
    selectable_column
    id_column
    column :user_type
    column :username
    column :email
    column :password do |user|
      user.plaintext_password
    end
    actions
  end



   form do |f|
    f.inputs do
      f.input :user_type
      f.input :username
      f.input :email
      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end
  
end
