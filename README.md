# 📧 AI Email Automation System

An AI-powered customer support email automation platform that integrates with Gmail to automatically retrieve emails, classify them, analyze customer sentiment, detect intent, retrieve relevant company knowledge using Retrieval-Augmented Generation (RAG), generate AI-powered responses, and send replies through Gmail.

---

# 🚀 Project Overview

The AI Email Automation System is designed to automate customer support workflows by leveraging Artificial Intelligence, Retrieval-Augmented Generation (RAG), and Gmail integration.

The application performs the following workflow:

1. Connects securely to Gmail using OAuth 2.0.
2. Fetches recent customer emails.
3. Stores emails in PostgreSQL.
4. Processes emails using a Large Language Model (LLM).
5. Classifies emails into business categories.
6. Detects customer sentiment.
7. Identifies customer intent.
8. Retrieves relevant knowledge from company documents using Qdrant Vector Database.
9. Generates an AI-powered response.
10. Allows the support agent to review and send the response via Gmail.

---

# ✨ Features

## 📩 Gmail Integration

- Gmail OAuth Authentication
- Sync Recent Emails
- Read Inbox
- View Email Details
- Gmail Thread View
- Send AI Generated Replies

---

## 🤖 AI Email Processing

Each email is automatically processed to determine:

- Category Classification
- Sentiment Analysis
- Intent Detection
- AI Reply Generation

Supported Categories:

- Refund
- Complaint
- Billing
- Technical Support
- Sales
- General Inquiry
- Spam

---

## 🧠 Retrieval-Augmented Generation (RAG)

Instead of relying only on the language model, the application retrieves relevant information from company documents before generating responses.

Knowledge Documents include:

- Refund Policy
- Shipping Policy
- Technical Support Guide
- Subscription Policy

This significantly improves response accuracy and reduces hallucinations.

---

## 📥 Inbox Dashboard

The dashboard includes:

- Unified Inbox
- Search Emails
- Filter by Category
- Filter by Sentiment
- Email Status Tracking
- Email Details View
- Gmail Thread History
- One-click Email Processing
- One-click Approve & Send

---

## 📊 Analytics Dashboard

The analytics module provides:

- Total Emails
- Processed Emails
- Pending Emails
- Positive Email Count
- Category Distribution
- Sentiment Distribution
- Response Statistics

---

## 📚 Knowledge Base

The Knowledge Base Manager includes:

- Indexed Company Documents
- Category-wise Knowledge
- Retrieved Knowledge Preview
- RAG Integration

> **Note:** The current implementation uses pre-indexed company documents stored in Qdrant.

---



# 🏗️ System Architecture

```text
                Customer Email
                      │
                      ▼
              Gmail API (OAuth)
                      │
                      ▼
              FastAPI Backend
                      │
        ┌─────────────┴─────────────┐
        │                           │
        ▼                           ▼
 PostgreSQL Database          AI Processing
(Store Email Metadata)              │
                                    │
                      ┌─────────────┼─────────────┐
                      ▼             ▼             ▼
                Classification  Sentiment     Intent
                      │
                      ▼
                RAG Pipeline
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
  Embed Query              Search Qdrant
                                    │
                                    ▼
                     Retrieve Top Knowledge Chunks
                                    │
                                    ▼
                          Ollama (Llama 3)
                                    │
                                    ▼
                        AI Generated Response
                                    │
                                    ▼
                         Gmail Send API
                                    │
                                    ▼
                              Customer
```

---

# 🛠️ Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router

---

## Backend

- FastAPI
- SQLAlchemy
- Pydantic

---

## Database

### PostgreSQL

PostgreSQL is used for storing:

- Email Details
- Sender Information
- Category
- Sentiment
- Intent
- AI Generated Replies
- Processing Status

---

### Qdrant Vector Database

Qdrant is used as the vector database for Retrieval-Augmented Generation.

Workflow:

```text
Company PDFs
      │
      ▼
Document Chunking
      │
      ▼
Embedding Generation
      │
      ▼
Store Embeddings in Qdrant
      │
      ▼
Similarity Search
      │
      ▼
Relevant Chunks Retrieved
      │
      ▼
Passed to LLM
      │
      ▼
Context-aware AI Reply
```

---

## AI Components

- Ollama
- Llama 3
- LangChain
- HuggingFace Embeddings
- Retrieval-Augmented Generation (RAG)

Embedding Model:

```
sentence-transformers/all-MiniLM-L6-v2
```

---

# 📁 Project Structure

```text
AI-Email-Automation/

│
├── backend/
│   ├── app/
│   │   ├── ai/
│   │   ├── api/
│   │   ├── db/
│   │   ├── gmail/
│   │   ├── models/
│   │   ├── rag/
│   │   ├── schemas/
│   │   └── services/
│   │
│   ├── knowledge/
│   ├── requirements.txt
│   └── main.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   │
│   ├── package.json
│   └── vite.config.js
│
├── screenshots/
├── docker-compose.yml
└── README.md
```

---

# ⚡ Installation

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔧 Required Services

Before running the project, ensure the following services are available:

- PostgreSQL
- Qdrant
- Ollama
- Gmail OAuth Credentials

---

# 🌍 Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
DATABASE_URL=

QDRANT_URL=

OLLAMA_BASE_URL=

MODEL_NAME=

SECRET_KEY=
```

---

# 📸 Project Screenshots

Added screenshots inside the `screenshots/` folder.

Screenshots Include:

- Dashboard
- Email Details
- Analytics Dashboard
- Knowledge Base
- Settings
- Thread View

---

# 🎥 Demo Video
https://drive.google.com/file/d/1hasfjXCO_8xm9OOd6d9K8s3ZQoOo3_5r/view?usp=drivesdk



The demo includes:

- Gmail Sync
- Email Processing
- AI Reply Generation
- Thread View
- Analytics Dashboard
- Knowledge Base
- Settings Module

---



# 👩‍💻 Author

**Aashi Sharma**


- PostgreSQL
- Qdrant
- Ollama
