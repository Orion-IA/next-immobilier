import { Search, Home, MapPin, Bed, Wallet, ArrowRight } from "lucide-react";
import { useState } from "react";

const ZONES = [
  "El Ghazala",
  "Ariana",
  "Borj Touil",
  "Chorfech Sidi Thabet",
  "Cité Chaker",
  "Cité Essahafa",
  "El Menzah",
  "Ennkhilet",
  "Jaafer",
  "Kalâat el-Andalous",
  "Mnihla",
  "Nour Jaafer",
  "Petite Ariana",
  "Riadh Andalous",
  "Douar Hicher",
  "Nahli",
  "Raoued",
  "Sidi Amor",
];

type Mode = "vente" | "location";

export const SearchBar = ({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) => {
  const [mode, setMode] = useState<Mode>("vente");
  const [focused, setFocused] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);

  const fields = [
    { icon: Home, label: "Type de bien", el: (
      <select className="w-full bg-transparent outline-none text-ink font-medium cursor-pointer text-sm">
        <option>Tous types</option><option>Villa</option><option>Appartement</option><option>Duplex</option><option>Studio</option><option>Terrain</option>
      </select>
    ) },
    { icon: MapPin, label: "Localisation", el: (
      <select className="w-full bg-transparent outline-none text-ink font-medium cursor-pointer text-sm">
        <option>Partout</option>
        {ZONES.map((z) => <option key={z}>{z}</option>)}
        <option>Autres</option>
      </select>
    ) },
    { icon: Bed, label: "Chambres", el: (
      <select className="w-full bg-transparent outline-none text-ink font-medium cursor-pointer text-sm">
        <option>Indifférent</option><option>S+1</option><option>S+2</option><option>S+3</option><option>S+4</option><option>S+5 et plus</option>
      </select>
    ) },
    { icon: Wallet, label: "Budget", el: (
      <select className="w-full bg-transparent outline-none text-ink font-medium cursor-pointer text-sm">
        <option>Indifférent</option>
        {mode === "vente" ? (
          <>
            <option>{"< 300 000 DT"}</option>
            <option>300 000 — 600 000 DT</option>
            <option>600 000 — 1M DT</option>
            <option>{"> 1M DT"}</option>
          </>
        ) : (
          <>
            <option>{"< 800 DT/mois"}</option>
            <option>800 — 1 500 DT/mois</option>
            <option>1 500 — 3 000 DT/mois</option>
            <option>{"> 3 000 DT/mois"}</option>
          </>
        )}
      </select>
    ) },
  ];

  const isMobile = variant === "mobile";
  const cols = "md:grid-cols-[auto_1fr_1fr_1fr_1fr_auto]";

  return (
    <div
      className={`relative bg-background shadow-[var(--shadow-elegant)] border border-border ${isMobile ? "" : "animate-scale-in"}`}
      style={isMobile ? undefined : { animationDelay: "0.7s" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Brand top accent bar */}
      <div className={`absolute top-0 left-0 h-[2px] bg-brand transition-all duration-700 ease-out ${hovered ? "w-full" : "w-16"}`} />

      {/* MODE TOGGLE */}
      <div className="flex border-b border-border bg-smoke/40">
        {(["vente", "location"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`relative flex-1 md:flex-none md:px-8 py-3 text-[11px] uppercase tracking-[0.25em] font-semibold transition-colors duration-300 ${mode === m ? "text-ink" : "text-muted-foreground hover:text-ink"}`}
          >
            {m === "vente" ? "Acheter" : "Louer"}
            <span className={`absolute bottom-0 left-0 h-[2px] bg-brand transition-all duration-500 ease-out ${mode === m ? "w-full" : "w-0"}`} />
          </button>
        ))}
        <div className="hidden md:flex items-center ml-auto pr-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          {ZONES.length}+ zones couvertes
        </div>
      </div>

      {/* FIELDS */}
      <div className={`grid grid-cols-1 ${isMobile ? "divide-y divide-border" : `${cols} md:divide-x divide-border`}`}>
        {!isMobile && (
          <div className="hidden md:flex items-center justify-center px-5 bg-ink text-bone">
            <Search className="w-4 h-4" />
          </div>
        )}
        {fields.map((f, i) => {
          const Icon = f.icon;
          const active = focused === i;
          return (
            <label
              key={f.label}
              onFocus={() => setFocused(i)}
              onBlur={() => setFocused(null)}
              className={`relative block px-5 py-3.5 group cursor-pointer transition-all duration-300 ${active ? "bg-smoke/60" : "hover:bg-smoke/40"}`}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <Icon className={`w-3 h-3 transition-all duration-500 ${active ? "text-brand scale-110" : "text-muted-foreground"}`} />
                <span className={`eyebrow text-[9px] transition-colors duration-300 ${active ? "text-brand" : "text-muted-foreground"}`}>{f.label}</span>
              </div>
              {f.el}
              <span className={`absolute bottom-0 left-0 h-[2px] bg-brand transition-all duration-500 ease-out ${active ? "w-full" : "w-0"}`} />
            </label>
          );
        })}
        <button className={`relative overflow-hidden bg-brand text-bone ${isMobile ? "w-full py-4" : "px-8 py-5"} flex items-center justify-center gap-3 group transition-all duration-500 hover:bg-ink`}>
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-ink transition-transform duration-700 ease-out" />
          <span className="relative flex items-center gap-3 text-xs tracking-[0.25em] uppercase font-semibold">
            <Search className="w-4 h-4 transition-transform duration-500 group-hover:rotate-90" />
            Rechercher
            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
          </span>
        </button>
      </div>
    </div>
  );
};
