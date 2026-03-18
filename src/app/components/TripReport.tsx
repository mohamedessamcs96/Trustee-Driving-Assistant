import { motion } from 'motion/react';

export interface TripData {
  duration: number; // seconds
  totalDetections: number;
  criticalAlerts: number;
  highAlerts: number;
  mediumAlerts: number;
  avgSpeed: number;
  maxSpeed: number;
  brakeRecommendations: number;
  safetyScore: number;
}

interface TripReportProps {
  data: TripData;
  onDriveAgain: () => void;
  onDone: () => void;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

export function TripReport({ data, onDriveAgain, onDone }: TripReportProps) {
  const score = data.safetyScore;
  const scoreColor =
    score >= 90 ? 'text-green-500' :
    score >= 75 ? 'text-blue-500' :
    score >= 60 ? 'text-yellow-500' :
    'text-red-500';
  const scoreLabel =
    score >= 90 ? 'Excellent' :
    score >= 75 ? 'Good' :
    score >= 60 ? 'Fair' :
    'Needs Improvement';

  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="absolute inset-0 bg-white z-50 flex flex-col items-center px-6 py-10 overflow-y-auto"
    >
      {/* Header */}
      <img src="/trustee-logo.png" alt="Trustee" className="w-12 h-12 object-contain mb-2" />
      <h2 className="text-xl font-bold text-black tracking-tight">Drive Complete</h2>
      <p className="text-xs text-gray-400 mt-1 mb-8">
        {formatDuration(data.duration)} · {dateStr}
      </p>

      {/* Safety Score */}
      <div className="w-full max-w-sm bg-gray-50 rounded-2xl p-6 mb-4 flex flex-col items-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-3">
          Safety Score
        </p>
        <span className={`text-7xl font-bold tabular-nums ${scoreColor}`}>{score}</span>
        <span className={`text-sm font-semibold mt-1 ${scoreColor}`}>{scoreLabel}</span>
      </div>

      {/* Stats Grid */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-3 mb-4">
        <StatCard label="Detections" value={String(data.totalDetections)} sub="total objects" />
        <StatCard label="Avg Speed" value={String(data.avgSpeed)} sub="km/h" />
        <StatCard label="Max Speed" value={String(data.maxSpeed)} sub="km/h" />
        <StatCard label="Brake Recs" value={String(data.brakeRecommendations)} sub="issued" />
      </div>

      {/* Alerts Breakdown */}
      <div className="w-full max-w-sm bg-gray-50 rounded-2xl p-4 mb-8">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-3">
          Alerts Breakdown
        </p>
        <div className="space-y-3">
          <AlertRow label="Critical" count={data.criticalAlerts} dotClass="bg-red-500" textClass="text-red-500" />
          <div className="border-t border-gray-100" />
          <AlertRow label="High" count={data.highAlerts} dotClass="bg-orange-400" textClass="text-orange-500" />
          <div className="border-t border-gray-100" />
          <AlertRow label="Medium" count={data.mediumAlerts} dotClass="bg-yellow-400" textClass="text-yellow-600" />
        </div>
      </div>

      {/* Actions */}
      <div className="w-full max-w-sm space-y-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onDriveAgain}
          className="w-full bg-black text-white py-4 rounded-full font-semibold text-base hover:bg-gray-900 transition-colors"
        >
          Drive Again
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onDone}
          className="w-full border border-gray-200 text-black py-4 rounded-full font-semibold text-base hover:bg-gray-50 transition-colors"
        >
          Done
        </motion.button>
      </div>
    </motion.div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4 flex flex-col">
      <p className="text-xs text-gray-400 font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold text-black tabular-nums">{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}

function AlertRow({
  label, count, dotClass, textClass,
}: {
  label: string; count: number; dotClass: string; textClass: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${dotClass}`} />
        <span className="text-sm text-black font-medium">{label}</span>
      </div>
      <span className={`text-sm font-bold ${textClass}`}>{count}</span>
    </div>
  );
}
