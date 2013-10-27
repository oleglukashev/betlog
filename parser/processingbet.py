from sqlalchemy import *
from datetime import datetime
import pytz
from database import Database

from Entities.Sports import Sports
from Entities.Countries import Countries
from Entities.Championships import Championships

class ProcessingBet(Database):
  def __init__(self, data):
    self.doAppConfig()
    self.doDatabaseConnect()
    self.doProcess(data)

  def doProcess(self, data):
    for key, event in data.items():

      sport_query = self.session.query(Sports).filter(Sports.name == event['sport'])
      if ( sport_query.first() == None ):
        sport = self.session.add(Sports(event['sport']))
        self.session.commit()
      sport = sport_query.first()
      sport_id = sport.id

      country_query = self.session.query(Countries).filter(Countries.name == event['country'])
      if ( country_query.first() == None ):
        country = self.session.add(Countries(event['country'], sport_id))
        self.session.commit()
      country = country_query.first()
      country_id = country.id

      championships_query = self.session.query(Championships).filter(Championships.name == event['championship'])
      if ( championships_query.first() == None ):
        championship = self.session.add(Championships(event['championship'], country_id ))
        self.session.commit()
      championship = championships_query.first()
      championship_id = championship.id

      for key, coefficients in event.items():
        print( coefficients )



      print( championship_id )

    self.session.commit()

