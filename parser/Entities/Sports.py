from sqlalchemy import Column, Integer, String, Sequence
from sqlalchemy.ext.declarative import declarative_base

from Entities.BaseEntity import BaseEntity

Base = declarative_base()

class Sports(Base, BaseEntity):
  __tablename__ = 'sports'

  id = Column(Integer, Sequence('sports_id_seq'), primary_key=True)
  name = Column(String)

  def __init__(self, name):
    self.name = name

  def __repr__(self):
    return "<Sports('%s')>" % (self.name)
