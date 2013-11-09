class SportsController < ApplicationController

  
  def index
    @sports = Sports.all

    respond_to do |format|
      format.json { render json: @sports }
    end
  end


end
