import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import EmailTable from "../components/EmailTable";
import api from "../services/api";

function Dashboard() {

    const [emails, setEmails] = useState([]);

    useEffect(() => {
        fetchEmails();
    }, []);

    const fetchEmails = async () => {
        try {
            const response = await api.get("/emails");
            setEmails(response.data);
        } catch (err) {
            console.log(err);
        }



    }
    
    const syncEmails = async () => {

    try {

        await api.get("/gmail/sync");

        await fetchEmails();

        alert("Gmail synced successfully!");

    } catch (error) {

        console.log(error);

        alert("Sync failed.");

    }

};

    const total = emails.length;
    const positive = emails.filter(
    email => email.sentiment === "Positive"
        ).length;

    const processed = emails.filter(email => email.category).length;

    const pending = emails.filter(email => !email.category).length;
    return (

        <div className="min-h-screen bg-slate-100">

            <Navbar onSync={syncEmails} />

            <div className="max-w-7xl mx-auto p-8">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <StatsCard
                        title="Total Emails"
                        value={total}
                    />

                    <StatsCard
                        title="Processed"
                        value={processed}
                    />

                    <StatsCard
                        title="Pending"
                        value={pending}
                    />

                </div>

                <EmailTable />

            </div>

        </div>
    );
}

export default Dashboard;