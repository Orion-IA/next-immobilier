import logo from "@/assets/next-logo.jpg";
import heroImg from "@/assets/hero-villa.jpg";
import appart from "@/assets/property-appart.jpg";
import villa from "@/assets/property-villa.jpg";
import duplex from "@/assets/property-duplex.jpg";
import maison from "@/assets/property-maison.jpg";
import { ArrowUpRight, Search, Phone, MapPin, Mail, Facebook, Bed, Bath, Maximize, Home, Building2, KeyRound, TrendingUp, Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";

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
      <span className="block w-5 h-5 rounded-full bg-brand transition-transform duration-500 group-hover:scale-110" />
      <span className="block w-5 h-5 bg-brand chevron-mark transition-transform duration-500 group-hover:translate-x-1" />
    </div>
    <div className="leading-none">
      <div className={`font-display font-bold text-xl tracking-tight ${light ? "text-bone" : "text-ink"}`}>NEXT</div>
      <div className={`text-[9px] uppercase tracking-[0.32em] mt-1 ${light ? "text-bone/60" : "text-muted-foreground"}`}>Immobilier</div>
    </div>
  </a>
);

const Index = () => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const navLinks = [
    { href: "#biens", label: "Nos biens" },
    { href: "#services", label: "Services" },
    { href: "#agence", label: "L'agence" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* TOP BAR */}
      <div className="hidden md:block bg-ink text-bone/80 text-xs animate-slide-down">
        <div className="container-editorial flex items-center justify-between h-9">
          <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-brand" /> {ADDRESS}</span>
          <div className="flex items-center gap-6">
            <a href={PHONE_HREF} className="flex items-center gap-2 hover:text-brand transition-colors group"><Phone className="w-3 h-3 group-hover:animate-pulse" /> {PHONE}</a>
            <a href={FB} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand transition-colors"><Facebook className="w-3 h-3" /> Facebook</a>
          </div>
        </div>
      </div>

      {/* NAV */}
      <header className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-500 ${scrolled > 40 ? "bg-background/95 border-b border-border shadow-sm" : "bg-background/80 border-b border-transparent"}`}>
        <div className="container-editorial flex items-center justify-between h-16 md:h-20">
          <Logo />
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="link-underline">{l.label}</a>
            ))}
          </nav>
          <a href={PHONE_HREF} className="hidden md:inline-flex items-center gap-2 bg-brand text-bone px-5 py-2.5 text-sm font-medium hover:bg-ink transition-all duration-500 hover:gap-3 hover:px-6 animate-pulse-brand">
            <Phone className="w-4 h-4" /> Appeler
          </a>
          <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 -mr-2 text-ink" aria-label="Ouvrir le menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[60] md:hidden transition-all duration-500 ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-background flex flex-col transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Logo />
            <button onClick={() => setMenuOpen(false)} className="p-2 -mr-2" aria-label="Fermer">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 px-6 py-10 flex flex-col gap-1">
            {navLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-display font-bold text-3xl py-3 border-b border-border flex items-center justify-between group hover:text-brand transition-colors"
                style={{ animation: menuOpen ? `fade-in-right 0.5s ${i * 80}ms both` : "none" }}
              >
                {l.label}
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
              </a>
            ))}
          </nav>
          <div className="p-6 border-t border-border space-y-3">
            <a href={PHONE_HREF} className="flex items-center justify-center gap-2 bg-brand text-bone py-4 text-sm font-medium uppercase tracking-[0.2em]">
              <Phone className="w-4 h-4" /> {PHONE}
            </a>
            <a href={FB} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 border border-ink text-ink py-4 text-sm font-medium uppercase tracking-[0.2em]">
              <Facebook className="w-4 h-4" /> Facebook
            </a>
            <p className="text-xs text-muted-foreground text-center pt-2">{ADDRESS}</p>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="relative min-h-[88vh] md:min-h-[88vh] w-full overflow-hidden flex flex-col">
        <img src={heroImg} alt="Villa de luxe en Tunisie" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover animate-ken-burns" style={{ transform: `translateY(${scrolled * 0.3}px) scale(1.05)` }} />
        <div className="absolute inset-0 bg-ink/60 md:bg-ink/55" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-dark)" }} />

        <div className="relative flex-1 container-editorial flex flex-col justify-end pb-32 md:pb-32 pt-28 md:pt-20 text-bone">
          <div className="flex items-center gap-4 mb-5 md:mb-6 animate-fade-in">
            <span className="h-px w-12 bg-brand" />
            <span className="eyebrow text-bone/80 text-[10px] md:text-[11px]">Agence immobilière · El Mourouj</span>
          </div>
          <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-[7vw] leading-[0.95] max-w-5xl animate-fade-in" style={{ animationDelay: "0.15s" }}>
            Votre prochaine adresse,<br/>
            <span className="text-brand inline-block animate-fade-in-right" style={{ animationDelay: "0.5s" }}>trouvée par Next.</span>
          </h1>
          <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <p className="max-w-md text-bone/85 leading-relaxed text-base md:text-lg">
              Vente, location, estimation. Une équipe locale au service de vos projets immobiliers à El Mourouj, Ben Arous et le grand Tunis.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a href="#biens" className="bg-brand text-bone px-6 md:px-7 py-4 text-xs md:text-sm font-medium uppercase tracking-[0.2em] hover:bg-bone hover:text-ink transition-all duration-500 inline-flex items-center justify-center gap-3 group">
                Voir les biens <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#contact" className="border border-bone/40 text-bone px-6 md:px-7 py-4 text-xs md:text-sm font-medium uppercase tracking-[0.2em] hover:bg-bone hover:text-ink transition-colors duration-500 inline-flex items-center justify-center">
                Estimation gratuite
              </a>
            </div>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="hidden md:flex absolute bottom-32 right-6 lg:right-20 flex-col items-center gap-2 text-bone/60 animate-float">
          <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">Scroll</span>
          <span className="w-px h-12 bg-bone/40" />
        </div>

        {/* search */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 container-editorial">
          <div className="bg-background border border-border shadow-[var(--shadow-elegant)] grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] animate-scale-in" style={{ animationDelay: "0.9s" }}>
            <label className="px-5 md:px-6 py-4 md:py-5 border-b md:border-b-0 md:border-r border-border transition-colors hover:bg-smoke/50">
              <span className="eyebrow block mb-1 text-muted-foreground">Type de bien</span>
              <select className="w-full bg-transparent outline-none text-ink font-medium cursor-pointer">
                <option>Tous types</option><option>Villa</option><option>Appartement</option><option>Duplex</option><option>Terrain</option>
              </select>
            </label>
            <label className="px-5 md:px-6 py-4 md:py-5 border-b md:border-b-0 md:border-r border-border transition-colors hover:bg-smoke/50">
              <span className="eyebrow block mb-1 text-muted-foreground">Localisation</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="El Mourouj, Ben Arous…" className="w-full bg-transparent outline-none text-ink font-medium placeholder:text-muted-foreground" />
            </label>
            <label className="px-5 md:px-6 py-4 md:py-5 border-b md:border-b-0 md:border-r border-border transition-colors hover:bg-smoke/50">
              <span className="eyebrow block mb-1 text-muted-foreground">Budget</span>
              <select className="w-full bg-transparent outline-none text-ink font-medium cursor-pointer">
                <option>Indifférent</option><option>{"< 300 000 DT"}</option><option>300 000 — 600 000 DT</option><option>{"> 600 000 DT"}</option>
              </select>
            </label>
            <button className="bg-brand text-bone px-6 md:px-8 py-5 flex items-center justify-center gap-3 hover:bg-ink transition-all duration-500 group">
              <Search className="w-4 h-4 transition-transform group-hover:rotate-12" /> <span className="text-sm tracking-[0.2em] uppercase font-medium">Rechercher</span>
            </button>
          </div>
        </div>
      </section>

      {/* INTRO STATS */}
      <section id="agence" className="pt-56 md:pt-48 pb-20 md:pb-24 container-editorial">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12">
          <Reveal variant="left" className="md:col-span-5">
            <div className="eyebrow flex items-center gap-3 text-brand"><span className="h-px w-8 bg-brand" /> L'agence</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mt-6">
              L'immobilier <span className="text-brand">simple, sérieux,</span> et près de chez vous.
            </h2>
          </Reveal>
          <Reveal variant="right" delay={150} className="md:col-span-7 md:pl-12 md:border-l border-border">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Implantée au cœur d'El Mourouj, <strong className="text-ink">Next Immobilier</strong> accompagne familles, investisseurs et promoteurs dans toutes leurs opérations immobilières. Notre engagement&nbsp;: la transparence, la réactivité, et une connaissance fine du marché local.
            </p>
            <div className="mt-10 md:mt-12 grid grid-cols-3 gap-4 md:gap-8 pt-10 md:pt-12 border-t border-border">
              {[
                { k: "200+", v: "biens commercialisés" },
                { k: "48 h", v: "pour estimer votre bien" },
                { k: "100 %", v: "mandats vérifiés" },
              ].map((s, i) => (
                <Reveal key={s.k} variant="up" delay={300 + i * 120}>
                  <div className="font-display font-bold text-3xl md:text-4xl text-brand">{s.k}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-2">{s.v}</div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-24 bg-smoke">
        <div className="container-editorial">
          <Reveal className="mb-12 md:mb-16">
            <div className="eyebrow text-brand mb-4">Nos services</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl">Quatre métiers, <span className="text-brand">une seule exigence.</span></h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {services.map((s, i) => (
              <Reveal key={s.title} variant="up" delay={i * 100}>
                <div className="bg-background p-8 md:p-10 group hover:bg-ink hover:text-bone transition-colors duration-500 h-full cursor-pointer">
                  <s.icon className="w-8 h-8 text-brand mb-6 md:mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" strokeWidth={1.25} />
                  <h3 className="font-display font-bold text-2xl">{s.title}</h3>
                  <p className="text-sm mt-4 text-muted-foreground group-hover:text-bone/70 leading-relaxed transition-colors">{s.desc}</p>
                  <div className="mt-6 md:mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium">
                    En savoir plus <ArrowUpRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTIES */}
      <section id="biens" className="py-24 md:py-32 container-editorial">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <div className="eyebrow text-brand mb-4">Nos biens — Sélection</div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl">Biens à la une</h2>
          </div>
          <a href="#" className="link-underline text-sm font-medium inline-flex items-center gap-2 self-start md:self-auto">Voir tout le catalogue <ArrowUpRight className="w-4 h-4" /></a>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-14 md:gap-y-20">
          {properties.map((p, i) => (
            <Reveal key={p.id} variant="up" delay={i * 120} className={i % 2 === 1 ? "md:mt-24" : ""}>
              <article className="group cursor-pointer">
                <div className="relative overflow-hidden bg-secondary aspect-[4/5]">
                  <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
                  <span className="absolute top-4 md:top-5 left-4 md:left-5 bg-brand text-bone text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 font-semibold transition-transform duration-500 group-hover:scale-105">{p.tag}</span>
                  <span className="absolute top-4 md:top-5 right-4 md:right-5 font-display font-bold text-bone text-2xl drop-shadow-lg">N°{p.id}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-bone text-xs uppercase tracking-[0.2em]">Voir le bien</span>
                    <span className="w-10 h-10 bg-brand text-bone flex items-center justify-center"><ArrowUpRight className="w-4 h-4" /></span>
                  </div>
                </div>
                <div className="pt-5 md:pt-6 flex justify-between items-start gap-6">
                  <div className="flex-1">
                    <div className="eyebrow text-muted-foreground">{p.area}</div>
                    <h3 className="font-display font-bold text-xl md:text-2xl mt-2 group-hover:text-brand transition-colors">{p.name}</h3>
                    <div className="text-sm text-muted-foreground mt-3 md:mt-4 flex flex-wrap gap-x-4 gap-y-2">
                      <span className="inline-flex items-center gap-1.5"><Bed className="w-3.5 h-3.5" /> {p.beds} ch.</span>
                      <span className="inline-flex items-center gap-1.5"><Bath className="w-3.5 h-3.5" /> {p.baths} sdb</span>
                      <span className="inline-flex items-center gap-1.5"><Maximize className="w-3.5 h-3.5" /> {p.sqft} m²</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-bold text-lg md:text-2xl text-brand whitespace-nowrap">{p.price}</div>
                    <a href={PHONE_HREF} className="text-xs uppercase tracking-[0.2em] mt-2 md:mt-3 inline-flex items-center gap-1 link-underline font-medium">Visiter <ArrowUpRight className="w-3 h-3" /></a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <section className="bg-ink text-bone py-16 md:py-20 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].flatMap((_, k) => ["El Mourouj", "Ben Arous", "Mégrine", "Radès", "Hammam Lif", "Ezzahra", "Boumhel", "Mornag"].map((n, i) => (
            <span key={`${k}-${i}`} className="font-display font-bold text-5xl md:text-[7vw] leading-none px-6 md:px-8">
              {n} <span className="text-brand mx-3 md:mx-4">●</span>
            </span>
          )))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 md:py-32 container-editorial">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12">
          <Reveal variant="left" className="md:col-span-4">
            <div className="eyebrow text-brand mb-4">Comment ça marche</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">Trois étapes, <span className="text-brand">zéro mauvaise surprise.</span></h2>
          </Reveal>
          <div className="md:col-span-8 grid gap-px bg-border">
            {[
              { n: "01", t: "Échangeons", d: "Un appel ou une visite à l'agence pour comprendre votre projet et votre budget." },
              { n: "02", t: "Sélection sur-mesure", d: "Nous vous proposons une short-list de biens correspondant à vos critères, avec visites organisées." },
              { n: "03", t: "Accompagnement complet", d: "De la négociation à la signature notariale, nous restons à vos côtés à chaque étape." },
            ].map((s, i) => (
              <Reveal key={s.n} variant="right" delay={i * 150}>
                <div className="bg-background p-6 md:p-8 grid grid-cols-[auto_1fr] gap-6 md:gap-8 items-start group hover:bg-smoke transition-colors duration-500">
                  <div className="font-display font-bold text-4xl md:text-5xl text-brand transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">{s.n}</div>
                  <div>
                    <h3 className="font-display font-bold text-xl md:text-2xl">{s.t}</h3>
                    <p className="text-muted-foreground mt-2 leading-relaxed text-sm md:text-base">{s.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-20 md:py-24 bg-smoke">
        <div className="container-editorial grid md:grid-cols-12 gap-10 md:gap-12 items-center">
          <Reveal variant="left" className="md:col-span-5 aspect-[4/5] overflow-hidden group">
            <img src={appart} alt="Client satisfait" loading="lazy" className="w-full h-full object-cover transition-transform duration-[1400ms] hover:scale-110" />
          </Reveal>
          <Reveal variant="right" delay={200} className="md:col-span-7 md:pl-12">
            <span className="font-display font-bold text-7xl md:text-8xl text-brand leading-none">«</span>
            <p className="font-display font-medium text-xl sm:text-2xl md:text-3xl leading-snug -mt-4">
              Une équipe à l'écoute, des biens vérifiés et un accompagnement du début à la fin. Nous avons trouvé notre maison à El Mourouj en moins de trois semaines.
            </p>
            <div className="mt-8 md:mt-10 flex items-center gap-4">
              <div className="w-12 h-px bg-ink" />
              <div>
                <div className="text-sm font-semibold">Famille Ben Slimane</div>
                <div className="text-xs text-muted-foreground uppercase tracking-[0.2em] mt-1">Acquéreurs · El Mourouj 6, 2025</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-24 md:py-32 bg-ink text-bone overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-brand/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <div className="container-editorial relative grid md:grid-cols-2 gap-12 md:gap-16">
          <Reveal variant="left">
            <div className="eyebrow text-brand mb-4">Contact</div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05]">
              Parlons de <span className="text-brand">votre projet.</span>
            </h2>
            <p className="mt-6 md:mt-8 text-bone/70 max-w-md leading-relaxed">
              Notre équipe vous répond personnellement en moins de 24 heures. Un projet d'achat, de vente, de location ou d'estimation&nbsp;? Contactez-nous.
            </p>
            <div className="mt-10 md:mt-12 space-y-5 md:space-y-6">
              <a href={PHONE_HREF} className="flex items-start gap-4 group">
                <div className="w-10 h-10 border border-bone/30 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all duration-500 group-hover:rotate-12 shrink-0"><Phone className="w-4 h-4" /></div>
                <div>
                  <div className="eyebrow text-bone/50">Téléphone</div>
                  <div className="font-display font-bold text-lg md:text-xl mt-1">{PHONE}</div>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-bone/30 flex items-center justify-center shrink-0"><MapPin className="w-4 h-4" /></div>
                <div>
                  <div className="eyebrow text-bone/50">Adresse</div>
                  <div className="font-display font-bold text-lg md:text-xl mt-1">202 Résidence El Boustène</div>
                  <div className="text-sm text-bone/70">El Mourouj, Ben Arous, Tunisie</div>
                </div>
              </div>
              <a href={FB} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <div className="w-10 h-10 border border-bone/30 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all duration-500 group-hover:rotate-12 shrink-0"><Facebook className="w-4 h-4" /></div>
                <div>
                  <div className="eyebrow text-bone/50">Suivez-nous</div>
                  <div className="font-display font-bold text-lg md:text-xl mt-1">Page Facebook</div>
                </div>
              </a>
            </div>
          </Reveal>

          <Reveal variant="right" delay={200}>
            <form onSubmit={(e) => e.preventDefault()} className="bg-bone text-ink p-8 md:p-10 space-y-5">
              <h3 className="font-display font-bold text-xl md:text-2xl">Demande de rappel</h3>
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Prénom" className="bg-transparent border-b border-ink/30 px-0 py-3 outline-none focus:border-brand transition-colors placeholder:text-muted-foreground" />
                <input required placeholder="Nom" className="bg-transparent border-b border-ink/30 px-0 py-3 outline-none focus:border-brand transition-colors placeholder:text-muted-foreground" />
              </div>
              <input required type="tel" placeholder="Téléphone" className="w-full bg-transparent border-b border-ink/30 px-0 py-3 outline-none focus:border-brand transition-colors placeholder:text-muted-foreground" />
              <input type="email" placeholder="Email (optionnel)" className="w-full bg-transparent border-b border-ink/30 px-0 py-3 outline-none focus:border-brand transition-colors placeholder:text-muted-foreground" />
              <select className="w-full bg-transparent border-b border-ink/30 px-0 py-3 outline-none focus:border-brand transition-colors cursor-pointer">
                <option>Je souhaite acheter</option>
                <option>Je souhaite vendre</option>
                <option>Je souhaite louer</option>
                <option>Estimation gratuite</option>
              </select>
              <textarea rows={3} placeholder="Votre message" className="w-full bg-transparent border-b border-ink/30 px-0 py-3 outline-none focus:border-brand transition-colors placeholder:text-muted-foreground resize-none" />
              <button type="submit" className="w-full bg-brand text-bone py-4 text-sm uppercase tracking-[0.2em] font-medium hover:bg-ink transition-all duration-500 mt-4 group inline-flex items-center justify-center gap-3">
                Envoyer ma demande <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-bone/60 pt-16 md:pt-20 pb-10 border-t border-bone/10">
        <div className="container-editorial grid sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 pb-12 md:pb-16 border-b border-bone/10">
          <div>
            <Logo light />
            <p className="text-sm mt-6 leading-relaxed">Agence immobilière à El Mourouj, au service du grand Tunis depuis sa création.</p>
          </div>
          <div>
            <div className="eyebrow text-bone/40 mb-4">Navigation</div>
            <ul className="space-y-2 text-sm">
              {navLinks.map((l) => <li key={l.href}><a href={l.href} className="link-underline">{l.label}</a></li>)}
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
              <li><a href={PHONE_HREF} className="hover:text-brand transition-colors">{PHONE}</a></li>
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

      {/* FLOATING MOBILE CALL BTN */}
      <a href={PHONE_HREF} className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-brand text-bone rounded-full flex items-center justify-center shadow-[var(--shadow-brand)] animate-pulse-brand" aria-label="Appeler">
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
};

export default Index;
