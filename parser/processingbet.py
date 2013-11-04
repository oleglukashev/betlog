from sqlalchemy import *
from datetime import datetime
import pytz
from database import Database

from Entities.Sports import Sports
from Entities.Countries import Countries
from Entities.Championships import Championships
from Entities.Events import Events
from Entities.Bookmakers import Bookmakers
from Entities.Coefficients import Coefficients

class ProcessingBet(Database):
  def __init__(self, data):
    self.doAppConfig()
    self.doDatabaseConnect()
    self.doProcess(data)

  def doProcess(self, data):
    for key, events_block in data.items():

      bookmaker_query = self.session.query(Bookmakers).filter(Bookmakers.name == events_block['bookmaker'])
      self.session.commit()
      bookmaker = bookmaker_query.first()
      bookmaker_id = bookmaker.id


      sport_query = self.session.query(Sports).filter(Sports.name == events_block['sport'])
      if ( sport_query.first() == None ):
        sport = self.session.add(Sports(events_block['sport']))
        self.session.commit()
      sport = sport_query.first()
      sport_id = sport.id

      country_query = self.session.query(Countries).filter(Countries.name == events_block['country'])
      if ( country_query.first() == None ):
        country = self.session.add(Countries(events_block['country'], sport_id))
        self.session.commit()
      country = country_query.first()
      country_id = country.id

      championships_query = self.session.query(Championships).filter(Championships.name == events_block['championship'])
      if ( championships_query.first() == None ):
        championship = self.session.add(Championships(events_block['championship'], country_id ))
        self.session.commit()
      championship = championships_query.first()
      championship_id = championship.id

      for key, coefficients in events_block['teams_and_coefficients'].items():
        first_team = coefficients['first_team'] if 'first_team' in coefficients.keys() else ""
        second_team = coefficients['second_team'] if 'second_team' in coefficients.keys() else ""
        date_event = coefficients['date_event'] if 'date_event' in coefficients.keys() else ""
        events_query = self.session.query(Events).filter(Events.opponent_1 == first_team).filter(Events.opponent_2 == second_team).filter(Events.date_event == date_event)

        if ( events_query.first() == None ):
          event = self.session.add(Events(championship_id, first_team, second_team, date_event))
          self.session.commit()
        event = events_query.first()
        event_id = event.id

        coefficients_block = self.session.add(Coefficients(event_id, bookmaker_id, coefficients['first'], coefficients['draw'], coefficients['second'], coefficients['first_or_draw'], coefficients['first_or_second'], coefficients['draw_or_second'], coefficients['first_fora'], coefficients['second_fora'], coefficients['total_less'], coefficients['total_more']))
        self.session.commit()

    self.session.commit()

