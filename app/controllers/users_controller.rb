class UsersController < ApplicationController
  
  def create
  	@user = Users.new( params[:user] )

  	if user.save
  		flash[:notice] = "Account registered!"
	    format.json { render :json => {:status => 'created'} }
  	else
  		errors = {
  			:login => Array(@user.errors[:login]).first,
  			:name => Array(@user.errors[:name]).first,
        :password => Array(@user.errors[:password]).first
  		}
	    format.json { render :json => {:errors => errors} }
  	end
  end
  
  def user_exists
  	login = params[:login]

    user = User.find_by_login login

    if user
      render :json => user.id, :status => :ok
    else
    	render :json => false, :status => 'not_found'
    end
  end
end
