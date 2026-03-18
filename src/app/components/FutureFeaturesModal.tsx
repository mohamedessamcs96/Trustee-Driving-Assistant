import { 
  Octagon, 
  Circle, 
  TrendingUp, 
  Car, 
  MapPin, 
  CloudRain, 
  Moon,
  Navigation,
  Gauge,
  AlertOctagon
} from 'lucide-react';

export const FUTURE_FEATURES = [
  {
    id: 1,
    icon: Octagon,
    title: 'Traffic Sign Detection',
    description: 'Real-time recognition of stop signs, yield signs, speed limits, and road signs',
    color: 'bg-red-50 text-red-600 border-red-200'
  },
  {
    id: 2,
    icon: Circle,
    title: 'Traffic Light Recognition',
    description: 'Detects red, yellow, green lights and countdown timers with alerts',
    color: 'bg-green-50 text-green-600 border-green-200'
  },
  {
    id: 3,
    icon: TrendingUp,
    title: 'Lane Departure Warning',
    description: 'Monitors lane markings and alerts when vehicle drifts from lane',
    color: 'bg-blue-50 text-blue-600 border-blue-200'
  },
  {
    id: 4,
    icon: Car,
    title: 'Vehicle Distance Monitoring',
    description: 'Tracks distance to cars ahead and warns about tailgating or collision risk',
    color: 'bg-purple-50 text-purple-600 border-purple-200'
  },
  {
    id: 5,
    icon: MapPin,
    title: 'Blind Spot Detection',
    description: 'Uses camera to detect vehicles in blind spots during lane changes',
    color: 'bg-orange-50 text-orange-600 border-orange-200'
  },
  {
    id: 6,
    icon: CloudRain,
    title: 'Weather Condition Analysis',
    description: 'Detects rain, fog, snow and adjusts sensitivity and warnings accordingly',
    color: 'bg-cyan-50 text-cyan-600 border-cyan-200'
  },
  {
    id: 7,
    icon: Moon,
    title: 'Night Vision Enhancement',
    description: 'Enhanced detection in low-light conditions with infrared visualization',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200'
  },
  {
    id: 8,
    icon: Navigation,
    title: 'Road Hazard Detection',
    description: 'Identifies potholes, debris, construction zones, and road obstacles',
    color: 'bg-yellow-50 text-yellow-600 border-yellow-200'
  },
  {
    id: 9,
    icon: Gauge,
    title: 'Driver Fatigue Monitoring',
    description: 'Analyzes driving patterns and recommends breaks when fatigue detected',
    color: 'bg-pink-50 text-pink-600 border-pink-200'
  },
  {
    id: 10,
    icon: AlertOctagon,
    title: 'Emergency Vehicle Detection',
    description: 'Detects approaching ambulances, police cars with audio-visual alerts',
    color: 'bg-rose-50 text-rose-600 border-rose-200'
  }
];

interface FutureFeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FutureFeaturesModal({ isOpen, onClose }: FutureFeaturesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Future Features</h2>
              <p className="text-sm text-blue-100 mt-1">10 Advanced Driver Assistance Capabilities</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Features List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-4">
            {FUTURE_FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className={`border-2 rounded-xl p-4 ${feature.color} transition-all hover:shadow-md`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-gray-900">
                          {index + 1}. {feature.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <p className="text-sm text-gray-600 text-center">
            These features use advanced AI and computer vision to enhance driving safety
          </p>
        </div>
      </div>
    </div>
  );
}
