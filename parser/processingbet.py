from sqlalchemy import *
from datetime import datetime
import pytz
from database import Database

from Entities.Sports import Sports

class ProcessingBet(Database):
  def __init__(self, data):
    self.doAppConfig()
    self.doDatabaseConnect()
    self.doProcess(data)

  def doProcess(self, data):
    for key, event in data.items():
      query = self.session.query(Sports).filter(Sports.name == event['sport'])

      if ( query.first() == None ):
        new_sport = Sports( event['sport'] )
        self.session.add( new_sport )

    self.session.commit()
      #print( event['sport'] )

