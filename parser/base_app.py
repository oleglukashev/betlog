import sqlalchemy
import yaml
from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base

from Bets.Bet import Bet
from Bets.MarathonBet import MarathonBet

class BaseApp():
  def __init__( self):
    self.doAppConfig()
    self.doDatabaseConnect()

  def doAppConfig( self ):
    self.links = yaml.load( open('config/links.yml', 'r') )
    self.database = yaml.load( open('config/database.yml', 'r') )
    print self.database


  def doDatabaseConnect( self ):
    self.databaseConnect = create_engine('postgresql://' + self.database["user"] + ':' + self.database["password"] + '@localhost/' + self.database["database"])

  def doParse( self ):
    for key, value in self.links.iteritems():
      print "Start parse " + key.title() + " page"
      instance = eval( key.title() + "Bet" )
      instance = instance( value, self.databaseConnect )
      instance.parse()
      print "Finished parse " + key.title() + " page"