class Admin::SessionsController < Admin::BaseController
  skip_before_action :authenticate_user!, except: :destroy

  # GET /login
  def new
  end

  # POST /sessions
  def create
    admin_user = AdminUser.find_by(email: session_params[:email])
    if admin_user&.authenticate(session_params[:password])
      session[:admin_user_id] = admin_user.id.to_s
      redirect_to admin_root_url, notice: t("welcome")
    else
      flash.now[:alert] = t("invalid_login")
      render :new
    end
  end

  # DELETE /logout
  def destroy
    session.delete(:admin_user_id)
    redirect_to admin_login_url, notice: t("logout")
  end

  private

  def session_params
    params.require(:admin_user).permit(:email, :password)
  end
end
