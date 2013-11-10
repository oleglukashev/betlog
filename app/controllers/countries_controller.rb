class CountriesController < ApplicationController


  def index
    @countries = Countries.all

    respond_to do |format|
      format.json { render json: @countries }
    end
  end


end
