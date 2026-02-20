import { StrictMode } from "react";
import createRoot from "react-dom/client";
import App from "./App";
import './index.css'
import { YearProvider } from "./context/YearContext";

createRoot.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <YearProvider>
            <App />
        </YearProvider>
    </StrictMode>
);