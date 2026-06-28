from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.gmail.service import (
    get_gmail_service,
    fetch_recent_emails,
    send_email_reply,
)
from app.services.email_service import (
    get_all_emails,
    get_email_by_id,
    get_thread_emails,
)

from app.db.session import get_db

from app.services.email_service import save_email
from app.services.email_processor import process_email

router = APIRouter()


@router.get("/gmail/connect")
def connect_gmail():

    service = get_gmail_service()

    profile = service.users().getProfile(
        userId="me"
    ).execute()

    return {
        "email": profile["emailAddress"],
        "messages": profile["messagesTotal"],
    }


@router.get("/gmail/sync")
def sync_gmail(db: Session = Depends(get_db)):

    emails = fetch_recent_emails()

    saved = 0

    for email in emails:

        if save_email(db, email):
            saved += 1

    return {
        "Fetched": len(emails),
        "Saved": saved
    }




@router.post("/emails/process/{email_id}")
def process_single_email(
    email_id: int,
    db: Session = Depends(get_db)
):

    email = process_email(db, email_id)

    if not email:
        return {
            "message": "Email not found"
        }

    return {
        "id": email.id,
        "subject": email.subject,
        "category": email.category,
        "sentiment": email.sentiment,
        "intent": email.intent,
        "reply": email.ai_reply
    }

@router.get("/emails")
def list_emails(db: Session = Depends(get_db)):
    return get_all_emails(db)

@router.get("/emails/{email_id}")
def get_email(
    email_id: int,
    db: Session = Depends(get_db)
):
    return get_email_by_id(db, email_id)


@router.post("/emails/send/{email_id}")
def send_reply(
    email_id: int,
    db: Session = Depends(get_db)
):

    email = get_email_by_id(db, email_id)

    if not email:
        return {
            "message": "Email not found"
        }

    if not email.ai_reply:
        return {
            "message": "Please process the email first."
        }

    send_email_reply(
        to=email.sender,
        subject=email.subject,
        body=email.ai_reply
    )

    return {
        "message": "Reply sent successfully."
    }

@router.get("/emails/thread/{thread_id}")
def get_thread(
    thread_id: str,
    db: Session = Depends(get_db)
):

    return get_thread_emails(db, thread_id)