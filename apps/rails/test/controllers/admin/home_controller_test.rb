require 'test_helper'

class Admin::HomeControllerTest < ActionDispatch::IntegrationTest
  setup do
    host! "admin.lvh.me"

    @admin_user = admin_users(:one)
  end

  test "GET #index requires login" do
    get admin_root_url
    assert_redirected_to admin_login_url
  end

  test "GET #index is successful when logged in" do
    admin_sign_in @admin_user

    get admin_root_url
    assert_response :success
  end
end
