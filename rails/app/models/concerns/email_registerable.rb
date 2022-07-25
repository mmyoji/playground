module EmailRegisterable
  extend ActiveSupport::Concern

  EMAIL_REGEXP = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i.freeze

  included do
    has_secure_password

    validates :email, presence: true, uniqueness: true, format: { with: EMAIL_REGEXP }
  end
end
