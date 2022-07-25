class StaffMember < ApplicationRecord
  include EmailRegisterable

  belongs_to :company

  validates :username, presence: true, uniqueness: true, length: { maximum: 16 }

  # @return [String]
  def generate_random_password
    password = SecureRandom.hex(4)
    self.password = self.password_confirmation = password
  end
end
