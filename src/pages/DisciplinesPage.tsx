import {useYear} from "../context/YearContext";
import {formatTime} from "../utils/time";


export default function DisciplinesPage() {
    const { year, yearData } = useYear();
    const data = yearData[Number(year)];
    if (!data) return <div>No data</div>;

    return (
        <div className="space-y-6">
            <div key="Bike">
                <h2 className="text-xl font-bold mb-2">Bike</h2>
                <table className="w-full border">
                    <tbody>
                    {[...data.leaderboard].sort((a, b) => a.bikeSeconds - b.bikeSeconds)
                        .map((r, i) => (
                            <tr key={r.racer} className="border-t">
                                <td className="p-2">{i + 1}.</td>
                                <td>{r.racer}</td>
                                <td>{formatTime(r.bikeSeconds)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div key="Run">
                <h2 className="text-xl font-bold mb-2">Run</h2>
                <table className="w-full border">
                    <tbody>
                    {[...data.leaderboard].sort((a, b) => a.runSeconds - b.runSeconds)
                        .map((r, i) => (
                            <tr key={r.racer} className="border-t">
                                <td className="p-2">{i + 1}.</td>
                                <td>{r.racer}</td>
                                <td>{formatTime(r.runSeconds)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div key="Beer">
                <h2 className="text-xl font-bold mb-2">Beer</h2>
                <table className="w-full border">
                    <tbody>
                    {[...data.leaderboard].sort((a, b) => {
                        if (a.beerSeconds === 0) return 1;   // a goes last
                        if (b.beerSeconds === 0) return -1;  // b goes last
                        return a.beerSeconds - b.beerSeconds;
                    })
                        .map((r, i) => (
                            <tr key={r.racer} className="border-t">
                                <td className="p-2">{i + 1}.</td>
                                <td>{r.racer}</td>
                                <td>{r.beerSeconds === 0 ? "DNF" : formatTime(r.beerSeconds)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}