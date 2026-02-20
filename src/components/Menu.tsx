import { Link } from "react-router-dom";
import { useYear } from "../context/YearContext";

export default function Menu() {
    const { year, setYear, yearData } = useYear();
    const years = Object.keys(yearData).map(Number).sort((a, b) => b - a);

    return (
        <div className="menu">
            <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
            >
                {years.map((y) => (
                    <option key={y} value={y}>
                        {y}
                    </option>
                ))}
            </select>

            <nav>
                <Link to="/leaderboard">Leaderboard</Link>
                <Link to="/disciplines">Disciplines</Link>
                <Link to="/graphs">Graphs</Link>
                <Link to="/records">Records</Link>
                <Link to="/event">Event</Link>
                <Link to="/archive">Archive</Link>
            </nav>
        </div>
    );
}
