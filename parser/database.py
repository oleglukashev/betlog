import yaml
from sqlalchemy import *
from sqlalchemy.orm import scoped_session, sessionmaker

class Database:
  def __init__(self):
    self.doAppConfig()
    self.doDatabaseConnect()

  def doAppConfig( self ):
    self.database = yaml.load( open('config/database.yml', 'r') )

  def doDatabaseConnect(self):
    self.databaseConnect = create_engine('postgresql://' + self.database["user"] + ':' + self.database["password"] + '@localhost/' + self.database["database"])
    self.createSession()

  def createSession(self):
    Session = sessionmaker(bind=self.databaseConnect)
    self.session = Session()
