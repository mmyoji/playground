require 'test_helper'

class Web::ResendConfirmationEmailsControllerTest < ActionDispatch::IntegrationTest
  setup do
    host! "www.lvh.me"

    @user = users(:mmyoji)

    web_sign_in @user
  end

  test "GET /resend_confirmation_email/new" do
    get new_resend_confirmation_email_url
    assert_response :success
  end

  test "POST /resend_confirmation_email" do
    token = @user.confirmation_token.dup
    post resend_confirmation_email_url
    assert_response :found

    refute_equal @user.reload.confirmation_token, token
  end
end
