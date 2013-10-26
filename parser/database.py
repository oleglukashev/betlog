from sqlalchemy import *

class Database:
  def __init__(self):
    self.doDatabaseConnect()

  def doAppConfig( self ):
    self.database = yaml.load( open('config/database.yml', 'r') )

  def doDatabaseConnect(self):
    self.databaseConnect = create_engine('postgresql://' + self.database["user"] + ':' + self.database["password"] + '@localhost/' + self.database["database"])
