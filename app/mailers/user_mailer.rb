class UserMailer < ActionMailer::Base
  default from: 'notifications@betlog.net'
 
  def welcome_email(user)
    @user = user
    @url  = 'http://betlog.net'
    mail(to: @user.email, subject: 'Добро пожаловать на сайт betlog.net')
  end
end