# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2018_12_23_062758) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admin_users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["username"], name: "index_admin_users_on_username", unique: true
  end

  create_table "companies", force: :cascade do |t|
    t.string "name", null: false
    t.string "tel", null: false
    t.string "email", null: false
    t.text "address", null: false
    t.date "founded_at", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "staff_members", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["company_id"], name: "index_staff_members_on_company_id"
    t.index ["email"], name: "index_staff_members_on_email", unique: true
    t.index ["username"], name: "index_staff_members_on_username", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "username", limit: 32, null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "confirmation_token", null: false
    t.datetime "confirmed_at", precision: nil
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "staff_members", "companies"
end
