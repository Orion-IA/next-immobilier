import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Property } from "@/data/properties";
import { Bed, Bath, Maximize, MapPin, Phone, Mail, X, Check } from "lucide-react";
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

            <div className="mt-auto pt-8 grid grid-cols-2 gap-3">
              <a href={PHONE_HREF} className="bg-brand text-bone py-4 px-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-ink transition-colors duration-500 inline-flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> {PHONE}
              </a>
              <a href={EMAIL_HREF} className="border border-ink text-ink py-4 px-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-ink hover:text-bone transition-colors duration-500 inline-flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" /> Écrire
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
