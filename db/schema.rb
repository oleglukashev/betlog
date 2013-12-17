# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20131217093647) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bookmakers", force: true do |t|
    t.string   "name",       null: false
    t.float    "rating",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "championships", force: true do |t|
    t.string   "name",       null: false
    t.integer  "country_id"
    t.integer  "sport_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "championships_users", id: false, force: true do |t|
    t.integer "championship_id"
    t.integer "user_id"
  end

  create_table "coefficients", force: true do |t|
    t.integer  "event_id"
    t.float    "first"
    t.float    "draw"
    t.float    "second"
    t.float    "first_or_draw"
    t.float    "first_or_second"
    t.float    "draw_or_second"
    t.float    "first_fora"
    t.float    "second_fora"
    t.float    "coeff_first_fora"
    t.float    "coeff_second_fora"
    t.float    "total_less"
    t.float    "total_more"
    t.float    "coeff_first_total"
    t.float    "coeff_second_total"
    t.integer  "bookmaker_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "countries", force: true do |t|
    t.string   "name",       null: false
    t.integer  "sport_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "events", force: true do |t|
    t.integer  "championship_id"
    t.string   "opponent_1",      null: false
    t.string   "opponent_2",      null: false
    t.datetime "date_event",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sports", force: true do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "login",                               null: false
    t.string   "name",                                null: false
    t.string   "role",               default: "user", null: false
    t.string   "crypted_password",                    null: false
    t.string   "password_salt",                       null: false
    t.string   "persistence_token",                   null: false
    t.integer  "login_count",        default: 0,      null: false
    t.integer  "failed_login_count", default: 0,      null: false
    t.datetime "last_request_at"
    t.datetime "current_login_at"
    t.datetime "last_login_at"
    t.string   "current_login_ip"
    t.string   "last_login_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["login"], name: "index_users_on_login", unique: true, using: :btree
  add_index "users", ["persistence_token"], name: "index_users_on_persistence_token", unique: true, using: :btree

end
