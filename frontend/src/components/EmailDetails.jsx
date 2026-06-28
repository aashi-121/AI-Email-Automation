import api from "../services/api";
function EmailDetails({ email, onClose }) {

  if (!email) return null;
  const processEmail = async () => {

    try {

        await api.post(`/emails/process/${email.id}`);

        alert("Email processed successfully!");

    } catch (error) {

        console.log(error);

        alert("Failed to process email.");

    }

};

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white w-4/5 max-w-5xl rounded-xl shadow-xl p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Email Details
          </h2>

          <button
            onClick={onClose}
            className="text-red-600 text-2xl font-bold"
          >
            ✕
          </button>

        </div>



        <div className="space-y-4">

          <div>
            <h3 className="font-semibold">Subject</h3>
            <p>{email.subject}</p>
          </div>

          <div>
            <h3 className="font-semibold">Sender</h3>
            <p>{email.sender}</p>
          </div>

          <div>
            <h3 className="font-semibold">Email Body</h3>

            <div className="bg-slate-100 p-4 rounded-lg mt-2 max-h-64 overflow-y-auto">
              {email.body}
            </div>

          </div>

          <div className="grid grid-cols-3 gap-6">

            <div>
              <h3 className="font-semibold">Category</h3>
              <p>{email.category || "-"}</p>
            </div>

            <div>
              <h3 className="font-semibold">Sentiment</h3>
              <p>{email.sentiment || "-"}</p>
            </div>

            <div>
              <h3 className="font-semibold">Intent</h3>
              <p>{email.intent || "-"}</p>
            </div>

          </div>

          <div>

            <h3 className="font-semibold">
              AI Reply
            </h3>

            <div className="bg-blue-50 p-4 rounded-lg mt-2 max-h-64 overflow-y-auto">

              {email.ai_reply || "No reply generated yet."}

            </div>

            <div className="flex gap-4 mt-6">


                <button
                 onClick={processEmail}
                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                    🤖 Process Email
                </button>

                <button
                 className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                >
                     ✉ Send Reply
                 </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EmailDetails;