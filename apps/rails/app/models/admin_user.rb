class AdminUser < ApplicationRecord
  include EmailRegisterable

  validates :username, presence: true, uniqueness: true, length: { maximum: 16 }
end
