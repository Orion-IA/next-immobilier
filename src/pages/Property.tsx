import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Bath, Bed, Check, ChevronLeft, ChevronRight, Expand, Mail, MapPin, Maximize, Phone, Trash2, X } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import logo from "@/assets/bestimmo-logo.png";
import { properties as STATIC, type Property } from "@/data/properties";
import { supabase } from "@/integrations/supabase/client";
import { rowToProperty, type DbPropertyRow } from "@/lib/propertiesStore";
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
  const staticMatch = useMemo(() => STATIC.find((p) => p.id === id), [id]);
  const [dbProperty, setDbProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(!staticMatch);
  const [active, setActive] = useState(0);
  const [session, setSession] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const galleryLenRef = useRef(1);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      const n = galleryLenRef.current;
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + n) % n);
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  useEffect(() => {
    if (staticMatch || !id) return;
    setLoading(true);
    supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        setDbProperty(data ? rowToProperty(data as DbPropertyRow) : null);
        setLoading(false);
      });
  }, [id, staticMatch]);

  const property = staticMatch ?? dbProperty;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">Chargement…</div>;
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 text-center">
        <h1 className="font-display font-bold text-3xl">Bien introuvable</h1>
        <button onClick={() => navigate(-1)} className="bg-ink text-bone px-6 py-3 text-xs uppercase tracking-[0.25em]">Retour</button>
      </div>
    );
  }

  const gallery = property.gallery && property.gallery.length > 0 ? property.gallery : [property.img];
  galleryLenRef.current = gallery.length;
  const isDbProperty = !staticMatch;

  const handleDelete = async () => {
    if (!id) return;
    if (!confirm("Supprimer définitivement ce bien ?")) return;
    setDeleting(true);
    const { error } = await supabase.from("properties").delete().eq("id", id);
    setDeleting(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Bien supprimé.");
    navigate("/biens");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container-editorial flex items-center justify-between h-16 md:h-24">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Bestimmo" className="h-14 md:h-24 w-auto" />
          </Link>
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] font-semibold hover:text-brand transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
        </div>
      </header>

      {session && isDbProperty && (
        <div className="container-editorial pt-4">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 border border-destructive text-destructive py-2 px-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-destructive hover:text-bone transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" /> {deleting ? "Suppression…" : "Supprimer ce bien"}
          </button>
        </div>
      )}

      <section className="container-editorial py-5 md:py-12">
        <div className="flex flex-col gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* GALLERY */}
          <div>
            <div className="group relative bg-ink overflow-hidden aspect-[4/3] w-full shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)] ring-1 ring-ink/5">
              <button
                type="button"
                onClick={() => setLightbox(true)}
                aria-label="Agrandir la photo"
                className="absolute inset-0 w-full h-full cursor-zoom-in"
              >
                <img key={active} src={gallery[active]} alt={property.name} className="w-full h-full object-contain animate-fade-in" />
              </button>
              <span className={`pointer-events-none absolute top-3 left-3 md:top-4 md:left-4 text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 font-semibold backdrop-blur-sm ${property.tag === "Location" ? "bg-bone/90 text-ink" : "bg-brand/95 text-bone"}`}>{property.tag}</span>
              <span className="pointer-events-none absolute top-3 right-3 md:top-4 md:right-4 bg-ink/70 backdrop-blur-sm text-bone text-[9px] md:text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 font-mono">{property.reference}</span>
              <div
                onClick={() => setLightbox(true)}
                className="pointer-events-auto absolute bottom-3 right-3 md:bottom-4 md:right-4 w-9 h-9 md:w-10 md:h-10 bg-bone/90 hover:bg-brand hover:text-bone text-ink flex items-center justify-center transition-all duration-300 cursor-zoom-in opacity-0 group-hover:opacity-100"
                aria-hidden
              >
                <Expand className="w-4 h-4" />
              </div>
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); setActive((a) => (a - 1 + gallery.length) % gallery.length); }}
                    aria-label="Photo précédente"
                    className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-bone/90 hover:bg-brand hover:text-bone text-ink flex items-center justify-center transition-all duration-300 backdrop-blur-sm shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setActive((a) => (a + 1) % gallery.length); }}
                    aria-label="Photo suivante"
                    className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-bone/90 hover:bg-brand hover:text-bone text-ink flex items-center justify-center transition-all duration-300 backdrop-blur-sm shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                  </button>
                  <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 bg-ink/70 backdrop-blur-sm text-bone text-[10px] tracking-[0.3em] font-mono px-3 py-1.5">
                    {String(active + 1).padStart(2, "0")} <span className="text-bone/50 mx-1">—</span> {String(gallery.length).padStart(2, "0")}
                  </div>
                </>
              )}
            </div>
            {gallery.length > 1 && (
              <div className="flex gap-2 md:gap-3 mt-3 md:mt-4 overflow-x-auto pb-1 snap-x">
                {gallery.map((g, i) => (
                  <button key={i} onClick={() => setActive(i)} className={`shrink-0 snap-start w-16 h-16 md:w-[88px] md:h-[88px] overflow-hidden transition-all duration-300 ring-1 ${active === i ? "ring-2 ring-brand opacity-100" : "ring-ink/10 opacity-50 hover:opacity-100"}`}>
                    <img src={g} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="flex flex-col">
            <div className="eyebrow text-brand mb-3 flex items-center gap-2"><MapPin className="w-3 h-3" /> {property.area}</div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl leading-tight break-words">{property.name}</h1>
            <div className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-brand mt-3 md:mt-4">{property.price}</div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 md:mt-8 py-5 md:py-6 border-y border-border">
              {[
                { icon: Bed, label: "Chambres", value: property.beds || "—" },
                { icon: Bath, label: "Salles d'eau", value: property.baths || "—" },
                { icon: Maximize, label: "Surface", value: `${property.sqft} m²` },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <s.icon className="w-5 h-5 text-brand mx-auto mb-2" strokeWidth={1.5} />
                  <div className="font-display font-bold text-base sm:text-lg">{s.value}</div>
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="eyebrow text-muted-foreground mb-3">Description</div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            <div className="mt-6">
              <div className="eyebrow text-muted-foreground mb-3">Caractéristiques</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {property.features.map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand shrink-0" /> {f}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
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

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-md flex flex-col animate-fade-in" onClick={() => setLightbox(false)}>
          <div className="flex items-center justify-between px-5 md:px-8 py-4 text-bone/70 text-[10px] md:text-xs uppercase tracking-[0.3em] font-mono">
            <span>{property.reference}</span>
            <span>{String(active + 1).padStart(2, "0")} <span className="text-bone/40 mx-1">—</span> {String(gallery.length).padStart(2, "0")}</span>
            <button onClick={(e) => { e.stopPropagation(); setLightbox(false); }} aria-label="Fermer" className="w-10 h-10 flex items-center justify-center hover:text-brand transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="relative flex-1 flex items-center justify-center px-4 md:px-20 pb-8" onClick={(e) => e.stopPropagation()}>
            <img key={active} src={gallery[active]} alt={property.name} className="max-w-full max-h-full object-contain animate-fade-in" />
            {gallery.length > 1 && (
              <>
                <button
                  onClick={() => setActive((a) => (a - 1 + gallery.length) % gallery.length)}
                  aria-label="Photo précédente"
                  className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-bone/10 hover:bg-brand text-bone flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                >
                  <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => setActive((a) => (a + 1) % gallery.length)}
                  aria-label="Photo suivante"
                  className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-bone/10 hover:bg-brand text-bone flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                >
                  <ChevronRight className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-2 justify-center pb-6 px-4 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
              {gallery.map((g, i) => (
                <button key={i} onClick={() => setActive(i)} className={`shrink-0 w-14 h-14 md:w-16 md:h-16 overflow-hidden transition-all duration-300 ring-1 ${active === i ? "ring-2 ring-brand opacity-100" : "ring-bone/20 opacity-50 hover:opacity-100"}`}>
                  <img src={g} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}