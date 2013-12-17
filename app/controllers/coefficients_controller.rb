class CoefficientsController < ApplicationController

  
  def index
    @coefficients = Coefficient.all

    respond_to do |format|
      format.json { render :json => {
        :coefficients =>  @coefficients.map do |item| {
          :item => {
            :id => item[:id],
            :event_id => item[:event_id],
            :bookmaker_id => item[:bookmaker_id],
            :bookmaker_name => item.bookmaker[:name],
            :first => item[:first],
            :draw => item[:draw],
            :second => item[:second],
            :first_or_draw => item[:first_or_draw],
            :first_or_second => item[:first_or_second],
            :draw_or_second => item[:draw_or_second],
            :first_fora => item[:first_fora],
            :second_fora => item[:second_fora],
            :coeff_first_fora => item[:coeff_first_fora],
            :coeff_second_fora => item[:coeff_second_fora],
            :total_less => item[:total_less],
            :total_more => item[:total_more],
            :coeff_first_total => item[:coeff_first_total],
            :coeff_second_total => item[:coeff_second_total],
            :created_at => item[:created_at],
            :updated_at => item[:updated_at]
          }}
        end
      }}
    end
  end


end
