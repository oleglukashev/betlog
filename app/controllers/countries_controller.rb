class CountriesController < ApplicationController


  def index
    @countries = Country.all

    respond_to do |format|
      format.json { render json: @countries }
    end
  end


end
