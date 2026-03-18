import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, User, Users, Bike } from 'lucide-react';

interface Detection {
  id: number;
  type: string;
  position: { x: number; y: number };
  confidence: number;
  crossingProbability: number;
  distance: number;
  urgency: string;
}

interface DetectionOverlayProps {
  detections: Detection[];
  currentSpeed: number;
}

export function DetectionOverlay({ detections, currentSpeed }: DetectionOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <AnimatePresence>
        {detections.map((detection) => (
          <motion.div
            key={detection.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            className="absolute"
            style={{
              left: `${detection.position.x}%`,
              top: `${detection.position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Detection Box with AR styling */}
            <div className={`relative ${
              detection.urgency === 'critical' 
                ? 'border-red-500' 
                : detection.urgency === 'high'
                ? 'border-orange-500'
                : 'border-yellow-500'
            } border-[3px] rounded-3xl p-6 shadow-2xl`}>
              {/* Pulsing glow animation for high urgency */}
              {(detection.urgency === 'critical' || detection.urgency === 'high') && (
                <>
                  <motion.div
                    className={`absolute inset-0 rounded-3xl ${
                      detection.urgency === 'critical' ? 'bg-red-500' : 'bg-orange-500'
                    }`}
                    animate={{
                      opacity: [0.4, 0.1, 0.4],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {/* Outer glow ring */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl border-2 ${
                      detection.urgency === 'critical' ? 'border-red-400' : 'border-orange-400'
                    }`}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 0, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                </>
              )}
              
              {/* Icon */}
              <div className="relative z-10 flex items-center justify-center">
                {detection.type === 'group' ? (
                  <Users className="w-9 h-9 text-white drop-shadow-lg" strokeWidth={2.5} />
                ) : detection.type === 'cyclist' ? (
                  <Bike className="w-9 h-9 text-white drop-shadow-lg" strokeWidth={2.5} />
                ) : (
                  <User className="w-9 h-9 text-white drop-shadow-lg" strokeWidth={2.5} />
                )}
              </div>
              
              {/* Enhanced corner markers with animation */}
              {[
                { position: 'top-0 left-0', border: 'border-t-[3px] border-l-[3px]', corner: 'rounded-tl-lg' },
                { position: 'top-0 right-0', border: 'border-t-[3px] border-r-[3px]', corner: 'rounded-tr-lg' },
                { position: 'bottom-0 left-0', border: 'border-b-[3px] border-l-[3px]', corner: 'rounded-bl-lg' },
                { position: 'bottom-0 right-0', border: 'border-b-[3px] border-r-[3px]', corner: 'rounded-br-lg' }
              ].map((corner, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${corner.position} w-4 h-4 ${corner.border} border-white ${corner.corner}`}
                  animate={{
                    scale: detection.urgency === 'critical' ? [1, 1.3, 1] : 1
                  }}
                  transition={{
                    duration: 1,
                    repeat: detection.urgency === 'critical' ? Infinity : 0,
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>

            {/* AR Info Panel with enhanced styling */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 space-y-1.5"
            >
              {/* Type and Confidence */}
              <div className={`px-4 py-1.5 rounded-full text-sm font-bold text-white backdrop-blur-md shadow-lg border-2 ${
                detection.urgency === 'critical'
                  ? 'bg-red-600/95 border-red-400'
                  : detection.urgency === 'high'
                  ? 'bg-orange-600/95 border-orange-400'
                  : 'bg-yellow-600/95 border-yellow-400'
              }`}>
                {detection.type.charAt(0).toUpperCase() + detection.type.slice(1)}
                <span className="ml-2 opacity-90">
                  {Math.round(detection.confidence * 100)}%
                </span>
              </div>
              
              {/* Distance Display with icon */}
              <div className="px-4 py-1.5 rounded-full text-sm font-bold text-white bg-blue-600/95 backdrop-blur-md text-center border-2 border-blue-400 shadow-lg">
                📍 {detection.distance}m away
              </div>
            </motion.div>

            {/* Crossing probability indicator with enhanced styling */}
            {detection.crossingProbability > 0.7 && (
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="mt-1.5 flex items-center justify-center gap-1.5 bg-red-600/95 backdrop-blur-md px-3 py-1.5 rounded-full border-2 border-red-400 shadow-lg"
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                >
                  <AlertTriangle className="w-5 h-5 text-white" strokeWidth={2.5} />
                </motion.div>
                <span className="text-sm font-black text-white">
                  {Math.round(detection.crossingProbability * 100)}% crossing
                </span>
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* AR Status overlay with enhanced styling */}
      {detections.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white px-4 py-2.5 rounded-xl text-sm space-y-1 border-2 border-green-500/50 shadow-xl"
        >
          <div className="font-bold flex items-center gap-2">
            <motion.div
              className="w-2.5 h-2.5 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            AR Detection Active
          </div>
          <div className="text-gray-300 text-xs">
            {detections.length} {detections.length === 1 ? 'object' : 'objects'} tracked
          </div>
        </motion.div>
      )}
    </div>
  );
}