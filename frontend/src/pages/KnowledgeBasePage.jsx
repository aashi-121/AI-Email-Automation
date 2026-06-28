import Navbar from "../components/Navbar";

function KnowledgeBasePage() {

    const documents = [
        {
            name: "company_policy.pdf",
            category: "Company Policy"
        },
        {
            name: "refund_policy.pdf",
            category: "Refund"
        },
        {
            name: "shipping_policy.pdf",
            category: "Shipping"
        }
    ];

    return (

        <div className="min-h-screen bg-slate-100">

            <Navbar />

            <div className="max-w-7xl mx-auto p-8">

                <h1 className="text-3xl font-bold mb-8">

                    Knowledge Base Manager

                </h1>

                <div className="bg-white rounded-xl shadow-md p-6">

                    <div className="flex justify-between items-center mb-6">

                        <h2 className="text-xl font-bold">

                            Knowledge Base Documents

                        </h2>

                        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">

                            + Upload Document

                        </button>

                    </div>

                    <table className="w-full">

                        <thead className="bg-slate-100">

                            <tr>

                                <th className="text-left p-4">

                                    Document

                                </th>

                                <th className="text-left">

                                    Category

                                </th>

                                <th className="text-left">

                                    Status

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {documents.map((doc,index)=>(

                                <tr
                                    key={index}
                                    className="border-b"
                                >

                                    <td className="p-4">

                                        {doc.name}

                                    </td>

                                    <td>

                                        {doc.category}

                                    </td>

                                    <td>

                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                                            Indexed

                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                <div className="bg-white rounded-xl shadow-md p-6 mt-8">

                    <h2 className="text-xl font-bold mb-6">

                        Preview Retrieved Knowledge Chunks

                    </h2>

                    <div className="space-y-4">

                        <div className="bg-slate-100 rounded-lg p-4">

                            Chunk 1: Refunds are processed within 5 business days.

                        </div>

                        <div className="bg-slate-100 rounded-lg p-4">

                            Chunk 2: Customers can cancel subscriptions anytime.

                        </div>

                        <div className="bg-slate-100 rounded-lg p-4">

                            Chunk 3: Premium support is available 24/7.

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default KnowledgeBasePage;