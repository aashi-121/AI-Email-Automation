import { Mail, Bot, Clock3, Smile } from "lucide-react";

function StatsCard({ title, value }) {

    const icons = {
        "Total Emails": <Mail size={28} />,
        "Processed": <Bot size={28} />,
        "Pending": <Clock3 size={28} />,
        "Positive": <Smile size={28} />
    };

    const colors = {
        "Total Emails": "bg-blue-100 text-blue-700",
        "Processed": "bg-green-100 text-green-700",
        "Pending": "bg-yellow-100 text-yellow-700",
        "Positive": "bg-purple-100 text-purple-700"
    };

    return (

        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500 text-sm">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {value}
                    </h2>

                </div>

                <div
                    className={`p-4 rounded-full ${colors[title]}`}
                >
                    {icons[title]}
                </div>

            </div>

        </div>

    );

}

export default StatsCard;