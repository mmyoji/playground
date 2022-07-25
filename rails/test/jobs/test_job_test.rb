require 'test_helper'

class TestJobTest < ActiveJob::TestCase
  test "makes username downcase" do
    username = "HOW_IDIOT"
    user = User.create!(
      username: username,
      email: "howidiot@example.com",
      password: "passwd",
      password_confirmation: "passwd",
      confirmation_token: SecureRandom.urlsafe_base64,
    )
    TestJob.perform_now(username)

    assert_not_equal username, user.reload.username
    assert_equal "how_idiot", user.username
  end
end
