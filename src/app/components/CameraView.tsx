import { useEffect, useRef, useState } from 'react';
import { Video, CameraOff } from 'lucide-react';

interface CameraViewProps {
  isActive: boolean;
}

export function CameraView({ isActive }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      setError(null);
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'environment' }, // rear camera on mobile
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError('Camera access denied or unavailable.');
      }
    };

    const stopCamera = () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
        stream = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };

    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isActive]);

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Live camera feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover ${isActive && !error ? 'block' : 'hidden'}`}
      />

      {/* Error state */}
      {isActive && error && (
        <div className="flex flex-col items-center gap-3 text-gray-400 px-8 text-center">
          <CameraOff className="w-14 h-14 text-red-400" />
          <p className="text-sm font-medium text-white">Camera Unavailable</p>
          <p className="text-xs text-gray-400">{error}</p>
          <p className="text-xs text-gray-500">Make sure you've granted camera permissions in your browser settings.</p>
        </div>
      )}

      {/* Inactive state */}
      {!isActive && (
        <div className="flex flex-col items-center gap-4 text-gray-400">
          <Video className="w-16 h-16" />
          <p className="text-sm">Camera Inactive</p>
          <p className="text-xs text-gray-500 text-center px-8">
            Mount phone on dashboard and point camera at the street
          </p>
        </div>
      )}

      {/* Distance markers overlay */}
      {isActive && !error && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-around px-4 pointer-events-none">
          <div className="text-white text-xs bg-black/50 px-2 py-1 rounded backdrop-blur-sm">10m</div>
          <div className="text-white text-xs bg-black/50 px-2 py-1 rounded backdrop-blur-sm">20m</div>
          <div className="text-white text-xs bg-black/50 px-2 py-1 rounded backdrop-blur-sm">30m</div>
        </div>
      )}
    </div>
  );
}