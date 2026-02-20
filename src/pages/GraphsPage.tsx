import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid} from "recharts";
import { useState } from "react";

import {useYear} from "../context/YearContext";

const COLORS = [
    "#2563eb", // Blue
    "#16a34a", // Green
    "#dc2626", // Red
    "#9333ea", // Purple
    "#ea580c", // Orange
    "#f59e0b", // Amber
    "#0891b2", // Cyan
    "#7c3aed", // Violet
    "#db2777", // Pink
    "#059669", // Emerald
    "#2dd4bf", // Teal
    "#f97316", // Orange-red
    "#6366f1", // Indigo
    "#84cc16", // Lime
    "#14b8a6", // Teal-alt
];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 0) {
        // Sort by position (value) ascending
        const sorted = [...payload].sort((a, b) => {
            const aVal = a.value ?? Infinity;
            const bVal = b.value ?? Infinity;
            return aVal - bVal;
        });

        return (
            <div style={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '8px 12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                zIndex: 1000,
                position: 'relative'
            }}>
                {sorted.map((entry: any) => (
                    <div key={entry.name} style={{ color: entry.color, fontSize: '14px', lineHeight: '1.5' }}>
                        {`${entry.name}: ${entry.value}`}
                    </div>
                ))}
            </div>
        );
    }
    return null;
};


export default function GraphsPage() {
    const { year, yearData } = useYear();
    const data = yearData[year];
    const [selectedRacers, setSelectedRacers] = useState<Set<string>>(
        new Set(data?.leaderboard.map(r => r.racer) ?? [])
    );
    const [hoveredRacer, setHoveredRacer] = useState<string | null>(null);

    if (!data) return <p>No data</p>

    const stageMap = {
        "After Bike": (r: typeof data.leaderboard[0]) => r.bikeSeconds,
        "After Run": (r: typeof data.leaderboard[0]) => r.bikeSeconds + r.runSeconds,
        "Total Time": (r: typeof data.leaderboard[0]) => r.totalSeconds,
    };

    const chartData = Object.entries(stageMap).map(([stageName, getTime]) => {
        const row: Record<string, number | string> = { name: stageName };

        // Sort by time for this stage to get positions
        const sorted = [...data.leaderboard].sort((a, b) => {
            const timeA = getTime(a);
            const timeB = getTime(b);
            // DNF (0) goes last
            if (timeA === 0 && timeB === 0) return 0;
            if (timeA === 0) return 1;
            if (timeB === 0) return -1;
            return timeA - timeB;
        });

        sorted.forEach((r, index) => {
            row[r.racer] = index + 1;
        });

        return row;
    });

    const racers = data.leaderboard.map((r) => r.racer);

    const toggleRacer = (racer: string) => {
        const newSelected = new Set(selectedRacers);
        if (newSelected.has(racer)) {
            newSelected.delete(racer);
        } else {
            newSelected.add(racer);
        }
        setSelectedRacers(newSelected);
    };

    const toggleAll = (checked: boolean) => {
        if (checked) {
            setSelectedRacers(new Set(racers));
        } else {
            setSelectedRacers(new Set());
        }
    };

    return (
        <div className="w-full h-screen flex flex-col bg-gray-100 p-4 overflow-hidden">
            <h1 className="text-2xl font-bold mb-2">Race Time Progress</h1>

            <div className="mb-3 p-4 bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg border border-gray-300 shadow-sm">
                <div className="mb-2">
                    <label className="flex items-center gap-3 p-2 bg-white rounded-lg border-2 border-blue-300 cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition shadow-sm w-fit text-sm">
                        <input
                            type="checkbox"
                            checked={selectedRacers.size === racers.length}
                            onChange={(e) => toggleAll(e.target.checked)}
                            className="w-4 h-4 cursor-pointer accent-blue-600"
                        />
                        <span className="font-bold text-gray-800">Select All</span>
                    </label>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', marginTop: '8px', width: '100%' }}>
                    {racers.map((racer, i) => (
                        <div
                            key={racer}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4.2px',
                                padding: '4.2px',
                                backgroundColor: 'white',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f9fafb';
                                e.currentTarget.style.borderColor = '#3b82f6';
                                setHoveredRacer(racer);
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'white';
                                e.currentTarget.style.borderColor = '#d1d5db';
                                setHoveredRacer(null);
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={selectedRacers.has(racer)}
                                onChange={() => toggleRacer(racer)}
                                style={{ width: '10.5px', height: '10.5px', cursor: 'pointer', flexShrink: 0 }}
                            />
                            <span
                                style={{
                                    width: '10.5px',
                                    height: '10.5px',
                                    borderRadius: '50%',
                                    border: '1px solid #9ca3af',
                                    backgroundColor: COLORS[i % COLORS.length],
                                    flexShrink: 0
                                }}
                            />
                            <span style={{ fontSize: '9.45px', fontWeight: '500', color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {racer}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex justify-center items-center overflow-hidden min-h-0">
                <div style={{ width: '67.77vw', height: '67.77vh' }} className="bg-gray-100 rounded-lg border border-gray-300 shadow-lg p-3">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid stroke="#d1d5db" strokeDasharray="5 5" strokeWidth={1.5} />
                            <XAxis dataKey="name" />
                            <YAxis reversed allowDecimals={false} label={{ value: 'Position', angle: -90, position: 'insideLeft' }} />
                            <Tooltip content={<CustomTooltip />} />

                            {racers.map((r, i) => {
                                if (!selectedRacers.has(r)) return null;
                                const isHovered = hoveredRacer === r;
                                const opacity = hoveredRacer === null ? 1 : isHovered ? 1 : 0.2;
                                return (
                                    <Line
                                        key={r}
                                        type="monotone"
                                        dataKey={r}
                                        stroke={COLORS[i % COLORS.length]}
                                        strokeWidth={3}
                                        strokeOpacity={opacity}
                                    />
                                );
                            })}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
