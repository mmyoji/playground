require 'test_helper'

class Web::SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    host! "www.lvh.me"

    @user = users(:mmyoji)
  end

  test "GET /login returns 200" do
    get login_url
    assert_response :success
  end

  test "POST /sessions w/ valid params redirects to root" do
    params = {
      email:    @user.email,
      password: "password",
    }
    post sessions_url, params: { user: params }
    assert_redirected_to root_url
  end

  test "POST /sessions w/ invalid params renders login page" do
    params = {
      email:    @user.email,
      password: "",
    }
    post sessions_url, params: { user: params }
    assert_response :success
  end

  test "DELETE /logout redirects to root" do
    web_sign_in @user

    delete logout_url
    assert_redirected_to root_url
  end
end
