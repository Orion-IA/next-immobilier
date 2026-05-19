import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Upload } from "lucide-react";
import logo from "@/assets/bestimmo-logo.png";
import { ZONES, type Property, type PropertyTag, type PropertyType } from "@/data/properties";
import { addProperty, loadCustom, removeProperty, useAllProperties } from "@/lib/propertiesStore";
import { toast } from "@/components/ui/sonner";

const TYPES: PropertyType[] = ["Villa", "Appartement", "Duplex", "Studio", "Maison", "Penthouse", "Terrain"];

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });

export default function InsertPage() {
  const navigate = useNavigate();
  const all = useAllProperties();
  const custom = loadCustom();

  const [name, setName] = useState("");
  const [area, setArea] = useState(ZONES[0]);
  const [tag, setTag] = useState<PropertyTag>("Vente");
  const [type, setType] = useState<PropertyType>("Appartement");
  const [priceValue, setPriceValue] = useState<number>(0);
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [sqft, setSqft] = useState(0);
  const [lat, setLat] = useState(36.8665);
  const [lng, setLng] = useState(10.1647);
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    const arr = await Promise.all(Array.from(files).map(readFileAsDataUrl));
    setImages((prev) => [...prev, ...arr]);
  };

  const formatPrice = (v: number, t: PropertyTag) => {
    const n = new Intl.NumberFormat("fr-FR").format(v);
    return t === "Location" ? `${n} DT/mois` : `${n} DT`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || priceValue <= 0 || images.length === 0) {
      toast.error("Nom, prix et au moins une photo sont requis.");
      return;
    }
    setSubmitting(true);
    try {
      const id = `c-${Date.now()}`;
      const property: Property = {
        id,
        name: name.trim(),
        area,
        price: formatPrice(priceValue, tag),
        priceValue,
        beds,
        baths,
        sqft,
        img: images[0],
        gallery: images,
        tag,
        type,
        description: description.trim(),
        features: features.split(",").map((f) => f.trim()).filter(Boolean),
        reference: `BIM-${tag === "Vente" ? "V" : "L"}-${id.slice(-4).toUpperCase()}`,
        lat,
        lng,
      };
      addProperty(property);
      toast.success("Bien ajouté avec succès !");
      navigate(`/bien/${id}`);
    } catch (err) {
      toast.error("Erreur lors de l'enregistrement (photos trop lourdes ?)");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container-editorial flex items-center justify-between h-20 md:h-24">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Bestimmo" className="h-20 md:h-24 w-auto" />
          </Link>
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold hover:text-brand transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
        </div>
      </header>

      <section className="container-editorial py-10 md:py-16 max-w-4xl">
        <div className="eyebrow text-brand mb-3 flex items-center gap-3"><span className="h-px w-8 bg-brand" /> Espace agence</div>
        <h1 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-2">Ajouter un bien</h1>
        <p className="text-sm text-muted-foreground mb-10">Les biens ajoutés ici sont enregistrés localement sur cet appareil (navigateur). Pour les publier durablement, branchez Lovable Cloud.</p>

        <form onSubmit={onSubmit} className="grid gap-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Titre du bien" required>
              <input className={input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Étage de villa — Cité Ghazela" />
            </Field>
            <Field label="Type d'annonce">
              <select className={input} value={tag} onChange={(e) => setTag(e.target.value as PropertyTag)}>
                <option>Vente</option>
                <option>Location</option>
              </select>
            </Field>
            <Field label="Type de bien">
              <select className={input} value={type} onChange={(e) => setType(e.target.value as PropertyType)}>
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Zone">
              <select className={input} value={area} onChange={(e) => setArea(e.target.value)}>
                {ZONES.map((z) => <option key={z}>{z}</option>)}
              </select>
            </Field>
            <Field label={tag === "Vente" ? "Prix (DT)" : "Loyer (DT / mois)"} required>
              <input type="number" className={input} value={priceValue || ""} onChange={(e) => setPriceValue(parseFloat(e.target.value) || 0)} />
            </Field>
            <Field label="Surface (m²)">
              <input type="number" className={input} value={sqft || ""} onChange={(e) => setSqft(parseFloat(e.target.value) || 0)} />
            </Field>
            <Field label="Chambres">
              <input type="number" className={input} value={beds || ""} onChange={(e) => setBeds(parseInt(e.target.value) || 0)} />
            </Field>
            <Field label="Salles d'eau">
              <input type="number" className={input} value={baths || ""} onChange={(e) => setBaths(parseInt(e.target.value) || 0)} />
            </Field>
            <Field label="Latitude">
              <input type="number" step="0.0001" className={input} value={lat} onChange={(e) => setLat(parseFloat(e.target.value) || 0)} />
            </Field>
            <Field label="Longitude">
              <input type="number" step="0.0001" className={input} value={lng} onChange={(e) => setLng(parseFloat(e.target.value) || 0)} />
            </Field>
          </div>

          <Field label="Description">
            <textarea rows={5} className={input} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Field>

          <Field label="Caractéristiques (séparées par des virgules)">
            <input className={input} value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="Climatisation, Parking, Jardin, ..." />
          </Field>

          <Field label="Photos" required>
            <label className="border-2 border-dashed border-border hover:border-brand transition-colors p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-bone/30">
              <Upload className="w-5 h-5 text-brand" />
              <span className="text-xs uppercase tracking-[0.2em]">Cliquez pour téléverser</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
            </label>
            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-3">
                {images.map((src, i) => (
                  <div key={i} className="relative group aspect-square overflow-hidden">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))} className="absolute top-1 right-1 bg-ink/80 text-bone p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Field>

          <button type="submit" disabled={submitting} className="bg-brand text-bone py-4 px-6 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-ink transition-colors duration-500 inline-flex items-center justify-center gap-2 disabled:opacity-50">
            <Plus className="w-4 h-4" /> {submitting ? "Enregistrement..." : "Ajouter le bien"}
          </button>
        </form>

        {custom.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display font-bold text-2xl mb-4">Biens ajoutés ({custom.length})</h2>
            <ul className="divide-y divide-border border-y border-border">
              {custom.map((p) => (
                <li key={p.id} className="flex items-center gap-4 py-3">
                  <img src={p.img} alt="" className="w-14 h-14 object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.area} · {p.price}</div>
                  </div>
                  <Link to={`/bien/${p.id}`} className="text-xs uppercase tracking-[0.2em] link-underline">Voir</Link>
                  <button onClick={() => { removeProperty(p.id); navigate(0); }} className="text-destructive p-2" aria-label="Supprimer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-10 text-xs text-muted-foreground">Total catalogue : {all.length} biens.</p>
      </section>
    </div>
  );
}

const input = "w-full bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand transition-colors";

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <label className="block">
    <span className="eyebrow text-muted-foreground block mb-2">{label}{required && <span className="text-brand"> *</span>}</span>
    {children}
  </label>
);