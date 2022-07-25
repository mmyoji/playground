require 'test_helper'

class StaffMemberTest < ActiveSupport::TestCase
  setup do
    @staff_member = staff_members(:one)
    @params = {
      username:              "sample-staff",
      email:                 "sample-staff@example.com",
      password:              "password",
      password_confirmation: "password",
      company_id:            @staff_member.company_id,
    }
  end

  test "username must be present" do
    [nil, ""].each do |val|
      @staff_member.username = val
      refute @staff_member.valid?
      @staff_member.errors.clear
    end
  end

  test "username must be unique" do
    staff_member = StaffMember.new(
      @params.merge(username: @staff_member.username)
    )
    refute staff_member.valid?
  end

  test "username must be <= 16" do
    @staff_member.username = "a" * 17
    refute @staff_member.valid?
  end

  test "#generate_random_password sets password and returns generated password" do
    staff_member = StaffMember.new(
      username: "test-1",
      email: "test-1@example.com",
      company: @staff_member.company,
    )
    password = staff_member.generate_random_password
    assert password.is_a?(String)
    assert_equal 8, password.size
    assert staff_member.valid?
  end
end
