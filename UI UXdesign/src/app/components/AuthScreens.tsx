import { useState } from "react";
import { Eye, EyeOff, ArrowRight, ArrowLeft, Check, Car, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TrusteeLogo } from "./TrusteeLogo";

type Screen = "login" | "signup" | "car";

interface Props {
  onComplete: (profile: { email: string; carName: string; color: string }) => void;
}

const CAR_COLORS = [
  { name: "Forest", hex: "#2E7D52" },
  { name: "Gold", hex: "#F5C842" },
  { name: "Charcoal", hex: "#1C2826" },
  { name: "Leaf", hex: "#4CAF7D" },
  { name: "Alert", hex: "#E84545" },
  { name: "Sage", hex: "#6B8C7E" },
];

const ADJECTIVES = ["Green", "Swift", "Iron", "Blue", "Silver", "Dawn", "Quiet", "Bright", "Wild", "Stone"];
const NOUNS = ["Dart", "Pine", "Moss", "Wren", "Oak", "Reed", "Hawk", "Ash", "Fox", "Elm"];

function randomName() {
  const a = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const n = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${a}${n}`;
}

function InputField({
  label, type, value, onChange, placeholder, error
}: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder?: string; error?: string;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500, color: "#1C2826" }}>
        {label}
      </label>
      <div className="relative">
        <input
          type={isPassword && show ? "text" : type ?? "text"}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 rounded-xl outline-none transition-all"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            color: "#1C2826",
            backgroundColor: "#F4F8F6",
            border: `1.5px solid ${error ? "#E84545" : "rgba(46,125,82,0.2)"}`,
            paddingRight: isPassword ? 40 : 12,
          }}
          onFocus={e => { e.currentTarget.style.borderColor = error ? "#E84545" : "#4CAF7D"; }}
          onBlur={e => { e.currentTarget.style.borderColor = error ? "#E84545" : "rgba(46,125,82,0.2)"; }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {show ? <EyeOff size={15} color="#6B8C7E" /> : <Eye size={15} color="#6B8C7E" />}
          </button>
        )}
      </div>
      {error && (
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#E84545" }}>{error}</p>
      )}
    </div>
  );
}

function LoginPanel({ onSignup, onLogin }: { onSignup: () => void; onLogin: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = () => {
    const e: Record<string, string> = {};
    if (!email.includes("@")) e.email = "Enter a valid email";
    if (pass.length < 6) e.pass = "Password must be at least 6 characters";
    setErrors(e);
    if (!Object.keys(e).length) onLogin(email);
  };

  return (
    <div className="flex flex-col h-full px-6">
      <div className="pt-10 pb-8 flex flex-col items-center gap-2">
        <TrusteeLogo size="lg" />
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B8C7E", marginTop: 8 }}>
          Your road. Your assistant.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <InputField label="Email" type="email" value={email} onChange={setEmail}
          placeholder="you@example.com" error={errors.email} />
        <InputField label="Password" type="password" value={pass} onChange={setPass}
          placeholder="••••••••" error={errors.pass} />

        <button
          onClick={submit}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl mt-1 transition-opacity active:opacity-80"
          style={{ backgroundColor: "#2E7D52" }}
        >
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#fff" }}>
            Sign In
          </span>
          <ArrowRight size={15} color="#fff" />
        </button>

        <button
          onClick={submit}
          className="w-full py-2.5 rounded-xl"
          style={{ border: "1.5px solid rgba(46,125,82,0.25)", backgroundColor: "transparent" }}
        >
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#2E7D52" }}>
            Continue with Google
          </span>
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div className="flex-1 h-px" style={{ backgroundColor: "rgba(46,125,82,0.15)" }} />
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#6B8C7E" }}>or</span>
        <div className="flex-1 h-px" style={{ backgroundColor: "rgba(46,125,82,0.15)" }} />
      </div>

      <button onClick={onSignup} className="mt-5 text-center">
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6B8C7E" }}>
          Don't have an account?{" "}
        </span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#2E7D52", fontWeight: 600 }}>
          Sign Up
        </span>
      </button>

      <div className="flex-1" />
      <p className="pb-6 text-center" style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "#6B8C7E" }}>
        Camera & location data never leave your device
      </p>
    </div>
  );
}

function SignupPanel({ onBack, onNext }: { onBack: () => void; onNext: (email: string) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.includes("@")) e.email = "Enter a valid email";
    if (pass.length < 6) e.pass = "At least 6 characters";
    if (pass !== confirm) e.confirm = "Passwords don't match";
    setErrors(e);
    if (!Object.keys(e).length) onNext(email);
  };

  return (
    <div className="flex flex-col h-full px-6">
      <div className="pt-8 pb-2 flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#F4F8F6" }}>
          <ArrowLeft size={16} color="#2E7D52" />
        </button>
        <TrusteeLogo size="sm" />
      </div>

      <div className="pt-4 pb-6">
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "#1C2826", fontWeight: 400 }}>
          Create account
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B8C7E", marginTop: 4 }}>
          Step 1 of 2 — Your details
        </p>
        <div className="flex gap-1.5 mt-3">
          <div className="h-1 rounded-full flex-1" style={{ backgroundColor: "#2E7D52" }} />
          <div className="h-1 rounded-full flex-1" style={{ backgroundColor: "rgba(46,125,82,0.2)" }} />
        </div>
      </div>

      <div className="flex flex-col gap-3.5">
        <InputField label="Full name" value={name} onChange={setName}
          placeholder="Alex Johnson" error={errors.name} />
        <InputField label="Email" type="email" value={email} onChange={setEmail}
          placeholder="you@example.com" error={errors.email} />
        <InputField label="Password" type="password" value={pass} onChange={setPass}
          placeholder="••••••••" error={errors.pass} />
        <InputField label="Confirm password" type="password" value={confirm} onChange={setConfirm}
          placeholder="••••••••" error={errors.confirm} />
      </div>

      <button
        onClick={submit}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl mt-6 active:opacity-80"
        style={{ backgroundColor: "#2E7D52" }}
      >
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#fff" }}>
          Next: Register your car
        </span>
        <ArrowRight size={15} color="#fff" />
      </button>

      <div className="flex-1" />
      <p className="pb-6 text-center" style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "#6B8C7E" }}>
        No real name or plates are shared with other drivers
      </p>
    </div>
  );
}

function CarRegisterPanel({ email, onComplete }: { email: string; onComplete: (profile: { email: string; carName: string; color: string }) => void }) {
  const [carName, setCarName] = useState(randomName);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [selectedColor, setSelectedColor] = useState(CAR_COLORS[3].hex);

  const submit = () => {
    if (!make.trim() || !model.trim()) return;
    onComplete({ email, carName, color: selectedColor });
  };

  return (
    <div className="flex flex-col h-full px-6 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      <div className="pt-8 pb-2 flex items-center gap-3">
        <TrusteeLogo size="sm" />
      </div>

      <div className="pt-4 pb-4">
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "#1C2826", fontWeight: 400 }}>
          Register your car
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#6B8C7E", marginTop: 4 }}>
          Step 2 of 2 — Vehicle profile
        </p>
        <div className="flex gap-1.5 mt-3">
          <div className="h-1 rounded-full flex-1" style={{ backgroundColor: "#2E7D52" }} />
          <div className="h-1 rounded-full flex-1" style={{ backgroundColor: "#2E7D52" }} />
        </div>
      </div>

      {/* Car name */}
      <div className="rounded-2xl px-4 py-4 mb-4"
        style={{ backgroundColor: "#F4F8F6", border: "1.5px solid rgba(46,125,82,0.2)" }}>
        <div className="flex items-center justify-between mb-1">
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500, color: "#1C2826" }}>
            Your Car's Identity
          </span>
          <button onClick={() => setCarName(randomName())}
            className="flex items-center gap-1 px-2 py-1 rounded-lg"
            style={{ backgroundColor: "rgba(46,125,82,0.1)" }}>
            <RefreshCw size={11} color="#2E7D52" />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "#2E7D52" }}>New name</span>
          </button>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: selectedColor }}>
            <Car size={20} color="#fff" />
          </div>
          <div>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 18, color: "#1C2826", fontWeight: 400 }}>
              {carName}
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#6B8C7E" }}>
              Pseudonymous — never shares your real identity
            </p>
          </div>
        </div>

        {/* Color picker */}
        <div className="flex gap-2 mt-3">
          {CAR_COLORS.map(c => (
            <button
              key={c.hex}
              onClick={() => setSelectedColor(c.hex)}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-transform"
              style={{
                backgroundColor: c.hex,
                transform: selectedColor === c.hex ? "scale(1.2)" : "scale(1)",
                boxShadow: selectedColor === c.hex ? `0 0 0 2px white, 0 0 0 3.5px ${c.hex}` : "none",
              }}
            >
              {selectedColor === c.hex && <Check size={11} color="#fff" strokeWidth={3} />}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle details */}
      <div className="flex flex-col gap-3.5 pb-4">
        <div className="grid grid-cols-2 gap-3">
          <InputField label="Make" value={make} onChange={setMake} placeholder="e.g. BMW" />
          <InputField label="Model" value={model} onChange={setModel} placeholder="e.g. 3 Series" />
        </div>
        <InputField label="Year" value={plate} onChange={setPlate} placeholder="e.g. 2021" />

        <div className="rounded-xl px-3.5 py-3 flex items-start gap-2.5"
          style={{ backgroundColor: "rgba(76,175,125,0.08)", border: "1px solid rgba(76,175,125,0.2)" }}>
          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ backgroundColor: "rgba(76,175,125,0.2)" }}>
            <Check size={9} color="#4CAF7D" strokeWidth={3} />
          </div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#6B8C7E", lineHeight: 1.5 }}>
            Your plate number and vehicle details are <strong style={{ color: "#2E7D52" }}>never shared</strong> with other drivers. Only your car name is visible on the community feed.
          </p>
        </div>
      </div>

      <button
        onClick={submit}
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl mb-6 active:opacity-80"
        style={{ backgroundColor: (!make.trim() || !model.trim()) ? "rgba(46,125,82,0.4)" : "#2E7D52" }}
      >
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, color: "#fff" }}>
          Start Driving with Trustee
        </span>
        <ArrowRight size={15} color="#fff" />
      </button>
    </div>
  );
}

export function AuthFlow({ onComplete }: Props) {
  const [screen, setScreen] = useState<Screen>("login");
  const [email, setEmail] = useState("");

  return (
    <div className="size-full overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
      <AnimatePresence mode="wait">
        {screen === "login" && (
          <motion.div key="login" className="size-full"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.22 }}>
            <LoginPanel
              onSignup={() => setScreen("signup")}
              onLogin={e => { setEmail(e); setScreen("car"); }}
            />
          </motion.div>
        )}
        {screen === "signup" && (
          <motion.div key="signup" className="size-full"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
            <SignupPanel
              onBack={() => setScreen("login")}
              onNext={e => { setEmail(e); setScreen("car"); }}
            />
          </motion.div>
        )}
        {screen === "car" && (
          <motion.div key="car" className="size-full"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
            <CarRegisterPanel email={email} onComplete={onComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
