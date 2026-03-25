import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChallengeCard {
  number: string;
  company: string;
  title: string;
  context: string;
  coreChallenge: string;
  painPoints: string[];
  whyItMatters: string;
  opportunityAngle: string;
  opportunityItems: string[];
}

const challenges: ChallengeCard[] = [
  {
    number: "1",
    company: "Danske Bank",
    title: "Scaling GenAI Without Creating Regulatory Risk Debt",
    context: "Danske Bank is aggressively scaling GenAI (74% employee adoption) while operating under high AML scrutiny and strict regulatory expectations.",
    coreChallenge: "How might Danske Bank convert GenAI adoption into measurable productivity gains while ensuring AML compliance, risk governance, and auditability?",
    painPoints: [
      "AML risk assessment gaps flagged by regulator",
      "Lack of closed-loop compliance governance",
      "Unmeasured GenAI productivity benefits",
      "Cost discipline vs heavy tech investment pressure",
    ],
    whyItMatters: "Failure leads to regulatory penalties + operational friction + wasted AI investments",
    opportunityAngle: "Build a governed GenAI + AML intelligence layer that links:",
    opportunityItems: ["Risk → Controls → Evidence → Audit"],
  },
  {
    number: "2",
    company: "Salling Group",
    title: "Scaling Retail Growth Without Losing Margin & CX Consistency",
    context: "Aspire '28 targets DKK 100bn revenue, expansion across geographies, and heavy M&A.",
    coreChallenge: "How might Salling Group scale internationally and integrate acquisitions while maintaining operational efficiency and consistent customer experience?",
    painPoints: [
      "Cross-border integration complexity (Rimi Baltic, expansion markets)",
      "Margin pressure in grocery retail",
      "Cloud adoption instability impacting operations",
      "Fragmented customer experience across banners",
    ],
    whyItMatters: "Growth without integration → synergy leakage + CX inconsistency + margin erosion",
    opportunityAngle: "Create a unified retail operating model:",
    opportunityItems: [
      "Omnichannel personalization",
      "Integration factory for acquisitions",
      "AI-driven demand & pricing optimization",
    ],
  },
  {
    number: "3",
    company: "DSV A/S",
    title: "Turning Scale Into Advantage Post-Mega Acquisition",
    context: "DSV is integrating Schenker, while managing a 200,000+ partner ecosystem.",
    coreChallenge: "How might DSV integrate Schenker and unify its digital ecosystem to turn scale into a customer experience advantage instead of an operational burden?",
    painPoints: [
      "Large-scale integration risk (Schenker)",
      "Dependency on subcontractors (quality variability)",
      "Rising expectations for real-time visibility",
      "Manual processes in operations",
    ],
    whyItMatters: "Poor integration → customer churn + delayed synergies + operational inefficiencies",
    opportunityAngle: "Build a digital control tower + integration factory:",
    opportunityItems: [
      "Unified APIs & data layer",
      "Predictive exception handling",
      "Partner performance intelligence",
    ],
  },
  {
    number: "4",
    company: "Vestas Wind Systems",
    title: "Delivering Record Backlog While Recovering Margins",
    context: "Vestas has a €68B backlog but faces ramp-up cost pressures and service margin challenges.",
    coreChallenge: "How might Vestas scale manufacturing and service operations efficiently to deliver backlog while improving profitability?",
    painPoints: [
      "Manufacturing ramp-up inefficiencies",
      "Rising service costs",
      "Supply chain disruptions & geopolitical risks",
      "Balancing capex with shareholder returns",
    ],
    whyItMatters: "Execution failure → margin erosion + delayed delivery + customer dissatisfaction",
    opportunityAngle: "Enable AI-driven industrial intelligence:",
    opportunityItems: [
      "Digital twin for manufacturing",
      "Predictive service optimization",
      "Supply chain resilience analytics",
    ],
  },
  {
    number: "5",
    company: "TDC Group / Nuuday",
    title: "Breaking Free from Legacy to Enable Next-Gen Telecom",
    context: "Nuuday is replacing legacy systems (e.g., Columbus from the 1980s) with the Dawn platform.",
    coreChallenge: "How might TDC/Nuuday modernize legacy IT at scale while ensuring business continuity and improved customer experience?",
    painPoints: [
      "Deep-rooted legacy systems driving core operations",
      "Long-running transformation with high complexity",
      "Dependency on existing vendors (e.g., Infosys at TDC NET)",
      "Risk of transformation fatigue and delays",
    ],
    whyItMatters: "Slow modernization → high costs, low agility, poor CX",
    opportunityAngle: "Design a phased, AI-assisted legacy transformation:",
    opportunityItems: [
      "Platform migration acceleration",
      "Intelligent process abstraction",
      "Customer journey re-engineering",
    ],
  },
  {
    number: "6",
    company: "Ørsted",
    title: "Balancing Green Transition with Financial Discipline",
    context: "Ørsted operates in renewable energy with large-scale investments and market volatility pressures.",
    coreChallenge: "How might Ørsted optimize capital allocation and project execution while scaling renewable energy and managing financial risk?",
    painPoints: [
      "Capital-intensive project portfolio",
      "Market volatility (energy pricing, regulation)",
      "Complex asset lifecycle management",
      "ESG reporting and compliance expectations",
    ],
    whyItMatters: "Inefficiency → cost overruns + reduced investor confidence",
    opportunityAngle: "Build a digital asset intelligence platform:",
    opportunityItems: [
      "Predictive project performance",
      "ESG-linked financial analytics",
      "Portfolio optimization AI",
    ],
  },
];

function formatCardText(card: ChallengeCard): string {
  const lines = [
    `${card.company}`,
    `Challenge Card: "${card.title}"`,
    "",
    "Context:",
    card.context,
    "",
    "Core Challenge:",
    card.coreChallenge,
    "",
    "Key Pain Points:",
    ...card.painPoints.map((p) => `● ${p}`),
    "",
    "Why It Matters:",
    card.whyItMatters,
    "",
    "Opportunity Angle:",
    card.opportunityAngle,
    ...card.opportunityItems.map((o) => `● ${o}`),
  ];
  return lines.join("\n");
}

const ChallengeCards = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<ChallengeCard | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedPopup, setCopiedPopup] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopy = async (card: ChallengeCard, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(formatCardText(card));
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handlePopupCopy = async (card: ChallengeCard) => {
    await navigator.clipboard.writeText(formatCardText(card));
    setCopiedPopup(true);
    setTimeout(() => setCopiedPopup(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-2 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-lg font-semibold font-display text-card-foreground">
            Challenge Cards
          </h1>
        </div>
      </header>

      {/* Cards */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {challenges.map((card, idx) => (
            <button
              key={idx}
              onClick={() => { setSelected(card); setCopiedPopup(false); }}
              className="group relative rounded-xl border border-border bg-card p-6 text-left transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-accent rounded-t-xl" />

              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-bold text-primary uppercase tracking-wide">
                  {card.company}
                </p>
                <button
                  onClick={(e) => handleCopy(card, idx, e)}
                  className="rounded-md p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  title="Copy challenge content"
                >
                  {copiedIdx === idx ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              <h2 className="text-base font-semibold text-card-foreground font-display leading-snug mb-3 group-hover:text-primary transition-colors">
                {card.title}
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {card.context}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Detail popup */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative bg-card rounded-2xl border border-border shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close + Copy buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => handlePopupCopy(selected)}
                className="rounded-full p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                title="Copy full challenge"
              >
                {copiedPopup ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={() => setSelected(null)}
                className="rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">{selected.company}</p>
            <h2 className="text-2xl font-bold font-display text-card-foreground mb-5 pr-16">{selected.title}</h2>

            <Section label="Context">
              <p className="text-sm text-muted-foreground leading-relaxed">{selected.context}</p>
            </Section>

            <Section label="Core Challenge">
              <p className="text-sm text-card-foreground leading-relaxed font-medium italic">{selected.coreChallenge}</p>
            </Section>

            <Section label="Key Pain Points">
              <ul className="space-y-1.5">
                {selected.painPoints.map((p, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-destructive mt-0.5 shrink-0">●</span> {p}
                  </li>
                ))}
              </ul>
            </Section>

            <Section label="Why It Matters">
              <p className="text-sm text-muted-foreground leading-relaxed">{selected.whyItMatters}</p>
            </Section>

            <Section label="Opportunity Angle" last>
              <p className="text-sm text-card-foreground leading-relaxed font-medium mb-2">{selected.opportunityAngle}</p>
              <ul className="space-y-1.5">
                {selected.opportunityItems.map((o, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-primary mt-0.5 shrink-0">●</span> {o}
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </div>
      )}
    </div>
  );
};

function Section({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={last ? "" : "mb-5"}>
      <h3 className="text-xs font-bold uppercase tracking-wide text-primary mb-2">{label}</h3>
      {children}
    </div>
  );
}

export default ChallengeCards;
