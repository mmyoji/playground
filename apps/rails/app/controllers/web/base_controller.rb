class Web::BaseController < ApplicationController
  layout "web/application"

  helper_method :current_user

  def current_user
    @_current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def authenticate_user!
    return if current_user

    redirect_to login_url and return
  end
end
