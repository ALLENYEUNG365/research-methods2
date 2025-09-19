"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Info, Globe2, SlidersHorizontal, Clock, Ruler } from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// === Data (derived from the user-provided text; scores are illustrative for visualization) ===
const radarData = [
  { key: "Sampling / Representativeness", label: "Sample & Generalizability", score: 9 },
  { key: "Variable Control", label: "Control of Confounds", score: 8 },
  { key: "Longitudinal Depth", label: "Longitudinal Depth", score: 7 },
  { key: "Measurement / Methods", label: "Measurement & Methods", score: 8 },
];

const threatBars = [
  { threat: "Generalizability", index: 9 },
  { threat: "Internal Validity (Confounds)", index: 8 },
  { threat: "Construct Validity (Measures)", index: 9 },
  { threat: "Sustainability (Time)", index: 7 },
];

const skillsCoverage = [
  { name: "Writing", value: 100 },
  { name: "Listening", value: 0 },
  { name: "Speaking", value: 0 },
  { name: "Reading", value: 0 },
];

const COLORS = ["#0ea5e9", "#a3e635", "#f59e0b", "#ef4444"]; // tailwind-esque hues

const items = [
  {
    id: 1,
    icon: Globe2,
    title: "Sampling & Representativeness",
    badges: ["Single university (East China)", "Uniform cultural background", "Limited majors"],
    points: [
      "Single sample source (one university in Eastern China) with relatively uniform cultural background, resulting in weak generalizability of conclusions.",
      "Does not cover majors such as arts and medicine, leading to insufficient professional representativeness and limited cross-disciplinary applicability.",
    ],
    implications:
      "Findings may not generalize to students in Central/Western China or to arts/medical majors.",
    remedies: [
      "Multi-site sampling across regions (East/Central/West).",
      "Stratified sampling by major (incl. arts & medicine).",
      "Report demographic/major balance & conduct subgroup analyses.",
    ],
  },
  {
    id: 2,
    icon: SlidersHorizontal,
    title: "Control of Variables",
    badges: ["Home learning environment", "Prior English foundation", "Learning style", "Instructor effects"],
    points: [
      "External confounding variables (home learning environment, English foundation, learning style) may affect the accuracy of results.",
      "Instructor variables not included; different teaching styles and AI proficiency of instructors may impact experimental group performance.",
    ],
    implications:
      "Potential bias in treatment effect estimates; internal validity at risk.",
    remedies: [
      "Collect baseline covariates; use ANCOVA / mixed-effects models.",
      "Balance instructors across groups or add instructor as random effect.",
      "Document AI usage fidelity and teacher training.",
    ],
  },
  {
    id: 3,
    icon: Clock,
    title: "Longitudinal Tracking",
    badges: ["One semester (16 weeks)", "No post-intervention follow-up"],
    points: [
      "The observation period is only 16 weeks, making it difficult to evaluate the long-term effects of AI language applications.",
      "No tracking of whether students' long-term learning habits have changed; it is unknown whether academic performance will decline after discontinuing AI use.",
    ],
    implications:
      "Unclear durability of gains and behavior change.",
    remedies: [
      "Extend to 2–4 semesters; add post-test (3, 6, 12 months).",
      "Growth-curve modeling for trajectory analysis.",
      "Track retention/transfer after AI usage stops.",
    ],
  },
  {
    id: 4,
    icon: Ruler,
    title: "Measurement & Methods",
    badges: ["Focus on writing", "Self-reported engagement"],
    points: [
      "Primarily focuses on writing skills; assessment of listening, speaking, and reading is relatively limited, making it difficult to fully reflect language proficiency.",
      "Learning engagement relies on self-reporting, which may lead to 'exaggerated participation' and subjective bias.",
    ],
    implications:
      "Construct coverage is narrow; possible common-method bias.",
    remedies: [
      "Adopt 4-skill assessments (L/S/R/W) + performance tasks.",
      "Use behavioral logs (LMS traces) & observer ratings.",
      "Triangulate with standardized tests & rubric reliability checks.",
    ],
  },
];

export default function StudyLimitationsVisualization() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            AI Language Study — Limitations Visualization
          </h1>
          <p className="text-slate-600">
            Based on the provided text on study limitations, visualization and actionable recommendations are constructed (visualization scores are for illustrative purposes only).
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Info className="h-4 w-4" />
            <span>Scores are illustrative to aid discussion; they are not inferential statistics.</span>
          </div>
        </div>

        {/* Top Grid: Radar + Bars + Pie */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Radar of Limitation Severity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="80%">
                    <PolarGrid />
                    <PolarAngleAxis dataKey="label" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={45} domain={[0, 10]} tick={{ fontSize: 10 }} />
                    <Radar name="Severity" dataKey="score" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.35} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Threats to Validity (Index)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={threatBars}>
                    <XAxis dataKey="threat" tick={{ fontSize: 12 }} interval={0} angle={-10} dy={10} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
                    <ReTooltip />
                    <Bar dataKey="index" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Skill Coverage Snapshot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={skillsCoverage} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
                      {skillsCoverage.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <ReTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {skillsCoverage.map((s, i) => (
                  <Badge key={s.name} variant="secondary" className="text-xs">
                    {s.name}: {s.value}%
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detail Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map(({ id, icon: Icon, title, badges, points, implications, remedies }) => (
            <Card key={id} className="shadow-sm">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-sky-500" />
                  <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
                </div>
                <div className="flex flex-wrap gap-2">
                  {badges.map((b) => (
                    <Badge key={b} variant="outline" className="text-xs">
                      {b}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-slate-700">What the text says</p>
                  <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                    {points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div>
                  <p className="font-medium text-amber-700">Why it matters</p>
                  <p className="mt-1 text-sm text-slate-700">{implications}</p>
                </div>
                <Separator />
                <div>
                  <p className="font-medium text-emerald-700">Remedies</p>
                  <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                    {remedies.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Timeline / Duration Note */}
        <div className="mt-8 grid grid-cols-1 gap-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Observation Window</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-slate-700">
                <p>
                  Study observation period: <span className="font-semibold">16 weeks (1 semester)</span>. It is recommended to extend to at least 2–4 semesters, with follow-up assessments at 3, 6, and 12 months after the intervention to evaluate long-term retention and transfer effects.
                </p>
              </div>
              <div className="mt-4">
                <div className="mb-2 flex justify-between text-xs text-slate-500">
                  <span>0</span>
                  <span>16</span>
                  <span>32</span>
                  <span>48 (weeks)</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-2/6 bg-sky-500" title="16/48 weeks"></div>
                </div>
                <div className="mt-2 text-xs text-slate-500">Blue indicates current study coverage; gray indicates recommended longer tracking intervals.</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs: Executive Summary & Methods Checklist */}
        <div className="mt-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Executive Summary & Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="summary">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="summary">Executive Summary</TabsTrigger>
                  <TabsTrigger value="checklist">Methods Checklist</TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="mt-4 space-y-2 text-sm text-slate-700">
                  <p>
                    The study is constrained by a narrow sample (one university, limited majors), incomplete control of confounds (home environment, prior English, learning style, instructor effects), a short observation window (16 weeks) with no follow-up, and restricted measurement (writing-centric; self-reported engagement). These limitations chiefly threaten generalizability, internal validity, construct coverage, and the durability of effects.
                  </p>
                </TabsContent>
                <TabsContent value="checklist" className="mt-4">
                  <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                    <li>Sampling spans multiple regions (East/Central/West) and majors (incl. arts/medicine).</li>
                    <li>Collect baseline covariates; pre-register analysis; use mixed-effects/ANCOVA controlling for instructors.</li>
                    <li>Ensure fidelity monitoring for AI usage; document teacher training & protocols.</li>
                    <li>Extend to multi-semester design with 3/6/12-month follow-ups; model growth trajectories.</li>
                    <li>Assess all four language skills + triangulate with behavioral logs & standardized tests.</li>
                    <li>Reduce self-report bias with multi-source measures; report inter-rater reliability.</li>
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="mt-10 text-center text-xs text-slate-500">
          Can export as independent HTML/PDF as needed, or switch to full English interface. Charts by Recharts.
        </div>
      </div>
    </div>
  );
}
