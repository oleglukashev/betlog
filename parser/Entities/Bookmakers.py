from sqlalchemy import Column, Integer, String, Sequence, Date, Float
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class Bookmakers(Base):
  __tablename__ = 'bookmakers'

  id = Column(Integer, Sequence('bookmakers_id_seq'), primary_key=True)
  name = Column(String)
  rating = Column(Float)
  created_at = Column(Date, default=datetime.datetime.now())
  updated_at = Column(Date, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

  def __init__(self, name, rating):
    self.name = name
    self.rating = rating

  def __repr__(self):
    return "<Bookmaker('%s', '%s')>" % (self.name, self.rating)
