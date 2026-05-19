import logo from "@/assets/bestimmo-logo.png";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Phone, MapPin, Mail, Menu, X, Home, Bed, Wallet, Search, SlidersHorizontal } from "lucide-react";
import { ZONES, type Property } from "@/data/properties";
import { useAllProperties } from "@/lib/propertiesStore";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyDialog } from "@/components/PropertyDialog";

const PHONES = [
  { label: "+216 29 103 308", href: "tel:+21629103308" },
  { label: "+216 54 331 173", href: "tel:+21654331173" },
];
const EMAIL = "contact@bestimmo.tn";
const ADDRESS = "22 Avenue Habib Bourguiba, Cité La Gazelle, Ariana";

const TYPES = ["Tous types", "Villa", "Appartement", "Duplex", "Studio", "Maison", "Penthouse", "Terrain"];
const ROOMS = ["Indifférent", "S+1", "S+2", "S+3", "S+4", "S+5 et plus"];

export default function Listings({ mode }: { mode: "Vente" | "Location" }) {
  const ALL = useAllProperties();
  const [type, setType] = useState("Tous types");
  const [zone, setZone] = useState("Partout");
  const [rooms, setRooms] = useState("Indifférent");
  const [budget, setBudget] = useState<[number, number] | null>(null);
  const [open, setOpen] = useState<Property | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
  }, [mode]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const filtered = useMemo(() => {
    return ALL.filter((p) => {
      if (p.tag !== mode) return false;
      if (type !== "Tous types" && p.type !== type) return false;
      if (zone !== "Partout" && zone !== "Autres" && p.area !== zone) return false;
      if (rooms !== "Indifférent") {
        const want = rooms === "S+5 et plus" ? 5 : parseInt(rooms.replace("S+", ""), 10);
        if (rooms === "S+5 et plus" ? p.beds < 5 : p.beds !== want) return false;
      }
      if (budget) {
        if (p.priceValue < budget[0] || p.priceValue > budget[1]) return false;
      }
      return true;
    });
  }, [mode, type, zone, rooms, budget]);

  const budgetOptions = mode === "Vente"
    ? [
        { label: "Indifférent", value: null },
        { label: "< 300 000 DT", value: [0, 300000] as [number, number] },
        { label: "300 000 — 600 000 DT", value: [300000, 600000] as [number, number] },
        { label: "600 000 — 1M DT", value: [600000, 1000000] as [number, number] },
        { label: "> 1M DT", value: [1000000, 99999999] as [number, number] },
      ]
    : [
        { label: "Indifférent", value: null },
        { label: "< 800 DT/mois", value: [0, 800] as [number, number] },
        { label: "800 — 1 500 DT/mois", value: [800, 1500] as [number, number] },
        { label: "1 500 — 3 000 DT/mois", value: [1500, 3000] as [number, number] },
        { label: "> 3 000 DT/mois", value: [3000, 9999999] as [number, number] },
      ];

  const navLinkCls = ({ isActive }: { isActive: boolean }) =>
    `link-underline ${isActive ? "text-brand" : ""}`;

  const Filter = ({ label, icon: Icon, children }: { label: string; icon: any; children: React.ReactNode }) => (
    <div className="border-b border-border py-5">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-3.5 h-3.5 text-brand" />
        <span className="eyebrow text-[10px]">{label}</span>
      </div>
      {children}
    </div>
  );

  const Sidebar = (
    <aside className="bg-background lg:sticky lg:top-32 lg:self-start lg:h-[calc(100vh-9rem)] lg:overflow-y-auto p-6 border border-border">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display font-bold text-xl flex items-center gap-2"><SlidersHorizontal className="w-4 h-4 text-brand" /> Filtres</h2>
        <span className="text-xs text-muted-foreground">{filtered.length} bien{filtered.length > 1 ? "s" : ""}</span>
      </div>

      <Filter label="Type de bien" icon={Home}>
        <div className="flex flex-wrap gap-1.5">
          {TYPES.map((t) => (
            <button key={t} onClick={() => setType(t)} className={`text-[11px] px-2.5 py-1.5 border transition-all duration-300 ${type === t ? "bg-ink text-bone border-ink" : "border-border hover:border-ink"}`}>{t}</button>
          ))}
        </div>
      </Filter>

      <Filter label="Localisation" icon={MapPin}>
        <select value={zone} onChange={(e) => setZone(e.target.value)} className="w-full bg-transparent border-b border-border outline-none text-sm font-medium py-2 cursor-pointer focus:border-brand transition-colors">
          <option>Partout</option>
          {ZONES.map((z) => <option key={z}>{z}</option>)}
          <option>Autres</option>
        </select>
      </Filter>

      <Filter label="Chambres" icon={Bed}>
        <div className="flex flex-wrap gap-1.5">
          {ROOMS.map((r) => (
            <button key={r} onClick={() => setRooms(r)} className={`text-[11px] px-2.5 py-1.5 border transition-all duration-300 ${rooms === r ? "bg-ink text-bone border-ink" : "border-border hover:border-ink"}`}>{r}</button>
          ))}
        </div>
      </Filter>

      <Filter label="Budget" icon={Wallet}>
        <div className="flex flex-col gap-1.5">
          {budgetOptions.map((b) => {
            const active = (!budget && !b.value) || (budget && b.value && budget[0] === b.value[0] && budget[1] === b.value[1]);
            return (
              <button key={b.label} onClick={() => setBudget(b.value)} className={`text-[11px] px-2.5 py-2 text-left border transition-all duration-300 ${active ? "bg-ink text-bone border-ink" : "border-border hover:border-ink"}`}>{b.label}</button>
            );
          })}
        </div>
      </Filter>

      <button onClick={() => { setType("Tous types"); setZone("Partout"); setRooms("Indifférent"); setBudget(null); }} className="mt-6 w-full border border-border py-3 text-[11px] uppercase tracking-[0.25em] hover:bg-smoke transition-colors">
        Réinitialiser
      </button>
    </aside>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* TOP BAR */}
      <div className="hidden md:block bg-ink text-bone/80 text-xs">
        <div className="container-editorial flex items-center justify-between h-9">
          <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-brand" /> {ADDRESS}</span>
          <div className="flex items-center gap-6">
            {PHONES.map((p) => (<a key={p.href} href={p.href} className="flex items-center gap-2 hover:text-brand transition-colors"><Phone className="w-3 h-3" /> {p.label}</a>))}
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-brand transition-colors"><Mail className="w-3 h-3" /> {EMAIL}</a>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container-editorial flex items-center justify-between h-20 md:h-28">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Bestimmo" className="h-24 md:h-28 w-auto block transition-transform duration-500 group-hover:scale-105" />
          </Link>
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
            <Link to="/" className="link-underline">Accueil</Link>
            <NavLink to="/vente" className={navLinkCls}>Vente</NavLink>
            <NavLink to="/location" className={navLinkCls}>Location</NavLink>
            <Link to="/#services" className="link-underline">Services</Link>
            <Link to="/#contact" className="link-underline">Contact</Link>
          </nav>
          <a href={PHONES[0].href} className="hidden md:inline-flex items-center gap-2 bg-brand text-bone px-5 py-2.5 text-sm font-medium hover:bg-ink transition-all duration-500">
            <Phone className="w-4 h-4" /> Appeler
          </a>
          <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 -mr-2" aria-label="Menu"><Menu className="w-6 h-6" /></button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[60] md:hidden transition-all duration-500 ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-background flex flex-col transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between p-6 border-b border-border">
            <img src={logo} alt="Bestimmo" className="h-12 w-auto" />
            <button onClick={() => setMenuOpen(false)} className="p-2 -mr-2"><X className="w-6 h-6" /></button>
          </div>
          <nav className="flex-1 px-6 py-10 flex flex-col gap-1">
            {[{ to: "/", l: "Accueil" }, { to: "/vente", l: "Vente" }, { to: "/location", l: "Location" }, { to: "/#services", l: "Services" }, { to: "/#contact", l: "Contact" }].map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className="font-display font-bold text-3xl py-3 border-b border-border hover:text-brand transition-colors">{l.l}</Link>
            ))}
          </nav>
        </div>
      </div>

      {/* PAGE HEADER */}
      <section className="bg-ink text-bone py-14 md:py-20">
        <div className="container-editorial">
          <div className="eyebrow text-brand mb-4 flex items-center gap-3"><span className="h-px w-8 bg-brand" /> Catalogue {mode}</div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05]">
            Biens à <span className="text-brand">{mode === "Vente" ? "vendre" : "louer"}</span>
          </h1>
          <p className="mt-4 max-w-xl text-bone/70 text-sm md:text-base">Affinez votre recherche avec les filtres à gauche. Cliquez sur un bien pour le découvrir en grand.</p>
        </div>
      </section>

      {/* MAIN */}
      <section className="container-editorial py-10 md:py-14">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 md:gap-10">
          {/* Mobile filter toggle */}
          <div className="lg:hidden">
            <button onClick={() => setFiltersOpen((v) => !v)} className="w-full bg-ink text-bone py-3 text-xs uppercase tracking-[0.25em] font-semibold inline-flex items-center justify-center gap-2">
              <SlidersHorizontal className="w-4 h-4" /> {filtersOpen ? "Masquer" : "Afficher"} les filtres
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${filtersOpen ? "max-h-[2000px] mt-4" : "max-h-0"}`}>
              {Sidebar}
            </div>
          </div>

          <div className="hidden lg:block">{Sidebar}</div>

          <div>
            {filtered.length === 0 ? (
              <div className="border border-border p-12 text-center">
                <Search className="w-10 h-10 text-muted-foreground mx-auto mb-4" strokeWidth={1.25} />
                <h3 className="font-display font-bold text-2xl">Aucun bien ne correspond</h3>
                <p className="text-sm text-muted-foreground mt-2">Essayez d'élargir vos critères de recherche.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {filtered.map((p) => <PropertyCard key={p.id} p={p} onOpen={setOpen} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER MIN */}
      <footer className="bg-ink text-bone/60 py-10 mt-10">
        <div className="container-editorial text-xs uppercase tracking-[0.2em] text-bone/40 flex flex-col md:flex-row justify-between gap-3">
          <span>© 2026 Bestimmo — Tous droits réservés</span>
          <span>{ADDRESS}</span>
        </div>
      </footer>

      <PropertyDialog property={open} onClose={() => setOpen(null)} />
    </div>
  );
}
