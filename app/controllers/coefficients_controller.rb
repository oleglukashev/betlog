class CoefficientsController < ApplicationController

  
  def index
    @coefficients = Coefficients.all

    respond_to do |format|
      format.json { render json: @coefficients }
    end
  end


end
