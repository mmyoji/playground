require 'test_helper'

class Admin::CompaniesControllerTest < ActionDispatch::IntegrationTest
  setup do
    host! "admin.lvh.me"

    @company = companies(:three)

    admin_sign_in admin_users(:one)
  end

  test "GET #index returns 200" do
    get admin_companies_url
    assert_response :success
  end

  test "GET #show returns 200" do
    get admin_company_url(@company)
    assert_response :success
  end

  test "GET #show w/ invalid ID returns 404" do
    get admin_company_url(id: 1_000)
    assert_response :not_found
  end

  test "GET #new returns 200" do
    get new_admin_company_url
    assert_response :success
  end

  test "POST #create w/ valid params creates new Company" do
    params = {
      company: {
        name: "New Company",
        tel: "03-1111-1111",
        email: "new-company@example.com",
        address: "111-1111 Cyuoh, Tokyo",
        founded_at: "2000-03-20",
      }
    }

    assert_difference 'Company.count', 1 do
      post admin_companies_path, params: params
    end

    new_company = Company.last
    assert_equal params.dig(:company, :name), new_company.name
    assert_equal params.dig(:company, :tel), new_company.tel
    assert_equal params.dig(:company, :email), new_company.email
    assert_equal params.dig(:company, :address), new_company.address
    assert_equal params.dig(:company, :founded_at).to_date, new_company.founded_at

    assert_redirected_to admin_company_path(new_company)
  end

  test "POST #create w/ invalid params doesn't create new Company" do
    params = {
      company: {
        name: "New Company",
        tel: "03-1111-1111",
        email: "new-company@example.com",
        address: "",
        founded_at: "2000-03-20",
      }
    }

    assert_no_difference 'Company.count' do
      post admin_companies_path, params: params
    end

    assert_response :success
  end

  test "GET #edit returns 200" do
    get edit_admin_company_url(@company)
    assert_response :success
  end

  test "GET #edit w/ invalid ID returns 404" do
    get edit_admin_company_url(id: 1_000)
    assert_response :not_found
  end

  test "PATCH #update w/ valid params changes Company data" do
    params = {
      company: {
        name: "new-company-1",
      },
    }

    patch admin_company_url(@company), params: params

    assert_equal params.dig(:company, :name), @company.reload.name
    assert_redirected_to admin_company_path(@company)
  end

  test "PATCH #update w/ invalid params doesn't change Company data" do
    params = {
      company: {
        name: "",
      },
    }

    patch admin_company_url(@company), params: params

    refute_equal params.dig(:company, :name), @company.reload.name
    assert_response :success
  end

  test "DELETE #destroy destroys Company" do
    assert_difference "Company.count", -1 do
      delete admin_company_path(@company)
    end
    assert_redirected_to admin_companies_path
  end

  test "DELETE #destroy w/ invalid ID doesn't destroy Company" do
    assert_no_difference "Company.count" do
      delete admin_company_path(id: 1_000)
    end
    assert_response :not_found
  end
end
