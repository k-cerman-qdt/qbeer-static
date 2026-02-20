import { useYear } from "../context/YearContext";

export default function ArchivePage() {
    const { yearData } = useYear();
    const years = Object.keys(yearData).map(Number).sort((a, b) => b - a);

    return (
        <div>
            <h1>Archive</h1>

            <ul>
                {years.map((y) => (
                    <li key={y}>{y}</li>
                ))}
            </ul>
        </div>
    );
}