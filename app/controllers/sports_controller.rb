class SportsController < ApplicationController

  
  def index
    @sports = Sport.all

    respond_to do |format|
      format.json { render json: @sports }
    end
  end


end
