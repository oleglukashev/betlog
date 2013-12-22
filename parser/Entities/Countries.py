from sqlalchemy import Column, Integer, String, Sequence, Date
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class Countries(Base):
  __tablename__ = 'countries'

  id = Column(Integer, Sequence('countries_id_seq'), primary_key=True)
  name = Column(String)
  created_at = Column(Date, default=datetime.datetime.now())
  updated_at = Column(Date, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

  def __init__(self, name):
    self.name = name

  def __repr__(self):
    return "<Country('%s')>" % (self.name)
