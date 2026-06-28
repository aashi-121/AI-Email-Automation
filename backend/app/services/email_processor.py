from sqlalchemy.orm import Session

from app.models.email import Email
from app.ai.ai_service import classify_email, analyze_sentiment, detect_intent, generate_reply


def process_email(db: Session, email_id: int):

    email = (
        db.query(Email)
        .filter(Email.id == email_id)
        .first()
    )

    if not email:
        return None

    category = classify_email(
        email.subject,
        email.body
    )

    sentiment = analyze_sentiment(
        email.subject, 
        email.body
    )
    
    email.intent = detect_intent(
        email.subject,
        email.body
    )
    
    reply = generate_reply(
        email.subject,
        email.body
    )

    email.category = category
    email.sentiment = sentiment
    email.intent = email.intent
    email.ai_reply = reply
    db.commit()

    db.refresh(email)

    return email