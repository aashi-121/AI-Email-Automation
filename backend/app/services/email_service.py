from sqlalchemy.orm import Session

from app.models.email import Email


def save_email(db: Session, email_data: dict):
    existing = (
        db.query(Email)
        .filter(Email.gmail_message_id == email_data["gmail_message_id"])
        .first()
    )

    if existing:
        return False

    new_email = Email(**email_data)

    db.add(new_email)
    db.commit()
    db.refresh(new_email)

    return True


def get_all_emails(db: Session):
    return (
        db.query(Email)
        .order_by(Email.id.desc())
        .all()
    )


def get_email_by_id(db: Session, email_id: int):
    return (
        db.query(Email)
        .filter(Email.id == email_id)
        .first()
    )


def get_thread_emails(db: Session, thread_id: str):
    """
    Return all emails belonging to the same Gmail thread.
    """

    return (
        db.query(Email)
        .filter(Email.thread_id == thread_id)
        .order_by(Email.id.asc())
        .all()
    )