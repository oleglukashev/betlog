import sqlalchemy
import yaml
from sqlalchemy import *

from Entities.Sports import Sports

from Bets.Bet import Bet
from Bets.MarathonBet import MarathonBet


class BaseApp():
  def __init__( self):
    self.doAppConfig()
    self.doDatabaseConnect()

  def doAppConfig( self ):
    self.links = yaml.load( open('config/links.yml', 'r') )
    self.database = yaml.load( open('config/database.yml', 'r') )

  def doDatabaseConnect( self ):
    self.databaseConnect = create_engine('postgresql://' + self.database["user"] + ':' + self.database["password"] + '@localhost/' + self.database["database"])

  def doParse( self ):
    for key, value in self.links.items():
      print( 'Start parse ' + key.title() + ' page' )
      instance = eval( key.title() + "Bet" )
      instance = instance( value, self.databaseConnect )
      #events = instance.parse()

      sports = Sports('Footbal')
      sports.name = "Vilo"

      print( sports )


      print ( 'Finished parse ' + key.title() + ' page' )
