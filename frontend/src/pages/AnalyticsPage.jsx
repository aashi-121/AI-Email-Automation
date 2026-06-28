import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

function AnalyticsPage() {

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

    };

    const total = emails.length;

    const processed = emails.filter(
        email => email.category
    ).length;

    const pending = total - processed;

    const positive = emails.filter(
        email => email.sentiment === "Positive"
    ).length;

    const neutral = emails.filter(
        email => email.sentiment === "Neutral"
    ).length;

    const negative = emails.filter(
        email => email.sentiment === "Negative"
    ).length;

    const categories = {};

    emails.forEach(email => {

        const category = email.category || "Pending";

        categories[category] = (categories[category] || 0) + 1;

    });

    const categoryData = Object.entries(categories).map(
    ([name, value]) => ({
        name,
        value
    })
);

const sentimentData = [
    {
        name: "Positive",
        count: positive
    },
    {
        name: "Neutral",
        count: neutral
    },
    {
        name: "Negative",
        count: negative
    }
];

const volumeData = [
    {
        name: "Received",
        count: total
    },
    {
        name: "Auto Replied",
        count: processed
    },
    {
        name: "Escalated",
        count: negative
    }
];

const COLORS = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#ca8a04",
    "#7c3aed",
    "#0891b2"
];

    return (

    <div className="min-h-screen bg-slate-100">

        <Navbar />

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">

                Analytics Dashboard

            </h1>

            {/* Stats Cards */}

            <div className="grid grid-cols-4 gap-6 mb-8">

                <div className="bg-white rounded-xl shadow-md p-6">

                    <p className="text-slate-500">Total Emails</p>

                    <h2 className="text-4xl font-bold mt-2">

                        {total}

                    </h2>

                </div>

                <div className="bg-white rounded-xl shadow-md p-6">

                    <p className="text-slate-500">Auto Replied</p>

                    <h2 className="text-4xl font-bold text-green-600 mt-2">

                        {processed}

                    </h2>

                </div>

                <div className="bg-white rounded-xl shadow-md p-6">

                    <p className="text-slate-500">Pending</p>

                    <h2 className="text-4xl font-bold text-yellow-500 mt-2">

                        {pending}

                    </h2>

                </div>

                <div className="bg-white rounded-xl shadow-md p-6">

                    <p className="text-slate-500">Positive Emails</p>

                    <h2 className="text-4xl font-bold text-blue-600 mt-2">

                        {positive}

                    </h2>

                </div>

            </div>

            {/* Volume Chart */}

            <div className="bg-white rounded-xl shadow-md p-6 mb-8">

                <h2 className="text-xl font-bold mb-6">

                    Volume Overview

                </h2>

                <ResponsiveContainer width="100%" height={300}>

                    <BarChart data={volumeData}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Bar dataKey="count" fill="#2563eb" />

                    </BarChart>

                </ResponsiveContainer>

            </div>

            {/* Charts */}

            <div className="grid grid-cols-2 gap-8">

                {/* Category Pie */}

                <div className="bg-white rounded-xl shadow-md p-6">

                    <h2 className="text-xl font-bold mb-6">

                        Category Breakdown

                    </h2>

                    <ResponsiveContainer width="100%" height={320}>

                        <PieChart>

                            <Pie
                                data={categoryData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={110}
                                label
                            >

                                {

                                    categoryData.map((entry, index) => (

                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                        />

                                    ))

                                }

                            </Pie>

                            <Tooltip />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

                {/* Sentiment */}

                <div className="bg-white rounded-xl shadow-md p-6">

                    <h2 className="text-xl font-bold mb-6">

                        Sentiment Trend

                    </h2>

                    <ResponsiveContainer width="100%" height={320}>

                        <BarChart data={sentimentData}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="name" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Bar
                                dataKey="count"
                                fill="#16a34a"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

            {/* Bottom Cards */}

            <div className="grid grid-cols-2 gap-8 mt-8">

                <div className="bg-white rounded-xl shadow-md p-6">

                    <h2 className="text-xl font-bold">

                        Average AI Response Time

                    </h2>

                    <p className="text-5xl font-bold text-blue-600 mt-6">

                        4.2 s

                    </p>

                    <p className="text-slate-500 mt-3">

                        Average AI processing time

                    </p>

                </div>

                <div className="bg-white rounded-xl shadow-md p-6">

                    <h2 className="text-xl font-bold mb-6">

                        Top Escalation Reasons

                    </h2>

                    <div className="space-y-4">

                        <div className="flex justify-between">

                            <span>Complaint</span>

                            <span>{negative}</span>

                        </div>

                        <div className="flex justify-between">

                            <span>Refund</span>

                            <span>0</span>

                        </div>

                        <div className="flex justify-between">

                            <span>Technical Support</span>

                            <span>0</span>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

);

}

export default AnalyticsPage;