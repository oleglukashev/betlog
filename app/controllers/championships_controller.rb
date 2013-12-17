class ChampionshipsController < ApplicationController

  
  def index
    @championships = Championship.all

    respond_to do |format|
      format.json { render json: @championships }
    end
  end

  private

  def championship_params
    params.require(:championship).permit(:name, { :country_ids => [], :sport_ids => [] })
  end


end
