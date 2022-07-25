class Company < ApplicationRecord
  has_many :staff_members
  # has_many :studios

  validates :name,       presence: true
  validates :tel,        presence: true
  validates :email,      presence: true
  validates :address,    presence: true
  validates :founded_at, presence: true
end
