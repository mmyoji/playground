class Web::ConfirmationsController < Web::BaseController
  # GET /confirmations
  def create
    token = params[:token]
    if User.find_by(confirmation_token: token)&.confirm!
      redirect_to root_url, notice: "Your email is confirmed successfully!"
    else
      redirect_to root_url, alert: "What the hell are you doing?!"
    end
  end
end
