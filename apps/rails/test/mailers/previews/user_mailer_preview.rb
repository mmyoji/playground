# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def confirm
    user = User.find_by!(username: "mmyoji")
    UserMailer.with(user: user).confirm
  end
end
