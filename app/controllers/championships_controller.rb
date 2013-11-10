class ChampionshipsController < ApplicationController

  
  def index
    @championships = Championships.all

    respond_to do |format|
      format.json { render json: @championships }
    end
  end


end
