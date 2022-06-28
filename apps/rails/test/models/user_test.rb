require 'test_helper'

class UserTest < ActiveSupport::TestCase
  setup do
    @user = users(:mmyoji)
    @params = {
      username:              "sample-user",
      email:                 "sample-user@example.com",
      password:              "password",
      password_confirmation: "password",
      confirmation_token:    SecureRandom.urlsafe_base64,
    }
  end

  test "username must be present, unique and <= 16" do
    user = User.new(@params)
    assert user.valid?

    user.username = ""
    refute user.valid?

    user.username = @user.username.dup
    refute user.valid?

    user.username = "a" * 16
    assert user.valid?

    user.username = "a" * 17
    refute user.valid?
  end

  test "email must be present, unique and in valid format" do
    user = User.new(@params)

    user.email = ""
    refute user.valid?

    user.email = @user.email.dup
    refute user.valid?

    [
      "foo.com",
      "foo@",
      "@example.com",
      "@",
      "これは@不正です.com",
    ].each do |invalid_email|
      user.email = invalid_email
      refute user.valid?
    end
  end

  test "password and password_confirmation must be present and the same" do
    user = User.new(@params.merge(password: ""))
    refute user.valid?

    user = User.new(@params.merge(password_confirmation: ""))
    refute user.valid?

    user = User.new(@params.merge(password_confirmation: "wrong-password"))
    refute user.valid?

    real_pswd = "ep<[k^]a3A]hhe9+y5U{]dmh;PD[F&p&"
    user = User.new(@params.merge(password: real_pswd, password_confirmation: real_pswd))
    assert user.valid?
  end

  test "confirmation_token must be present" do
    user = User.new(@params.merge(confirmation_token: nil))
    refute user.valid?

    user.confirmation_token = SecureRandom.urlsafe_base64
    assert user.valid?
  end

  test "#assign_confirmation_token always set a new confirmation_token" do
    token1 = @user.confirmation_token.dup
    @user.assign_confirmation_token
    refute_equal @user.confirmation_token, token1

    token2 = @user.confirmation_token.dup
    @user.assign_confirmation_token
    refute_equal @user.confirmation_token, token2
  end

  test "#confirmed?" do
    @user.confirmed_at = nil
    refute @user.confirmed?

    @user.confirmed_at = Time.current
    assert @user.confirmed?
  end

  test "#confirm! updates confirmed_at" do
    refute @user.confirmed_at?

    @user.confirm!
    assert @user.confirmed_at?
  end

  test "#update_confirmation_token! updates confirmation columns" do
    @user.confirm!
    ex_token = @user.confirmation_token.dup
    Sidekiq::Queues.clear_all

    @user.update_confirmation_token!

    refute_equal ex_token, @user.reload.confirmation_token
    assert_nil @user.confirmed_at
    assert_equal 1, Sidekiq::Queues["default"].size

    Sidekiq::Queues.clear_all
  end
end
