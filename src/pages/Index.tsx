import heroImg from "@/assets/hero-penthouse.jpg";
import tribeca from "@/assets/property-tribeca.jpg";
import upperEast from "@/assets/property-upper-east.jpg";
import brooklyn from "@/assets/property-brooklyn.jpg";
import soho from "@/assets/property-soho.jpg";
import { ArrowUpRight, Search } from "lucide-react";
import { useState } from "react";

const properties = [
  { id: "01", name: "The Skyline Residence", area: "Tribeca", price: "$ 12 400 000", beds: 4, baths: 5, sqft: "4 200", img: tribeca, tag: "Exclusive" },
  { id: "02", name: "Maison Park Avenue", area: "Upper East Side", price: "$ 8 900 000", beds: 3, baths: 4, sqft: "3 100", img: upperEast, tag: "New listing" },
  { id: "03", name: "Brownstone N°47", area: "Brooklyn Heights", price: "$ 6 250 000", beds: 5, baths: 4, sqft: "3 800", img: brooklyn, tag: "Townhouse" },
  { id: "04", name: "Sky Loft Mercer", area: "SoHo", price: "$ 9 750 000", beds: 3, baths: 3, sqft: "2 950", img: soho, tag: "Penthouse" },
];

const neighborhoods = ["Tribeca", "SoHo", "West Village", "Upper East Side", "Brooklyn Heights", "Chelsea", "Hamptons", "Hudson Yards"];

const Index = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40">
        <div className="container-editorial flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3">
            <div className="w-8 h-8 border border-ink flex items-center justify-center">
              <span className="font-serif text-lg italic">M</span>
            </div>
            <span className="font-serif text-xl tracking-wide">Maison <span className="italic text-gold">&amp;</span> Co.</span>
          </a>
          <nav className="hidden md:flex items-center gap-10 text-sm">
            <a href="#properties" className="link-underline">Properties</a>
            <a href="#neighborhoods" className="link-underline">Neighborhoods</a>
            <a href="#story" className="link-underline">Our Story</a>
            <a href="#journal" className="link-underline">Journal</a>
            <a href="#contact" className="link-underline">Contact</a>
          </nav>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 text-sm border border-ink px-5 py-2.5 hover:bg-ink hover:text-bone transition-colors duration-500">
            Private viewing <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <img src={heroImg} alt="Luxury Manhattan penthouse with skyline view" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/40" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-dark)" }} />

        <div className="relative h-full container-editorial flex flex-col justify-end pb-20 text-bone">
          <div className="flex items-center gap-4 mb-8 fade-up">
            <span className="h-px w-12 bg-gold" />
            <span className="eyebrow text-bone/80">Est. 1998 — New York</span>
          </div>
          <h1 className="font-serif text-[12vw] md:text-[8vw] leading-[0.95] max-w-5xl fade-up" style={{ animationDelay: "0.1s" }}>
            Where the city<br/>
            <span className="italic text-gold-soft">writes its</span> address.
          </h1>
          <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-8 fade-up" style={{ animationDelay: "0.2s" }}>
            <p className="max-w-md text-bone/80 leading-relaxed">
              An invitation-only collection of Manhattan's most defining residences, curated by a house that treats real estate as an art.
            </p>
            <a href="#properties" className="inline-flex items-center gap-3 group">
              <span className="text-sm tracking-[0.2em] uppercase">Discover the collection</span>
              <span className="w-12 h-px bg-bone group-hover:w-20 transition-all duration-500" />
            </a>
          </div>
        </div>

        {/* search bar */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 container-editorial">
          <div className="bg-background border border-border shadow-[var(--shadow-elegant)] grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_auto]">
            <label className="px-6 py-5 border-b md:border-b-0 md:border-r border-border">
              <span className="eyebrow block mb-1">Neighborhood</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tribeca, SoHo, Hamptons…" className="w-full bg-transparent outline-none text-ink placeholder:text-muted-foreground" />
            </label>
            <div className="hidden md:block" />
            <label className="px-6 py-5 border-b md:border-b-0 md:border-r border-border">
              <span className="eyebrow block mb-1">Budget</span>
              <select className="w-full bg-transparent outline-none text-ink">
                <option>Up to $ 5M</option>
                <option>$ 5M — $ 10M</option>
                <option>$ 10M — $ 25M</option>
                <option>$ 25M +</option>
              </select>
            </label>
            <div className="hidden md:block" />
            <button className="bg-ink text-bone px-8 py-5 flex items-center justify-center gap-3 hover:bg-gold hover:text-ink transition-colors duration-500">
              <Search className="w-4 h-4" /> <span className="text-sm tracking-[0.2em] uppercase">Search</span>
            </button>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section id="story" className="pt-48 pb-32 container-editorial">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="eyebrow flex items-center gap-3"><span className="h-px w-8 bg-gold" /> A house, not a brokerage</div>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-serif text-4xl md:text-6xl leading-tight">
              We don't sell <span className="italic">square feet</span>. We compose<br/>chapters of a life lived <span className="italic text-gold">beautifully</span>.
            </h2>
            <div className="mt-12 grid sm:grid-cols-3 gap-8 pt-12 border-t border-border">
              {[
                { k: "27 yrs", v: "of quiet expertise" },
                { k: "$ 4.2 B", v: "in transacted residences" },
                { k: "92 %", v: "off-market mandates" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="font-serif text-4xl text-ink">{s.k}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTIES */}
      <section id="properties" className="pb-32 container-editorial">
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="eyebrow mb-4">The Collection — Spring 2026</div>
            <h2 className="font-serif text-5xl md:text-7xl">Featured residences</h2>
          </div>
          <a href="#" className="hidden md:inline-flex items-center gap-2 link-underline text-sm">View all 142 listings <ArrowUpRight className="w-4 h-4" /></a>
        </div>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-24">
          {properties.map((p, i) => (
            <article key={p.id} className={`group ${i % 2 === 1 ? "md:mt-32" : ""}`}>
              <div className="relative overflow-hidden bg-secondary aspect-[4/5]">
                <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                <span className="absolute top-5 left-5 bg-bone/95 text-ink text-[10px] uppercase tracking-[0.25em] px-3 py-1.5">{p.tag}</span>
                <span className="absolute top-5 right-5 font-serif text-bone text-2xl">— {p.id}</span>
              </div>
              <div className="pt-6 flex justify-between items-start">
                <div>
                  <div className="eyebrow">{p.area}</div>
                  <h3 className="font-serif text-3xl mt-2">{p.name}</h3>
                  <div className="text-sm text-muted-foreground mt-3 flex gap-4">
                    <span>{p.beds} bed</span><span>·</span><span>{p.baths} bath</span><span>·</span><span>{p.sqft} sq ft</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-serif text-2xl text-ink">{p.price}</div>
                  <a href="#" className="text-xs uppercase tracking-[0.2em] mt-2 inline-flex items-center gap-1 text-gold link-underline">Visit <ArrowUpRight className="w-3 h-3" /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* NEIGHBORHOODS marquee */}
      <section id="neighborhoods" className="bg-ink text-bone py-32 overflow-hidden">
        <div className="container-editorial">
          <div className="flex items-center gap-4 mb-12">
            <span className="h-px w-12 bg-gold" />
            <span className="eyebrow text-bone/70">Neighborhoods we know by heart</span>
          </div>
        </div>
        <div className="flex marquee whitespace-nowrap">
          {[...neighborhoods, ...neighborhoods].map((n, i) => (
            <span key={i} className="font-serif text-[10vw] md:text-[7vw] leading-none px-8 italic">
              {n} <span className="text-gold not-italic mx-4">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-32 container-editorial">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 aspect-[4/5] overflow-hidden">
            <img src={upperEast} alt="Maison interior" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="md:col-span-7 md:pl-12">
            <span className="font-serif text-7xl text-gold leading-none">“</span>
            <p className="font-serif text-3xl md:text-4xl leading-snug -mt-6">
              They didn't show us a property — they introduced us to the <span className="italic">soul</span> of a building, the <span className="italic">memory</span> of a street, the <span className="italic">future</span> of a family.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <div className="w-12 h-px bg-ink" />
              <div>
                <div className="text-sm font-medium">Eleanor & James Whitfield</div>
                <div className="text-xs text-muted-foreground uppercase tracking-[0.2em] mt-1">Acquired in West Village, 2025</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      <section id="journal" className="py-32 bg-cream">
        <div className="container-editorial">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="eyebrow mb-4">The Journal</div>
              <h2 className="font-serif text-5xl md:text-6xl">Notes from the city</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { cat: "Market", title: "Why downtown is rewriting the value of light", date: "April 2026" },
              { cat: "Architecture", title: "Inside the prewar revival: craftsmanship, returned", date: "March 2026" },
              { cat: "Living", title: "The new Manhattan terrace: a room of one's sky", date: "March 2026" },
            ].map((a) => (
              <a href="#" key={a.title} className="group block border-t border-ink/20 pt-6">
                <div className="eyebrow text-gold">{a.cat}</div>
                <h3 className="font-serif text-2xl mt-4 leading-snug group-hover:italic transition-all">{a.title}</h3>
                <div className="mt-8 flex items-center justify-between text-xs text-muted-foreground uppercase tracking-[0.2em]">
                  <span>{a.date}</span>
                  <ArrowUpRight className="w-4 h-4 text-ink group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative py-40 overflow-hidden">
        <img src={soho} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="relative container-editorial text-bone text-center max-w-3xl mx-auto">
          <div className="eyebrow text-bone/70 mb-6">By appointment</div>
          <h2 className="font-serif text-5xl md:text-7xl leading-[1.05]">
            Begin a <span className="italic text-gold-soft">private</span> conversation.
          </h2>
          <p className="mt-8 text-bone/80 max-w-xl mx-auto leading-relaxed">
            Whether you are searching, selling, or simply curious — our advisors respond personally within twelve hours.
          </p>
          <form className="mt-12 flex flex-col sm:flex-row gap-0 max-w-xl mx-auto">
            <input type="email" placeholder="your@email.com" className="flex-1 bg-transparent border border-bone/40 px-6 py-5 text-bone placeholder:text-bone/50 outline-none focus:border-gold" />
            <button type="submit" className="bg-gold text-ink px-8 py-5 text-sm uppercase tracking-[0.2em] hover:bg-bone transition-colors duration-500">
              Request contact
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-bone/70 pt-20 pb-10">
        <div className="container-editorial grid md:grid-cols-4 gap-12 pb-16 border-b border-bone/10">
          <div>
            <div className="font-serif text-2xl text-bone">Maison <span className="italic text-gold">&amp;</span> Co.</div>
            <p className="text-sm mt-4 leading-relaxed">432 Park Avenue, 41st floor<br/>New York, NY 10022</p>
          </div>
          <div>
            <div className="eyebrow text-bone/50 mb-4">Explore</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="link-underline">Properties</a></li>
              <li><a href="#" className="link-underline">Neighborhoods</a></li>
              <li><a href="#" className="link-underline">Off-market</a></li>
              <li><a href="#" className="link-underline">Sell with us</a></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-bone/50 mb-4">House</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="link-underline">Our story</a></li>
              <li><a href="#" className="link-underline">Advisors</a></li>
              <li><a href="#" className="link-underline">Journal</a></li>
              <li><a href="#" className="link-underline">Press</a></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-bone/50 mb-4">Contact</div>
            <ul className="space-y-2 text-sm">
              <li>+1 (212) 555 0140</li>
              <li>private@maisonandco.ny</li>
              <li className="pt-2"><a href="#" className="link-underline">Instagram</a> · <a href="#" className="link-underline">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="container-editorial pt-8 flex flex-col md:flex-row justify-between text-xs uppercase tracking-[0.2em] text-bone/40">
          <span>© 2026 Maison & Co. — Licensed RE Brokerage</span>
          <span>New York · Hamptons · Palm Beach</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
