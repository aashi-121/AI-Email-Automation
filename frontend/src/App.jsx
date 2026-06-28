import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import EmailPage from "./pages/EmailPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import KnowledgeBasePage from "./pages/KnowledgeBasePage";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/email/:id"
                    element={<EmailPage />}
                />
                <Route
                     path="/analytics"
                    element={<AnalyticsPage />}
                />

                <Route
                     path="/knowledge"
                     element={<KnowledgeBasePage />}
                     />

            </Routes>

        </BrowserRouter>

    );

}

export default App;