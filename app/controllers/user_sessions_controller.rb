class UserSessionsController < ApplicationController
  def new
    @user_session = UserSession.new
  end

  def create
    @user_session = UserSession.new(params[:user_session])
    
    if @user_session.save
      respond_to do |format|
        format.json { render json: current_user, status: :ok }
      end
    else
      errors = {
        :login => Array(@user_session.errors[:login]).first,
        :pin => Array(@user_session.errors[:password]).first
      }
      
      respond_to do |format|
        #format.html { render action: "new" }
        format.json { render json: @user_session.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    current_user_session.destroy
    
    respond_to do |format|
      format.json { render json: { :status => 'ok' } }
    end
  end
end

