class ManagedLeaguesController < ApplicationController

  def index
    @managed_leagues = current_user.championships.all

    respond_to do |format|
      format.json { render json: @managed_leagues }
    end
  end

  def create
    current_user.championships << Championship.find(params[:championship_id])

    respond_to do |format|
      format.json { render status: :ok }
    end
  end

end