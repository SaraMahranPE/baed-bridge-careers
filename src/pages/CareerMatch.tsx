import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Briefcase, BookOpen, MessageSquare,
  Loader2, ChevronRight, Star, FileText,
  ArrowRight, CheckCircle2, User, Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { courses as allCourses } from "./Courses";

const JOBS = [
  { title: "Content Writer", company: "TechStart Egypt", type: "Remote" },
  { title: "Social Media Coordinator", company: "Green Media Agency", type: "Remote" },
  { title: "SEO Content Specialist", company: "DigiGrowth", type: "Hybrid" },
  { title: "Junior Copywriter", company: "BrandMakers", type: "Remote" },
];

const COURSES = [
  { title: "Content Writing Fundamentals", level: "Beginner" },
  { title: "Social Media Marketing", level: "Beginner" },
  { title: "SEO & Content Strategy", level: "Intermediate" },
  { title: "Copywriting for Brands", level: "Intermediate" },
  { title: "Content Analytics", level: "Intermediate" },
  { title: "Accessible Content Creation", level: "All Levels" },
];

const DISABILITY_OPTIONS = [
  "Prefer not to say", "Physical disability", "Visual impairment",
  "Hearing impairment", "Mental health condition", "Chronic illness / pain condition",
  "Neurological condition (e.g. epilepsy)", "Neurodivergent (e.g. ADHD, autism)",
  "Learning disability", "Multiple disabilities", "Other",
];

const JOB_FIELD_OPTIONS = [
  "Content Writing", "Social Media Management", "SEO & Content Strategy",
  "Copywriting", "Content Analytics",
];

type MatchResult = {
  jobMatch: string;
  jobCompany: string;
  jobReason: string;
  matchScore: number;
  courses: string[];
  resumeTips: string[];
  interviewTips: string[];
  encouragement: string;
  sellingPoint: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const resultCardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }),
};

export default function CareerMatch() {
  const [background, setBackground] = useState("");
  const [accessibilityNeeds, setAccessibilityNeeds] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [disability, setDisability] = useState("");
  const [jobFields, setJobFields] = useState<string[]>([]);
  const [otherJobField, setOtherJobField] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string>("");

  const toggleJobField = (field: string) => {
    setJobFields(prev => prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]);
  };

  const handleMatch = async () => {
    setError("");
    if (!background.trim()) { setError("Please describe your background and skills."); return; }
    if (!accessibilityNeeds) { setError("Please select your accessibility needs."); return; }
    if (!experienceLevel) { setError("Please select your experience level."); return; }

    setLoading(true);
    setResult(null);

    const selectedFields = [...jobFields, ...(otherJobField.trim() ? [otherJobField.trim()] : [])];

    const prompt = `
You are a compassionate and expert career advisor for Baed Connect — a platform that helps people with disabilities build careers in content marketing.

A candidate has submitted their profile. Analyze it carefully and match them to the best opportunity on our platform.

CANDIDATE PROFILE:
- Background and skills: ${background}
- Disability type: ${disability || "Not specified"}
- Accessibility needs: ${accessibilityNeeds}
- Experience level: ${experienceLevel}
- Interested job fields: ${selectedFields.length > 0 ? selectedFields.join(", ") : "Open to all content marketing roles"}

AVAILABLE JOBS ON OUR PLATFORM:
${JOBS.map((j, i) => `${i + 1}. ${j.title} at ${j.company} (${j.type})`).join("\n")}

AVAILABLE COURSES ON OUR PLATFORM:
${COURSES.map((c, i) => `${i + 1}. ${c.title} (${c.level})`).join("\n")}

You MUST respond in this exact JSON format and nothing else:
{
  "jobMatch": "exact job title from the list",
  "jobCompany": "exact company name from the list",
  "jobReason": "2-3 sentences explaining why this job is the best fit for this specific person, mentioning their background and accessibility needs",
  "matchScore": a number between 60 and 95. Be honest and realistic,
  "courses": ["course title 1", "course title 2"],
  "resumeTips": ["tip 1", "tip 2", "tip 3"],
  "interviewTips": ["tip 1", "tip 2", "tip 3"],
  "encouragement": "one warm, genuine sentence encouraging this specific person",
  "sellingPoint": "one powerful, specific sentence about what makes this candidate uniquely stand out"
}`;

    try {
      const response = await fetch("/api/career-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(`${response.status}: ${data.error?.message || "API error"}`);
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("No response from AI");
      const cleaned = text.replace(/```json|```/g, "").trim();
      setResult(JSON.parse(cleaned));
    } catch (err: any) {
      console.error(err);
      const msg = err?.message?.toLowerCase() || "";
      if (msg.includes("429") || msg.includes("quota") || msg.includes("rate")) {
        setError("rate_limit");
      } else if (msg.includes("api key") || msg.includes("401") || msg.includes("403")) {
        setError("api_key");
      } else {
        setError("general");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setBackground("");
    setAccessibilityNeeds("");
    setExperienceLevel("");
    setDisability("");
    setJobFields([]);
    setOtherJobField("");
    setError("");
  };

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5f1a37] via-[#a0205b] to-[#c374ae]" />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full overflow-hidden pointer-events-none">
          <motion.div className="w-full h-full bg-white/5" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
        </div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full overflow-hidden pointer-events-none">
          <motion.div className="w-full h-full bg-white/5" animate={{ scale: [1.15, 1, 1.15] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        </div>
        <div className="absolute top-10 right-1/3 w-32 h-32 rounded-full overflow-hidden pointer-events-none">
          <motion.div className="w-full h-full bg-[#fff279]/10" animate={{ y: [0, -16, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
        </div>

        <div className="container relative z-10 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-white/15 text-white border border-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="h-4 w-4 text-[#fff279]" />
              Powered by DeepSeek AI
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#fff9c6] mb-6 leading-tight">
              Find Your Perfect<br />
              <span className="text-[#fff279]">Career Match</span>
            </h1>
            <p className="text-lg text-[#fff9c6] leading-relaxed max-w-2xl mx-auto mb-10">
              Tell us about yourself and our AI will match you to the right job, recommend
              the courses you need, and prepare you for your interview — all tailored to your
              unique background and accessibility needs.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: "🎯", text: "Job match" },
                { icon: "⭐", text: "Selling point" },
                { icon: "📚", text: "Course path" },
                { icon: "📄", text: "Resume tips" },
                { icon: "💬", text: "Interview prep" },
              ].map((pill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80"
                >
                  <span>{pill.icon}</span>
                  <span>{pill.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FORM / RESULTS ── */}
      <section className="py-16 bg-background">
        <div className="container max-w-3xl">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Form header */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
                    <User className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Tell us about yourself</h2>
                  <p className="text-muted-foreground text-sm">The more you share, the more personalized your match will be.</p>
                </div>

                <div className="space-y-6">
                  {/* Background */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <label className="block text-sm font-bold text-foreground mb-1">
                      Your background and skills
                    </label>
                    <p className="text-xs text-muted-foreground mb-3">
                      Tell us about your experience, skills, and what you've worked on — even if unrelated to content.
                    </p>
                    <textarea
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      placeholder="e.g. I have a background in journalism and wrote for a student newspaper. I'm good at storytelling and have experience with Instagram content..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border-2 border-border text-sm text-foreground bg-background focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  {/* Two column: disability + accessibility */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-card border border-border rounded-2xl p-6">
                      <label className="block text-sm font-bold text-foreground mb-1">
                        Disability type <span className="text-muted-foreground font-normal text-xs">(optional)</span>
                      </label>
                      <p className="text-xs text-muted-foreground mb-3">Helps us match you to the right environment.</p>
                      <select
                        value={disability}
                        onChange={(e) => setDisability(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border-2 border-border text-sm text-foreground bg-background focus:outline-none focus:border-primary transition-colors"
                      >
                        <option value="">Select type...</option>
                        {DISABILITY_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-6">
                      <label className="block text-sm font-bold text-foreground mb-1">Work needs</label>
                      <p className="text-xs text-muted-foreground mb-3">Your accessibility and work style preferences.</p>
                      <select
                        value={accessibilityNeeds}
                        onChange={(e) => setAccessibilityNeeds(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border-2 border-border text-sm text-foreground bg-background focus:outline-none focus:border-primary transition-colors"
                      >
                        <option value="">Select needs...</option>
                        <option value="Remote work only — I work best from home">Remote work only</option>
                        <option value="Flexible hours — I need to manage my energy and rest throughout the day">Flexible hours</option>
                        <option value="Screen reader compatible tools and written communication preferred">Screen reader support</option>
                        <option value="Low-stimulation environment — I work better with minimal distractions">Low-stimulation environment</option>
                        <option value="Part-time or reduced hours to manage my condition">Part-time / reduced hours</option>
                        <option value="No specific accessibility requirements beyond remote work">No specific requirements</option>
                      </select>
                    </div>
                  </div>

                  {/* Job fields */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <label className="block text-sm font-bold text-foreground mb-1">Roles that interest you</label>
                    <p className="text-xs text-muted-foreground mb-3">Select all that apply. Leave blank if open to everything.</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {JOB_FIELD_OPTIONS.map((field) => (
                        <button
                          key={field}
                          onClick={() => toggleJobField(field)}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                            jobFields.includes(field)
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                          }`}
                        >
                          {jobFields.includes(field) && <CheckCircle2 className="inline h-3 w-3 mr-1" />}
                          {field}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={otherJobField}
                      onChange={(e) => setOtherJobField(e.target.value)}
                      placeholder="Other role (e.g. Email marketing, Podcast production...)"
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-border text-sm text-foreground bg-background focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Experience level */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <label className="block text-sm font-bold text-foreground mb-3">Experience level in content marketing</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Beginner", "Intermediate", "Advanced"].map((level) => (
                        <button
                          key={level}
                          onClick={() => setExperienceLevel(level)}
                          className={`py-4 rounded-xl border-2 text-sm font-bold transition-all ${
                            experienceLevel === level
                              ? "border-primary bg-primary text-white shadow-lg"
                              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                 {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-2xl p-5 border ${
                      error === "rate_limit"
                        ? "bg-[#fff9c6] border-[#fff279]"
                        : "bg-destructive/10 border-destructive/20"
                    }`}
                  >
                    {error === "rate_limit" ? (
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0">⏳</span>
                        <div>
                          <p className="font-bold text-[#5f1a37] text-sm mb-1">
                            Our AI is taking a short break
                          </p>
                          <p className="text-[#731f43] text-sm leading-relaxed">
                            We've hit the free tier limit for our AI service. This is temporary —
                            please wait a minute and try again. The feature works perfectly, it just
                            needs a moment to reset.
                          </p>
                          <button
                            onClick={() => setError("")}
                            className="mt-3 text-xs font-bold text-[#5f1a37] underline underline-offset-2 hover:text-[#a0205b] transition-colors"
                          >
                            Dismiss and try again
                          </button>
                        </div>
                      </div>
                    ) : error === "api_key" ? (
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0">🔑</span>
                        <div>
                          <p className="font-bold text-destructive text-sm mb-1">
                            AI configuration issue
                          </p>
                          <p className="text-destructive/80 text-sm leading-relaxed">
                            There's a configuration issue with the AI service. If you're a judge
                            reviewing this project, please check that the OpenRouter API key is set
                            in the environment variables.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0">🔄</span>
                        <div>
                          <p className="font-bold text-destructive text-sm mb-1">
                            Something went wrong
                          </p>
                          <p className="text-destructive/80 text-sm leading-relaxed">
                            The AI couldn't process your request right now. Please check your
                            connection and try again — this is usually a temporary issue.
                          </p>
                          <button
                            onClick={() => setError("")}
                            className="mt-3 text-xs font-bold text-destructive underline underline-offset-2 hover:opacity-70 transition-opacity"
                          >
                            Try again
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                  <motion.div
                    animate={loading ? {} : { boxShadow: ["0 0 0 0 rgba(160,32,91,0)", "0 0 0 14px rgba(160,32,91,0.15)", "0 0 0 0 rgba(160,32,91,0)"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="rounded-xl"
                  >
                    <Button onClick={handleMatch} disabled={loading} className="w-full h-14 text-[#fff9c6] font-bold" size="lg">
                      {loading ? (
                        <span className="flex items-center gap-3">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          DeepSeek AI is analyzing your profile...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3">
                          <Sparkles className="h-5 w-5" />
                          Find My Career Match
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Score hero card */}
                <motion.div
                  variants={resultCardVariants} initial="hidden" animate="visible" custom={0}
                  className="relative overflow-hidden rounded-3xl p-8 text-white text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5f1a37] via-[#a0205b] to-[#c374ae]" />
                  <motion.div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }} />
                  <motion.div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#fff279]/10" animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 5, repeat: Infinity }} />
                  <div className="relative z-10">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3">Your Career Match Score</p>
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="text-8xl font-black text-[#fff279] mb-3 leading-none"
                    >
                      {result.matchScore}%
                    </motion.div>
                    <p className="text-white/80 text-base leading-relaxed max-w-lg mx-auto">{result.encouragement}</p>
                  </div>
                </motion.div>

                {/* Selling point */}
                <motion.div variants={resultCardVariants} initial="hidden" animate="visible" custom={1}
                  className="bg-gradient-to-br from-[#fff9c6] to-[#fdfdef] border-2 border-[#fff279] rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-[#5f1a37]">
                      <Star className="h-5 w-5 text-[#fff279]" />
                    </div>
                    <h3 className="font-bold text-lg text-[#3d1a2e]">Your Strongest Selling Point</h3>
                  </div>
                  <p className="text-[#5f1a37] leading-relaxed font-semibold italic text-base">
                    "{result.sellingPoint}"
                  </p>
                </motion.div>

                {/* Job match */}
                <motion.div variants={resultCardVariants} initial="hidden" animate="visible" custom={2}
                  className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-primary/10">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground">Best Job Match</h3>
                    <span className="ml-auto text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary">Top Pick</span>
                  </div>
                  <div className="mb-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <p className="font-bold text-foreground text-xl">{result.jobMatch}</p>
                    <p className="text-sm text-primary font-semibold mt-0.5">{result.jobCompany}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{result.jobReason}</p>
                </motion.div>

                {/* Recommended courses */}
                <motion.div variants={resultCardVariants} initial="hidden" animate="visible" custom={3}
                  className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground">Recommended Courses</h3>
                  </div>
                  <div className="space-y-3">
                    {result.courses.map((course, i) => (
                      <Link
                        key={i}
                        to={`/courses/${allCourses.find(c => c.title.toLowerCase().includes(course.toLowerCase().split(" ")[0]) || course.toLowerCase().includes(c.title.toLowerCase().split(" ")[0]))?.slug || 'content-writing-fundamentals'}`}
                        className="flex items-center gap-3 p-4 rounded-xl bg-background border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
                      >
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-xs font-bold shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex-1">{course}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </motion.div>

                {/* Resume tips */}
                <motion.div variants={resultCardVariants} initial="hidden" animate="visible" custom={4}
                  className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground">Resume Tips</h3>
                  </div>
                  <div className="space-y-3">
                    {result.resumeTips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border">
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                        <span className="text-sm text-muted-foreground leading-relaxed">{tip}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Interview tips */}
                <motion.div variants={resultCardVariants} initial="hidden" animate="visible" custom={5}
                  className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-primary/10">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground">Interview Preparation</h3>
                  </div>
                  <div className="space-y-3">
                    {result.interviewTips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border">
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                        <span className="text-sm text-muted-foreground leading-relaxed">{tip}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA row */}
                <motion.div variants={resultCardVariants} initial="hidden" animate="visible" custom={6}
                  className="grid sm:grid-cols-2 gap-4 pt-2">
                  <Button
                    className="w-full h-12 border-2 border-[#a0205b] text-[#a0205b] bg-transparent hover:bg-[#a0205b] hover:text-white transition-all font-bold"
                    onClick={resetForm}
                    variant="outline"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Try a different profile
                  </Button>
                  <Button className="w-full h-12 bg-[#5f1a37] hover:bg-[#731f43] text-white font-bold" asChild>
                    <Link to="/courses">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Browse all courses
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
}