require 'test_helper'

class Admin::Companies::StaffMembersControllerTest < ActionDispatch::IntegrationTest
  setup do
    host! "admin.lvh.me"

    @company = companies(:one)

    admin_sign_in admin_users(:one)
  end

  test "GET #new w/ valid :company_id" do
    get new_admin_company_staff_member_url(company_id: @company.id)
    assert_response :success
  end

  test "GET #new w/ invalid :company_id" do
    get new_admin_company_staff_member_url(company_id: @company.id + 100)
    assert_response :success
  end

  test "POST #create w/ valid params" do
    params = {
      username: "aaa",
      email: "aaa@example.com",
    }

    assert_difference "StaffMember.count", 1 do
      post \
        admin_company_staff_members_url(company_id: @company.id),
        params: { staff_member: params }
    end

    assert_redirected_to admin_staff_member_path(StaffMember.last)
  end

  test "POST #create w/ invalid params" do
    params = {
      username: "",
      email: "aaa@example.com",
    }

    assert_no_difference "StaffMember.count" do
      post \
        admin_company_staff_members_url(company_id: @company.id),
        params: { staff_member: params }
    end

    assert_response :success
  end

  test "POST #create w/ invalid :company_id" do
    params = {
      username: "bbb",
      email: "bbb@example.com",
    }

    assert_no_difference "StaffMember.count" do
      post \
        admin_company_staff_members_url(company_id: @company.id + 100),
        params: { staff_member: params }
    end

    assert_response :success
  end
end
