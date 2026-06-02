import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";

interface Props {
  defaultPrice: number;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(n));

export const MortgageCalculator = ({ defaultPrice }: Props) => {
  const [price, setPrice] = useState(defaultPrice);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(20);

  const { monthly, loan, totalInterest, totalPaid } = useMemo(() => {
    const down = (price * downPct) / 100;
    const loan = Math.max(price - down, 0);
    const n = years * 12;
    const r = rate / 100 / 12;
    const m = r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));
    const totalPaid = m * n;
    return { monthly: m, loan, totalInterest: totalPaid - loan, totalPaid };
  }, [price, downPct, rate, years]);

  return (
    <div className="border border-border bg-bone/30 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-5 h-5 text-brand" />
        <h3 className="font-display font-bold text-xl md:text-2xl">Simulateur de crédit</h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Prix du bien (DT)" value={price} onChange={setPrice} min={0} step={1000} />
        <Field label={`Apport (${downPct}%)`} value={downPct} onChange={(v) => setDownPct(Math.min(100, Math.max(0, v)))} min={0} max={100} step={1} />
        <Field label="Taux annuel (%)" value={rate} onChange={setRate} min={0} max={20} step={0.1} />
        <Field label="Durée (années)" value={years} onChange={(v) => setYears(Math.max(1, Math.min(30, v)))} min={1} max={30} step={1} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border">
        <Stat label="Mensualité" value={`${fmt(monthly)} DT`} highlight />
        <Stat label="Montant emprunté" value={`${fmt(loan)} DT`} />
        <Stat label="Intérêts totaux" value={`${fmt(totalInterest)} DT`} />
        <Stat label="Coût total" value={`${fmt(totalPaid)} DT`} />
      </div>
      <p className="text-[11px] text-muted-foreground mt-5 leading-relaxed">Simulation indicative à titre informatif. Les conditions réelles dépendent de la banque.</p>
    </div>
  );
};

const Field = ({ label, value, onChange, min, max, step }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number }) => (
  <label className="block">
    <span className="eyebrow text-muted-foreground block mb-2">{label}</span>
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className="w-full bg-background border border-border px-3 py-2.5 text-sm font-medium focus:outline-none focus:border-brand transition-colors"
    />
  </label>
);

const Stat = ({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) => (
  <div>
    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">{label}</div>
    <div className={`font-display font-bold ${highlight ? "text-2xl md:text-3xl text-brand" : "text-base md:text-lg"}`}>{value}</div>
  </div>
);