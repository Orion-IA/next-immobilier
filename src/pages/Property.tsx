import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Bath, Bed, Check, Mail, MapPin, Maximize, Phone } from "lucide-react";
import logo from "@/assets/bestimmo-logo.png";
import { properties } from "@/data/properties";
import { LocationMap } from "@/components/LocationMap";
import { MortgageCalculator } from "@/components/MortgageCalculator";

const PHONES = [
  { label: "+216 29 103 308", href: "tel:+21629103308" },
  { label: "+216 54 331 173", href: "tel:+21654331173" },
];
const EMAIL = "contact@bestimmo.tn";
const ADDRESS = "22 Avenue Habib Bourguiba, Cité La Gazelle, Ariana";

export default function PropertyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === id);
  const [active, setActive] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 text-center">
        <h1 className="font-display font-bold text-3xl">Bien introuvable</h1>
        <button onClick={() => navigate(-1)} className="bg-ink text-bone px-6 py-3 text-xs uppercase tracking-[0.25em]">Retour</button>
      </div>
    );
  }

  const gallery = property.gallery && property.gallery.length > 0 ? property.gallery : [property.img];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container-editorial flex items-center justify-between h-20 md:h-24">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Bestimmo" className="h-28 md:h-32 w-auto" />
          </Link>
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold hover:text-brand transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
        </div>
      </header>

      <section className="container-editorial py-8 md:py-12">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12">
          {/* GALLERY */}
          <div>
            <div className="relative bg-ink overflow-hidden aspect-[4/3]">
              <img key={active} src={gallery[active]} alt={property.name} className="w-full h-full object-cover animate-fade-in" />
              <span className={`absolute top-4 left-4 text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 font-semibold ${property.tag === "Location" ? "bg-bone text-ink" : "bg-brand text-bone"}`}>{property.tag}</span>
              <span className="absolute bottom-4 right-4 bg-ink/80 text-bone text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 font-mono">{property.reference}</span>
            </div>
            {gallery.length > 1 && (
              <div className="flex gap-2 mt-3">
                {gallery.map((g, i) => (
                  <button key={i} onClick={() => setActive(i)} className={`w-20 h-20 overflow-hidden border-2 transition-all duration-300 ${active === i ? "border-brand" : "border-transparent opacity-60 hover:opacity-100"}`}>
                    <img src={g} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="flex flex-col">
            <div className="eyebrow text-brand mb-3 flex items-center gap-2"><MapPin className="w-3 h-3" /> {property.area}</div>
            <h1 className="font-display font-bold text-3xl md:text-5xl leading-tight">{property.name}</h1>
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

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              <a href={`mailto:${EMAIL}`} className="border border-ink text-ink py-4 px-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-ink hover:text-bone transition-colors duration-500 inline-flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" /> Écrire
              </a>
              <a href={PHONES[0].href} className="bg-brand text-bone py-4 px-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-ink transition-colors duration-500 inline-flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Appeler
              </a>
            </div>
          </div>
        </div>

        {/* MAP */}
        <div className="mt-12 md:mt-16">
          <div className="eyebrow text-brand mb-4 flex items-center gap-3"><span className="h-px w-8 bg-brand" /> Localisation</div>
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-6">{property.area}</h2>
          <LocationMap lat={property.lat} lng={property.lng} label={`${property.name} — ${property.area}`} className="h-80 md:h-[480px] w-full border border-border" />
        </div>

        {/* MORTGAGE */}
        <div className="mt-12 md:mt-16">
          <div className="eyebrow text-brand mb-4 flex items-center gap-3"><span className="h-px w-8 bg-brand" /> Financement</div>
          <MortgageCalculator defaultPrice={property.priceValue} />
        </div>
      </section>

      <footer className="bg-ink text-bone/60 py-10 mt-10">
        <div className="container-editorial text-xs uppercase tracking-[0.2em] text-bone/40 flex flex-col md:flex-row justify-between gap-3">
          <span>© 2026 Bestimmo — Tous droits réservés</span>
          <span>{ADDRESS}</span>
        </div>
      </footer>
    </div>
  );
}