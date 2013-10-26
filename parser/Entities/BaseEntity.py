from sqlalchemy import Column, Integer, String, DATETIME

class BaseEntity(object):
  # for before insert before update base extension class
  #__mapper_args__ = { 'extension': BaseExtension() }

  created_at = Column(DATETIME)
  updated_at = Column(DATETIME)
