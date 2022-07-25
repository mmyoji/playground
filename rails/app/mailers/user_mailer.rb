class UserMailer < ApplicationMailer
  default from: "rails-pg@example.com"

  def confirm
    @user = params[:user]
    mail to: @user.email, subject: "Confirm your email address"
  end
end
