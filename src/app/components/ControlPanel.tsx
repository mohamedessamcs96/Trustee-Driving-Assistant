import { Play, Square, Activity, Shield, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { FutureFeaturesModal } from './FutureFeaturesModal';

interface ControlPanelProps {
  isActive: boolean;
  onToggle: () => void;
  detectionCount: number;
}

export function ControlPanel({ isActive, onToggle, detectionCount }: ControlPanelProps) {
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <>
      <div className="flex-1 bg-white px-4 py-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Main Control Button */}
          <Button
            onClick={onToggle}
            className={`w-full h-16 rounded-2xl text-lg font-semibold transition-all ${
              isActive
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isActive ? (
              <>
                <Square className="w-6 h-6 mr-2" />
                Stop Monitoring
              </>
            ) : (
              <>
                <Play className="w-6 h-6 mr-2 fill-current" />
                Start Monitoring
              </>
            )}
          </Button>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Detection Status */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Detections</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {isActive ? detectionCount : '—'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {isActive ? 'Active now' : 'Inactive'}
              </div>
            </div>

            {/* Safety Score */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">AI Accuracy</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {isActive ? '95%' : '—'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                High precision
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Active Features
              </h3>
              <Button
                onClick={() => setShowFeatures(true)}
                variant="outline"
                className="text-xs h-7 px-3 border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                See 10 More Features
              </Button>
            </div>
            <div className="space-y-2">
              <FeatureItem 
                title="Pedestrian Detection"
                description="Real-time detection with rounded boxes"
                isActive={isActive}
              />
              <FeatureItem 
                title="Crossing Prediction"
                description="AI predicts crossing probability"
                isActive={isActive}
              />
              <FeatureItem 
                title="Speed Monitoring"
                description="Recommends safe driving speed"
                isActive={isActive}
              />
              <FeatureItem 
                title="Brake Assistance"
                description="Alerts when to slow down"
                isActive={isActive}
              />
            </div>
          </div>

          {/* Safety Notice */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Safety Notice:</span> This assistant is designed to help you drive safely. Always stay alert and maintain control of your vehicle.
            </p>
          </div>
        </div>
      </div>

      <FutureFeaturesModal isOpen={showFeatures} onClose={() => setShowFeatures(false)} />
    </>
  );
}

function FeatureItem({ 
  title, 
  description, 
  isActive 
}: { 
  title: string; 
  description: string; 
  isActive: boolean;
}) {
  return (
    <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
      <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-1.5 ${
        isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
      }`} />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900">{title}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </div>
  );
}