class TestJob < ApplicationJob
  queue_as :default

  def perform(username)
    user = User.find_by(username: username)
    return unless user
    user.update!(username: username.downcase)
  end
end
