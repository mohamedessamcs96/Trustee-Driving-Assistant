import { useState, useEffect, useRef } from 'react';
import { CameraView } from './components/CameraView';
import { DetectionOverlay } from './components/DetectionOverlay';
import { AlertPanel } from './components/AlertPanel';
import { SpeedMonitor } from './components/SpeedMonitor';
import { OnboardingOverlay } from './components/OnboardingOverlay';
import { Logo } from './components/Logo';
import { TripReport } from './components/TripReport';
import type { TripData } from './components/TripReport';
import { Play, Square, Settings, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isActive, setIsActive] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [detectedPeople, setDetectedPeople] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [brakeRecommendation, setBrakeRecommendation] = useState<number | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState<TripData | null>(null);

  // Session tracking refs
  const sessionStartRef = useRef<number>(0);
  const totalDetectionsRef = useRef(0);
  const criticalAlertsRef = useRef(0);
  const highAlertsRef = useRef(0);
  const mediumAlertsRef = useRef(0);
  const speedSamplesRef = useRef<number[]>([]);
  const brakeRecsRef = useRef(0);

  // Simulate speed changes
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setCurrentSpeed(prev => {
          const change = (Math.random() - 0.5) * 10;
          const next = Math.max(0, Math.min(120, prev + change));
          speedSamplesRef.current.push(next);
          return next;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  // Simulate pedestrian detection
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        const scenarios = [
          {
            id: 1,
            type: 'elderly',
            position: { x: 25, y: 55 },
            confidence: 0.95,
            crossingProbability: 0.85,
            distance: 15,
            message: 'Take care! Old man trying to cross',
            urgency: 'high'
          },
          {
            id: 2,
            type: 'child',
            position: { x: 70, y: 60 },
            confidence: 0.92,
            crossingProbability: 0.90,
            distance: 12,
            message: 'Caution! Child near roadside',
            urgency: 'critical'
          },
          {
            id: 3,
            type: 'adult',
            position: { x: 80, y: 50 },
            confidence: 0.88,
            crossingProbability: 0.45,
            distance: 25,
            message: 'Person detected on sidewalk',
            urgency: 'medium'
          },
          {
            id: 4,
            type: 'group',
            position: { x: 40, y: 65 },
            confidence: 0.93,
            crossingProbability: 0.75,
            distance: 18,
            message: 'Group of people waiting to cross',
            urgency: 'high'
          },
          {
            id: 5,
            type: 'adult',
            position: { x: 15, y: 48 },
            confidence: 0.90,
            crossingProbability: 0.65,
            distance: 22,
            message: 'Pedestrian approaching crosswalk',
            urgency: 'medium'
          },
          {
            id: 6,
            type: 'cyclist',
            position: { x: 85, y: 45 },
            confidence: 0.87,
            crossingProbability: 0.70,
            distance: 20,
            message: 'Cyclist detected in bike lane',
            urgency: 'medium'
          }
        ];

        // Randomly show 0-3 detections
        const numDetections = Math.floor(Math.random() * 4);
        const shuffled = [...scenarios].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, numDetections);
        
        setDetectedPeople(selected);

        // Generate alerts based on detections
        const newAlerts = selected
          .filter(person => person.crossingProbability > 0.7)
          .map(person => ({
            id: person.id,
            message: person.message,
            urgency: person.urgency,
            distance: person.distance,
            timestamp: Date.now()
          }));
        
        setAlerts(newAlerts);

        // Accumulate session stats
        totalDetectionsRef.current += selected.length;
        newAlerts.forEach(a => {
          if (a.urgency === 'critical') criticalAlertsRef.current += 1;
          else if (a.urgency === 'high') highAlertsRef.current += 1;
          else mediumAlertsRef.current += 1;
        });

        // Calculate brake recommendation based on closest high-risk pedestrian
        const criticalPedestrian = selected.find(p => p.urgency === 'critical');
        const highRiskPedestrian = selected.find(p => p.urgency === 'high');
        
        if (criticalPedestrian) {
          brakeRecsRef.current += 1;
          const safeSpeed = Math.max(15, 50 - (criticalPedestrian.crossingProbability * 35));
          setBrakeRecommendation(safeSpeed);
        } else if (highRiskPedestrian) {
          brakeRecsRef.current += 1;
          const safeSpeed = Math.max(25, 60 - (highRiskPedestrian.crossingProbability * 30));
          setBrakeRecommendation(safeSpeed);
        } else {
          setBrakeRecommendation(null);
        }
      }, 3000);
      
      return () => clearInterval(interval);
    } else {
      setDetectedPeople([]);
      setAlerts([]);
      setBrakeRecommendation(null);
    }
  }, [isActive]);

  const handleStart = () => {
    // Reset session tracking
    sessionStartRef.current = Date.now();
    totalDetectionsRef.current = 0;
    criticalAlertsRef.current = 0;
    highAlertsRef.current = 0;
    mediumAlertsRef.current = 0;
    speedSamplesRef.current = [];
    brakeRecsRef.current = 0;
    setShowReport(false);
    setShowOnboarding(false);
    setIsActive(true);
  };

  const handleStop = () => {
    const duration = Math.max(1, Math.floor((Date.now() - sessionStartRef.current) / 1000));
    const speeds = speedSamplesRef.current;
    const avgSpeed = speeds.length > 0
      ? Math.round(speeds.reduce((a, b) => a + b, 0) / speeds.length)
      : 0;
    const maxSpeed = speeds.length > 0 ? Math.round(Math.max(...speeds)) : 0;
    const criticals = criticalAlertsRef.current;
    const highs = highAlertsRef.current;
    const mediums = mediumAlertsRef.current;
    const safetyScore = Math.max(0, Math.min(100, 100 - criticals * 5 - highs * 3 - mediums * 1));
    setReportData({
      duration,
      totalDetections: totalDetectionsRef.current,
      criticalAlerts: criticals,
      highAlerts: highs,
      mediumAlerts: mediums,
      avgSpeed,
      maxSpeed,
      brakeRecommendations: brakeRecsRef.current,
      safetyScore,
    });
    setIsActive(false);
    setCurrentSpeed(0);
    setDetectedPeople([]);
    setAlerts([]);
    setBrakeRecommendation(null);
    setShowReport(true);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isActive ? 'bg-black' : 'bg-white'}`}>
      {/* Onboarding */}
      <OnboardingOverlay 
        isVisible={showOnboarding} 
        onStart={handleStart}
      />

      {/* Landing Page - White Background */}
      {!isActive && !showOnboarding && (
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <Logo variant="dark" size="lg" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-black text-center mb-3">
            Smart Driving Safety
          </h1>

          {/* Subheading */}
          <p className="text-gray-600 text-center mb-8 max-w-xs leading-relaxed text-base">
            Advanced AI-powered pedestrian detection for safer roads
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <div className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 font-medium">
              Real-time Detection
            </div>
            <div className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 font-medium">
              AI Powered
            </div>
            <div className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 font-medium">
              Always Alert
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            className="w-full max-w-xs bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-900 transition-colors shadow-lg"
          >
            Start Monitoring
          </motion.button>

          {/* Info Text */}
          <p className="text-gray-500 text-xs mt-8 text-center max-w-xs">
            Your safety is our priority. Based in Cairo, Egypt.
          </p>
        </div>
      )}

      {/* Trip Report */}
      {showReport && reportData && (
        <TripReport
          data={reportData}
          onDriveAgain={handleStart}
          onDone={() => { setShowReport(false); setShowOnboarding(true); }}
        />
      )}

      {/* Main Camera Screen */}
      <main className={`flex-1 flex flex-col max-w-md mx-auto w-full relative ${isActive ? 'block' : 'hidden'}`}>
        {/* Camera View - Full Screen */}
        <div className="relative flex-1 bg-black">
          <CameraView isActive={isActive} />
          {isActive && (
            <DetectionOverlay 
              detections={detectedPeople}
              currentSpeed={currentSpeed}
            />
          )}
          
          {/* Top Bar with Logo and Info */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent pt-4 pb-8 px-4"
              >
                <div className="flex items-center justify-between">
                  <Logo variant="light" />
                  <button 
                    onClick={handleStop}
                    className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <Info className="w-5 h-5 text-white" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Floating Control Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => isActive ? handleStop() : handleStart()}
            className={`absolute bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full font-bold shadow-2xl transition-all flex items-center gap-3 ${
              isActive
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/50'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/50'
            }`}
          >
            {isActive ? (
              <>
                <Square className="w-5 h-5" />
                Stop Monitoring
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                Start Monitoring
              </>
            )}
          </motion.button>
        </div>

        {/* Speed Monitor Overlay - Compact */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-4 right-4 pointer-events-none"
            >
              <SpeedMonitor 
                currentSpeed={currentSpeed}
                recommendedSpeed={brakeRecommendation}
                isActive={isActive}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Alerts Overlay */}
        <AnimatePresence>
          {isActive && alerts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-24 left-0 right-0 pointer-events-none"
            >
              <AlertPanel alerts={alerts} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}