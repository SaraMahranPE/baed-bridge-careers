

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  GraduationCap, Building2, BookOpen, Users, Heart, ArrowRight,
  Accessibility, Globe, Lightbulb, Handshake, Target, Sparkles,
  Home, TrendingUp, Briefcase, Award
} from "lucide-react";
import { Layout } from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};
const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};
const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Divider = () => <div className="section-divider mb-12" />;

function HeroSection() {
  return (
    <section className="gradient-hero py-20 md:py-32 overflow-hidden relative">
      <motion.div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-accent/20 blur-3xl" animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
            Education for Employment is Made Accessible
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Skills. Opportunity.{" "}
            <span className="text-gradient-primary">Inclusion.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="mt-3 text-sm text-muted-foreground/70 tracking-wide">
            From content to connect · A Tech Product by Baed · Expert Content Solutions Since 2021
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Connecting people with disabilities to real careers in content marketing through AI-driven matching.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div animate={{ boxShadow: ["0 0 0 0 rgba(160,32,91,0)", "0 0 0 12px rgba(160,32,91,0.15)", "0 0 0 0 rgba(160,32,91,0)"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="rounded-lg">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
                <Link to="/career-match"><Sparkles className="mr-2 h-5 w-5" />Find My Career Match</Link>
              </Button>
            </motion.div>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/employers"><Building2 className="mr-2 h-5 w-5" />Hire Inclusive Talent</Link>
            </Button>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="mt-4 text-xs text-muted-foreground">
            Powered by DeepSeek AI · Free · Takes 30 seconds
          </motion.p>
        </div>
      </div>
    </section>    
  ); 
}


function AwardBannerSection() {
  return (
    <section className="py-3.5 relative overflow-hidden bg-[#5f1a37] border-y border-[#a0205b]/30">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fff279]/5 to-transparent pointer-events-none"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
      />
      <div className="container relative z-10">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="bg-[#fff279]/10 border border-[#fff279]/25 text-[#fff279] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0">
            TotalEnergies 2024
          </span>
          <div className="w-px h-3 bg-[#a0205b] shrink-0" />
          <p className="text-[#f9f2c2] text-xs font-medium">
            <span className="text-[#fff279] font-bold">Top 100 Shortlisted Startup in Egypt</span>
            <span className="text-[#daa9cd] mx-1.5">·</span>
            <span className="text-[#f9f2c2]/60">National Selection & Public Vote · Innovation in Sustainable Development</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const stats = [
    { number: "6", label: "Accessible courses" },
    { number: "4", label: "Live job listings" },
    { number: "AI", label: "Powered by DeepSeek" },
    { number: "100%", label: "Remote-friendly" },
  ];
  return (
    <section className="py-20 bg-card" aria-labelledby="about-heading">
      <div className="container max-w-6xl mx-auto">
        <Divider />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={0} className="text-center mb-12">
          {/* <h2 id="about-heading" className="text-3xl md:text-4xl font-bold">One Platform. Every Talent</h2> */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4"><span className="text-primary">One Platform. </span>Every Talent</h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={0.5} className="text-center mb-12">
          <p className="text-muted-foreground max-w-3xl mx-auto text-base leading-relaxed">
            We bridge the gap between skilled talents and inclusive employers. By leveraging Baed's deep expertise and DeepSeek AI technology, we don't just list jobs, we build roadmaps. We empower individuals to master Content Marketing and match them with teams where they can truly thrive.
          </p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="mt-3 text-sm text-muted-foreground/70 tracking-wide">
            Committed to 100% free accessibility for talents, powered by inclusive employers.
          </motion.p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={slideLeft} custom={1} className="rounded-2xl bg-[#5f1a37] p-8">
            <div className="inline-flex items-center gap-2 bg-[#f9f2c2]/10 px-3 py-1.5 rounded-full mb-4">
              <GraduationCap className="h-4 w-4 text-[#fff279]" />
              <span className="text-xs font-semibold text-[#fff279]">For Aspiring Talents</span>
            </div>
            <p className="text-[#f9f2c2] text-base leading-relaxed">Master practical content skills in an environment designed for your accessibility. From personalized roadmaps to real career matches, we turn your lived experience into a professional asset.</p>
            <Link to="/learners" className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-[#fff279] hover:text-[#fff060] transition-colors">Learn more <ArrowRight className="h-4 w-4" /></Link>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={slideRight} custom={1} className="rounded-2xl bg-[#f9f2c2] border border-[#a0205b]/20 p-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-4">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-primary">For Inclusive Employers</span>
            </div>
            <p className="text-muted-foreground text-base leading-relaxed">Access market-ready talent with disabilities and build high-efficiency teams. We guide you through digital accessibility and inclusive hiring to reach a wider, more diverse audience.</p>
            <Link to="/employers" className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">Learn more <ArrowRight className="h-4 w-4" /></Link>
          </motion.div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={scaleIn} custom={i} className="p-5 rounded-2xl bg-gradient-to-br from-[#5f1a37] to-[#a0205b] border border-[#a0205b]/30">
              <p className="text-2xl font-black text-[#fff279]">{stat.number}</p>
              <p className="text-xs text-[#fff279]/70 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BridgeSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#5f1a37]/5 via-transparent to-[#a0205b]/5" />
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={0} className="text-center mb-12">
            <Divider />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built on Experience, <span className="text-primary">Driven by Impact</span></h2>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {["5 Years Expertise", "6 Countries", "11 Industries", "25+ Global Brands"].map((item, i) => (
                <span key={i} className="text-xs font-semibold text-primary/70 bg-primary/5 px-3 py-1 rounded-full">{item}</span>
              ))}
            </div>
          </motion.div>
          <div className="space-y-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={slideLeft} custom={0} className="group relative overflow-hidden rounded-2xl bg-[#5f1a37] border-l-8 border-l-[#a0205b] shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#a0205b]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-xl bg-[#f9f2c2] text-[#5f1a37]"><TrendingUp className="h-5 w-5" /></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f9f2c2]">The Strategic Pivot</span>
                </div>
                <p className="text-[#f9f2c2] leading-relaxed">We are channeling our 5 years of field experience into building Tech Products and Solutions tailored for the Content Marketing and Production industry. Our mission is to empower both Creators and Companies by turning complex market challenges into streamlined digital tools.</p>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={slideRight} custom={0} className="group relative overflow-hidden rounded-2xl bg-[#f9f2c2] border-r-8 border-r-[#5f1a37] shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#5f1a37]/5 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-xl bg-[#5f1a37]/10 text-[#5f1a37]"><Heart className="h-5 w-5" /></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5f1a37]">Sustainability & Inclusivity</span>
                </div>
                <p className="text-[#5f1a37]/80 text-base leading-relaxed">As our first tech milestone, Baed Connect is built on the principles of Sustainability and Social Impact. We leverage AI not just for automation, but to unlock true inclusivity, ensuring that the future of content is accessible to every talent, regardless of barriers.</p>
              </div>
            </motion.div>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={1} className="text-center mt-10">
            <Link to="/about" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
              <span className="border-b border-primary/30 group-hover:border-primary transition-colors pb-0.5">From Services to Tech Solutions: Learn more about our story</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CareerMatchCTASection() {
  const results = [
    { number: "1", title: "Strongest Selling Point", desc: "A precise statement framing your lived experience as a professional asset." },
    { number: "2", title: "Best Job Match", desc: "Direct alignment between your background, skills, and accessibility needs." },
    { number: "3", title: "Recommended Courses", desc: "Targeted learning paths to bridge skill gaps and ensure market readiness." },
    { number: "4", title: "Custom Resume Tips", desc: "Bespoke guidance on presenting your profile for the content marketing industry." },
  ];
  return (
    <section className="py-24 overflow-hidden">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#5f1a37] via-[#a0205b] to-[#c374ae]" />
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full overflow-hidden pointer-events-none">
              <motion.div className="w-full h-full bg-[#f9f2c2]/5" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
            </div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full overflow-hidden pointer-events-none">
              <motion.div className="w-full h-full bg-[#f9f2c2]/5" animate={{ scale: [1.15, 1, 1.15] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
            </div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center p-10 md:p-16">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={slideLeft} custom={0}>
                <div className="inline-flex items-center gap-2 bg-[#f9f2c2]/15 text-[#f9f2c2] px-4 py-2 rounded-full text-xs font-semibold mb-6 border border-[#f9f2c2]/20">
                  <Sparkles className="h-3.5 w-3.5" />Powered by DeepSeek AI
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#f9f2c2] leading-tight mb-6">Your career roadmap,{" "}<span className="text-[#fff279]">in 30 seconds.</span></h2>
                <p className="text-[#f9f2c2]/75 text-base leading-relaxed mb-8">Tell DeepSeek AI about your background and accessibility needs. It instantly designs your personalized journey: from recommending the right courses to bridge your skills, to strategic resume tips and interview prep, guiding you to your perfect career match.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="bg-[#fff279] text-[#5f1a37] hover:bg-[#fff060] font-bold shadow-lg" asChild>
                    <Link to="/career-match"><Sparkles className="mr-2 h-5 w-5" />Try Career Match AI</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-[#f9f2c2]/40 text-[#f9f2c2] bg-transparent hover:bg-[#fff279] hover:text-[#5f1a37] hover:border-[#fff279]" asChild>
                    <Link to="/courses">Explore Courses</Link>
                  </Button>
                </div>
              </motion.div>
              <div className="space-y-3">
                {results.map((item, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={slideRight} custom={i} className="flex items-start gap-4 bg-[#f9f2c2]/10 backdrop-blur-sm rounded-xl p-4 border border-[#f9f2c2]/10">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#a0205b] text-[#f9f2c2] text-sm font-black shrink-0">{item.number}</span>
                    <div>
                      <p className="font-bold text-[#f9f2c2] text-sm">{item.title}</p>
                      <p className="text-[#f9f2c2]/65 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LearnerFeaturesSection() {
  const features = [
    { icon: BookOpen, label: "Accessible Lessons" },
    { icon: Users, label: "Expert Mentorship" },
    { icon: Sparkles, label: "AI Career Roadmap" },
    { icon: Target, label: "Portfolio Support" },
    { icon: Briefcase, label: "Job Matching" },
  ];
  return (
    <section className="py-20 bg-card" aria-labelledby="learner-features-heading">
      <div className="container">
        <Divider />
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={slideLeft} custom={0}>
            <h2 id="learner-features-heading" className="text-3xl md:text-4xl font-bold">What Talents Get</h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">One AI-powered platform designed to bypass accessibility barriers and accelerate your career.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div key={f.label} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={scaleIn} custom={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#f9f2c2] border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-200">
                <f.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm font-medium">{f.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EmployerFeaturesSection() {
  const features = [
    { icon: Users, label: "Qualified Talent Pipeline" },
    { icon: Lightbulb, label: "Inclusion Resources" },
    { icon: Accessibility, label: "Accessibility Guidance" },
    { icon: Globe, label: "Inclusive Hiring Tools" },
  ];
  return (
    <section className="py-20" aria-labelledby="employer-features-heading">
      <div className="container">
        <Divider />
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4 order-2 lg:order-1">
            {features.map((f, i) => (
              <motion.div key={f.label} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={scaleIn} custom={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#f9f2c2] border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-200">
                <f.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm font-medium">{f.label}</span>
              </motion.div>
            ))}
          </div>
          <motion.div className="order-1 lg:order-2" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={slideRight} custom={0}>
            <h2 id="employer-features-heading" className="text-3xl md:text-4xl font-bold">What Employers Get</h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">Empowering your workplace with market-ready talent and tools for digital inclusion.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const talentSteps = [
    { label: "Join", desc: "Create your profile.", href: null },
    { label: "Path", desc: "Get your AI roadmap.", href: null },
    { label: "Learn", desc: "Complete accessible courses.", href: null },
    { label: "Grow", desc: "Get expert mentorship.", href: null },
    { label: "Apply", desc: "Match with top roles.", href: null },
  ];
  const employerSteps = [
    { label: "Register", desc: "Create your account.", href: null },
    { label: "Learn", desc: "Explore inclusion guides.", href: null },
    { label: "Choose a Plan", desc: "Select a subscription to unlock features.", href: "/pricing" },
    { label: "Discover", desc: "Find trained talents.", href: null },
    { label: "Post", desc: "List your job openings.", href: null },
    { label: "Hire", desc: "Build inclusive teams.", href: null },
  ];
  return (
    <section className="py-20 bg-card" aria-labelledby="how-it-works-heading">
      <div className="container">
        <Divider />
        <motion.h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold mb-14 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={0}>
          How It Works
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {[
            { title: "For Talents", steps: talentSteps, icon: GraduationCap },
            { title: "For Employers", steps: employerSteps, icon: Building2 },
          ].map((track, idx) => (
            <motion.div key={track.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={idx === 0 ? slideLeft : slideRight} custom={1} className="p-8 rounded-2xl border border-border bg-[#f9f2c2]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-primary/10"><track.icon className="h-5 w-5 text-primary" /></div>
                <h3 className="text-xl font-bold">{track.title}</h3>
              </div>
              <ol className="space-y-4">
                {track.steps.map((step, i) => (
                  <motion.li key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-sm text-muted-foreground">
                      {step.href ? (
                        <Link to={step.href} className="font-semibold text-[#a0205b] underline underline-offset-2 hover:text-[#5f1a37] transition-colors">{step.label}:</Link>
                      ) : (
                        <span className="font-semibold text-foreground">{step.label}:</span>
                      )} {step.desc}
                    </span>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  const missionPoints = [
    { title: "The Evolution", description: "As our first digital product, Baed Connect transforms years of inclusion advocacy into a scalable, tech-driven reality.", icon: TrendingUp },
    { title: "The Foundation", description: "We are starting with Content Marketing to build the infrastructure for an inclusive workforce, setting the blueprint for a future where no talent is left behind.", icon: Building2 },
    { title: "Smart Business", description: "We believe that people with disabilities are powerful contributors to the digital economy. This isn't charity; it's a strategic shift toward a more innovative and inclusive Arab workforce.", icon: Heart },
  ];
  return (
    <section className="py-20 bg-card" aria-labelledby="mission-heading">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <Divider />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={0} className="text-center mb-12">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
              <Heart className="h-10 w-10 text-primary mx-auto mb-6" />
            </motion.div>
            <h2 id="mission-heading" className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-sm text-muted-foreground/70 tracking-wide">Baed Connect is where our mission at Baed meets technology.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {missionPoints.map((point, i) => (
              <motion.div key={point.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={scaleIn} custom={i} className="rounded-2xl bg-[#f9f2c2] border border-[#a0205b]/20 p-6 text-center group hover:shadow-lg transition-all duration-300">
                <div className="inline-flex p-3 rounded-xl bg-[#a0205b]/10 text-[#5f1a37] mb-4 group-hover:bg-[#a0205b] group-hover:text-[#f9f2c2] transition-all duration-300">
                  <point.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-[#5f1a37] text-lg mb-3">{point.title}</h3>
                <p className="text-[#5f1a37]/80 text-sm leading-relaxed">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyContentSection() {
  const features = [
    { title: "Flexible work environment", desc: "Naturally supports remote work and flexible hours — build a career that fits your accessibility needs, not the other way around.", icon: <Home className="h-4 w-4" /> },
    { title: "AI-driven accessibility", desc: "From screen reader support to automated formatting, AI removes technical friction — making creation seamless and inclusive by design.", icon: <Sparkles className="h-4 w-4" /> },
    { title: "Low-stimulation professionalism", desc: "Work independently in environments that suit your sensory needs — focusing on high-impact results rather than office constraints.", icon: <Heart className="h-4 w-4" /> },
    { title: "A scalable foundation", desc: "Mastering content is the launchpad — providing the digital mindset and tech-literacy to grow into any tech-driven industry.", icon: <TrendingUp className="h-4 w-4" /> },
  ];
  return (
    <section className="py-20">
      <div className="container">
        <div className="relative rounded-3xl bg-[#5f1a37] p-12 max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#daa9cd] mb-3">Why content marketing</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#f9f2c2] mb-3">The future of inclusive content</h2>
          <p className="text-[#daa9cd] mb-10">A $600B industry where digital efficiency meets human authenticity.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={scaleIn} custom={i} className="bg-[#f9f2c2]/5 border border-[#f9f2c2]/15 rounded-2xl p-6">
                <div className="w-9 h-9 rounded-xl bg-[#a0205b]/50 flex items-center justify-center text-[#fff279] mb-4">{f.icon}</div>
                <p className="font-semibold text-[#f9f2c2] text-sm mb-2">{f.title}</p>
                <p className="text-[#daa9cd] text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnershipSection() {
  const partnerTypes = [
    { title: "NGOs", description: "Collaborate to expand the reach and impact of accessible education and employment programs.", icon: Heart },
    { title: "Forward-thinking Companies", description: "Partner with us to access inclusive talent pipelines and demonstrate your commitment to diversity.", icon: Building2 },
    { title: "Educational Institutions", description: "Join forces to develop curriculum, share resources, and create pathways for students with disabilities.", icon: GraduationCap },
  ];
  return (
    <section className="py-20 bg-[#f9f2c2]" aria-labelledby="partner-heading">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <Divider />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={0} className="text-center mb-12">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
              <Handshake className="h-10 w-10 text-primary mx-auto mb-6" />
            </motion.div>
            <h2 id="partner-heading" className="text-3xl md:text-4xl font-bold mb-4">Partner With Us</h2>
            <p className="text-sm text-muted-foreground/70 tracking-wide">We're building more than a platform; we're building a movement.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {partnerTypes.map((partner, i) => (
              <motion.div key={partner.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={scaleIn} custom={i} className="rounded-2xl bg-[#a0205b] border border-[#a0205b]/20 p-6 text-center group hover:shadow-lg transition-all duration-300">
                <div className="inline-flex p-3 rounded-xl bg-[#a0205b]/10 text-[#daa9cd] mb-4 group-hover:bg-[#a0205b] group-hover:text-[#f9f2c2] transition-all duration-300">
                  <partner.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-[#f9f2c2] text-lg mb-3">{partner.title}</h3>
                <p className="text-[#f9f2c2] text-sm leading-relaxed">{partner.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={3} className="text-center mt-10">
            <p className="text-[#5f1a37] text-base leading-relaxed mb-6">Collaborate for Impact: Whether you're an NGO, a forward-thinking company, or an educational institution, let's join forces to redefine professional independence across the region.</p>
            <Button className="mt-4 bg-primary text-[#f9f2c2] hover:bg-primary/90" size="lg" asChild>
              <Link to="/partnerships">Explore Partnerships <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#a0205b] to-[#731f43] relative overflow-hidden">
      <motion.div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#f9f2c2]/5 blur-3xl" animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#f9f2c2]/5 blur-3xl" animate={{ scale: [1.3, 1, 1.3], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#f9f2c2]">Ready to Get Started?</h2>
            <p className="mt-4 text-lg text-[#f9f2c2]/70 leading-relaxed">Whether you're ready to learn new skills or build an inclusive team, Baed Connect is here for you.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#fff279] text-[#5f1a37] hover:bg-[#fff060] font-bold shadow-lg" asChild>
                <Link to="/career-match"><Sparkles className="mr-2 h-5 w-5" />Find My Career Match</Link>
              </Button>
              <Link to="/get-started" className="inline-flex items-center justify-center gap-2 h-11 px-8 text-base font-bold rounded-md border-2 border-[#f9f2c2]/40 text-[#f9f2c2] bg-transparent hover:bg-[#fff279] hover:text-[#5f1a37] hover:border-[#fff279] transition-all duration-200">
                <GraduationCap className="h-5 w-5" />Get Started Free
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AwardBannerSection />
      <AboutSection />
      <BridgeSection />
      <CareerMatchCTASection />
      <LearnerFeaturesSection />
      <EmployerFeaturesSection />
      <HowItWorksSection />
      <MissionSection />
      <WhyContentSection />
      <PartnershipSection />
      <FinalCTASection />
    </Layout>
  );
};

export default Index;