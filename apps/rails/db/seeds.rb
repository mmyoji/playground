# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

(1..3).to_a.each do |i|
  User.find_or_create_by(username: "test-#{i}") do |u|
    u.email              = "test#{i}@example.com"
    u.password_digest    = BCrypt::Password.create("password")
    u.confirmation_token = SecureRandom.urlsafe_base64
  end
end

(1..3).to_a.each do |i|
  Company.find_or_create_by(name: "company-#{i}") do |c|
    c.tel        = "03-xxxx-xxxx"
    c.email      = "company#{i}@example.com"
    c.address    = "xxx-xxxx Shibuya, Tokyo"
    c.founded_at = Time.zone.local(2018, 4, i).to_date
  end
end
