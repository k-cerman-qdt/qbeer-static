import {useYear} from "../context/YearContext";

export default function EventInfoPage() {
    const { year, yearData } = useYear();
    const data = yearData[year];

    if (!data) return <p>No data</p>;

    const info = data.event;

    return (
        <div>
            <h1>Event info </h1>

            <p>Date: {info.date}</p>

            <h2>Maps</h2>
            <ul>
                {info.maps.map((m) => (
                    <li key={m.url}>
                        <a href={m.url} target="_blank">
                            {m.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
