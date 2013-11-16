from sqlalchemy import Column, Integer, String, Sequence, Date
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class Championships(Base):
  __tablename__ = 'championships'

  id = Column(Integer, Sequence('championships_id_seq'), primary_key=True)
  name = Column(String)
  country_id = Column(Integer)
  sport_id = Column(Integer)
  created_at = Column(Date, default=datetime.datetime.now())
  updated_at = Column(Date, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

  def __init__(self, name, country_id, sport_id):
    self.name = name
    self.country_id = country_id
    self.sport_id = sport_id

  def __repr__(self):
    return "<Championship('%s', '%s', '%s')>" % (self.name, self.country_id, self.sport_id)
