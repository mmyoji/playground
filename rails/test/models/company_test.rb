require 'test_helper'

class CompanyTest < ActiveSupport::TestCase
  setup do
    @company = companies(:one)
  end

  test ":name must be present" do
    [nil, ""].each do |val|
      @company.name = val
      refute @company.valid?
      @company.errors.clear
    end
  end

  test ":tel must be present" do
    [nil, ""].each do |val|
      @company.tel = val
      refute @company.valid?
      @company.errors.clear
    end
  end

  test ":email must be present" do
    [nil, ""].each do |val|
      @company.email = val
      refute @company.valid?
      @company.errors.clear
    end
  end

  test ":address must be present" do
    [nil, ""].each do |val|
      @company.address = val
      refute @company.valid?
      @company.errors.clear
    end
  end

  test ":founded_at must be present" do
    [nil, ""].each do |val|
      @company.founded_at = val
      refute @company.valid?
      @company.errors.clear
    end
  end
end
