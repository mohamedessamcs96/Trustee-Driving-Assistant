import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, AlertCircle, Info, Volume2 } from 'lucide-react';

interface Alert {
  id: number;
  message: string;
  urgency: string;
  timestamp: number;
}

interface AlertPanelProps {
  alerts: Alert[];
}

export function AlertPanel({ alerts }: AlertPanelProps) {
  return (
    <div className="px-4 py-3 space-y-2">
      <AnimatePresence mode="popLayout">
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0, x: 20, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start gap-3 p-4 rounded-2xl backdrop-blur-md shadow-2xl border-2 ${
              alert.urgency === 'critical'
                ? 'bg-red-600/95 border-red-400'
                : alert.urgency === 'high'
                ? 'bg-orange-600/95 border-orange-400'
                : 'bg-yellow-600/95 border-yellow-400'
            }`}
          >
            {/* Animated Icon */}
            <motion.div 
              className="flex-shrink-0 mt-0.5"
              animate={alert.urgency === 'critical' ? { 
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 0.5, repeat: alert.urgency === 'critical' ? Infinity : 0, repeatDelay: 1 }}
            >
              {alert.urgency === 'critical' ? (
                <AlertTriangle className="w-7 h-7 text-white" strokeWidth={2.5} />
              ) : alert.urgency === 'high' ? (
                <AlertCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
              ) : (
                <Info className="w-7 h-7 text-white" strokeWidth={2.5} />
              )}
            </motion.div>

            {/* Message */}
            <div className="flex-1">
              <p className="font-bold text-white text-lg leading-tight">
                {alert.message}
              </p>
              <p className="text-sm text-white/80 mt-1.5 flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Audio alert active
              </p>
            </div>

            {/* Urgency badge with pulse */}
            {alert.urgency === 'critical' && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="flex-shrink-0 px-3 py-1.5 bg-white text-red-600 text-xs font-black rounded-full shadow-lg"
              >
                URGENT
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}