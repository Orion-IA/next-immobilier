import logo from "@/assets/bestimmo-logo.png";
import heroImg from "@/assets/hero-villa.jpg";
import appart from "@/assets/property-appart.jpg";
import { ArrowUpRight, Phone, MapPin, Mail, Home, Building2, KeyRound, Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { SearchBar } from "@/components/SearchBar";
import { properties, type Property, ZONES } from "@/data/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyDialog } from "@/components/PropertyDialog";

const PHONES = [
  { label: "+216 71 876 143", href: "tel:+21671876143" },
  { label: "+216 71 876 153", href: "tel:+21671876153" },
  { label: "+216 29 103 308", href: "tel:+21629103308" },
];
const PHONE = PHONES[0].label;
const PHONE_HREF = PHONES[0].href;
const EMAIL = "contact@bestimmo.tn";
const EMAIL_HREF = "mailto:contact@bestimmo.tn";
const ADDRESS = "22 Avenue Habib Bourguiba, Cité La Gazelle, Ariana";

const services = [
  { icon: Home, title: "Vente", desc: "Villas, appartements, terrains. Une sélection rigoureuse de biens vérifiés." },
  { icon: KeyRound, title: "Location", desc: "Locations longue durée et meublées, dans tout le grand Tunis." },
  { icon: Building2, title: "Promotion", desc: "Accompagnement des promoteurs pour la commercialisation de leurs projets." },
];

const Logo = ({ light = false }: { light?: boolean }) => (
  <Link to="/" className="flex items-center gap-3 group">
    <div className={`p-1.5 transition-all duration-500 group-hover:scale-105 ${light ? "bg-bone" : ""}`}>
      <img src={logo} alt="Best Immo — Agence immobilière" className="h-16 md:h-20 w-auto block" />
    </div>
  </Link>
);

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(0);
  const [openProperty, setOpenProperty] = useState<Property | null>(null);

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
    { href: "/vente", label: "Vente", isRoute: true },
    { href: "/location", label: "Location", isRoute: true },
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
            {PHONES.map((p) => (
              <a key={p.href} href={p.href} className="flex items-center gap-2 hover:text-brand transition-colors group"><Phone className="w-3 h-3 group-hover:animate-pulse" /> {p.label}</a>
            ))}
            <a href={EMAIL_HREF} className="flex items-center gap-2 hover:text-brand transition-colors"><Mail className="w-3 h-3" /> {EMAIL}</a>
          </div>
        </div>
      </div>

      {/* NAV */}
      <header className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-500 ${scrolled > 40 ? "bg-background/95 border-b border-border shadow-sm" : "bg-background/80 border-b border-transparent"}`}>
        <div className="container-editorial flex items-center justify-between h-20 md:h-28">
          <Logo />
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
            {navLinks.map((l) => (
              l.isRoute
                ? <Link key={l.href} to={l.href} className="link-underline">{l.label}</Link>
                : <a key={l.href} href={l.href} className="link-underline">{l.label}</a>
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
              l.isRoute ? (
                <Link key={l.href} to={l.href} onClick={() => setMenuOpen(false)} className="font-display font-bold text-3xl py-3 border-b border-border flex items-center justify-between group hover:text-brand transition-colors" style={{ animation: menuOpen ? `fade-in-right 0.5s ${i * 80}ms both` : "none" }}>
                  {l.label}
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </Link>
              ) : (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="font-display font-bold text-3xl py-3 border-b border-border flex items-center justify-between group hover:text-brand transition-colors" style={{ animation: menuOpen ? `fade-in-right 0.5s ${i * 80}ms both` : "none" }}>
                  {l.label}
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </a>
              )
            ))}
          </nav>
          <div className="p-6 border-t border-border space-y-3">
            <a href={PHONE_HREF} className="flex items-center justify-center gap-2 bg-brand text-bone py-4 text-sm font-medium uppercase tracking-[0.2em]">
              <Phone className="w-4 h-4" /> {PHONE}
            </a>
            <a href={EMAIL_HREF} className="flex items-center justify-center gap-2 border border-ink text-ink py-4 text-sm font-medium uppercase tracking-[0.2em]">
              <Mail className="w-4 h-4" /> {EMAIL}
            </a>
            <p className="text-xs text-muted-foreground text-center pt-2">{ADDRESS}</p>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="relative min-h-[100svh] md:min-h-[88vh] w-full overflow-hidden flex flex-col">
        <img src={heroImg} alt="Villa de luxe en Tunisie" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover animate-ken-burns" style={{ transform: `translateY(${scrolled * 0.3}px) scale(1.05)` }} />
        <div className="absolute inset-0 bg-ink/60 md:bg-ink/55" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-dark)" }} />

        <div className="relative flex-1 container-editorial flex flex-col justify-end pb-12 md:pb-32 pt-28 md:pt-20 text-bone">
          <div className="flex items-center gap-4 mb-5 md:mb-6 animate-fade-in">
            <span className="h-px w-12 bg-brand" />
            <span className="eyebrow text-bone/80 text-[10px] md:text-[11px]">Agence immobilière · Ariana</span>
          </div>
          <h1 className="font-display font-bold text-[2.75rem] sm:text-6xl md:text-[7vw] leading-[0.95] max-w-5xl animate-fade-in" style={{ animationDelay: "0.15s" }}>
            Votre prochaine adresse,<br/>
            <span className="text-brand inline-block animate-fade-in-right" style={{ animationDelay: "0.5s" }}>trouvée par Best Immo.</span>
          </h1>
          {/* CTA buttons removed per request */}
        </div>

        {/* scroll indicator */}
        <div className="hidden md:flex absolute bottom-32 right-6 lg:right-20 flex-col items-center gap-2 text-bone/60 animate-float">
          <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">Scroll</span>
          <span className="w-px h-12 bg-bone/40" />
        </div>

        {/* search — desktop floating, raised up */}
        <div className="hidden md:block absolute bottom-10 left-0 right-0 container-editorial">
          <SearchBar />
        </div>
      </section>

      {/* SEARCH — mobile in-flow */}
      <section className="md:hidden bg-ink py-8 px-6">
        <SearchBar variant="mobile" />
      </section>

      {/* INTRO TAGLINE — below search bar */}
      <section className="bg-background pt-10 md:pt-16 pb-2 md:pb-4">
        <div className="container-editorial">
          <p className="max-w-3xl text-base md:text-xl text-muted-foreground leading-relaxed">
            <span className="text-ink font-medium">Vente, location.</span> Une équipe locale au service de vos projets immobiliers à Cité La Gazelle, Ariana et dans le grand Tunis.
          </p>
        </div>
      </section>

      {/* INTRO STATS */}
      <section id="agence" className="pt-20 md:pt-32 pb-20 md:pb-24 container-editorial">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12">
          <Reveal variant="left" className="md:col-span-5">
            <div className="eyebrow flex items-center gap-3 text-brand"><span className="h-px w-8 bg-brand" /> L'agence</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mt-6">
              L'immobilier <span className="text-brand">simple, sérieux,</span> et près de chez vous.
            </h2>
          </Reveal>
          <Reveal variant="right" delay={150} className="md:col-span-7 md:pl-12 md:border-l border-border">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Implantée à Cité La Gazelle, Ariana, <strong className="text-ink">Best Immo</strong> accompagne familles, investisseurs et promoteurs dans toutes leurs opérations immobilières. Notre engagement&nbsp;: la transparence, la réactivité, et une connaissance fine du marché local.
            </p>
            <div className="mt-10 md:mt-12 grid grid-cols-3 gap-4 md:gap-8 pt-10 md:pt-12 border-t border-border">
              {[
                { k: "200+", v: "biens commercialisés" },
                { k: "10+", v: "années d'expérience" },
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
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl">Trois métiers, <span className="text-brand">une seule exigence.</span></h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
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
          <Link to="/vente" className="link-underline text-sm font-medium inline-flex items-center gap-2 self-start md:self-auto">Voir tout le catalogue <ArrowUpRight className="w-4 h-4" /></Link>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {properties.slice(0, 8).map((p, i) => (
            <Reveal key={p.id} variant="up" delay={i * 80}>
              <PropertyCard p={p} onOpen={setOpenProperty} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* MARQUEE — slim & quicker */}
      <section className="bg-ink text-bone py-5 md:py-6 overflow-hidden border-y border-bone/10">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 22s linear infinite" }}>
          {[...Array(3)].flatMap((_, k) => ZONES.map((n, i) => (
            <span key={`${k}-${i}`} className="font-display font-medium text-sm md:text-base uppercase tracking-[0.25em] px-5 md:px-6 text-bone/85">
              {n} <span className="text-brand mx-3">●</span>
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
              Une équipe à l'écoute, des biens vérifiés et un accompagnement du début à la fin. Nous avons trouvé notre maison à Ariana en moins de trois semaines.
            </p>
            <div className="mt-8 md:mt-10 flex items-center gap-4">
              <div className="w-12 h-px bg-ink" />
              <div>
                <div className="text-sm font-semibold">Famille Ben Slimane</div>
                <div className="text-xs text-muted-foreground uppercase tracking-[0.2em] mt-1">Acquéreurs · Cité La Gazelle, 2025</div>
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
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-bone/30 flex items-center justify-center shrink-0"><Phone className="w-4 h-4" /></div>
                <div>
                  <div className="eyebrow text-bone/50">Téléphone</div>
                  {PHONES.map((p) => (
                    <a key={p.href} href={p.href} className="block font-display font-bold text-base md:text-lg mt-1 hover:text-brand transition-colors">{p.label}</a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-bone/30 flex items-center justify-center shrink-0"><MapPin className="w-4 h-4" /></div>
                <div>
                  <div className="eyebrow text-bone/50">Adresse</div>
                  <div className="font-display font-bold text-lg md:text-xl mt-1">22 Avenue Habib Bourguiba</div>
                  <div className="text-sm text-bone/70">Cité La Gazelle, Ariana, Tunisie</div>
                </div>
              </div>
              <a href={EMAIL_HREF} className="flex items-start gap-4 group">
                <div className="w-10 h-10 border border-bone/30 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all duration-500 group-hover:rotate-12 shrink-0"><Mail className="w-4 h-4" /></div>
                <div>
                  <div className="eyebrow text-bone/50">Email</div>
                  <div className="font-display font-bold text-lg md:text-xl mt-1">{EMAIL}</div>
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
            <p className="text-sm mt-6 leading-relaxed">Agence immobilière à Cité La Gazelle, Ariana, au service du grand Tunis.</p>
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
              <li>Vente</li><li>Location</li><li>Promotion</li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-bone/40 mb-4">Contact</div>
            <ul className="space-y-2 text-sm">
              {PHONES.map((p) => (
                <li key={p.href}><a href={p.href} className="hover:text-brand transition-colors">{p.label}</a></li>
              ))}
              <li>22 Av. Habib Bourguiba</li>
              <li>Cité La Gazelle, Ariana</li>
              <li className="pt-2"><a href={EMAIL_HREF} className="link-underline">{EMAIL}</a></li>
            </ul>
          </div>
        </div>
        <div className="container-editorial pt-8 flex flex-col md:flex-row justify-between text-xs uppercase tracking-[0.2em] text-bone/40 gap-4">
          <span>© 2026 Best Immo — Tous droits réservés</span>
          <span>Tunisie · Ariana · Cité La Gazelle</span>
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
