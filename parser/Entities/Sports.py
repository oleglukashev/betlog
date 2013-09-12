class Sports():  
  """ Sports entity class """  
  __tablename__ = 'sports'  
  
  id = Column('id', BIGINT(unsigned=True), primary_key=True)  
  name = Column(VARCHAR(255), nullable=False)  
  
  def __init__(self, code, name):  
    self.code = code  
    self.name = name  