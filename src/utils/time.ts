export function formatTime(sec: number): string {
    const h = Math.floor(sec / 3600)
        .toString()
        .padStart(2, "0");


    const m = Math.floor((sec % 3600) / 60)
        .toString()
        .padStart(2, "0");


    const s = Math.floor(sec % 60)
        .toString()
        .padStart(2, "0");


    return `${h}:${m}:${s}`;
}

export function diffColor(diff: number): string {
    if (diff < 0) return "text-green-600";
    if (diff > 0) return "text-red-600";
    return "text-gray-500";
}