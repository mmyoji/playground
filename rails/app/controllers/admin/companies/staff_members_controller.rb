class Admin::Companies::StaffMembersController < Admin::BaseController
  # GET /companies/:company_id/staff_members/new
  def new
    @staff_member = StaffMember.new(company_id: params[:company_id])
  end

  # POST /companies/:company_id/staff_members
  def create
    @staff_member = StaffMember.new(
      staff_member_params.merge(company_id: params[:company_id])
    )
    password = @staff_member.generate_random_password
    if @staff_member.save
      redirect_to admin_staff_member_path(@staff_member), notice: "Created: password=#{password}"
    else
      render :new
    end
  end

  private

  def staff_member_params
    params.require(:staff_member).permit(:username, :email)
  end
end
