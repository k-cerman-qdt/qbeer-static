import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { YearData } from "../data/yearData";
import { yearData as localYearData } from "../data/yearData";

interface YearContextType {
    year: number;
    setYear: (y: number) => void;
    yearData: Record<number, YearData>;
    isUsingFallbackData: boolean;
}

const YearContext = createContext<YearContextType | undefined>(undefined);

const API_BASE_URL = "http://localhost:8080/api";

export const YearProvider = ({ children }: { children: ReactNode }) => {
    const [year, setYear] = useState(2025); // default latest year
    const [yearData, setYearData] = useState<Record<number, YearData>>(localYearData);
    const [isUsingFallbackData, setIsUsingFallbackData] = useState(false);

    // Fetch year data from backend on mount with fallback to local data
    useEffect(() => {
        const fetchYearData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/year-data`);
                if (response.ok) {
                    const data = await response.json();
                    setYearData(data);
                    setIsUsingFallbackData(false);
                    console.log("✅ Year data loaded from backend API");
                } else {
                    console.warn(`⚠️ Backend API returned ${response.status}, using local data`);
                    setYearData(localYearData);
                    setIsUsingFallbackData(true);
                }
            } catch (error) {
                console.warn("⚠️ Failed to fetch from backend API, using local data:", error);
                setYearData(localYearData);
                setIsUsingFallbackData(true);
            }
        };

        fetchYearData();
    }, []);

    return (
        <YearContext.Provider value={{ year, setYear, yearData, isUsingFallbackData }}>
            {children}
        </YearContext.Provider>
    );
};

export const useYear = () => {
    const ctx = useContext(YearContext);
    if (!ctx) throw new Error("useYear must be used inside YearProvider");
    return ctx;
};
