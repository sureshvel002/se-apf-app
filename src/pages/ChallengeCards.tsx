import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChallengeCard {
  number: string;
  title: string;
  image: string;
  context: string;
  businessImpact: string[];
  systems: string[];
  aiOpportunity: { name: string; detail: string }[];
  outcomes: string[];
}

const challenges: ChallengeCard[] = [
  {
    number: "Challenge 1",
    title: "Integration Visibility & Silo Consolidation",
    image: "/challenge1.png",
    context:
      "APF teams are expected to run and evolve the Digital Core platforms, but integration reality is often: limited visualization of integrations end-to-end, multiple siloed solutions and overlapping point-to-point flows, hard to trace what breaks what — slow troubleshooting and change impact analysis.",
    businessImpact: [
      "Slower delivery and higher run cost due to repeated incident firefighting",
      "Higher outage/defect risk during releases because dependencies aren't visible",
      "Limits Siemens Energy's objective to transform the way we operate through a stable digital backbone",
    ],
    systems: ["SnapLogic (iPaaS/integration)", "SAP", "Workday", "ServiceNow", "Snowflake", "Microsoft stack"],
    aiOpportunity: [
      { name: "Integration Observability Agent", detail: "Auto-discovers integration topology and creates live dependency maps" },
      { name: "Change Impact Agent", detail: "Predicts downstream impact before a change/release; generates targeted regression tests" },
      { name: "Consolidation Recommendation Agent", detail: "Identifies duplicate/silo integrations and proposes rationalization candidates" },
    ],
    outcomes: [
      "Faster incident diagnosis and lower MTTR through real-time dependency visibility",
      "Reduced integration fragility and change risk (fewer \"unknown dependencies\")",
      "Clear rationalization pipeline to reduce duplicated silo solutions",
    ],
  },
  {
    number: "Challenge 2",
    title: "Ticket Backlogs, Long-Runner Tickets & Slow Throughput",
    image: "/challenge2.png",
    context:
      "APF operations struggle with: tickets that should be quickly handled automatically still requiring manual triage, difficulty identifying long-runner tickets and root causes, friction to create standard artifacts (e.g., RTP & JIA as standardized request/change objects), inconsistent routing and resolution quality across queues.",
    businessImpact: [
      "Higher overhead intensity (support effort grows linearly with demand)",
      "Slower internal service delivery — delays to Finance/HR/Procurement outcomes",
      "Reduces confidence in the platform operating model (\"run\" consumes \"change\" capacity)",
    ],
    systems: ["ServiceNow", "Microsoft (Teams/Outlook)", "Snowflake (analytics signals)", "SAP / Workday (context signals)", "SnapLogic (integration events)"],
    aiOpportunity: [
      { name: "Case Triage & Resolution Agent (L1/L2)", detail: "Auto-classifies, routes, drafts resolution steps; executes deterministic fixes under policy" },
      { name: "Long-Runner Detection Agent", detail: "Flags stuck tickets, identifies bottlenecks, recommends next-best action and owner" },
      { name: "RTP/JIA Builder Agent", detail: "Converts chat/intake into complete, policy-compliant ServiceNow request/change records" },
    ],
    outcomes: [
      "Reduced backlog and faster ticket cycle times via autonomous triage + resolution playbooks",
      "Earlier identification and active management of long-runner tickets",
      "Higher consistency of ticket quality and fewer rework loops",
    ],
  },
  {
    number: "Challenge 3",
    title: "Documentation Gaps & Bureaucracy in Cross-Platform Execution",
    image: "/challenge3.png",
    context:
      "APF teams are forced into manual coordination because: documentation is not consistently up to date, users and support teams lack better information access at the moment of need, process execution remains bureaucratic with high manual touchpoints for PO creation / service onboarding / ITSM tasks, repetitive operational steps, and too much noise with too little structured actionable guidance.",
    businessImpact: [
      "Slower onboarding of services and changes to the digital core",
      "Higher operational effort and inconsistent execution quality",
      "Increases platform risk due to undocumented tribal knowledge and manual workarounds",
    ],
    systems: ["ServiceNow (workflow + knowledge)", "Microsoft (collaboration)", "SAP / Workday (process context)", "Snowflake (signals)", "Mendix (front-end apps/workflow surfaces)"],
    aiOpportunity: [
      { name: "Knowledge-to-Action Agent", detail: "Turns knowledge articles/runbooks into executable workflows (ticket actions, checklists, validations)" },
      { name: "Documentation Steward Agent", detail: "Detects documentation drift from incident/change history; proposes updates; routes for approval" },
      { name: "Onboarding Orchestrator Agent", detail: "Automates cross-team onboarding tasks (ITSM, access, service enablement) with audit trail" },
      { name: "Task Hand-Off Agent", detail: "Safely hands over routine tasks to AI for execution under policy" },
    ],
    outcomes: [
      "Faster service onboarding and fewer manual coordination loops",
      "Lower operational workload by shifting repetitive tasks from humans to supervised/autonomous agents",
      "Improved run reliability through living documentation and executable runbooks",
    ],
  },
];

function formatCardText(card: ChallengeCard): string {
  const lines = [
    `${card.number}: ${card.title}`,
    "",
    "Context / Problem",
    card.context,
    "",
    "Business Impact",
    ...card.businessImpact.map((b) => `• ${b}`),
    "",
    "Systems Involved",
    card.systems.join(", "),
    "",
    "AI Opportunity (Agentic)",
    ...card.aiOpportunity.map((a) => `• ${a.name} → ${a.detail}`),
    "",
    "Outcome",
    ...card.outcomes.map((o) => `➡️ ${o}`),
  ];
  return lines.join("\n");
}

const ChallengeCards = () => {
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImg(null);
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
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {challenges.map((card, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImg(card.image)}
              className="group relative rounded-xl border border-border bg-card p-6 text-left transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-accent rounded-t-xl" />

              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-bold text-primary uppercase tracking-wide">
                  {card.number}
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

              <h2 className="text-lg font-semibold text-card-foreground font-display leading-snug mb-3 group-hover:text-primary transition-colors">
                {card.title}
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {card.context}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Image overlay */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setSelectedImg(null)}
        >
          <img
            src={selectedImg}
            alt="Challenge card"
            className="max-w-[85vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setSelectedImg(null)}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChallengeCards;
