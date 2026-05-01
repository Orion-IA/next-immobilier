import logo from "@/assets/next-logo.jpg";
import heroImg from "@/assets/hero-villa.jpg";
import appart from "@/assets/property-appart.jpg";
import villa from "@/assets/property-villa.jpg";
import duplex from "@/assets/property-duplex.jpg";
import maison from "@/assets/property-maison.jpg";
import { ArrowUpRight, Search, Phone, MapPin, Mail, Facebook, Bed, Bath, Maximize, Home, Building2, KeyRound, TrendingUp } from "lucide-react";
import { useState } from "react";

const PHONE = "+216 22 409 004";
const PHONE_HREF = "tel:+21622409004";
const FB = "https://www.facebook.com/profile.php?id=61565400861372";
const ADDRESS = "202 Résidence El Boustène, El Mourouj, Ben Arous";

const properties = [
  { id: "01", name: "Villa contemporaine", area: "El Mourouj 6", price: "850 000 DT", beds: 5, baths: 3, sqft: "420", img: villa, tag: "À vendre" },
  { id: "02", name: "Appartement S+3 standing", area: "El Mourouj 5", price: "320 000 DT", beds: 3, baths: 2, sqft: "145", img: appart, tag: "Nouveau" },
  { id: "03", name: "Duplex avec terrasse", area: "Ben Arous", price: "520 000 DT", beds: 4, baths: 3, sqft: "210", img: duplex, tag: "Exclusivité" },
  { id: "04", name: "Maison familiale", area: "El Mourouj 1", price: "1 200 DT/mois", beds: 4, baths: 2, sqft: "180", img: maison, tag: "À louer" },
];

const services = [
  { icon: Home, title: "Vente", desc: "Villas, appartements, terrains. Une sélection rigoureuse de biens vérifiés." },
  { icon: KeyRound, title: "Location", desc: "Locations longue durée et meublées, dans tout le grand Tunis." },
  { icon: Building2, title: "Promotion", desc: "Accompagnement des promoteurs pour la commercialisation de leurs projets." },
  { icon: TrendingUp, title: "Estimation", desc: "Estimation gratuite et confidentielle de votre bien sous 48h." },
];

const Logo = ({ light = false }: { light?: boolean }) => (
  <a href="#" className="flex items-center gap-3 group">
    <div className="flex items-center gap-1">
      <span className="block w-5 h-5 rounded-full bg-brand" />
      <span className="block w-5 h-5 bg-brand chevron-mark" />
    </div>
    <div className="leading-none">
      <div className={`font-display font-bold text-xl tracking-tight ${light ? "text-bone" : "text-ink"}`}>NEXT</div>
      <div className={`text-[9px] uppercase tracking-[0.32em] mt-1 ${light ? "text-bone/60" : "text-muted-foreground"}`}>Immobilier</div>
    </div>
  </a>
);

const Index = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* TOP BAR */}
      <div className="hidden md:block bg-ink text-bone/80 text-xs">
        <div className="container-editorial flex items-center justify-between h-9">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-brand" /> {ADDRESS}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href={PHONE_HREF} className="flex items-center gap-2 hover:text-brand transition-colors"><Phone className="w-3 h-3" /> {PHONE}</a>
            <a href={FB} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand transition-colors"><Facebook className="w-3 h-3" /> Facebook</a>
          </div>
        </div>
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/90 border-b border-border">
        <div className="container-editorial flex items-center justify-between h-20">
          <Logo />
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
            <a href="#biens" className="link-underline">Nos biens</a>
            <a href="#services" className="link-underline">Services</a>
            <a href="#agence" className="link-underline">L'agence</a>
            <a href="#contact" className="link-underline">Contact</a>
          </nav>
          <a href={PHONE_HREF} className="hidden md:inline-flex items-center gap-2 bg-brand text-bone px-5 py-2.5 text-sm font-medium hover:bg-ink transition-colors duration-500">
            <Phone className="w-4 h-4" /> Appeler
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-[88vh] w-full overflow-hidden">
        <img src={heroImg} alt="Villa de luxe en Tunisie" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-dark)" }} />

        <div className="relative h-full container-editorial flex flex-col justify-end pb-32 text-bone">
          <div className="flex items-center gap-4 mb-6 fade-up">
            <span className="h-px w-12 bg-brand" />
            <span className="eyebrow text-bone/80">Agence immobilière · El Mourouj</span>
          </div>
          <h1 className="font-display font-bold text-[12vw] md:text-[7vw] leading-[0.95] max-w-5xl fade-up" style={{ animationDelay: "0.1s" }}>
            Votre prochaine adresse,<br/>
            <span className="text-brand">trouvée par Next.</span>
          </h1>
          <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-8 fade-up" style={{ animationDelay: "0.2s" }}>
            <p className="max-w-md text-bone/85 leading-relaxed text-lg">
              Vente, location, estimation. Une équipe locale au service de vos projets immobiliers à El Mourouj, Ben Arous et le grand Tunis.
            </p>
            <div className="flex items-center gap-4">
              <a href="#biens" className="bg-brand text-bone px-7 py-4 text-sm font-medium uppercase tracking-[0.2em] hover:bg-bone hover:text-ink transition-colors duration-500 inline-flex items-center gap-3">
                Voir les biens <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="border border-bone/40 text-bone px-7 py-4 text-sm font-medium uppercase tracking-[0.2em] hover:bg-bone hover:text-ink transition-colors duration-500">
                Estimation gratuite
              </a>
            </div>
          </div>
        </div>

        {/* search */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 container-editorial">
          <div className="bg-background border border-border shadow-[var(--shadow-elegant)] grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto]">
            <label className="px-6 py-5 border-b md:border-b-0 md:border-r border-border">
              <span className="eyebrow block mb-1 text-muted-foreground">Type de bien</span>
              <select className="w-full bg-transparent outline-none text-ink font-medium">
                <option>Tous types</option><option>Villa</option><option>Appartement</option><option>Duplex</option><option>Terrain</option>
              </select>
            </label>
            <label className="px-6 py-5 border-b md:border-b-0 md:border-r border-border">
              <span className="eyebrow block mb-1 text-muted-foreground">Localisation</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="El Mourouj, Ben Arous…" className="w-full bg-transparent outline-none text-ink font-medium placeholder:text-muted-foreground" />
            </label>
            <label className="px-6 py-5 border-b md:border-b-0 md:border-r border-border">
              <span className="eyebrow block mb-1 text-muted-foreground">Budget</span>
              <select className="w-full bg-transparent outline-none text-ink font-medium">
                <option>Indifférent</option><option>{"< 300 000 DT"}</option><option>300 000 — 600 000 DT</option><option>{"> 600 000 DT"}</option>
              </select>
            </label>
            <button className="bg-brand text-bone px-8 py-5 flex items-center justify-center gap-3 hover:bg-ink transition-colors duration-500">
              <Search className="w-4 h-4" /> <span className="text-sm tracking-[0.2em] uppercase font-medium">Rechercher</span>
            </button>
          </div>
        </div>
      </section>

      {/* INTRO STATS */}
      <section id="agence" className="pt-48 pb-24 container-editorial">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="eyebrow flex items-center gap-3 text-brand"><span className="h-px w-8 bg-brand" /> L'agence</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mt-6">
              L'immobilier <span className="text-brand">simple, sérieux,</span> et près de chez vous.
            </h2>
          </div>
          <div className="md:col-span-7 md:pl-12 md:border-l border-border">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Implantée au cœur d'El Mourouj, <strong className="text-ink">Next Immobilier</strong> accompagne familles, investisseurs et promoteurs dans toutes leurs opérations immobilières. Notre engagement&nbsp;: la transparence, la réactivité, et une connaissance fine du marché local.
            </p>
            <div className="mt-12 grid sm:grid-cols-3 gap-8 pt-12 border-t border-border">
              {[
                { k: "200+", v: "biens commercialisés" },
                { k: "48 h", v: "pour estimer votre bien" },
                { k: "100 %", v: "de mandats vérifiés" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="font-display font-bold text-4xl text-brand">{s.k}</div>
                  <div className="text-sm text-muted-foreground mt-2">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-smoke">
        <div className="container-editorial">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="eyebrow text-brand mb-4">Nos services</div>
              <h2 className="font-display font-bold text-4xl md:text-5xl">Quatre métiers, <span className="text-brand">une seule exigence.</span></h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {services.map((s) => (
              <div key={s.title} className="bg-background p-10 group hover:bg-ink hover:text-bone transition-colors duration-500">
                <s.icon className="w-8 h-8 text-brand mb-8" strokeWidth={1.25} />
                <h3 className="font-display font-bold text-2xl">{s.title}</h3>
                <p className="text-sm mt-4 text-muted-foreground group-hover:text-bone/70 leading-relaxed">{s.desc}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium">
                  En savoir plus <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTIES */}
      <section id="biens" className="py-32 container-editorial">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="eyebrow text-brand mb-4">Nos biens — Sélection</div>
            <h2 className="font-display font-bold text-4xl md:text-6xl">Biens à la une</h2>
          </div>
          <a href="#" className="link-underline text-sm font-medium inline-flex items-center gap-2">Voir tout le catalogue <ArrowUpRight className="w-4 h-4" /></a>
        </div>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-20">
          {properties.map((p, i) => (
            <article key={p.id} className={`group ${i % 2 === 1 ? "md:mt-24" : ""}`}>
              <div className="relative overflow-hidden bg-secondary aspect-[4/5]">
                <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                <span className="absolute top-5 left-5 bg-brand text-bone text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 font-semibold">{p.tag}</span>
                <span className="absolute top-5 right-5 font-display font-bold text-bone text-2xl drop-shadow-lg">N°{p.id}</span>
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
              </div>
              <div className="pt-6 flex justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="eyebrow text-muted-foreground">{p.area}</div>
                  <h3 className="font-display font-bold text-2xl mt-2">{p.name}</h3>
                  <div className="text-sm text-muted-foreground mt-4 flex flex-wrap gap-4">
                    <span className="inline-flex items-center gap-1.5"><Bed className="w-3.5 h-3.5" /> {p.beds} ch.</span>
                    <span className="inline-flex items-center gap-1.5"><Bath className="w-3.5 h-3.5" /> {p.baths} sdb</span>
                    <span className="inline-flex items-center gap-1.5"><Maximize className="w-3.5 h-3.5" /> {p.sqft} m²</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display font-bold text-2xl text-brand whitespace-nowrap">{p.price}</div>
                  <a href={PHONE_HREF} className="text-xs uppercase tracking-[0.2em] mt-3 inline-flex items-center gap-1 link-underline font-medium">Visiter <ArrowUpRight className="w-3 h-3" /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <section className="bg-ink text-bone py-20 overflow-hidden">
        <div className="flex marquee whitespace-nowrap">
          {[...Array(2)].flatMap((_, k) => ["El Mourouj", "Ben Arous", "Mégrine", "Radès", "Hammam Lif", "Ezzahra", "Boumhel", "Mornag"].map((n, i) => (
            <span key={`${k}-${i}`} className="font-display font-bold text-[7vw] leading-none px-8">
              {n} <span className="text-brand mx-4">●</span>
            </span>
          )))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-32 container-editorial">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="eyebrow text-brand mb-4">Comment ça marche</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight">Trois étapes, <span className="text-brand">zéro mauvaise surprise.</span></h2>
          </div>
          <div className="md:col-span-8 grid gap-px bg-border">
            {[
              { n: "01", t: "Échangeons", d: "Un appel ou une visite à l'agence pour comprendre votre projet et votre budget." },
              { n: "02", t: "Sélection sur-mesure", d: "Nous vous proposons une short-list de biens correspondant à vos critères, avec visites organisées." },
              { n: "03", t: "Accompagnement complet", d: "De la négociation à la signature notariale, nous restons à vos côtés à chaque étape." },
            ].map((s) => (
              <div key={s.n} className="bg-background p-8 grid grid-cols-[auto_1fr] gap-8 items-start">
                <div className="font-display font-bold text-5xl text-brand">{s.n}</div>
                <div>
                  <h3 className="font-display font-bold text-2xl">{s.t}</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-24 bg-smoke">
        <div className="container-editorial grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 aspect-[4/5] overflow-hidden">
            <img src={appart} alt="Client satisfait" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="md:col-span-7 md:pl-12">
            <span className="font-display font-bold text-8xl text-brand leading-none">«</span>
            <p className="font-display font-medium text-2xl md:text-3xl leading-snug -mt-4">
              Une équipe à l'écoute, des biens vérifiés et un accompagnement du début à la fin. Nous avons trouvé notre maison à El Mourouj en moins de trois semaines.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <div className="w-12 h-px bg-ink" />
              <div>
                <div className="text-sm font-semibold">Famille Ben Slimane</div>
                <div className="text-xs text-muted-foreground uppercase tracking-[0.2em] mt-1">Acquéreurs · El Mourouj 6, 2025</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-32 bg-ink text-bone overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand/20 rounded-full blur-3xl" />
        <div className="container-editorial relative grid md:grid-cols-2 gap-16">
          <div>
            <div className="eyebrow text-brand mb-4">Contact</div>
            <h2 className="font-display font-bold text-5xl md:text-6xl leading-[1.05]">
              Parlons de <span className="text-brand">votre projet.</span>
            </h2>
            <p className="mt-8 text-bone/70 max-w-md leading-relaxed">
              Notre équipe vous répond personnellement en moins de 24 heures. Un projet d'achat, de vente, de location ou d'estimation&nbsp;? Contactez-nous.
            </p>
            <div className="mt-12 space-y-6">
              <a href={PHONE_HREF} className="flex items-start gap-4 group">
                <div className="w-10 h-10 border border-bone/30 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-colors"><Phone className="w-4 h-4" /></div>
                <div>
                  <div className="eyebrow text-bone/50">Téléphone</div>
                  <div className="font-display font-bold text-xl mt-1">{PHONE}</div>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-bone/30 flex items-center justify-center"><MapPin className="w-4 h-4" /></div>
                <div>
                  <div className="eyebrow text-bone/50">Adresse</div>
                  <div className="font-display font-bold text-xl mt-1">202 Résidence El Boustène</div>
                  <div className="text-sm text-bone/70">El Mourouj, Ben Arous, Tunisie</div>
                </div>
              </div>
              <a href={FB} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <div className="w-10 h-10 border border-bone/30 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-colors"><Facebook className="w-4 h-4" /></div>
                <div>
                  <div className="eyebrow text-bone/50">Suivez-nous</div>
                  <div className="font-display font-bold text-xl mt-1">Page Facebook</div>
                </div>
              </a>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="bg-bone text-ink p-10 space-y-5">
            <h3 className="font-display font-bold text-2xl">Demande de rappel</h3>
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="Prénom" className="bg-transparent border-b border-ink/30 px-0 py-3 outline-none focus:border-brand placeholder:text-muted-foreground" />
              <input required placeholder="Nom" className="bg-transparent border-b border-ink/30 px-0 py-3 outline-none focus:border-brand placeholder:text-muted-foreground" />
            </div>
            <input required type="tel" placeholder="Téléphone" className="w-full bg-transparent border-b border-ink/30 px-0 py-3 outline-none focus:border-brand placeholder:text-muted-foreground" />
            <input type="email" placeholder="Email (optionnel)" className="w-full bg-transparent border-b border-ink/30 px-0 py-3 outline-none focus:border-brand placeholder:text-muted-foreground" />
            <select className="w-full bg-transparent border-b border-ink/30 px-0 py-3 outline-none focus:border-brand">
              <option>Je souhaite acheter</option>
              <option>Je souhaite vendre</option>
              <option>Je souhaite louer</option>
              <option>Estimation gratuite</option>
            </select>
            <textarea rows={3} placeholder="Votre message" className="w-full bg-transparent border-b border-ink/30 px-0 py-3 outline-none focus:border-brand placeholder:text-muted-foreground resize-none" />
            <button type="submit" className="w-full bg-brand text-bone py-4 text-sm uppercase tracking-[0.2em] font-medium hover:bg-ink transition-colors duration-500 mt-4">
              Envoyer ma demande
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-bone/60 pt-20 pb-10 border-t border-bone/10">
        <div className="container-editorial grid md:grid-cols-4 gap-12 pb-16 border-b border-bone/10">
          <div>
            <Logo light />
            <p className="text-sm mt-6 leading-relaxed">Agence immobilière à El Mourouj, au service du grand Tunis depuis sa création.</p>
          </div>
          <div>
            <div className="eyebrow text-bone/40 mb-4">Navigation</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#biens" className="link-underline">Nos biens</a></li>
              <li><a href="#services" className="link-underline">Services</a></li>
              <li><a href="#agence" className="link-underline">L'agence</a></li>
              <li><a href="#contact" className="link-underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-bone/40 mb-4">Services</div>
            <ul className="space-y-2 text-sm">
              <li>Vente</li><li>Location</li><li>Estimation</li><li>Promotion</li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-bone/40 mb-4">Contact</div>
            <ul className="space-y-2 text-sm">
              <li><a href={PHONE_HREF} className="hover:text-brand">{PHONE}</a></li>
              <li>202 Rés. El Boustène</li>
              <li>El Mourouj, Ben Arous</li>
              <li className="pt-2"><a href={FB} target="_blank" rel="noopener noreferrer" className="link-underline">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="container-editorial pt-8 flex flex-col md:flex-row justify-between text-xs uppercase tracking-[0.2em] text-bone/40 gap-4">
          <span>© 2026 Next Immobilier — Tous droits réservés</span>
          <span>Tunisie · El Mourouj · Ben Arous</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
