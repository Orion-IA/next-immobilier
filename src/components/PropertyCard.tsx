import { ArrowUpRight, Bed, Bath, Maximize } from "lucide-react";
import { Link } from "react-router-dom";
import type { Property } from "@/data/properties";

export const PropertyCard = ({ p, onOpen }: { p: Property; onOpen?: (p: Property) => void }) => (
  <Link to={`/bien/${p.id}`} className="group cursor-pointer h-full flex flex-col">
    <article className="h-full flex flex-col">
    <div className="relative overflow-hidden bg-secondary aspect-[4/5]">
      <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
      <span className={`absolute top-3 left-3 text-[9px] uppercase tracking-[0.25em] px-2.5 py-1 font-semibold transition-transform duration-500 group-hover:scale-105 ${p.tag === "Location" ? "bg-ink text-bone" : "bg-brand text-bone"}`}>{p.tag}</span>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <span className="text-bone text-[10px] uppercase tracking-[0.2em]">Voir le bien</span>
        <span className="w-8 h-8 bg-brand text-bone flex items-center justify-center"><ArrowUpRight className="w-3.5 h-3.5" /></span>
      </div>
    </div>
    <div className="pt-4 flex flex-col gap-2 flex-1">
      <div className="eyebrow text-muted-foreground text-[10px]">{p.area}</div>
      <h3 className="font-display font-bold text-base md:text-lg group-hover:text-brand transition-colors leading-tight">{p.name}</h3>
      <div className="text-xs text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 mt-1">
        {p.beds > 0 && <span className="inline-flex items-center gap-1"><Bed className="w-3 h-3" /> {p.beds}</span>}
        {p.baths > 0 && <span className="inline-flex items-center gap-1"><Bath className="w-3 h-3" /> {p.baths}</span>}
        <span className="inline-flex items-center gap-1"><Maximize className="w-3 h-3" /> {p.sqft} m²</span>
      </div>
      <div className="mt-auto pt-3 flex justify-between items-end border-t border-border">
        <div className="font-display font-bold text-base md:text-lg text-brand whitespace-nowrap">{p.price}</div>
        <span className="text-[10px] uppercase tracking-[0.2em] inline-flex items-center gap-1 link-underline font-medium">Détails <ArrowUpRight className="w-3 h-3" /></span>
      </div>
    </div>
    </article>
  </Link>
);
