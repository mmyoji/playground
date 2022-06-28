require 'test_helper'

class Web::ConfirmationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    host! "www.lvh.me"

    @user = users(:mmyoji)
    @user.update!(confirmation_token: SecureRandom.urlsafe_base64)
  end

  test "GET #confirmations redirects to root_url" do
    get confirmations_url(token: @user.confirmation_token)

    assert_redirected_to root_url
  end
end
