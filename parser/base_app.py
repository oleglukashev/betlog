import sqlalchemy
import yaml


from Bets.MarathonBet import MarathonBet
from Bets.BetcityBet import BetcityBet

from processingbet import ProcessingBet


class BaseApp():
  def __init__( self ):
    self.doAppConfig()

  def doAppConfig( self ):
    self.links = yaml.load( open('parser/config/bookmakers.yml', 'r') )

  def doParse( self, bookmaker_name ):
    if ( bookmaker_name is not None ):
      self.doParseBookmaker( bookmaker_name )
    else:
      for key, value in self.links.items():
        bookmaker_name = key.title()
        self.doParseBookmaker( bookmaker_name )
        

  def doParseBookmaker( self, bookmaker_name ):
    print( 'Start parse ' + bookmaker_name + ' page' )
    instance = eval( bookmaker_name + "Bet" )
    instance = instance()
    events = instance.parse()
    processing_bet = ProcessingBet(events)
    print ( 'Finished parse ' + bookmaker_name + ' page' )
