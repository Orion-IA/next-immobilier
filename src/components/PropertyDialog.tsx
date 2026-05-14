import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Property } from "@/data/properties";
import { Bed, Bath, Maximize, MapPin, Mail, X, Check } from "lucide-react";
import { useState } from "react";

const PHONE_HREF = "tel:+21671876143";
const PHONE = "+216 71 876 143";
const EMAIL_HREF = "mailto:contact@bestimmo.tn";

export const PropertyDialog = ({ property, onClose }: { property: Property | null; onClose: () => void }) => {
  const [active, setActive] = useState(0);
  if (!property) return null;
  const gallery = property.gallery && property.gallery.length > 0 ? property.gallery : [property.img];

  return (
    <Dialog open={!!property} onOpenChange={(o) => { if (!o) { onClose(); setActive(0); } }}>
      <DialogContent className="max-w-6xl w-[95vw] p-0 gap-0 border-0 bg-background overflow-hidden max-h-[92vh] overflow-y-auto">
        <button onClick={() => { onClose(); setActive(0); }} className="absolute top-4 right-4 z-10 w-10 h-10 bg-bone/95 hover:bg-brand hover:text-bone flex items-center justify-center transition-all duration-300" aria-label="Fermer">
          <X className="w-5 h-5" />
        </button>

        <div className="grid lg:grid-cols-[1.4fr_1fr]">
          {/* GALLERY */}
          <div className="relative bg-ink">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden">
              <img key={active} src={gallery[active]} alt={property.name} className="w-full h-full object-cover animate-fade-in" />
              <span className={`absolute top-4 left-4 text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 font-semibold ${property.tag === "Location" ? "bg-bone text-ink" : "bg-brand text-bone"}`}>{property.tag}</span>
              <span className="absolute bottom-4 right-4 bg-ink/80 text-bone text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 font-mono">{property.reference}</span>
            </div>
            {gallery.length > 1 && (
              <div className="absolute bottom-4 left-4 flex gap-2">
                {gallery.map((g, i) => (
                  <button key={i} onClick={() => setActive(i)} className={`w-14 h-14 overflow-hidden border-2 transition-all duration-300 ${active === i ? "border-brand scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}>
                    <img src={g} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="p-6 md:p-10 flex flex-col">
            <div className="eyebrow text-brand mb-3 flex items-center gap-2"><MapPin className="w-3 h-3" /> {property.area}</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight">{property.name}</h2>
            <div className="font-display font-bold text-2xl md:text-3xl text-brand mt-4">{property.price}</div>

            <div className="grid grid-cols-3 gap-4 mt-8 py-6 border-y border-border">
              {[
                { icon: Bed, label: "Chambres", value: property.beds || "—" },
                { icon: Bath, label: "Salles d'eau", value: property.baths || "—" },
                { icon: Maximize, label: "Surface", value: `${property.sqft} m²` },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <s.icon className="w-5 h-5 text-brand mx-auto mb-2" strokeWidth={1.5} />
                  <div className="font-display font-bold text-lg">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="eyebrow text-muted-foreground mb-3">Description</div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            <div className="mt-6">
              <div className="eyebrow text-muted-foreground mb-3">Caractéristiques</div>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {property.features.map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand shrink-0" /> {f}</li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-8">
              <a href={EMAIL_HREF} className="border border-ink text-ink py-4 px-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-ink hover:text-bone transition-colors duration-500 inline-flex items-center justify-center gap-2 w-full">
                <Mail className="w-4 h-4" /> Écrire
              </a>
              <div className="mt-6 flex items-center justify-center gap-6">
                <span className="eyebrow text-muted-foreground">Suivez-nous</span>
                <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-brand transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-brand transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
