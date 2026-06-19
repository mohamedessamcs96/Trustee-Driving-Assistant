import React, { useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Eye, EyeOff, ArrowRight, ArrowLeft, Check, Car, RefreshCw } from "lucide-react-native";
import { TrusteeLogo } from "../../components/TrusteeLogo";
import { theme } from "../../theme";

type Screen = "login" | "signup" | "car";

export interface UserProfile {
  email: string;
  carName: string;
  color: string;
}

interface Props {
  onComplete: (profile: UserProfile) => void;
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
  label,
  isPassword,
  value,
  onChange,
  placeholder,
  error,
  keyboardType,
}: {
  label: string;
  isPassword?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  keyboardType?: "default" | "email-address";
}) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);

  const borderColor = error ? theme.colors.alertRed : focused ? theme.colors.leafAccent : "rgba(46,125,82,0.2)";

  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldWrap}>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.sageGray}
          secureTextEntry={isPassword && !show}
          keyboardType={keyboardType}
          autoCapitalize={isPassword || keyboardType === "email-address" ? "none" : "words"}
          autoComplete="off"
          autoCorrect={false}
          textContentType="none"
          importantForAutofill="no"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[styles.fieldInput, { borderColor, paddingRight: isPassword ? 40 : 12 }]}
        />
        {isPassword && (
          <Pressable style={styles.eyeButton} onPress={() => setShow((s) => !s)}>
            {show ? <EyeOff size={15} color={theme.colors.sageGray} /> : <Eye size={15} color={theme.colors.sageGray} />}
          </Pressable>
        )}
      </View>
      {!!error && <Text style={styles.fieldError}>{error}</Text>}
    </View>
  );
}

function LoginPanel({ onSignup, onLogin }: { onSignup: () => void; onLogin: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = () => {
    if (email.trim().toLowerCase() === "trustee@gmail.com" && pass === "trustee") {
      setErrors({});
      onLogin(email);
      return;
    }

    const e: Record<string, string> = {};
    if (!email.includes("@")) e.email = "Enter a valid email";
    if (pass.length < 6) e.pass = "Password must be at least 6 characters";
    setErrors(e);
    if (!Object.keys(e).length) onLogin(email);
  };

  return (
    <KeyboardAvoidingView style={styles.panel} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.panelScroll} keyboardShouldPersistTaps="handled">
        <View style={styles.loginHeader}>
          <TrusteeLogo size="lg" />
          <Text style={styles.loginTagline}>Your road. Your assistant.</Text>
        </View>

        <View style={{ gap: theme.spacing.md }}>
          <InputField label="Email" keyboardType="email-address" value={email} onChange={setEmail} placeholder="you@example.com" error={errors.email} />
          <InputField label="Password" isPassword value={pass} onChange={setPass} placeholder="••••••••" error={errors.pass} />

          <Pressable style={styles.primaryButton} onPress={submit}>
            <Text style={styles.primaryButtonText}>Sign In</Text>
            <ArrowRight size={15} color="#fff" />
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={submit}>
            <Text style={styles.secondaryButtonText}>Continue with Google</Text>
          </Pressable>
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <Pressable style={styles.signupLink} onPress={onSignup}>
          <Text style={styles.signupLinkMuted}>Don't have an account? </Text>
          <Text style={styles.signupLinkStrong}>Sign Up</Text>
        </Pressable>

        <View style={{ flex: 1 }} />
        <Text style={styles.footerNote}>Camera & location data never leave your device</Text>
      </ScrollView>
    </KeyboardAvoidingView>
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
    <KeyboardAvoidingView style={styles.panel} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.panelScroll} keyboardShouldPersistTaps="handled">
        <View style={styles.stepHeaderRow}>
          <Pressable style={styles.backButton} onPress={onBack}>
            <ArrowLeft size={16} color={theme.colors.trusteeGreen} />
          </Pressable>
          <TrusteeLogo size="sm" />
        </View>

        <View style={styles.stepIntro}>
          <Text style={styles.stepTitle}>Create account</Text>
          <Text style={styles.stepSubtitle}>Step 1 of 2 — Your details</Text>
          <View style={styles.progressRow}>
            <View style={[styles.progressBar, { backgroundColor: theme.colors.trusteeGreen }]} />
            <View style={[styles.progressBar, { backgroundColor: "rgba(46,125,82,0.2)" }]} />
          </View>
        </View>

        <View style={{ gap: 14 }}>
          <InputField label="Full name" value={name} onChange={setName} placeholder="Alex Johnson" error={errors.name} />
          <InputField label="Email" keyboardType="email-address" value={email} onChange={setEmail} placeholder="you@example.com" error={errors.email} />
          <InputField label="Password" isPassword value={pass} onChange={setPass} placeholder="••••••••" error={errors.pass} />
          <InputField label="Confirm password" isPassword value={confirm} onChange={setConfirm} placeholder="••••••••" error={errors.confirm} />
        </View>

        <Pressable style={[styles.primaryButton, { marginTop: 24 }]} onPress={submit}>
          <Text style={styles.primaryButtonText}>Next: Register your car</Text>
          <ArrowRight size={15} color="#fff" />
        </Pressable>

        <View style={{ flex: 1 }} />
        <Text style={styles.footerNote}>No real name or plates are shared with other drivers</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function CarRegisterPanel({
  email,
  onBack,
  onComplete,
}: {
  email: string;
  onBack: () => void;
  onComplete: (profile: UserProfile) => void;
}) {
  const [carName, setCarName] = useState(randomName);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [selectedColor, setSelectedColor] = useState(CAR_COLORS[3].hex);

  const canSubmit = make.trim().length > 0 && model.trim().length > 0;

  const submit = () => {
    if (!canSubmit) return;
    onComplete({ email, carName, color: selectedColor });
  };

  return (
    <KeyboardAvoidingView style={styles.panel} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.panelScroll} keyboardShouldPersistTaps="handled">
        <View style={styles.stepHeaderRow}>
          <Pressable style={styles.backButton} onPress={onBack}>
            <ArrowLeft size={16} color={theme.colors.trusteeGreen} />
          </Pressable>
          <TrusteeLogo size="sm" />
        </View>

        <View style={[styles.stepIntro, { paddingBottom: 16 }]}>
          <Text style={styles.stepTitle}>Register your car</Text>
          <Text style={styles.stepSubtitle}>Step 2 of 2 — Vehicle profile</Text>
          <View style={styles.progressRow}>
            <View style={[styles.progressBar, { backgroundColor: theme.colors.trusteeGreen }]} />
            <View style={[styles.progressBar, { backgroundColor: theme.colors.trusteeGreen }]} />
          </View>
        </View>

        <View style={styles.carCard}>
          <View style={styles.carCardHeader}>
            <Text style={styles.carCardLabel}>Your Car's Identity</Text>
            <Pressable style={styles.newNameButton} onPress={() => setCarName(randomName())}>
              <RefreshCw size={11} color={theme.colors.trusteeGreen} />
              <Text style={styles.newNameText}>New name</Text>
            </Pressable>
          </View>
          <View style={styles.carIdentityRow}>
            <View style={[styles.carIcon, { backgroundColor: selectedColor }]}>
              <Car size={20} color="#fff" />
            </View>
            <View>
              <Text style={styles.carName}>{carName}</Text>
              <Text style={styles.carNameHint}>Pseudonymous — never shares your real identity</Text>
            </View>
          </View>

          <View style={styles.colorRow}>
            {CAR_COLORS.map((c) => {
              const isSelected = selectedColor === c.hex;
              return (
                <Pressable
                  key={c.hex}
                  onPress={() => setSelectedColor(c.hex)}
                  style={[
                    styles.colorSwatch,
                    {
                      backgroundColor: c.hex,
                      transform: [{ scale: isSelected ? 1.2 : 1 }],
                    },
                    isSelected && styles.colorSwatchSelected,
                  ]}
                >
                  {isSelected && <Check size={11} color="#fff" strokeWidth={3} />}
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={{ gap: 14, paddingBottom: 16 }}>
          <View style={styles.gridRow}>
            <View style={styles.gridCol}>
              <InputField label="Make" value={make} onChange={setMake} placeholder="e.g. BMW" />
            </View>
            <View style={styles.gridCol}>
              <InputField label="Model" value={model} onChange={setModel} placeholder="e.g. 3 Series" />
            </View>
          </View>
          <InputField label="Year" value={year} onChange={setYear} placeholder="e.g. 2021" keyboardType="default" />

          <View style={styles.privacyNote}>
            <View style={styles.privacyDot}>
              <Check size={9} color={theme.colors.leafAccent} strokeWidth={3} />
            </View>
            <Text style={styles.privacyText}>
              Your plate number and vehicle details are{" "}
              <Text style={{ color: theme.colors.trusteeGreen, fontFamily: theme.fonts.sansSemiBold }}>never shared</Text>{" "}
              with other drivers. Only your car name is visible on the community feed.
            </Text>
          </View>
        </View>

        <Pressable
          style={[styles.primaryButton, { paddingVertical: 14, marginBottom: 24, backgroundColor: canSubmit ? theme.colors.trusteeGreen : "rgba(46,125,82,0.4)" }]}
          onPress={submit}
        >
          <Text style={styles.primaryButtonText}>Start Driving with Trustee</Text>
          <ArrowRight size={15} color="#fff" />
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export function AuthFlow({ onComplete }: Props) {
  const [screen, setScreen] = useState<Screen>("login");
  const [email, setEmail] = useState("");
  const [cameFrom, setCameFrom] = useState<"login" | "signup">("login");
  const fade = useRef(new Animated.Value(0)).current;

  const goTo = (next: Screen) => {
    fade.setValue(0);
    setScreen(next);
  };

  React.useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 220, useNativeDriver: true }).start();
  }, [screen]);

  return (
    <View style={styles.flowRoot}>
      <Animated.View style={[styles.flowScreen, { opacity: fade }]}>
        {screen === "login" && (
          <LoginPanel onSignup={() => goTo("signup")} onLogin={(e) => { setEmail(e); setCameFrom("login"); goTo("car"); }} />
        )}
        {screen === "signup" && (
          <SignupPanel onBack={() => goTo("login")} onNext={(e) => { setEmail(e); setCameFrom("signup"); goTo("car"); }} />
        )}
        {screen === "car" && <CarRegisterPanel email={email} onBack={() => goTo(cameFrom)} onComplete={onComplete} />}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  flowRoot: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  flowScreen: {
    flex: 1,
  },
  panel: {
    flex: 1,
  },
  panelScroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  loginHeader: {
    paddingTop: 40,
    paddingBottom: 32,
    alignItems: "center",
    gap: 8,
  },
  loginTagline: {
    fontFamily: theme.fonts.sans,
    fontSize: 13,
    color: theme.colors.sageGray,
    marginTop: 8,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontFamily: theme.fonts.sansMedium,
    fontSize: 12,
    color: theme.colors.charcoal,
  },
  fieldWrap: {
    position: "relative",
  },
  fieldInput: {
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: theme.radius.sm,
    fontFamily: theme.fonts.sans,
    fontSize: 14,
    color: theme.colors.charcoal,
    backgroundColor: theme.colors.fieldBg,
    borderWidth: 1.5,
  },
  eyeButton: {
    position: "absolute",
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  fieldError: {
    fontFamily: theme.fonts.sans,
    fontSize: 11,
    color: theme.colors.alertRed,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    paddingVertical: 12,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.trusteeGreen,
  },
  primaryButtonText: {
    fontFamily: theme.fonts.sansSemiBold,
    fontSize: 14,
    color: "#fff",
  },
  secondaryButton: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: theme.radius.sm,
    borderWidth: 1.5,
    borderColor: "rgba(46,125,82,0.25)",
    alignItems: "center",
  },
  secondaryButtonText: {
    fontFamily: theme.fonts.sans,
    fontSize: 13,
    color: theme.colors.trusteeGreen,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(46,125,82,0.15)",
  },
  dividerText: {
    fontFamily: theme.fonts.sans,
    fontSize: 11,
    color: theme.colors.sageGray,
  },
  signupLink: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  signupLinkMuted: {
    fontFamily: theme.fonts.sans,
    fontSize: 13,
    color: theme.colors.sageGray,
  },
  signupLinkStrong: {
    fontFamily: theme.fonts.sansSemiBold,
    fontSize: 13,
    color: theme.colors.trusteeGreen,
  },
  footerNote: {
    paddingBottom: 24,
    textAlign: "center",
    fontFamily: theme.fonts.sans,
    fontSize: 10,
    color: theme.colors.sageGray,
  },
  stepHeaderRow: {
    paddingTop: 32,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.fieldBg,
  },
  stepIntro: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  stepTitle: {
    fontFamily: theme.fonts.serif,
    fontSize: 22,
    color: theme.colors.charcoal,
    fontWeight: "400",
  },
  stepSubtitle: {
    fontFamily: theme.fonts.sans,
    fontSize: 12,
    color: theme.colors.sageGray,
    marginTop: 4,
  },
  progressRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 12,
  },
  progressBar: {
    height: 4,
    borderRadius: 999,
    flex: 1,
  },
  carCard: {
    borderRadius: theme.radius.lg,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    backgroundColor: theme.colors.fieldBg,
    borderWidth: 1.5,
    borderColor: "rgba(46,125,82,0.2)",
  },
  carCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  carCardLabel: {
    fontFamily: theme.fonts.sansMedium,
    fontSize: 12,
    color: theme.colors.charcoal,
  },
  newNameButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "rgba(46,125,82,0.1)",
  },
  newNameText: {
    fontFamily: theme.fonts.sans,
    fontSize: 10,
    color: theme.colors.trusteeGreen,
  },
  carIdentityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  carIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  carName: {
    fontFamily: theme.fonts.mono,
    fontSize: 18,
    color: theme.colors.charcoal,
  },
  carNameHint: {
    fontFamily: theme.fonts.sans,
    fontSize: 11,
    color: theme.colors.sageGray,
  },
  colorRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  colorSwatch: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSwatchSelected: {
    borderWidth: 2,
    borderColor: "#fff",
  },
  gridRow: {
    flexDirection: "row",
    gap: 12,
  },
  gridCol: {
    flex: 1,
  },
  privacyNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: theme.radius.sm,
    backgroundColor: "rgba(76,175,125,0.08)",
    borderWidth: 1,
    borderColor: "rgba(76,175,125,0.2)",
  },
  privacyDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    backgroundColor: "rgba(76,175,125,0.2)",
  },
  privacyText: {
    flex: 1,
    fontFamily: theme.fonts.sans,
    fontSize: 11,
    color: theme.colors.sageGray,
    lineHeight: 16,
  },
});
