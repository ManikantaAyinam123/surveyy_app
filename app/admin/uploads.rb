ActiveAdmin.register_page "Upload" do


    # Here is an example of a simple dashboard with columns and panels.
    #
    # columns do
    #   column do
    #     panel "Recent Posts" do
    #       ul do
    #         Post.recent(5).map do |post|
    #           li link_to(post.title, admin_post_path(post))
    #         end
    #       end
    #     end
    #   end

    #   column do
    #     panel "Info" do
    #       para "Welcome to ActiveAdmin."
    #     end
    #   end
    # end
# content

#  content do
#   form_for :dump, url: { action: :import_file }, html: { multipart: true } do |f|
#     f.file_field :file
#     f.submit 'Upload file'
#   end
# end

# page_action :import_file, method: :post do
#   file = params[:dump][:file]
#   if file.present? && file.content_type == "application/vnd.ms-excel"
#     xls = Roo::Excel.new(file.path)
#     xls.default_sheet = xls.sheets.first

#     # Start iteration from the second row (index 2) to skip header
#     (2..xls.last_row).each do |row_index|
#       row = xls.row(row_index)
      
#       Upload.create(
#         state: row[0],
#         ac_no: row[1],
#         ac_name: row[2],
#         candidate_name: row[3],
#         sex: row[4],
#         age: row[5],
#         category: row[6],
#         party: row[7],
#         symbol: row[8],
#         general: row[9],
#         postal: row[10],
#         total: row[11],
#         percent_votes_polled: row[12],
#         total_electors: row[13]
#       )
#     end

#     render json: { message: "File uploaded successfully" }, status: :ok
#   else
#     render json: { error: "Please upload a valid Excel file" }, status: :unprocessable_entity
#   end
# rescue StandardError => e
#   redirect_to({ action: :index }, flash: { error: "File import failed! #{e.message}" })
# end
  # app/admin/upload.rb

  content do
    form_for :dump, url: import_file_admin_uploads_path, html: { multipart: true } do |f|
      f.file_field :file
      f.submit 'Upload file'
    end
  end



end
