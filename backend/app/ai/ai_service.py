from app.ai.llm import ask_llm
from app.rag.retriever import search_documents


def classify_email(subject: str, body: str) -> str:
    """
    Classifies an email into one category.
    """

    prompt = f"""
You are an AI email classifier.

Classify the email into EXACTLY ONE of the following categories.

Classification Rules:

- Refund → Customer is asking for a refund or money back.
- Billing → Payment, invoice, subscription charge, billing issue.
- Complaint → Customer is unhappy about a product or service but is not specifically requesting a refund.
- Technical Support → Login issues, password reset, bugs, errors, software problems.
- Sales → Product information, pricing, quotation, demo requests.
- General Inquiry → General questions that don't fit the above categories.
- Spam → Promotional, phishing, marketing, or unsolicited emails.
- Other → Anything that doesn't match the above.

Subject:
{subject}

Body:
{body}

Return ONLY one category from this list.
"""

    response = ask_llm(prompt).strip()

    valid_categories = [
        "Billing",
        "Refund",
        "Complaint",
        "Technical Support",
        "Sales",
        "General Inquiry",
        "Spam",
        "Other",
    ]

    for category in valid_categories:
        if category.lower() in response.lower():
            return category

    return "Other"


def analyze_sentiment(subject: str, body: str) -> str:
    """
    Analyze email sentiment.
    """

    prompt = f"""
You are a sentiment classifier.

Return ONLY ONE of these:

Positive
Neutral
Negative

Subject:
{subject}

Body:
{body}
"""

    response = ask_llm(prompt).strip()

    sentiments = [
        "Positive",
        "Neutral",
        "Negative",
    ]

    for sentiment in sentiments:
        if sentiment.lower() in response.lower():
            return sentiment

    return "Neutral"


def detect_intent(subject: str, body: str) -> str:
    """
    Detect customer intent.
    """

    prompt = f"""
You are an intent classifier.

Choose ONLY ONE intent.

Allowed Intents:

- Request Refund
- Track Order
- Technical Support
- Product Inquiry
- Cancel Subscription
- Billing Issue
- Complaint
- Feedback
- General Inquiry
- Other

Subject:
{subject}

Body:
{body}

Return ONLY the intent.
"""

    response = ask_llm(prompt).strip()

    intents = [
        "Request Refund",
        "Track Order",
        "Technical Support",
        "Product Inquiry",
        "Cancel Subscription",
        "Billing Issue",
        "Complaint",
        "Feedback",
        "General Inquiry",
        "Other",
    ]

    for intent in intents:
        if intent.lower() in response.lower():
            return intent

    return "Other"


def generate_reply(subject: str, body: str) -> str:
    """
    Generate AI reply using company knowledge.
    """

    docs = search_documents(subject + "\n" + body)

    context = "\n\n".join(
        doc.page_content for doc in docs
    )

    prompt = f"""
You are a professional customer support assistant.

Use ONLY the company policy below.

Company Policy:
{context}

Customer Email

Subject:
{subject}

Body:
{body}

Write a professional reply.

Do NOT mention the policy.

Do NOT explain your reasoning.

Return ONLY the email reply.
"""

    return ask_llm(prompt).strip()