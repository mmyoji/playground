require 'test_helper'

class UserMailerTest < ActionMailer::TestCase
  setup do
    @user = users(:mmyoji)
  end

  test "#confirm sends confirmation mail" do
    email = UserMailer.with(user: @user).confirm
    assert_emails 1 do
      email.deliver_now
    end
    assert_equal ["rails-pg@example.com"], email.from
    assert_equal [@user.email], email.to
  end
end
