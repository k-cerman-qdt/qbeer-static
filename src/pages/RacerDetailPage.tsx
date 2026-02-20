import { useParams } from "react-router-dom";
import {type LeaderboardRow} from "../data/yearData";
import { useYear } from "../context/YearContext";
import { formatTime, diffColor } from "../utils/time";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer, CartesianGrid,
} from "recharts";


export default function RacerDetailPage() {
    const { name } = useParams();
    const { year, yearData } = useYear();
    const data = yearData[year];
    const currentYear =
        yearData[year]?.leaderboard.find(r => r.racer === name);
    const previousYear =
        yearData[year - 1]?.leaderboard.find(r => r.racer === name);

    function renderRow(
        label: string,
        stageTime: number | undefined,
        previousStageTime: number | undefined,
        raceTime: number | undefined,
        previousRaceTime: number | undefined,
        disciplineKey: keyof LeaderboardRow
    ) {
        const current = stageTime ?? 0;
        const previous = previousStageTime ?? null;
        const diff = previous !== null ? current - previous : 0;

        // Compute current position in this discipline
        const leaderboard = yearData[year]?.leaderboard ?? [];
        const sorted = [...leaderboard].sort((a, b) => {
            const av = a[disciplineKey] as number;
            const bv = b[disciplineKey] as number;
            // DNF goes last
            if (av === 0 && bv === 0) return 0;
            if (av === 0) return 1;
            if (bv === 0) return -1;
            return av - bv;
        });
        const position = sorted.findIndex(r => r.racer === name) + 1; // +1 because index starts at 0

        return (
            <tr key={label} className="border-t">
                <td>{label}</td>
                <td>{current === 0 ? "DNF" : formatTime(current)}</td>
                <td>
                    {previous !== null
                        ? previous === 0
                            ? "DNF"
                            : (
                                <span className={diffColor(diff)}>
                                    {diff > 0 ? "+" : "-"}
                                    {formatTime(Math.abs(diff))}
                                </span>
                            )
                        : "—"}
                </td>
                <td>{position}</td>
                <td>{(raceTime ?? 0) === 0 ? "DNF" : formatTime(raceTime ?? 0)}</td>
                <td>{(previousRaceTime ?? 0) === 0 ? "DNF" : formatTime(previousRaceTime ?? 0)}</td>
            </tr>
        );
    }
    const placementHistory = Object.entries(yearData).map(([year, data]) => ({
        year: Number(year),
        position:
            data.leaderboard.find((r) => r.racer === name)?.position ?? undefined,
    }));

    if (!name) return <p>Missing racer</p>;
    if (!data) return <p>No data</p>;

return (
<div>
<h1>{name}</h1>

    <table className="w-full border">
        <thead>
        <tr className="bg-gray-100">
            <th>Discipline</th>
            <th>Time</th>
            <th>Δ vs last year</th>
            <th>Discipline leaderboard</th>
            <th>Race Time</th>
            <th>Last year Race Time</th>
        </tr>
        </thead>
        <tbody>
        {renderRow("Bike", currentYear?.bikeSeconds, previousYear?.bikeSeconds,currentYear?.bikeSeconds, previousYear?.bikeSeconds, "bikeSeconds")}
        {renderRow("Run", currentYear?.runSeconds, previousYear?.runSeconds,(currentYear?.bikeSeconds ?? 0) + (currentYear?.runSeconds ?? 0), (previousYear?.bikeSeconds ?? 0) + (previousYear?.runSeconds ?? 0), "runSeconds")}
        {renderRow("Beer", currentYear?.beerSeconds, previousYear?.beerSeconds,currentYear?.totalSeconds, previousYear?.totalSeconds,"beerSeconds")}
        {renderRow("Total", currentYear?.totalSeconds, previousYear?.totalSeconds,currentYear?.totalSeconds, previousYear?.totalSeconds, "totalSeconds")}
        </tbody>
    </table>

    {/* ACHIEVEMENTS */}
    <h2>Achievements</h2>
    <ul>
        {Object.entries(yearData)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([year, data], index, arr) => {
                const row = data.leaderboard.find((r) => r.racer === name);
                if (!row) return null;

                // previous year lookup
                const prevEntry = index > 0 ? arr[index - 1] : null;
                const prevRow = prevEntry
                    ? prevEntry[1].leaderboard.find((r) => r.racer === name)
                    : null;

                // positive = improvement (lower position)
                const diff =
                    prevRow !== null && prevRow !== undefined
                        ? prevRow.position - row.position
                        : null;

                // Check for discipline records (fastest times in each category)
                const fastestBike = Math.min(...data.leaderboard.filter(r => r.bikeSeconds > 0).map(r => r.bikeSeconds));
                const fastestRun = Math.min(...data.leaderboard.filter(r => r.runSeconds > 0).map(r => r.runSeconds));
                const fastestBeer = Math.min(...data.leaderboard.filter(r => r.beerSeconds > 0).map(r => r.beerSeconds));

                // Determine medal based on position (1st, 2nd, 3rd)
                let medalIcon = '';
                if (row.position === 1) medalIcon = '🥇';
                else if (row.position === 2) medalIcon = '🥈';
                else if (row.position === 3) medalIcon = '🥉';

                // Only add discipline achievements (not overall placement)
                const achievements: Array<{ icon: string; text: string; type: string; time: number }> = [];
                if (row.bikeSeconds === fastestBike && row.bikeSeconds > 0) achievements.push({ icon: '🏆', text: 'Fastest Bike', type: 'discipline', time: row.bikeSeconds });
                if (row.runSeconds === fastestRun && row.runSeconds > 0) achievements.push({ icon: '🏆', text: 'Fastest Run', type: 'discipline', time: row.runSeconds });
                if (row.beerSeconds === fastestBeer && row.beerSeconds > 0) achievements.push({ icon: '🏆', text: 'Fastest Beer', type: 'discipline', time: row.beerSeconds });

                return (
                    <div key={year} className="mb-2">
                        <li>
                            {year} — position {row.position}
                            {medalIcon && <span className="ml-2">{medalIcon}</span>}
                            {diff !== null && (
                                <span className={`ml-1 ${diffColor(diff*(-1))}`}>
                                    {" "}
                                    ({diff > 0 ? "+" : "-"}
                                    {diff})
                                </span>
                            )}
                        </li>
                        {achievements.length > 0 && (
                            <ul className="ml-6 mt-1">
                                {achievements.map((achievement, i) => (
                                    <li key={i} className="text-sm text-blue-600">
                                        {achievement.icon} {achievement.text} — {formatTime(achievement.time)}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
            })}
    </ul>

    {/* TOURNAMENT RECORDS - Only show records held by this racer */}
    {(() => {
        // Find all-time fastest for each discipline across all years
        const allRacers = Object.entries(yearData).flatMap(([year, data]) =>
            data.leaderboard.map(r => ({ ...r, year: Number(year) }))
        );

        // Fastest Bike
        const fastestBikeRecord = allRacers
            .filter(r => r.bikeSeconds > 0)
            .sort((a, b) => a.bikeSeconds - b.bikeSeconds)[0];

        // Fastest Run
        const fastestRunRecord = allRacers
            .filter(r => r.runSeconds > 0)
            .sort((a, b) => a.runSeconds - b.runSeconds)[0];

        // Fastest Beer
        const fastestBeerRecord = allRacers
            .filter(r => r.beerSeconds > 0)
            .sort((a, b) => a.beerSeconds - b.beerSeconds)[0];

        // Fastest Overall
        const fastestOverallRecord = allRacers
            .filter(r => r.totalSeconds > 0)
            .sort((a, b) => a.totalSeconds - b.totalSeconds)[0];

        // Collect records held by this racer
        const racerRecords = [];
        if (fastestBikeRecord?.racer === name) {
            racerRecords.push({ icon: '🏆', text: 'Fastest Bike', time: fastestBikeRecord.bikeSeconds, year: fastestBikeRecord.year });
        }
        if (fastestRunRecord?.racer === name) {
            racerRecords.push({ icon: '🏆', text: 'Fastest Run', time: fastestRunRecord.runSeconds, year: fastestRunRecord.year });
        }
        if (fastestBeerRecord?.racer === name) {
            racerRecords.push({ icon: '🏆', text: 'Fastest Beer', time: fastestBeerRecord.beerSeconds, year: fastestBeerRecord.year });
        }
        if (fastestOverallRecord?.racer === name) {
            racerRecords.push({ icon: '🥇', text: 'Fastest Overall', time: fastestOverallRecord.totalSeconds, year: fastestOverallRecord.year });
        }

        if (racerRecords.length === 0) return null;

        return (
            <>
                <h2 className="mt-6">Tournament Record Holder</h2>
                <ul className="space-y-1">
                    {racerRecords.map((record, i) => (
                        <li key={i} className="font-semibold text-blue-600">
                            {record.icon} {record.text} — {record.time === 0 ? 'DNF' : formatTime(record.time)}
                            <span className="text-sm text-gray-600 ml-2">
                                ({record.year})
                            </span>
                        </li>
                    ))}
                </ul>
            </>
        );
    })()}

    <h2>History placement</h2>
    <div className="w-full h-64">
        <ResponsiveContainer width={500} height={256}>
            <LineChart data={placementHistory} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>

                {/* X and Y axes */}
                <XAxis dataKey="year" />
                <YAxis reversed allowDecimals={false} domain={['dataMin - 2', 'dataMax + 5']}/>

                {/* Grid lines */}
                <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 4" />

                {/* Tooltip */}
                <Tooltip />

                {/* Line */}
                <Line type="monotone" dataKey="position" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
        </ResponsiveContainer>
    </div>
</div>
    );

}