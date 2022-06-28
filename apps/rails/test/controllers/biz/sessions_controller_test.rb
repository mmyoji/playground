require 'test_helper'

class Biz::SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    host! "biz.lvh.me"

    @staff_member = staff_members(:one)
  end

  test "GET /login returns 200" do
    get biz_login_url
    assert_response :success
  end

  test "POST /sessions w/ valid params redirects to root" do
    params = {
      email:    @staff_member.email,
      password: "password",
    }
    post biz_sessions_url, params: { staff_member: params }
    assert_redirected_to biz_root_url
  end

  test "POST /sessions w/ invalid params renders login page" do
    params = {
      email:    @staff_member.email,
      password: "",
    }
    post biz_sessions_url, params: { staff_member: params }
    assert_response :success
  end

  test "DELETE /logout redirects to login page" do
    biz_sign_in @staff_member

    delete biz_logout_url
    assert_redirected_to biz_login_url
  end
end
