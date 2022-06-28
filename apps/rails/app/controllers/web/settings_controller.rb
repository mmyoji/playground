class Web::SettingsController < Web::BaseController
  before_action :authenticate_user!, only: %i(edit update)

  # GET /setting
  def edit
  end

  # PUT   /setting
  # PATCH /setting
  def update
    current_user.assign_attributes(user_params)
    if current_user.valid?
      if current_user.will_save_change_to_email?
        current_user.update_confirmation_token!
      else
        current_user.save!
      end
      redirect_to edit_setting_path, notice: "Successfully updated!"
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user)
      .permit(:username, :email, :password, :password_confirmation)
  end
end
