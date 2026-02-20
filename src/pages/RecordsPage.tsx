import { formatTime } from "../utils/time";
import { useYear } from "../context/YearContext";

export default function RecordsPage() {
    const { yearData } = useYear();

    // Find all-time fastest for each discipline across all years
    const allRacers = Object.entries(yearData).flatMap(([year, data]) =>
        data.leaderboard.map(r => ({ ...r, year: Number(year) }))
    );

    // Fastest Bike
    const fastestBikeRecord = allRacers
        .filter(r => r.bikeSeconds > 0)
        .sort((a, b) => a.bikeSeconds - b.bikeSeconds)[0];

    // Fastest Run - exclude zero times (DNF)
    const fastestRunRecord = allRacers
        .filter(r => r.runSeconds > 0)
        .sort((a, b) => a.runSeconds - b.runSeconds)[0];

    // Fastest Beer - exclude zero times (DNF)
    const fastestBeerRecord = allRacers
        .filter(r => r.beerSeconds > 0)
        .sort((a, b) => a.beerSeconds - b.beerSeconds)[0];

    // Fastest Overall - exclude zero times (DNF)
    const fastestOverallRecord = allRacers
        .filter(r => r.totalSeconds > 0)
        .sort((a, b) => a.totalSeconds - b.totalSeconds)[0];

    return (
        <div className="w-full min-h-screen p-8" style={{ background: 'linear-gradient(to bottom right, #f0f9ff, #e0f2fe)' }}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">🏆 Tournament Records</h1>
                    <p className="text-gray-700 text-lg">All-time fastest times across all years</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', overflowX: 'auto', paddingBottom: '24px' }}>
                    {/* Fastest Bike */}
                    {fastestBikeRecord && (
                        <div style={{
                            minWidth: '340px',
                            maxWidth: '340px',
                            flexShrink: 0,
                            background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                            borderRadius: '16px',
                            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
                            padding: '32px',
                            color: 'white'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                                <span style={{ fontSize: '64px', marginRight: '16px' }}>🚴</span>
                                <div>
                                    <h2 style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.9 }}>
                                        Fastest Bike
                                    </h2>
                                    <p style={{ fontSize: '36px', fontWeight: 'bold', marginTop: '4px' }}>
                                        {fastestBikeRecord.bikeSeconds === 0 ? 'DNF' : formatTime(fastestBikeRecord.bikeSeconds)}
                                    </p>
                                </div>
                            </div>
                            <div style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '12px',
                                padding: '20px',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>
                                    {fastestBikeRecord.racer}
                                </p>
                                <p style={{ fontSize: '14px', opacity: 0.9 }}>
                                    Year {fastestBikeRecord.year}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Fastest Run */}
                    {fastestRunRecord && (
                        <div style={{
                            minWidth: '340px',
                            maxWidth: '340px',
                            flexShrink: 0,
                            background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
                            borderRadius: '16px',
                            boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
                            padding: '32px',
                            color: 'white'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                                <span style={{ fontSize: '64px', marginRight: '16px' }}>🏃</span>
                                <div>
                                    <h2 style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.9 }}>
                                        Fastest Run
                                    </h2>
                                    <p style={{ fontSize: '36px', fontWeight: 'bold', marginTop: '4px' }}>
                                        {fastestRunRecord.runSeconds === 0 ? 'DNF' : formatTime(fastestRunRecord.runSeconds)}
                                    </p>
                                </div>
                            </div>
                            <div style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '12px',
                                padding: '20px',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>
                                    {fastestRunRecord.racer}
                                </p>
                                <p style={{ fontSize: '14px', opacity: 0.9 }}>
                                    Year {fastestRunRecord.year}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Fastest Beer */}
                    {fastestBeerRecord && (
                        <div style={{
                            minWidth: '340px',
                            maxWidth: '340px',
                            flexShrink: 0,
                            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                            borderRadius: '16px',
                            boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)',
                            padding: '32px',
                            color: 'white'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                                <span style={{ fontSize: '64px', marginRight: '16px' }}>🍺</span>
                                <div>
                                    <h2 style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.9 }}>
                                        Fastest Beer
                                    </h2>
                                    <p style={{ fontSize: '36px', fontWeight: 'bold', marginTop: '4px' }}>
                                        {fastestBeerRecord.beerSeconds === 0 ? 'DNF' : formatTime(fastestBeerRecord.beerSeconds)}
                                    </p>
                                </div>
                            </div>
                            <div style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '12px',
                                padding: '20px',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>
                                    {fastestBeerRecord.racer}
                                </p>
                                <p style={{ fontSize: '14px', opacity: 0.9 }}>
                                    Year {fastestBeerRecord.year}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Fastest Overall */}
                    {fastestOverallRecord && (
                        <div style={{
                            minWidth: '340px',
                            maxWidth: '340px',
                            flexShrink: 0,
                            background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
                            borderRadius: '16px',
                            boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)',
                            padding: '32px',
                            color: 'white'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                                <span style={{ fontSize: '64px', marginRight: '16px' }}>🥇</span>
                                <div>
                                    <h2 style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.9 }}>
                                        Fastest Overall
                                    </h2>
                                    <p style={{ fontSize: '36px', fontWeight: 'bold', marginTop: '4px' }}>
                                        {fastestOverallRecord.totalSeconds === 0 ? 'DNF' : formatTime(fastestOverallRecord.totalSeconds)}
                                    </p>
                                </div>
                            </div>
                            <div style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '12px',
                                padding: '20px',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>
                                    {fastestOverallRecord.racer}
                                </p>
                                <p style={{ fontSize: '14px', opacity: 0.9 }}>
                                    Year {fastestOverallRecord.year}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

