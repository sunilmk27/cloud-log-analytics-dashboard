from sqlalchemy import Column, Integer, String, DateTime
from database import Base
from datetime import datetime


class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    service_name = Column(String)
    log_level = Column(String)
    message = Column(String)