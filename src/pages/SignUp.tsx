import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignUp = () => {
    setError("");
    if (!form.name.trim()) { setError("Please enter your name."); return; }
    if (!form.email.trim()) { setError("Please enter your email address."); return; }
    if (!isValidEmail(form.email.trim())) { setError("Please enter a valid email address."); return; }
    if (!form.password || form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (!form.role) { setError("Please select how you're joining."); return; }

    setLoading(true);
    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem("baed_registered_users") || "[]");
      const emailTaken = existing.find((u: any) => u.email === form.email.trim().toLowerCase());
      if (emailTaken) {
        setError("An account with this email already exists.");
        setLoading(false);
        return;
      }
      const newUser = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
      };
      localStorage.setItem("baed_registered_users", JSON.stringify([...existing, newUser]));
      localStorage.setItem("baed_user", JSON.stringify(newUser));
      navigate("/");
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — brand panel */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#5f1a37] via-[#a0205b] to-[#c374ae] p-12 relative overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-white/5"
          animate={{ scale: [1.15, 1, 1.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10">
          <Link to="/" className="text-2xl font-extrabold text-white">
            Baed<span className="text-[#fff279]"> Connect</span>
          </Link>
        </div>
        <div className="relative z-10 space-y-6">
          <div>
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Join thousands<br />
              <span className="text-[#fff279]">building careers.</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Create your free account and get matched to your ideal role in content marketing — in 30 seconds.
            </p>
          </div>
          <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-3">What you get free</p>
            {[
              "AI Career Match powered by DeepSeek",
              "Access to 6 content marketing courses",
              "Job matching with inclusive employers",
              "Resume tips tailored to your profile",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#fff279]" />
                <span className="text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-white/40 text-sm">© 2026 Baed Connect — A product of Baed (بعض)</p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center px-6 py-12 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="lg:hidden block text-xl font-extrabold text-foreground mb-8">
            Baed<span className="text-primary"> Connect</span>
          </Link>

          <div className="mb-8">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Get Started Free</p>
            <h1 className="text-3xl font-bold text-foreground mb-2">Create your account</h1>
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">Log in</Link>
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Full name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="off"
                className="w-full px-4 py-3 rounded-xl border-2 border-border text-sm text-foreground bg-card focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Email address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="off"
                className="w-full px-4 py-3 rounded-xl border-2 border-border text-sm text-foreground bg-card focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  autoComplete="off"
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-border text-sm text-foreground bg-card focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">I am joining as</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-border text-sm text-foreground bg-card focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Select your role...</option>
                <option value="Learner">A learner with a disability</option>
                <option value="Employer">An employer seeking inclusive talent</option>
                <option value="Mentor">A mentor or partner</option>
              </select>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3"
              >
                {error}
              </motion.p>
            )}

            <Button onClick={handleSignUp} disabled={loading} className="w-full h-12 text-base" size="lg">
              {loading ? "Creating account..." : "Create Account"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By signing up you agree to our{" "}
              <Link to="/terms-of-service" className="text-primary hover:underline">Terms</Link>
              {" "}and{" "}
              <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;