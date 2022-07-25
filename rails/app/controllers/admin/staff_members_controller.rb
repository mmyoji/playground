class Admin::StaffMembersController < Admin::BaseController
  # GET /staff_members
  def index
    @staff_members = StaffMember.includes(:company).order(id: :desc)
  end

  # GET /staff_members/:id
  def show
    @staff_member = StaffMember.find(params[:id])
  end

  # GET /staff_members/:id/edit
  def edit
    @staff_member = StaffMember.find(params[:id])
    @company_collection = load_company_collection
  end

  # PATCH /staff_members/:id
  def update
    @staff_member = StaffMember.find(params[:id])
    if @staff_member.update(staff_member_params)
      redirect_to admin_staff_member_path(@staff_member), notice: t("updated")
    else
      @company_collection = load_company_collection
      render :edit
    end
  end

  # DELETE /staff_members/:id
  def destroy
    StaffMember.destroy(params[:id])
    redirect_to admin_staff_members_path, notice: t("deleted")
  end

  private

  def load_company_collection
    Company.all.map { |c| [c.name, c.id] }
  end

  def staff_member_params
    params.require(:staff_member).permit(:company_id, :username, :email)
  end
end
