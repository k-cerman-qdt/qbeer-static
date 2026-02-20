import { useYear } from "../context/YearContext";

export default function DataNotificationBanner() {
    const { isUsingFallbackData } = useYear();

    if (!isUsingFallbackData) {
        return null;
    }

    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(to right, #fbbf24, #f59e0b)",
                color: "#78350f",
                padding: "16px 24px",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "500",
                boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.15)",
                zIndex: 50,
                borderTop: "2px solid #f59e0b",
            }}
        >
            ⚠️ You are viewing static data - Backend connection unavailable
        </div>
    );
}

