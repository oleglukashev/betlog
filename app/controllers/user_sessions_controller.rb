class UserSessionsController < ApplicationController
  
  def get_current_user
    respond_to do |format|
      if current_user
        @current_user_info = {
          :login => current_user[:login],
          :name => current_user[:name]
        }

        format.json { render json: @current_user_info, status: :ok }
      else
        format.json { render json: { status: :unprocessable_entity } }
      end
    end 
  end

  def new
    @user_session = UserSession.new
  end

  def create
    @user_session = UserSession.new(params[:user_session])
    
    respond_to do |format|
      if @user_session.save

        @current_user_info = {
          :login => current_user[:login],
          :name => current_user[:name]
        }
        
        format.json { render json: @current_user_info, status: :ok }
      else
        format.json { render json: @user_session.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    current_user_session.destroy
    
    respond_to do |format|
      format.json { render json: { :status => :ok } }
    end
  end
end

