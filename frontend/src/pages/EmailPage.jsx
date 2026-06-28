import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function EmailPage() {

    const { id } = useParams();

    const [email, setEmail] = useState(null);
    const [threadEmails, setThreadEmails] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [sending, setSending] = useState(false);

    useEffect(() => {

        fetchEmail();

    }, []);

    const fetchEmail = async () => {

        try {

            const response = await api.get(`/emails/${id}`);

            setEmail(response.data);

                if (response.data.thread_id) {

                fetchThread(response.data.thread_id);

           }

        }

        catch (err) {

            console.log(err);

        }

    };

    const fetchThread = async (threadId) => {

    try {

        const response = await api.get(`/emails/thread/${threadId}`);

        setThreadEmails(response.data);

    }

    catch (err) {

        console.log(err);

    }

};


    const sendReply = async () => {

    try {

        setSending(true);

        const response = await api.post(`/emails/send/${id}`);

        alert("AI draft approved and sent successfully!");
    } catch (err) {

        console.log(err);

        alert("Unable to send reply.");

    } finally {

        setSending(false);

    }

};
   const processEmail = async () => {

    try {

        setProcessing(true);

        await api.post(`/emails/process/${id}`);

        await fetchEmail();

        alert("Email processed successfully.");

    } catch (err) {

        console.log(err);

        alert("Unable to process email.");

    } finally {

        setProcessing(false);

    }

};
    if (!email) {

        return (

            <div className="p-10 text-xl">

                Loading...

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-100 p-10">

            <Link
                to="/"
                className="text-blue-600 font-semibold"
            >
                ← Back to Dashboard
            </Link>

            <div className="bg-white rounded-xl shadow-lg p-8 mt-6">

                <h1 className="text-3xl font-bold">

                    {email.subject}

                </h1>

                <p className="mt-4">

                    <strong>Sender:</strong> {email.sender}

                </p>

                <div className="mt-6">

                    <h2 className="text-xl font-semibold">

                        Email Body

                    </h2>

                    <div className="bg-slate-100 p-5 rounded-lg mt-2">

                        {email.body}

                    </div>

                </div>

                <div className="grid grid-cols-3 gap-6 mt-8">

                    <div>

                        <h3 className="font-semibold">

                            Category

                        </h3>

                        <p>{email.category || "-"}</p>

                    </div>

                    <div>

                        <h3 className="font-semibold">

                            Sentiment

                        </h3>

                        <p>{email.sentiment || "-"}</p>

                    </div>

                    <div>

                        <h3 className="font-semibold">

                            Intent

                        </h3>

                        <p>{email.intent || "-"}</p>

                    </div>

                </div>

                <div className="mt-8">

    <h2 className="text-xl font-semibold">

        AI Reply

    </h2>

    <div className="bg-blue-50 rounded-lg p-5 mt-2 whitespace-pre-wrap">

        {email.ai_reply || "No reply generated yet."}

    </div>
    <div className="mt-10">

    <h2 className="text-2xl font-bold mb-4">

        Conversation History

    </h2>

    {threadEmails.length === 0 ? (

        <p>No conversation found.</p>

    ) : (

        threadEmails.map((item) => (

            <div
                key={item.id}
                className="border rounded-lg p-5 bg-white shadow-sm mb-4"
            >

                <p>

                    <strong>From:</strong> {item.sender}

                </p>

                <p className="mt-2">

                    <strong>Subject:</strong> {item.subject}

                </p>

                <div className="bg-slate-100 rounded-lg p-4 mt-3 whitespace-pre-wrap">

                    {item.body}

                </div>

            </div>

        ))

    )}

</div>

    <div className="flex gap-4 mt-6">

        <button
             onClick={processEmail}
             disabled={processing}
             className={`px-6 py-3 rounded-lg text-white ${
               processing
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
    }`}
>
    {processing ? "⏳ Processing..." : "🤖 Process Email"}
</button>

       <button
        onClick={sendReply}
        disabled={!email.ai_reply || sending}
        className={`px-6 py-3 rounded-lg text-white ${
        !email.ai_reply || sending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
    }`}
>
    {sending ? "⏳ Sending..." : "✅ Approve & Send"}
</button>

            </div>

        </div>
              

            </div>

        </div>

    );

}

export default EmailPage;