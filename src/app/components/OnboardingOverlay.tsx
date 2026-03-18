import { motion, AnimatePresence } from 'motion/react';
import { Camera, Eye, Shield, CheckCircle } from 'lucide-react';

interface OnboardingOverlayProps {
  isVisible: boolean;
  onStart: () => void;
}

export function OnboardingOverlay({ isVisible, onStart }: OnboardingOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white z-50 flex flex-col items-center px-6 py-10 overflow-y-auto"
        >
          {/* Logo */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex flex-col items-center mb-6"
          >
            <img
              src="/trustee-logo.png"
              alt="Trustee"
              className="w-36 h-36 object-contain"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-gray-500 text-sm leading-relaxed text-center mb-6 max-w-xs"
          >
            AI-powered pedestrian detection and real-time alerts for every journey.
          </motion.p>

          {/* Divider */}
          <div className="w-full max-w-sm border-t border-gray-100 mb-6" />

          {/* Feature rows — Threads/X style */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="w-full max-w-sm space-y-5 mb-8"
          >
            <FeatureRow icon={<Eye className="w-5 h-5" />} title="High-Accuracy Detection" description="95% precision in identifying pedestrians" />
            <div className="border-t border-gray-100" />
            <FeatureRow icon={<Shield className="w-5 h-5" />} title="Real-Time Alerts" description="Instant warnings for crossing pedestrians" />
            <div className="border-t border-gray-100" />
            <FeatureRow icon={<CheckCircle className="w-5 h-5" />} title="Smart Speed Monitoring" description="Recommends safe speeds based on conditions" />
            <div className="border-t border-gray-100" />
            <FeatureRow icon={<Camera className="w-5 h-5" />} title="Setup" description="Mount phone on dashboard, camera facing the road" />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-full max-w-sm flex flex-col items-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onStart}
              className="w-full bg-black text-white py-4 rounded-full font-semibold text-base tracking-tight hover:bg-gray-900 transition-colors"
            >
              Start Monitoring
            </motion.button>
            <p className="text-xs text-gray-400 text-center">
              Your safety, always first.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FeatureRow({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-black">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-black">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
    </div>
  );
}
