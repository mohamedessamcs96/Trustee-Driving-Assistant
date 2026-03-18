import { motion } from 'motion/react';
import { Gauge, ArrowDown, CheckCircle } from 'lucide-react';

interface SpeedMonitorProps {
  currentSpeed: number;
  recommendedSpeed: number | null;
  isActive: boolean;
}

export function SpeedMonitor({ currentSpeed, recommendedSpeed, isActive }: SpeedMonitorProps) {
  const shouldBrake = recommendedSpeed !== null && currentSpeed > recommendedSpeed;
  const isSafe = !shouldBrake && isActive;

  return (
    <div className="flex gap-3 items-start">
      {/* Current Speed */}
      <div className="bg-black/70 backdrop-blur-md rounded-2xl px-4 py-3 border-2 border-white/20">
        <div className="text-xs text-gray-300 mb-1">Speed</div>
        <div className="flex items-baseline gap-2">
          <motion.span
            key={Math.round(currentSpeed)}
            initial={{ scale: 1.2, color: '#3b82f6' }}
            animate={{ scale: 1, color: '#ffffff' }}
            className="text-3xl font-bold text-white"
          >
            {Math.round(currentSpeed)}
          </motion.span>
          <span className="text-sm text-gray-400">km/h</span>
        </div>
      </div>

      {/* Brake Warning or Safe Status */}
      {shouldBrake ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-600/95 backdrop-blur-md rounded-2xl px-4 py-3 border-2 border-red-400 flex-1"
        >
          <div className="flex items-center gap-2 mb-1">
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5 text-white" />
            </motion.div>
            <div className="text-xs font-bold text-white">BRAKE NOW</div>
          </div>
          <div className="text-lg font-bold text-white">
            Reduce to {Math.round(recommendedSpeed)} km/h
          </div>
        </motion.div>
      ) : recommendedSpeed !== null ? (
        <div className="bg-orange-600/95 backdrop-blur-md rounded-2xl px-4 py-3 border-2 border-orange-400 flex-1">
          <div className="text-xs text-orange-100 mb-1">Suggested Speed</div>
          <div className="text-2xl font-bold text-white">
            {Math.round(recommendedSpeed)} km/h
          </div>
        </div>
      ) : (
        <div className="bg-green-600/95 backdrop-blur-md rounded-2xl px-4 py-3 border-2 border-green-400 flex-1">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-white" />
            <span className="text-sm font-bold text-white">Speed is Safe</span>
          </div>
        </div>
      )}
    </div>
  );
}