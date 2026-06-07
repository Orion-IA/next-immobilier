import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, LogOut, Plus, Trash2, Upload } from "lucide-react";
import { z } from "zod";
import logo from "@/assets/bestimmo-logo.png";
import { ZONES, type PropertyTag, type PropertyType } from "@/data/properties";
import { supabase } from "@/integrations/supabase/client";
import { fetchDbProperties } from "@/lib/propertiesStore";
import { toast } from "@/components/ui/sonner";
import type { Property } from "@/data/properties";

const TYPES: PropertyType[] = ["Villa", "Appartement", "Duplex", "Studio", "Maison", "Penthouse", "Terrain"];

const authSchema = z.object({
  email: z.string().trim().email("Email invalide").max(255),
  password: z.string().min(6, "6 caractères minimum").max(72),
});

const propertySchema = z.object({
  name: z.string().trim().min(2, "Titre requis").max(120),
  area: z.string().min(1).max(120),
  tag: z.enum(["Vente", "Location", "Neuf"]),
  type: z.string().min(1).max(40),
  priceValue: z.number().positive("Prix requis"),
  beds: z.number().int().min(0).max(50),
  baths: z.number().int().min(0).max(50),
  sqft: z.number().int().min(0).max(100000),
  lat: z.number(),
  lng: z.number(),
  description: z.string().max(4000),
  features: z.string().max(2000),
});

const input = "w-full bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand transition-colors";

export default function InsertPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setAuthLoading(false); });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (authLoading) return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Chargement…</div>;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container-editorial flex items-center justify-between h-20 md:h-24">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Bestimmo" className="h-20 md:h-24 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            {session && (
              <button onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold hover:text-brand transition-colors">
                <LogOut className="w-4 h-4" /> Déconnexion
              </button>
            )}
            <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold hover:text-brand transition-colors">
              <ArrowLeft className="w-4 h-4" /> Retour
            </button>
          </div>
        </div>
      </header>

      {session ? <PropertyForm userId={session.user.id} /> : <AuthForm />}
    </div>
  );
}

function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = authSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { email: em, password: pw } = parsed.data;
    const { error } = mode === "signin"
      ? await supabase.auth.signInWithPassword({ email: em, password: pw })
      : await supabase.auth.signUp({
          email: em,
          password: pw,
          options: { emailRedirectTo: `${window.location.origin}/insert` },
        });
    setLoading(false);
    if (error) toast.error(error.message);
    else if (mode === "signup") toast.success("Compte créé, vous pouvez vous connecter.");
  };

  return (
    <section className="container-editorial py-16 max-w-md">
      <div className="eyebrow text-brand mb-3 flex items-center gap-3"><span className="h-px w-8 bg-brand" /> Espace agence</div>
      <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">{mode === "signin" ? "Connexion" : "Créer un compte"}</h1>
      <p className="text-sm text-muted-foreground mb-8">Réservé à l'équipe Bestimmo pour gérer le catalogue.</p>
      <form onSubmit={submit} className="grid gap-4">
        <label className="block">
          <span className="eyebrow text-muted-foreground block mb-2">Email</span>
          <input type="email" className={input} value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="block">
          <span className="eyebrow text-muted-foreground block mb-2">Mot de passe</span>
          <input type="password" className={input} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        </label>
        <button type="submit" disabled={loading} className="bg-brand text-bone py-4 px-6 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-ink transition-colors duration-500 disabled:opacity-50">
          {loading ? "…" : mode === "signin" ? "Se connecter" : "Créer le compte"}
        </button>
        <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-xs underline text-muted-foreground hover:text-brand">
          {mode === "signin" ? "Pas encore de compte ? Créer un compte" : "Déjà un compte ? Se connecter"}
        </button>
      </form>
    </section>
  );
}

function PropertyForm({ userId }: { userId: string }) {
  const navigate = useNavigate();
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
  const [videoUrl, setVideoUrl] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [mine, setMine] = useState<Property[]>([]);

  useEffect(() => {
    fetchDbProperties().then((all) => setMine(all));
  }, []);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const arr = Array.from(list).filter((f) => f.type.startsWith("image/") && f.size <= 8 * 1024 * 1024);
    setFiles((prev) => [...prev, ...arr]);
    setPreviews((prev) => [...prev, ...arr.map((f) => URL.createObjectURL(f))]);
  };

  const removeFile = (i: number) => {
    setFiles(files.filter((_, j) => j !== i));
    setPreviews(previews.filter((_, j) => j !== i));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = propertySchema.safeParse({ name, area, tag, type, priceValue, beds, baths, sqft, lat, lng, description, features });
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    if (files.length === 0) { toast.error("Ajoutez au moins une photo."); return; }

    setSubmitting(true);
    try {
      // Upload images to storage
      const urls: string[] = [];
      for (const file of files) {
        const ext = file.name.split(".").pop() || "jpg";
        const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage.from("property-images").upload(path, file, { contentType: file.type });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("property-images").getPublicUrl(path);
        urls.push(pub.publicUrl);
      }

      const priceStr = tag === "Location"
        ? `${new Intl.NumberFormat("fr-FR").format(priceValue)} DT/mois`
        : `${new Intl.NumberFormat("fr-FR").format(priceValue)} DT`;

      const { data: inserted, error } = await supabase
        .from("properties")
        .insert({
          created_by: userId,
          name: parsed.data.name,
          area: parsed.data.area,
          tag: parsed.data.tag,
          type: parsed.data.type,
          price: priceStr,
          price_value: priceValue,
          beds, baths, sqft, lat, lng,
          description: parsed.data.description,
          features: features.split(",").map((f) => f.trim()).filter(Boolean),
          img: urls[0],
          gallery: urls,
          video_url: videoUrl.trim() || null,
          reference: `BIM-${tag === "Vente" ? "V" : tag === "Location" ? "L" : "N"}-${Date.now().toString().slice(-5)}`,
        } as any)
        .select("id")
        .single();
      if (error) throw error;

      toast.success("Bien publié !");
      navigate(`/bien/${inserted.id}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Erreur lors de la publication");
    } finally {
      setSubmitting(false);
    }
  };

  const myItems = mine.filter((p) => mine.length > 0); // all DB items shown

  const deleteItem = async (id: string) => {
    if (!confirm("Supprimer ce bien ?")) return;
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { setMine(mine.filter((p) => p.id !== id)); toast.success("Supprimé."); }
  };

  const setStatus = async (p: Property, status: "active" | "vendu" | "loue") => {
    const { error } = await supabase.from("properties").update({ status } as any).eq("id", p.id);
    if (error) { toast.error(error.message); return; }
    setMine(mine.map((x) => x.id === p.id ? { ...x, status } : x));
    toast.success(status === "active" ? "Réactivé" : status === "vendu" ? "Marqué vendu" : "Marqué loué");
  };

  return (
    <section className="container-editorial py-10 md:py-16 max-w-4xl">
      <div className="eyebrow text-brand mb-3 flex items-center gap-3"><span className="h-px w-8 bg-brand" /> Espace agence</div>
      <h1 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-2">Ajouter un bien</h1>
      <p className="text-sm text-muted-foreground mb-10">Les biens publiés ici apparaissent immédiatement sur le site, pour tous les visiteurs.</p>

      <form onSubmit={onSubmit} className="grid gap-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Titre du bien" required>
            <input className={input} value={name} onChange={(e) => setName(e.target.value)} maxLength={120} placeholder="Étage de villa — Cité Ghazela" />
          </Field>
          <Field label="Type d'annonce">
            <select className={input} value={tag} onChange={(e) => setTag(e.target.value as PropertyTag)}>
              <option>Vente</option><option>Location</option><option>Neuf</option>
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
          <Field label={tag === "Location" ? "Loyer (DT / mois)" : "Prix (DT)"} required>
            <input type="number" className={input} value={priceValue || ""} onChange={(e) => setPriceValue(parseFloat(e.target.value) || 0)} />
          </Field>
          <Field label="Surface (m²)">
            <input type="number" className={input} value={sqft || ""} onChange={(e) => setSqft(parseInt(e.target.value) || 0)} />
          </Field>
          <Field label="Chambres">
            <input type="number" className={input} value={beds || ""} onChange={(e) => setBeds(parseInt(e.target.value) || 0)} />
          </Field>
          <Field label="Salles d'eau">
            <input type="number" className={input} value={baths || ""} onChange={(e) => setBaths(parseInt(e.target.value) || 0)} />
          </Field>
          <Field label="Latitude"><input type="number" step="0.0001" className={input} value={lat} onChange={(e) => setLat(parseFloat(e.target.value) || 0)} /></Field>
          <Field label="Longitude"><input type="number" step="0.0001" className={input} value={lng} onChange={(e) => setLng(parseFloat(e.target.value) || 0)} /></Field>
        </div>

        <Field label="Description">
          <textarea rows={5} className={input} value={description} onChange={(e) => setDescription(e.target.value)} maxLength={4000} />
        </Field>

        <Field label="Caractéristiques (séparées par des virgules)">
          <input className={input} value={features} onChange={(e) => setFeatures(e.target.value)} maxLength={2000} placeholder="Climatisation, Parking, Jardin, ..." />
        </Field>

        <Field label="Lien vidéo (YouTube, Vimeo ou mp4) — optionnel">
          <input type="url" className={input} value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} maxLength={500} placeholder="https://www.youtube.com/watch?v=..." />
        </Field>

        <Field label="Photos (max 8 Mo / image)" required>
          <label className="border-2 border-dashed border-border hover:border-brand transition-colors p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-bone/30">
            <Upload className="w-5 h-5 text-brand" />
            <span className="text-xs uppercase tracking-[0.2em]">Cliquez pour téléverser</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
          </label>
          {previews.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-3">
              {previews.map((src, i) => (
                <div key={i} className="relative group aspect-square overflow-hidden">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeFile(i)} className="absolute top-1 right-1 bg-ink/80 text-bone p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Field>

        <button type="submit" disabled={submitting} className="bg-brand text-bone py-4 px-6 text-xs uppercase tracking-[0.25em] font-semibold hover:bg-ink transition-colors duration-500 inline-flex items-center justify-center gap-2 disabled:opacity-50">
          <Plus className="w-4 h-4" /> {submitting ? "Publication…" : "Publier le bien"}
        </button>
      </form>

      {myItems.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display font-bold text-2xl mb-4">Biens publiés ({myItems.length})</h2>
          <ul className="divide-y divide-border border-y border-border">
            {myItems.map((p) => (
              <li key={p.id} className="flex items-center gap-4 py-3">
                <img src={p.img} alt="" className="w-14 h-14 object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate flex items-center gap-2">
                    {p.name}
                    {p.status === "vendu" && <span className="text-[9px] uppercase tracking-[0.2em] bg-destructive text-bone px-2 py-0.5">Vendu</span>}
                    {p.status === "loue" && <span className="text-[9px] uppercase tracking-[0.2em] bg-destructive text-bone px-2 py-0.5">Loué</span>}
                  </div>
                  <div className="text-xs text-muted-foreground">{p.area} · {p.price}</div>
                </div>
                {p.status && p.status !== "active" ? (
                  <button onClick={() => setStatus(p, "active")} className="text-[10px] uppercase tracking-[0.2em] border border-border px-2 py-1 hover:border-brand hover:text-brand">Réactiver</button>
                ) : p.tag === "Location" ? (
                  <button onClick={() => setStatus(p, "loue")} className="text-[10px] uppercase tracking-[0.2em] border border-border px-2 py-1 hover:border-brand hover:text-brand">Marquer loué</button>
                ) : (
                  <button onClick={() => setStatus(p, "vendu")} className="text-[10px] uppercase tracking-[0.2em] border border-border px-2 py-1 hover:border-brand hover:text-brand">Marquer vendu</button>
                )}
                <Link to={`/bien/${p.id}`} className="text-xs uppercase tracking-[0.2em] link-underline">Voir</Link>
                <button onClick={() => deleteItem(p.id)} className="text-destructive p-2" aria-label="Supprimer">
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <label className="block">
    <span className="eyebrow text-muted-foreground block mb-2">{label}{required && <span className="text-brand"> *</span>}</span>
    {children}
  </label>
);