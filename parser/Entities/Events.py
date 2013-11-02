from sqlalchemy import Column, Integer, String, Sequence, Date
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class Events(Base):
  __tablename__ = 'events'

  id = Column(Integer, Sequence('events_id_seq'), primary_key=True)
  championship_id = Column(Integer)
  opponent_1 = Column(String)
  opponent_2 = Column(String)
  date_event = Column(Date, default=datetime.datetime.now())
  created_at = Column(Date, default=datetime.datetime.now())
  updated_at = Column(Date, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

  def __init__(self, championship_id, opponent_1, opponent_2, date_event):
    self.championship_id = championship_id
    self.opponent_1 = opponent_1
    self.opponent_2 = opponent_2
    self.date_event = date_event

  def __repr__(self):
    return "<Event('%s', '%s', '%s', '%s')>" % (self.championship_id, self.opponent_1, self.opponent_2, self.date_event )
