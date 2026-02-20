import {Link} from "react-router-dom";
import {type LeaderboardRow} from "../data/yearData";
import {formatTime} from "../utils/time";
import {useYear} from "../context/YearContext";

export default function LeaderboardPage() {
    const { year, yearData } = useYear();
    const data = yearData[year];

    if (!data) return <p>No data</p>;

    // Sort by total time, with DNF (0 seconds) at the end
    const sortedLeaderboard = [...data.leaderboard].sort((a, b) => {
        // DNF goes last
        if (a.totalSeconds === 0 && b.totalSeconds === 0) return 0;
        if (a.totalSeconds === 0) return 1;
        if (b.totalSeconds === 0) return -1;
        return a.totalSeconds - b.totalSeconds;
    });

    return (
        <div>
            <h1>Leaderboard </h1>

            <table>
                <tbody>
                {sortedLeaderboard.map((r: LeaderboardRow, index: number) => (
                    <tr key={r.racer} className="border-t">
                        <td className="p-2">{index + 1}.</td>
                        <td>
                            <Link to={`/racer/${r.racer}`} className="underline">
                                {r.racer}
                            </Link>
                        </td>
                        <td>{r.totalSeconds === 0 ? "DNF" : formatTime(r.totalSeconds)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
