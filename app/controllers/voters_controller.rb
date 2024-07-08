class VotersController < ApplicationController
   before_action :authorize_request, except:[:import_file]
    load_and_authorize_resource
   skip_load_and_authorize_resource :only => :import_file
  def index
        voters= Voter.all
         if params[:constituency].present?
          voters = voters.where(constituency: params[:constituency])
         end
         if params[:booth_name].present? 
           voters = voters.where(booth_name: params[:booth_name])
         end
        voters = voters.order(id: :asc).paginate(page: params[:page], per_page:5)
        total_count = voters.count,
        per_page = 5,
        ratio = (voters.count.to_f/per_page).ceil
       render json: {
        voters: voters,
        total_pages:ratio
      }
  end

  def show
    voter = Voter.find(params[:id])
    render json: voter
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Voter not found" }, status: :not_found
  end

def search_by_name
  voter_name = params[:voter_name]
   if voter_name.blank?
    render json: { error: "Please provide a 'voter_name' parameter." }, status: :bad_request
    return
   end
   voters = Voter.all
   if params[:constituency].present?
    voters = voters.where(constituency: params[:constituency])
   end
   if params[:booth_name].present? 
    voters = voters.where(booth_name: params[:booth_name])
   end

    voters = voters.where("voter_name ILIKE ?", "%#{voter_name}%")
    render json: voters
 end

  def search_by_constituency
    constituency = params[:constituency].downcase
    constituencies = Voter.where("Lower(constituency) LIKE ?", "%#{constituency}%").distinct.pluck(:constituency)
    render json: constituencies
  end

  def search_by_booth_name
    booth_name = params[:booth_name].downcase
    boothNames =Voter.where("Lower(booth_name) LIKE ?","%#{booth_name}%").distinct.pluck(:booth_name)
    render json: boothNames
    # binding.pry
   end 

  def update
    voter = Voter.find(params[:id])
    if voter.update(voter_params)
      render json: voter
    else
      render json: { error: voter.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Voter not found" }, status: :not_found
  end
 
  def filter_casted_status  
  casted_param = params[:casted]
  if casted_param.nil?
    render json: { error: "Please provide a 'casted' parameter with a value of true or false." }, status: :bad_request
    return
  end

  casted_value = ActiveModel::Type::Boolean.new.cast(casted_param)

  voters = Voter.all 

  if params[:constituency].present?
    voters = voters.where(constituency: params[:constituency])
  end

  if params[:booth_name].present? 
    voters = voters.where(booth_name: params[:booth_name])
  end

  voters = voters.where(casted: casted_value).order(id: :asc).paginate(page: params[:page], per_page: 3)
  
  per_page = 3
  total_pages = (voters.total_entries.to_f / per_page).ceil

  render json: {
    voters: voters,
    total_pages: total_pages
  }
end




# def import_file
#     file = params[:dump][:file]
#     if file.present? && file.content_type == "application/vnd.ms-excel"
#       xls = Roo::Excel.new(file.path)
#       xls.default_sheet = xls.sheets.first

#       # Start iteration from the second row (index 2) to skip header
#       (2..xls.last_row).each do |row_index|
#         row = xls.row(row_index)
        
#         Voter.create(
#           voter_name: row[0],
#           age: row[1],
#           gender: row[2],
#           house_number: row[3],
#           mobile_number: row[4],
#           booth_name: row[5],
#           casted: row[6].present? ? ActiveModel::Type::Boolean.new.cast(row[6]) : false,  
#           figured_by: row[7],
          
#         )
#       end

#       render json: { message: "File uploaded successfully" }, status: :ok
#     else
#       render json: { error: "Please upload a valid Excel file" }, status: :unprocessable_entity
#     end
#   rescue StandardError => e
#     render json: { error: "File import failed! #{e.message}" }, status: :unprocessable_entity
#   end

#    private

#   def voter_params
#     params.require(:voter).permit(:voter_name, :age, :gender, :house_number, :mobile_number, :booth_name, :casted, :figured_by)
#   end
#  end


def import_file
  file = params[:dump][:file]
  if file.present? && file.content_type == "application/vnd.ms-excel"
    xls = Roo::Excel.new(file.path)
    xls.default_sheet = xls.sheets.first

    successful_upload_count = 0
    rejected_records =0

   
    (2..xls.last_row).each do |row_index|
      row = xls.row(row_index)
      
      voter_name = row[0]
      age = row[1]
      gender = row[2]
      house_number = row[3]
      mobile_number = row[4]
      booth_name = row[5]
      casted = row[6].present? ? ActiveModel::Type::Boolean.new.cast(row[6]) : false
      party =row[7]
      figured_by = row[8]
      
     
      existing_voter = Voter.find_by(voter_name: voter_name, booth_name: booth_name)
      
      if existing_voter.nil?
        Voter.create(
          voter_name: voter_name,
          age: age,
          gender: gender,
          house_number: house_number,
          mobile_number: mobile_number,
          booth_name: booth_name,
          casted: casted,
          party: party,
          figured_by: figured_by
          
        )
            successful_upload_count +=1
       else
            rejected_records +=1
       end
      end
             flash[:notice] = "File uploaded successfully.<br>Total records uploaded successfully: #{successful_upload_count}.<br>Total records failed upload: #{rejected_records}".html_safe
        redirect_to admin_voter_path
            # render json: { message: "File uploaded successfully",Total_records_uploaded_sucessfully:successful_upload_count,Rejected_record:rejected_records }, status: :ok
        # redirect_to({ action: :index }, flash: { notice: "File uploaded successfully. Total records uploaded successfully: #{successful_upload_count}. Rejected records: #{rejected_records}" })
      else
        # render json: { error: "Please upload a valid Excel file" }, status: :unprocessable_entity
        flash[:error] = "Please upload a valid Excel file.".html_safe
        redirect_to admin_voter_path
      end
    rescue StandardError => e
      # render json: { error: "File import failed! #{e.message}" }, status: :unprocessable_entity
        flash[:error] = "File import failed! #{e.message}".html_safe
      redirect_to admin_voter_path
    end

    private

    def voter_params
      params.require(:voter).permit(:voter_name, :age, :gender, :house_number, :mobile_number, :booth_name, :casted,:party, :figured_by)
    end
end
# def import_file
#   file = params[:dump][:file]
#   if file.present? && file.content_type == "application/vnd.ms-excel"
#     xls = Roo::Excel.new(file.path)
#     xls.default_sheet = xls.sheets.first

#     successful_upload_count = 0
#     rejected_records = 0

#     (2..xls.last_row).each do |row_index|
#       row = xls.row(row_index)
      
#       voter_name = row[0]
#       age = row[1]
#       gender = row[2]
#       house_number = row[3]
#       mobile_number = row[4]
#       booth_name = row[5]
#       casted = row[6].present? ? ActiveModel::Type::Boolean.new.cast(row[6]) : false
#       figured_by = row[7]
      
#       existing_voter = Voter.find_by(voter_name: voter_name, booth_name: booth_name)
      
#       if existing_voter.nil?
#         Voter.create(
#           voter_name: voter_name,
#           age: age,
#           gender: gender,
#           house_number: house_number,
#           mobile_number: mobile_number,
#           booth_name: booth_name,
#           casted: casted,
#           figured_by: figured_by
#         )
#         successful_upload_count += 1
#       else
#         rejected_records += 1
#       end
#     end

#     redirect_to({ action: :index }, flash: { notice: "File uploaded successfully. Total records uploaded successfully: #{successful_upload_count}. Rejected records: #{rejected_records}" })
#   else
#     redirect_to({ action: :index }, flash: { error: "Please upload a valid Excel file" })
#   end
# rescue StandardError => e
#   redirect_to({ action: :index }, flash: { error: "File import failed! #{e.message}" })
# end
# end


