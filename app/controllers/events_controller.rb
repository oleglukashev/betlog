class EventsController < ApplicationController

  
  def index
    @events = Events.all

    respond_to do |format|
      format.json { render json: @events }
    end
  end


end
