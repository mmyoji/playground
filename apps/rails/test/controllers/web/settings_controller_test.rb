require 'test_helper'

class Web::SettingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    host! "www.lvh.me"

    @user = users(:mmyoji)
    @user_params = {
      username: "mmyoji-2",
      email: "mmyoji-2@example.com",
      password: "",
      password_confirmation: "",
    }
  end

  ### GET /setting ###

  test "GET /setting returns 200 w/ logged-in user" do
    web_sign_in @user

    get edit_setting_url
    assert_response :success
  end

  test "GET /setting returns 302 w/o logged-in user" do
    get edit_setting_url
    assert_response :found
  end

  ### PATCH /setting ###

  test "PATCH /setting w/ valid params but w/o logged-in user returns 302" do
    patch setting_url, params: { user: @user_params.dup }

    refute_equal @user.reload.username, @user_params.fetch(:username)
    assert_response :found
  end

  test "PATCH /setting w/ valid params returns 302" do
    @user.confirm!
    web_sign_in @user

    ex_token = @user.confirmation_token.dup

    patch setting_url, params: { user: @user_params.dup }
    assert_equal @user.reload.username, @user_params.fetch(:username)
    assert_equal @user.email, @user_params.fetch(:email)
    refute_equal @user.confirmation_token, ex_token
    assert_nil @user.confirmed_at
    assert_response :found
  end

  test "PATCH /setting w/ valid params but email not changed returns 302" do
    web_sign_in @user

    ex_email = @user.email.dup
    ex_token = @user.confirmation_token.dup

    patch setting_url, params: { user: @user_params.dup.merge(email: @user.email) }
    assert_equal @user.reload.username, @user_params.fetch(:username)
    assert_equal @user.email, ex_email
    assert_equal @user.confirmation_token, ex_token

    assert_response :found
  end


  test "PATCH /setting w/ invalid params returns 200" do
    web_sign_in @user

    patch setting_url, params: { user: @user_params.dup.merge(email: "") }
    refute_equal @user.reload.username, @user_params.fetch(:username)
    refute_equal @user.email, ""

    assert_response :success
  end
end
