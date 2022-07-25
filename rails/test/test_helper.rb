ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

require "sidekiq/testing"

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  private

  def admin_sign_in(user, password = "password")
    post \
      admin_sessions_url,
      params: {
        admin_user: {
          email: user.email,
          password: password,
        }
      }
  end

  def biz_sign_in(user, password = "password")
    post \
      biz_sessions_url,
      params: {
        staff_member: {
          email: user.email,
          password: password,
        }
      }
  end

  def web_sign_in(user, password = "password")
    post \
      sessions_url,
      params: {
        user: {
          email: user.email,
          password: password,
        }
      }
  end
end
