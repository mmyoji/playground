class Biz::SessionsController < Biz::BaseController
  skip_before_action :authenticate_user!, only: %i(new create)

  # GET /login
  def new
  end

  # POST /sessions
  def create
    staff_member = StaffMember.find_by(email: session_params[:email])
    if staff_member&.authenticate(session_params[:password])
      session[:staff_member_id] = staff_member.id.to_s
      redirect_to biz_root_url, notice: t("welcome")
    else
      flash.now[:alert] = t("invalid_login")
      render :new
    end
  end

  # DELETE /logout
  def destroy
    session.delete(:staff_member_id)
    redirect_to biz_login_url, notice: t("logout")
  end

  private

  def session_params
    params.require(:staff_member).permit(:email, :password)
  end
end
