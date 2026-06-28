from app.ai.ai_service import classify_email

category = classify_email(
    subject="Refund Request",
    body="I received a damaged product and want a refund."
)

print(category)