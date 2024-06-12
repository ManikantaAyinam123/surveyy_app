class UploadsController < ApplicationController
   # skip_before_action :verify_authenticity_token, only: :create
   def index

    uploads = Upload.all
     if params[:constituency].present?
      uploads = uploads.where(constituency: params[:constituency])
     end
  
      if params[:booth_name].present? 
    uploads = uploads.where(booth_name: params[:booth_name])
  end
     
    
    
    uploads = uploads.order(:id)
    render json: uploads
  end

  
   def update
    upload = Upload.find(params[:id])
    if upload.update(upload_params)
      render json: upload
    else
      render json: { error: upload.errors.full_messages }, status: :unprocessable_entity
    end
  end

   def show
    upload = Upload.find(params[:id])
    render json: upload
    escue ActiveRecord::RecordNotFound
    render json: { error: "Voter not found" }, status: :not_found
  end
  def filter_casted_status
    casted_param = params[:casted]
    if casted_param.nil?
      render json: { error: "Please provide a 'casted' parameter with a value of true or false." }, status: :bad_request
      return
    end
   casted_value = ActiveModel::Type::Boolean.new.cast(casted_param)
  voters = Upload.where(casted: casted_value).order(id: :asc)

     render json: {
    voters: voters,
    
  }
  end

  

    def search_by_name
    voter_name = params[:voter_name]
    uploads = Upload.where("voter_name ILIKE ?", "%#{voter_name}%")
    render json: uploads
  end

def import_file
    file = params[:dump][:file]
    if file.present? && file.content_type == "application/vnd.ms-excel"
      xls = Roo::Excel.new(file.path)
      xls.default_sheet = xls.sheets.first

      # Start iteration from the second row (index 2) to skip header
      (2..xls.last_row).each do |row_index|
        row = xls.row(row_index)
        
        Upload.create(
          voter_name: row[0],
          age: row[1],
          sex: row[2],
          state: row[3],
          constituency: row[4],
          casted: row[5].present? ? ActiveModel::Type::Boolean.new.cast(row[5]) : false,  
          party: row[6],
          figured_by: row[7],
          booth_name: row[8]
        )
      end

      render json: { message: "File uploaded successfully" }, status: :ok
    else
      render json: { error: "Please upload a valid Excel file" }, status: :unprocessable_entity
    end
  rescue StandardError => e
    render json: { error: "File import failed! #{e.message}" }, status: :unprocessable_entity
  end

   private

  def upload_params
    params.require(:upload).permit(:voter_name, :age, :sex, :state, :constituency, :casted, :party, :figured_by)
  end

end

