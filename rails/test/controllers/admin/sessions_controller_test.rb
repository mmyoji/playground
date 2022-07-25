require 'test_helper'

class Admin::SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    host! "admin.lvh.me"

    @admin_user = admin_users(:one)
  end

  test "GET /login returns 200" do
    get admin_login_url
    assert_response :success
  end

  test "POST /sessions w/ valid params redirects to root" do
    params = {
      email:    @admin_user.email,
      password: "password",
    }
    post admin_sessions_url, params: { admin_user: params }
    assert_redirected_to admin_root_url
  end

  test "POST /sessions w/ invalid params renders login page" do
    params = {
      email:    @admin_user.email,
      password: "",
    }
    post admin_sessions_url, params: { admin_user: params }
    assert_response :success
  end

  test "DELETE /logout redirects to login page" do
    admin_sign_in @admin_user

    delete admin_logout_url
    assert_redirected_to admin_login_url
  end
end
