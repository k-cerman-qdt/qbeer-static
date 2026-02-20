import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Menu from "./components/Menu";
import DataNotificationBanner from "./components/DataNotificationBanner";

import LeaderboardPage from "./pages/LeaderboardPage";
import DisciplinesPage from "./pages/DisciplinesPage";
import GraphsPage from "./pages/GraphsPage";
import RacerDetailPage from "./pages/RacerDetailPage";
import EventInfoPage from "./pages/EventInfoPage";
import ArchivePage from "./pages/ArchivePage";
import RecordsPage from "./pages/RecordsPage";

export default function App() {
    return (
        <BrowserRouter>
            {/* Top navigation */}
            <Menu />

            {/* Page content */}
            <Routes>
                {/* Default redirect */}
                <Route path="/" element={<Navigate to="/leaderboard" replace />} />

                {/* Main pages WITHOUT year in URL */}
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/disciplines" element={<DisciplinesPage />} />
                <Route path="/graphs" element={<GraphsPage />} />
                <Route path="/records" element={<RecordsPage />} />
                <Route path="/event" element={<EventInfoPage />} />
                <Route path="/archive" element={<ArchivePage />} />

                {/* Racer detail */}
                <Route path="/racer/:name" element={<RacerDetailPage />} />

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/leaderboard" replace />} />
            </Routes>

            {/* Data notification banner */}
            <DataNotificationBanner />
        </BrowserRouter>
    );
}
