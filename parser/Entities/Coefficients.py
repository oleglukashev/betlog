from sqlalchemy import Column, Integer, String, Sequence, Date, Float
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class Coefficients(Base):
  __tablename__ = 'coefficients'

  id = Column(Integer, Sequence('coefficients_id_seq'), primary_key=True)
  event_id = Column(Integer)
  bookmaker_id = Column(Integer)
  first = Column(Float)
  draw = Column(Float)
  second = Column(Float)
  first_or_draw = Column(Float)
  first_or_second = Column(Float)
  draw_or_second = Column(Float)
  first_fora = Column(Float)
  second_fora = Column(Float)
  coeff_first_fora = Column(Float)
  coeff_second_fora = Column(Float)
  total_less = Column(Float)
  total_more = Column(Float)
  coeff_first_total = Column(Float)
  coeff_second_total = Column(Float)
  created_at = Column(Date, default=datetime.datetime.now())
  updated_at = Column(Date, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

  def __init__(self, event_id, bookmaker_id, first, draw, second, first_or_draw, first_or_second, draw_or_second, first_fora, second_fora, coeff_first_fora, coeff_second_fora, total_less, total_more, coeff_first_total, coeff_second_total ):
    self.event_id = event_id
    self.bookmaker_id = bookmaker_id
    self.first = first
    self.draw = draw
    self.second = second
    self.first_or_draw = first_or_draw
    self.first_or_second = first_or_second
    self.draw_or_second = draw_or_second
    self.first_fora = first_fora
    self.second_fora = second_fora
    self.coeff_first_fora = coeff_first_fora
    self.coeff_second_fora = coeff_second_fora
    self.total_less = total_less
    self.total_more = total_more
    self.coeff_first_total = coeff_first_total
    self.coeff_second_total = coeff_second_total

  def __repr__(self):
    return "<Coefficient('%d', '%d', '%d', '%d', '%d', '%d', '%d', '%d', '%d', '%d', '%d', '%d', '%d', '%d', '%d', '%d')>" % ( self.event_id, self.bookmaker_id, self.first, self.draw, self.second, self.first_or_draw, self.first_or_second, self.draw_or_second, self.first_fora, self.second_fora, self.coeff_first_fora, self.coeff_second_fora, self.total_less, self.total_more, self.coeff_first_total, self.coeff_second_total )
