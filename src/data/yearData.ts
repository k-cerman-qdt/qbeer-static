/* =========================================================
   TYPES
   ========================================================= */

export type Discipline = "Bike" | "Run" | "Beer";

export interface DisciplineResult {
    racer: string;
    position: number;
    time: number; // seconds
}

export interface LeaderboardRow {
    position: number;
    racer: string;
    bikeSeconds: number;
    runSeconds: number;
    beerSeconds: number;
    totalSeconds: number;
}


export interface EventMap {
    name: string;
    url: string;
}

export interface EventInfo {
    date: string;
    maps: EventMap[];
}

export interface YearData {
    leaderboard: LeaderboardRow[];
    event: EventInfo;
}

/* =========================================================
   2024 DATA
   ========================================================= */

const year2024: YearData = {
    leaderboard: [
        { position: 1, racer: "Jirka Včeliš",bikeSeconds: 1175,runSeconds:642,beerSeconds:343,totalSeconds:2160},
        { position: 2, racer: "Petr Špryňar",bikeSeconds:1237,runSeconds:749,beerSeconds:414,totalSeconds:2400},
        { position: 3, racer: "Zuzka Háková Metelková",bikeSeconds:1370,runSeconds:850,beerSeconds:210,totalSeconds:2430},
        { position: 4, racer: "Radek Truneček",  bikeSeconds:1335,runSeconds:700,beerSeconds:548,totalSeconds:2583},
        { position: 5, racer: "Iva Zurynková",bikeSeconds:1349,runSeconds:861,beerSeconds:477,totalSeconds:2687},
        { position: 6, racer: "Jirka Linhart",bikeSeconds:1230,runSeconds:707,beerSeconds:973,totalSeconds:2910},
        { position: 7, racer: "Martin Viktorín",bikeSeconds:1339,runSeconds:687,beerSeconds:1173,totalSeconds:3199},
        { position: 8, racer: "Štěpán Fanta", bikeSeconds:1345,runSeconds:1058,beerSeconds:909,totalSeconds:3312},
        { position: 9, racer: "Jarda Halamka",bikeSeconds:1175,runSeconds:857,beerSeconds:1468,totalSeconds:3500},
        { position: 10, racer: "David Richter",bikeSeconds:1405,runSeconds:840,beerSeconds:1283,totalSeconds:3528},
        { position: 11, racer: "Vlasta Andrle",bikeSeconds:1110,runSeconds:630,beerSeconds:1790,totalSeconds:3530},
        { position: 12, racer: "Eva Rychterová",bikeSeconds:1405,runSeconds:795,beerSeconds:1505,totalSeconds:3705},
        { position: 13, racer: "Kuba Láska",bikeSeconds:1405,runSeconds:1110,beerSeconds:1190,totalSeconds:3705},
        { position: 14, racer: "Lukáš Dvořák",bikeSeconds:1330,runSeconds:740,beerSeconds:1662,totalSeconds:3732},
        { position: 15, racer: "Matěj Zmítko",bikeSeconds:1470,runSeconds:0,beerSeconds:3740,totalSeconds:3740},
        { position: 16, racer: "Petr Holubec",bikeSeconds:1175,runSeconds:772,beerSeconds:3071,totalSeconds:5018},
        { position: 17, racer: "Lukáš Slavíček",bikeSeconds:1175,runSeconds:816,beerSeconds:3289,totalSeconds:5280},
        { position: 18, racer: "Dominik Bydžovský",bikeSeconds:1405,runSeconds:795,beerSeconds:3200,totalSeconds:5400}
    ],
    event: {
        date: "2024-05-21",
        maps: [
            { name: "Bike route detail", url: "https://en.mapy.cz/s/jazohelupo" },
            { name: "Run route detail", url: "https://en.mapy.cz/s/denenamada" },
            {
                name: "Beer location",
                url: "https://mapy.com/cs/zakladni?source=firm&id=13018154&x=15.8932972&y=50.1820479&z=19",
            },
        ],
    },
};

/* =========================================================
   2025 DATA
   ========================================================= */

const year2025: YearData = {
    leaderboard: [
        { position: 1, racer: "Petr Špryňar",bikeSeconds:1201,runSeconds:717,beerSeconds:200,totalSeconds:2118},
        { position: 2, racer: "Vlasta Andrle",bikeSeconds:1111,runSeconds:662,beerSeconds:458,totalSeconds:2231},
        { position: 3, racer: "Zuzka Háková Metelková",bikeSeconds: 1348,runSeconds:878,beerSeconds:97,totalSeconds:2323},
        { position: 4, racer: "Jan Lánský",bikeSeconds:1235,runSeconds:933,beerSeconds:194,totalSeconds:2362},
        { position: 5, racer: "David Richter",bikeSeconds:1348,runSeconds:878,beerSeconds:172,totalSeconds:2398},
        { position: 6, racer: "Eva Rychterová",bikeSeconds:1290,runSeconds:765,beerSeconds:482,totalSeconds:2537},
        { position: 7, racer: "Iva Zurynková",bikeSeconds: 1425,runSeconds:923,beerSeconds:219,totalSeconds:2567},
        { position: 8, racer: "Martin Kučera",bikeSeconds: 1120,runSeconds:630,beerSeconds:1010,totalSeconds:2760},
        { position: 9, racer: "Lukáš Dvořák",bikeSeconds:1285,runSeconds:801,beerSeconds:712,totalSeconds:2798},
        { position: 10, racer: "Martin Viktorín",bikeSeconds: 1270,runSeconds:720,beerSeconds:1110,totalSeconds:3100},
        { position: 11, racer: "Matěj Zmítko",bikeSeconds: 1452,runSeconds:1022,beerSeconds:690,totalSeconds:3164},
        { position: 12, racer: "Jakub Láska",bikeSeconds:1494,runSeconds:1166,beerSeconds:528,totalSeconds:3188},
        { position: 13, racer: "Jan Vondrouš",bikeSeconds: 1200,runSeconds:700,beerSeconds:1470,totalSeconds:3370},
        { position: 14, racer: "Gabriela Haucková",bikeSeconds:1482,runSeconds:936,beerSeconds:1400,totalSeconds:3818},
        { position: 15, racer: "Dominik Bydžovský",bikeSeconds: 1271,runSeconds:859,beerSeconds:2212,totalSeconds:4342},
        { position: 16, racer: "Petr Holubec",bikeSeconds:1190,runSeconds:775,beerSeconds:2584,totalSeconds:4549},
        { position: 17, racer: "Vojtěch Stránský",bikeSeconds:1441,runSeconds:727,beerSeconds:0,totalSeconds:0},
            
            
    ],
    event: {
        date: "2025-06-14",
        maps: [
            { name: "Bike + Run route", url: "https://en.mapy.cz/s/jazohelupo" },
            { name: "Run route detail", url: "https://en.mapy.cz/s/denenamada" },
            {
                name: "Beer location",
                url: "https://mapy.com/cs/zakladni?source=firm&id=13018154&x=15.8932972&y=50.1820479&z=19",
            },
        ],
    },
};

/* =========================================================
   EXPORTS
   ========================================================= */

export const yearData: Record<number, YearData> = {
    2024: year2024,
    2025: year2025,
};

export const years: number[] = Object.keys(yearData).map(Number);
