from sqlalchemy import *
from sqlalchemy import desc
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
      if ( bookmaker_query.first() == None ):
        bookmaker = self.session.add(Bookmakers( events_block['bookmaker'], 0 ))
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

      championships_query = self.session.query(Championships).filter(Championships.name == events_block['championship']).filter(Championships.country_id == country_id).filter(Championships.sport_id == sport_id)
      if ( championships_query.first() == None ):
        championship = self.session.add(Championships(events_block['championship'], country_id, sport_id ))
        self.session.commit()
      championship = championships_query.first()
      championship_id = championship.id

      for key, coefficients in events_block['events_data'].items():
        first_team = coefficients['first_team'] if 'first_team' in coefficients.keys() and coefficients['first_team'] is not None else None
        second_team = coefficients['second_team'] if 'second_team' in coefficients.keys() and coefficients['first_team'] is not None else None

        if ( first_team is not None and second_team is not None ):
          event_data = {
            'date_event': coefficients['date_event'] if 'date_event' in coefficients.keys() else "",
            'first_team': first_team,
            'second_team': second_team,
            'first': coefficients['first'] if 'first' in coefficients.keys() else None,
            'draw': coefficients['draw'] if 'draw' in coefficients.keys() else None,
            'second': coefficients['second'] if 'second' in coefficients.keys() else None, 
            'first_or_draw': coefficients['first_or_draw'] if 'first_or_draw' in coefficients.keys() else None,
            'first_or_second': coefficients['first_or_second'] if 'first_or_second' in coefficients.keys() else None,
            'draw_or_second': coefficients['draw_or_second'] if 'draw_or_second' in coefficients.keys() else None,
            'first_fora': coefficients['first_fora'] if 'first_fora' in coefficients.keys() else None,
            'second_fora': coefficients['second_fora'] if 'second_fora' in coefficients.keys() else None,
            'coeff_first_fora': coefficients['coeff_first_fora'] if 'coeff_first_fora' in coefficients.keys() else None,
            'coeff_second_fora': coefficients['coeff_second_fora'] if 'coeff_second_fora' in coefficients.keys() else None,
            'total_less': coefficients['total_less'] if 'total_less' in coefficients.keys() else None,
            'total_more': coefficients['total_more'] if 'total_more' in coefficients.keys() else None,
            'coeff_first_total': coefficients['coeff_first_total'] if 'coeff_first_total' in coefficients.keys() else None,
            'coeff_second_total': coefficients['coeff_second_total'] if 'coeff_second_total' in coefficients.keys() else None
          }
          
          date_event = coefficients['date_event'] if 'date_event' in coefficients.keys() else ""
          events_query = self.session.query(Events).filter(Events.opponent_1 == first_team).filter(Events.opponent_2 == second_team)

          if ( len( events_query.all() ) > 0 ):
            for result_item in events_query.all():
              event = result_item
              event_id = None

              print("len > 0")
              print(event)

              if ( ( event.date_event - coefficients['date_event'] ).days == 0 ):
                event_id = event.id
              
            if ( event_id is None ):
              event = self.session.add(Events(championship_id, first_team, second_team, date_event))
              self.session.commit()
              event = self.session.query(Events).filter(Events.opponent_1 == first_team).filter(Events.opponent_2 == second_team).order_by(desc(Events.created_at)).limit(1)
              print(event)
              event_id = event.id
              print("event_id is none")
              print(event)
          else:
            event = self.session.add(Events(championship_id, first_team, second_team, date_event))
            self.session.commit()
            event = events_query.first()
            event_id = event.id
            print("len == 0")
            print(event)

          coefficients_block = self.session.add(
            Coefficients(event_id,
              bookmaker_id, 
              event_data['first'], 
              event_data['draw'], 
              event_data['second'], 
              event_data['first_or_draw'], 
              event_data['first_or_second'], 
              event_data['draw_or_second'], 
              event_data['first_fora'], 
              event_data['second_fora'],
              event_data['coeff_first_fora'], 
              event_data['coeff_second_fora'], 
              event_data['total_less'], 
              event_data['total_more'], 
              event_data['coeff_first_total'], 
              event_data['coeff_second_total']
          ))
        
        self.session.commit()

    self.session.commit()

