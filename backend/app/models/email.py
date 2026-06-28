from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from datetime import datetime

from app.db.database import Base


class Email(Base):
    __tablename__ = "emails"

    id = Column(Integer, primary_key=True, index=True)

    gmail_message_id = Column(String, unique=True, index=True)

    thread_id = Column(String)

    sender = Column(String)

    subject = Column(String)

    body = Column(Text)

    category = Column(String)

    sentiment = Column(String)

    intent = Column(String)

    ai_reply = Column(Text)

    confidence = Column(String)

    escalated = Column(Boolean, default=False)

    status = Column(String, default="Pending")

    created_at = Column(DateTime, default=datetime.utcnow)