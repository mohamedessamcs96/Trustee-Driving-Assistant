import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme';
import { TrusteeLogo } from '../components/TrusteeLogo';

type Screen = 'login' | 'signup' | 'car';

interface UserProfile {
  email: string;
  carName: string;
  color: string;
}

interface Props {
  onComplete: (profile: UserProfile) => void;
}

const CAR_COLORS = [
  { name: 'Forest', hex: '#2E7D52' },
  { name: 'Gold', hex: '#F5C842' },
  { name: 'Charcoal', hex: '#1C2826' },
  { name: 'Leaf', hex: '#4CAF7D' },
  { name: 'Alert', hex: '#E84545' },
  { name: 'Sage', hex: '#6B8C7E' },
];

const ADJECTIVES = ['Green', 'Swift', 'Iron', 'Blue', 'Silver', 'Dawn', 'Quiet', 'Bright', 'Wild', 'Stone'];
const NOUNS = ['Dart', 'Pine', 'Moss', 'Wren', 'Oak', 'Reed', 'Hawk', 'Ash', 'Fox', 'Elm'];

function randomName() {
  const a = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const n = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${a}${n}`;
}

// ─── InputField ──────────────────────────────────────────────────────────────

interface InputFieldProps {
  label: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}

function InputField({ label, type = 'text', value, onChange, placeholder, error }: InputFieldProps) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const isPassword = type === 'password';

  const borderColor = error
    ? colors.alert
    : focused
    ? colors.leaf
    : 'rgba(46,125,82,0.2)';

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputWrapper, { borderColor }]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={colors.sage}
          secureTextEntry={isPassword && !show}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          autoCapitalize="none"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShow(s => !s)} style={styles.eyeBtn}>
            <Feather name={show ? 'eye-off' : 'eye'} size={15} color={colors.sage} />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

// ─── LoginPanel ───────────────────────────────────────────────────────────────

interface LoginPanelProps {
  onSignup: () => void;
  onLogin: (email: string) => void;
}

function LoginPanel({ onSignup, onLogin }: LoginPanelProps) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = () => {
    const e: Record<string, string> = {};
    if (!email.includes('@')) e.email = 'Enter a valid email';
    if (pass.length < 6) e.pass = 'Password must be at least 6 characters';
    setErrors(e);
    if (!Object.keys(e).length) onLogin(email);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.screenContainer}
        contentContainerStyle={styles.loginContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.loginHeader}>
          <TrusteeLogo size="lg" />
          <Text style={styles.tagline}>Your road. Your assistant.</Text>
        </View>

        <View style={styles.formGroup}>
          <InputField label="Email" type="email" value={email} onChange={setEmail}
            placeholder="you@example.com" error={errors.email} />
          <InputField label="Password" type="password" value={pass} onChange={setPass}
            placeholder="••••••••" error={errors.pass} />

          <TouchableOpacity style={styles.primaryBtn} onPress={submit} activeOpacity={0.8}>
            <Text style={styles.primaryBtnText}>Sign In</Text>
            <Feather name="arrow-right" size={15} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.outlineBtn} onPress={submit} activeOpacity={0.8}>
            <Text style={styles.outlineBtnText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity onPress={onSignup} style={styles.signupLink}>
          <Text style={styles.signupLinkGray}>Don't have an account? </Text>
          <Text style={styles.signupLinkGreen}>Sign Up</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />
        <Text style={styles.privacyNote}>Camera & location data never leave your device</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── SignupPanel ──────────────────────────────────────────────────────────────

interface SignupPanelProps {
  onBack: () => void;
  onNext: (email: string) => void;
}

function SignupPanel({ onBack, onNext }: SignupPanelProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.includes('@')) e.email = 'Enter a valid email';
    if (pass.length < 6) e.pass = 'At least 6 characters';
    if (pass !== confirm) e.confirm = "Passwords don't match";
    setErrors(e);
    if (!Object.keys(e).length) onNext(email);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.screenContainer}
        contentContainerStyle={styles.signupContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.signupTopRow}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <Feather name="arrow-left" size={16} color={colors.forest} />
          </TouchableOpacity>
          <TrusteeLogo size="sm" />
        </View>

        <View style={styles.stepHeader}>
          <Text style={styles.stepTitle}>Create account</Text>
          <Text style={styles.stepSubtitle}>Step 1 of 2 — Your details</Text>
          <View style={styles.progressRow}>
            <View style={[styles.progressBar, { backgroundColor: colors.forest }]} />
            <View style={[styles.progressBar, { backgroundColor: 'rgba(46,125,82,0.2)' }]} />
          </View>
        </View>

        <View style={styles.formGroup}>
          <InputField label="Full name" value={name} onChange={setName}
            placeholder="Alex Johnson" error={errors.name} />
          <InputField label="Email" type="email" value={email} onChange={setEmail}
            placeholder="you@example.com" error={errors.email} />
          <InputField label="Password" type="password" value={pass} onChange={setPass}
            placeholder="••••••••" error={errors.pass} />
          <InputField label="Confirm password" type="password" value={confirm} onChange={setConfirm}
            placeholder="••••••••" error={errors.confirm} />
        </View>

        <TouchableOpacity style={[styles.primaryBtn, { marginTop: 24 }]} onPress={submit} activeOpacity={0.8}>
          <Text style={styles.primaryBtnText}>Next: Register your car</Text>
          <Feather name="arrow-right" size={15} color="#fff" />
        </TouchableOpacity>

        <View style={{ flex: 1 }} />
        <Text style={[styles.privacyNote, { marginTop: 16 }]}>
          No real name or plates are shared with other drivers
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── CarRegisterPanel ─────────────────────────────────────────────────────────

interface CarRegisterPanelProps {
  email: string;
  onComplete: (profile: UserProfile) => void;
}

function CarRegisterPanel({ email, onComplete }: CarRegisterPanelProps) {
  const [carName, setCarName] = useState(randomName);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [selectedColor, setSelectedColor] = useState(CAR_COLORS[3].hex);

  const canSubmit = make.trim() && model.trim();

  const submit = () => {
    if (!canSubmit) return;
    onComplete({ email, carName, color: selectedColor });
  };

  return (
    <ScrollView
      style={styles.screenContainer}
      contentContainerStyle={styles.carContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.signupTopRow}>
        <TrusteeLogo size="sm" />
      </View>

      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Register your car</Text>
        <Text style={styles.stepSubtitle}>Step 2 of 2 — Vehicle profile</Text>
        <View style={styles.progressRow}>
          <View style={[styles.progressBar, { backgroundColor: colors.forest }]} />
          <View style={[styles.progressBar, { backgroundColor: colors.forest }]} />
        </View>
      </View>

      {/* Car identity card */}
      <View style={styles.carCard}>
        <View style={styles.carCardHeader}>
          <Text style={styles.carCardLabel}>Your Car's Identity</Text>
          <TouchableOpacity
            style={styles.newNameBtn}
            onPress={() => setCarName(randomName())}
          >
            <Feather name="refresh-cw" size={11} color={colors.forest} />
            <Text style={styles.newNameText}>New name</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.carNameRow}>
          <View style={[styles.carIconBox, { backgroundColor: selectedColor }]}>
            <Feather name="navigation" size={20} color="#fff" />
          </View>
          <View>
            <Text style={styles.carNameText}>{carName}</Text>
            <Text style={styles.carNameSubtext}>Pseudonymous — never shares your real identity</Text>
          </View>
        </View>

        {/* Color picker */}
        <View style={styles.colorRow}>
          {CAR_COLORS.map(c => (
            <TouchableOpacity
              key={c.hex}
              onPress={() => setSelectedColor(c.hex)}
              style={[
                styles.colorSwatch,
                { backgroundColor: c.hex },
                selectedColor === c.hex && {
                  transform: [{ scale: 1.2 }],
                  shadowColor: c.hex,
                  shadowOpacity: 0.5,
                  shadowRadius: 4,
                  shadowOffset: { width: 0, height: 0 },
                  elevation: 4,
                },
              ]}
            >
              {selectedColor === c.hex && (
                <Feather name="check" size={11} color="#fff" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Vehicle fields */}
      <View style={styles.formGroup}>
        <View style={styles.twoColRow}>
          <View style={{ flex: 1, marginRight: 6 }}>
            <InputField label="Make" value={make} onChange={setMake} placeholder="e.g. BMW" />
          </View>
          <View style={{ flex: 1, marginLeft: 6 }}>
            <InputField label="Model" value={model} onChange={setModel} placeholder="e.g. 3 Series" />
          </View>
        </View>
        <InputField label="Year" value={year} onChange={setYear} placeholder="e.g. 2021" />

        <View style={styles.privacyBox}>
          <View style={styles.privacyIcon}>
            <Feather name="check" size={9} color={colors.leaf} />
          </View>
          <Text style={styles.privacyBoxText}>
            Your plate number and vehicle details are{' '}
            <Text style={{ color: colors.forest, fontWeight: '600' }}>never shared</Text>
            {' '}with other drivers. Only your car name is visible on the community feed.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.primaryBtn, { opacity: canSubmit ? 1 : 0.5, marginTop: 8, marginBottom: 24 }]}
        onPress={submit}
        activeOpacity={0.8}
      >
        <Text style={styles.primaryBtnText}>Start Driving with Trustee</Text>
        <Feather name="arrow-right" size={15} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
}

// ─── AuthFlow (main export) ───────────────────────────────────────────────────

export function AuthFlow({ onComplete }: Props) {
  const [screen, setScreen] = useState<Screen>('login');
  const [email, setEmail] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {screen === 'login' && (
        <LoginPanel
          onSignup={() => setScreen('signup')}
          onLogin={e => { setEmail(e); setScreen('car'); }}
        />
      )}
      {screen === 'signup' && (
        <SignupPanel
          onBack={() => setScreen('login')}
          onNext={e => { setEmail(e); setScreen('car'); }}
        />
      )}
      {screen === 'car' && (
        <CarRegisterPanel email={email} onComplete={onComplete} />
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loginContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  signupContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  carContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  loginHeader: {
    paddingTop: 40,
    paddingBottom: 32,
    alignItems: 'center',
    gap: 8,
  },
  tagline: {
    fontFamily: 'System',
    fontSize: 13,
    color: colors.sage,
    marginTop: 8,
  },
  formGroup: {
    gap: 14,
  },
  fieldContainer: {
    gap: 6,
  },
  label: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '500',
    color: colors.charcoal,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgLight,
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'System',
    fontSize: 14,
    color: colors.charcoal,
    paddingVertical: 10,
  },
  eyeBtn: {
    padding: 4,
  },
  errorText: {
    fontFamily: 'System',
    fontSize: 11,
    color: colors.alert,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.forest,
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 4,
  },
  primaryBtnText: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  outlineBtn: {
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(46,125,82,0.25)',
  },
  outlineBtnText: {
    fontFamily: 'System',
    fontSize: 13,
    color: colors.forest,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(46,125,82,0.15)',
  },
  dividerText: {
    fontFamily: 'System',
    fontSize: 11,
    color: colors.sage,
  },
  signupLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupLinkGray: {
    fontFamily: 'System',
    fontSize: 13,
    color: colors.sage,
  },
  signupLinkGreen: {
    fontFamily: 'System',
    fontSize: 13,
    color: colors.forest,
    fontWeight: '600',
  },
  privacyNote: {
    fontFamily: 'System',
    fontSize: 10,
    color: colors.sage,
    textAlign: 'center',
    marginBottom: 8,
  },
  signupTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 32,
    paddingBottom: 8,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.bgLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepHeader: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  stepTitle: {
    fontFamily: 'Georgia',
    fontSize: 22,
    color: colors.charcoal,
    fontWeight: '400',
  },
  stepSubtitle: {
    fontFamily: 'System',
    fontSize: 12,
    color: colors.sage,
    marginTop: 4,
  },
  progressRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 12,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  // Car register
  carCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    backgroundColor: colors.bgLight,
    borderWidth: 1.5,
    borderColor: 'rgba(46,125,82,0.2)',
  },
  carCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  carCardLabel: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '500',
    color: colors.charcoal,
  },
  newNameBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(46,125,82,0.1)',
  },
  newNameText: {
    fontFamily: 'System',
    fontSize: 10,
    color: colors.forest,
  },
  carNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  carIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carNameText: {
    fontFamily: 'Courier',
    fontSize: 18,
    color: colors.charcoal,
    fontWeight: '400',
  },
  carNameSubtext: {
    fontFamily: 'System',
    fontSize: 11,
    color: colors.sage,
    marginTop: 2,
  },
  colorRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  colorSwatch: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  twoColRow: {
    flexDirection: 'row',
  },
  privacyBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: 'rgba(76,175,125,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(76,175,125,0.2)',
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
  },
  privacyIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(76,175,125,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  privacyBoxText: {
    flex: 1,
    fontFamily: 'System',
    fontSize: 11,
    color: colors.sage,
    lineHeight: 16,
  },
});
