class Web::UsersController < Web::BaseController
  # GET /users/new
  def new
    @user = User.new
  end

  # POST /users
  def create
    @user = User.new(user_params)
    @user.assign_confirmation_token
    if @user.save
      UserMailer.with(user: @user).confirm.deliver_later
      redirect_to root_url, notice: "Your account is successfully created!"
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user)
      .permit(:username, :email, :password, :password_confirmation)
  end
end
