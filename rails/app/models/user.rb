class User < ApplicationRecord
  include EmailRegisterable

  # `length` limitation is for view styling
  validates :username, presence: true, uniqueness: true, length: { maximum: 16 }
  validates :confirmation_token, presence: true

  def assign_confirmation_token
    self.confirmation_token = SecureRandom.urlsafe_base64
  end

  def confirmed?
    confirmed_at?
  end

  def confirm!
    update!(confirmed_at: Time.current)
  end

  def update_confirmation_token!
    assign_confirmation_token
    self.confirmed_at = nil
    save!
    ::UserMailer.with(user: self).confirm.deliver_later
  end
end
