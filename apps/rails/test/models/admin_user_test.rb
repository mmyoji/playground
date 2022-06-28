require 'test_helper'

class AdminUserTest < ActiveSupport::TestCase
  setup do
    @admin_user = admin_users(:one)
    @params = {
      username:              "sample-user",
      email:                 "sample-user@example.com",
      password:              "password",
      password_confirmation: "password",
    }
  end

  test "username must be present, unique and <= 16" do
    admin_user = AdminUser.new(@params)
    assert admin_user.valid?

    admin_user.username = ""
    refute admin_user.valid?

    admin_user.username = @admin_user.username.dup
    refute admin_user.valid?

    admin_user.username = "a" * 16
    assert admin_user.valid?

    admin_user.username = "a" * 17
    refute admin_user.valid?
  end
end
