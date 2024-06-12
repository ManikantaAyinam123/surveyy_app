class User < ApplicationRecord
	
	  has_secure_password
 EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, uniqueness: true, format: { with: EMAIL_REGEX }
  #  validates :password, presence: true, length: { minimum: 4}
  # validates :password_confirmation, presence: true
 

  # attr_accessor :confirmnew_password
  before_save :store_plaintext_password

  # def passwords_match
  #   errors.add(:password_confirmation, "doesn't match Password") if password != password_confirmation
  # end
  #   def self.ransackable_attributes(auth_object = nil)
  #   ["created_at", "email", "id", "id_value", "password_digest", "plaintext_password", "updated_at", "user_type", "username"]
  # end

  #   def self.ransackable_attributes(auth_object = nil)
  #   ["created_at", "email", "id", "id_value","password","password_confirmation","updated_at", "user_type", "username","plaintext_password"]
  # end

  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "email", "id", "id_value", "password_digest", "plaintext_password", "updated_at", "user_type", "username"]
  end
  private

  def store_plaintext_password
    self.plaintext_password = password if password.present?
  end

  # def volunteer?
  #   user_type == 'volunteer'
  # end

  # def lead?
  #   user_type == 'lead'
  # end

  # def admin?
  #   user_type == 'admin'
  # end
end
