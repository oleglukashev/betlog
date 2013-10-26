import sqlalchemy
import yaml

from Entities.Sports import Sports

from Bets.Bet import Bet
from Bets.MarathonBet import MarathonBet


class BaseApp():
  def __init__( self):
    self.doAppConfig()

  def doAppConfig( self ):
    self.links = yaml.load( open('config/links.yml', 'r') )

  def doParse( self ):
    for key, value in self.links.items():
      print( 'Start parse ' + key.title() + ' page' )
      instance = eval( key.title() + "Bet" )
      instance = instance( value )
      #events = instance.parse()

      sports = Sports('Footbal')
      sports.name = "Vilo"

      print( sports )


      print ( 'Finished parse ' + key.title() + ' page' )
