class Biz::BaseController < ApplicationController
  layout "biz/application"

  helper_method :current_user

  before_action :authenticate_user!

  rescue_from ActiveRecord::RecordNotFound do |e|
    render \
      template: "errors/error_404",
      locals: { message: e.message },
      status: 404
  end

  def current_user
    @_current_user ||=
      StaffMember.find(session[:staff_member_id]) if session[:staff_member_id]
  end

  def authenticate_user!
    return if current_user

    redirect_to biz_login_url and return
  end
end
