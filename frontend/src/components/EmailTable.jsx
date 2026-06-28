import { useEffect, useState } from "react";
import api from "../services/api";
import EmailDetails from "./EmailDetails";
import { Link } from "react-router-dom";
import SentimentBadge from "./SentimentBadge";

function EmailTable() {
  const [emails, setEmails] = useState([]);
  const [search, setSearch] = useState("");
   const [filter, setFilter] = useState("All");
  const [sentimentFilter, setSentimentFilter] = useState("All");
  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await api.get("/emails");
      setEmails(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredEmails = emails.filter((email) => {

    const matchesSearch =
        email.subject
            .toLowerCase()
            .includes(search.toLowerCase());

   const matchesCategory =
    filter === "All" ||
    email.category === filter;

const matchesSentiment =
    sentimentFilter === "All" ||
    email.sentiment === sentimentFilter;

return (
    matchesSearch &&
    matchesCategory &&
    matchesSentiment
);

});
  const categoryColor = (category) => {

    switch (category) {

        case "Refund":
            return "bg-green-100 text-green-700";

        case "Complaint":
            return "bg-red-100 text-red-700";

        case "Billing":
            return "bg-blue-100 text-blue-700";

        case "Technical Support":
            return "bg-purple-100 text-purple-700";

        case "Sales":
            return "bg-indigo-100 text-indigo-700";

        case "Spam":
            return "bg-gray-200 text-gray-700";

        default:
            return "bg-yellow-100 text-yellow-700";

    }

};

  return (
    <div className="bg-white rounded-xl shadow-md mt-8 p-6">
      <h2 className="text-xl font-bold mb-4">
        Recent Emails
      </h2>
<div className="flex items-center gap-4 mb-6">

    <input
        type="text"
        placeholder="🔍 Search subject..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-4 py-2 flex-1"
    />

    <div className="flex items-center gap-2">

        <label className="font-medium">
            Category
        </label>

        <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-3 py-2"
        >
            <option>All</option>
            <option>Refund</option>
            <option>Complaint</option>
            <option>Billing</option>
            <option>Technical Support</option>
            <option>Sales</option>
            <option>Spam</option>
            <option>Other</option>
        </select>

    </div>

    <div className="flex items-center gap-2">

        <label className="font-medium">
            Sentiment
        </label>

        <select
            value={sentimentFilter}
            onChange={(e) => setSentimentFilter(e.target.value)}
            className="border rounded-lg px-3 py-2"
        >
            <option>All</option>
            <option>Positive</option>
            <option>Neutral</option>
            <option>Negative</option>
        </select>

    </div>

</div>

      <table className="w-full">
        <thead className="bg-slate-100">

<tr>

<th className="w-16 py-4 text-left px-4">ID</th>

<th className="w-2/5 text-left px-4">Subject</th>

<th className="w-40 text-left px-4">Category</th>

<th className="w-40 text-left px-4">Sentiments</th>

<th className="w-32 text-left px-4">Status</th>

<th className="w-28 text-center px-4">Action</th>

</tr>

</thead>

        <tbody>
          {filteredEmails.map((email) => (
            <tr
              key={email.id}
              className="border-b hover:bg-slate-50"
            >
              <td className="py-4">
                {email.id}
              </td>

            <td className="px-4 max-w-md truncate">

                {email.subject}

            </td>

             <td className="px-4">

            <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColor(email.category)}`}
           >

                  {email.category || "Pending"}

            </span>

            </td>

            <td className="px-4">

    <SentimentBadge
        sentiment={email.sentiment}
    />

</td>
            <td className="px-4">

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                 email.category
                 ? "bg-green-100 text-green-700"
                 : "bg-orange-100 text-orange-700"
                }`}
                >

                {email.category ? "Processed" : "Pending"}

                </span>

            </td>

              <td>
                <Link
                  to={`/email/${email.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    
    </div>
  );
}

export default EmailTable;