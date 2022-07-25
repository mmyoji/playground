class Admin::BaseController < ApplicationController
  layout "admin/application"

  helper_method :current_user

  before_action :authenticate_user!

  rescue_from ActiveRecord::RecordNotFound do |e|
    render \
      template: "errors/error_404",
      locals: { message: e.message },
      status: 404
  end

  def current_user
    @_current_user ||= AdminUser.find(session[:admin_user_id]) if session[:admin_user_id]
  end

  def authenticate_user!
    return if current_user

    redirect_to admin_login_url and return
  end
end
