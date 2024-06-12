ActiveAdmin.register_page "voter" do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :voter_name, :age, :sex, :state, :constituency, :casted, :party, :figured_by
  #
  # or
  #
  # permit_params do
  #   permitted = [:voter_name, :age, :sex, :state, :constituency, :casted, :party, :figured_by]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
   content do
  form_for :dump, url: import_file_admin_voters_path, html: { multipart: true } do |f|
    f.file_field :file
    f.submit 'Upload file'
  end
end

  
end
