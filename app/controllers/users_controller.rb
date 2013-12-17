class UsersController < ApplicationController
  
  def create
    if ( params[:password] )
      params[:password_confirmation] = params[:password]
    end

    @user = User.new( user_params )

    respond_to do |format|
    	if @user.save
    		flash[:notice] = "Account registered!"
        user = {
          :id => @user.id,
          :login => @user.login,
          :name => @user.name
        }

  	    format.json { render :json => { :status => :ok, :user => user } }
    	else
    		errors = {
    			:login => Array(@user.errors[:login]).first,
    			:name => Array(@user.errors[:name]).first,
          :password => Array(@user.errors[:password]).first
    		}
  	    format.json { render :json => { :status => :unprocessable_entity, :errors => errors } }
    	end
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

  private

  def user_params
    params.require(:user).permit(:login, :name, :role)
      .merge(:password => params[:password])
      .merge(:password_confirmation => params[:password_confirmation])
  end
end
