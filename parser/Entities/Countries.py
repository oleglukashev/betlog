from sqlalchemy import Column, Integer, String, Sequence, Date
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class Countries(Base):
  __tablename__ = 'countries'

  id = Column(Integer, Sequence('countries_id_seq'), primary_key=True)
  name = Column(String)
  sport_id = Column(Integer)
  created_at = Column(Date, default=datetime.datetime.now())
  updated_at = Column(Date, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

  def __init__(self, name, sport_id):
    self.name = name
    self.sport_id = sport_id

  def __repr__(self):
    return "<Country('%s', '%s')>" % (self.name, self.sport_id)
