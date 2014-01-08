class BookmakersController < ApplicationController

  
  def index
    @bookmakers = Bookmaker.all

    respond_to do |format|
      format.json { render json: @bookmakers }
    end
  end

  private

  def bookmaker_params
    params.require(:championship).permit(:name, { :country_ids => [], :sport_ids => [] })
  end


end

