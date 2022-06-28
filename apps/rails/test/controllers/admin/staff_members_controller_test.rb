require 'test_helper'

class Admin::StaffMembersControllerTest < ActionDispatch::IntegrationTest
  setup do
    host! "admin.lvh.me"

    @staff_member = staff_members(:one)

    admin_sign_in admin_users(:one)
  end

  test "GET #index" do
    get admin_staff_members_url
    assert_response :success
  end

  test "GET #show w/ valid :id" do
    get admin_staff_member_url(@staff_member)
    assert_response :success
  end

  test "GET #show w/ invalid :id" do
    get admin_staff_member_url(id: @staff_member.id + 100)
    assert_response :not_found
  end

  test "GET #edit" do
    get edit_admin_staff_member_url(@staff_member)
    assert_response :success
  end

  test "PATCH #update w/ valid params" do
    params = {
      username: "ababab",
    }

    patch \
      admin_staff_member_url(@staff_member),
      params: { staff_member: params }

    assert_equal "ababab", @staff_member.reload.username
    assert_redirected_to admin_staff_member_path(@staff_member)
  end

  test "PATCH #update w/ invalid params" do
    params = {
      username: "",
    }
    patch \
      admin_staff_member_url(@staff_member),
      params: { staff_member: params }

    refute_equal "", @staff_member.reload.username
    assert_response :success
  end

  test "DELETE #destroy w/ valid :id" do
    id = @staff_member.id
    delete admin_staff_member_url(@staff_member)

    assert_nil StaffMember.find_by(id: id)
    assert_redirected_to admin_staff_members_path
  end

  test "DELETE #destroy w/ invalid :id" do
    id = @staff_member.id + 100
    delete admin_staff_member_url(id: id)
    assert_response :not_found
  end
end
