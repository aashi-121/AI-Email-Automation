import base64
from email.mime.text import MIMEText
from googleapiclient.discovery import build

from app.gmail.auth import authenticate_gmail


def get_gmail_service():
    creds = authenticate_gmail()

    service = build(
        "gmail",
        "v1",
        credentials=creds,
    )

    return service


def fetch_recent_emails(max_results=10):
    service = get_gmail_service()

    results = service.users().messages().list(
        userId="me",
        maxResults=max_results
    ).execute()

    messages = results.get("messages", [])

    email_list = []

    for message in messages:

        msg = service.users().messages().get(
            userId="me",
            id=message["id"],
            format="full"
        ).execute()

        headers = msg["payload"].get("headers", [])

        subject = ""
        sender = ""

        for header in headers:
            if header["name"] == "Subject":
                subject = header["value"]

            if header["name"] == "From":
                sender = header["value"]

        body = ""

        if "parts" in msg["payload"]:
            for part in msg["payload"]["parts"]:
                if part["mimeType"] == "text/plain":
                    import base64

                    data = part["body"].get("data")

                    if data:
                        body = base64.urlsafe_b64decode(
                            data
                        ).decode(errors="ignore")
                        break

        email_list.append({
            "gmail_message_id": message["id"],
            "thread_id": msg["threadId"],
            "sender": sender,
            "subject": subject,
            "body": body
        })

    return email_list
def send_email_reply(to, subject, body):

    service = get_gmail_service()

    message = MIMEText(body)

    message["to"] = to
    message["subject"] = "Re: " + subject

    raw_message = base64.urlsafe_b64encode(
        message.as_bytes()
    ).decode()

    send_message = {
        "raw": raw_message
    }

    service.users().messages().send(
        userId="me",
        body=send_message
    ).execute()

    return True