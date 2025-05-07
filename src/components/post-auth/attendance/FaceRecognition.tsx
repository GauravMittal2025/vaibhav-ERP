import React, { useState } from 'react';
import { Camera, Check, Loader2, User, Video, VideoOff } from 'lucide-react';

export const FaceRecognition: React.FC = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [recognizing, setRecognizing] = useState(false);
  const [recognized, setRecognized] = useState(false);
  const [employee, setEmployee] = useState<{ name: string; department: string; id: string } | null>(null);

  const toggleCamera = () => {
    if (cameraActive) {
      setCameraActive(false);
      setRecognizing(false);
      setRecognized(false);
      setEmployee(null);
    } else {
      setCameraActive(true);
    }
  };

  const startRecognition = () => {
    if (!cameraActive) return;
    
    setRecognizing(true);
    
    // Simulate face recognition (would be a real API call in production)
    setTimeout(() => {
      setRecognizing(false);
      setRecognized(true);
      setEmployee({
        name: 'Alex Johnson',
        department: 'Engineering',
        id: 'EMP-1024',
      });
      
      // Record attendance after recognition
      setTimeout(() => {
        // Reset for next person
        setRecognized(false);
        setEmployee(null);
      }, 5000);
    }, 2000);
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Face Recognition Attendance</h2>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center">
          <div className="relative mb-4 h-64 w-full max-w-md overflow-hidden rounded-lg bg-gray-100">
            {!cameraActive && (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <User size={48} className="mb-2 text-gray-400" />
                <p className="text-center text-sm text-gray-500">
                  Camera is currently inactive. Click the button below to activate.
                </p>
              </div>
            )}
            
            {cameraActive && (
              <div className="relative h-full w-full bg-gray-800">
                {/* This would be a real camera feed in production */}
                <div className="flex h-full w-full items-center justify-center">
                  <Camera size={48} className="text-white opacity-50" />
                </div>
                
                {/* Face detection overlay */}
                {recognizing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
                    <div className="rounded-full border-2 border-dashed border-blue-400 p-8">
                      <Loader2 size={48} className="animate-spin text-blue-400" />
                    </div>
                    <p className="mt-4 text-white">Recognizing face...</p>
                  </div>
                )}
                
                {recognized && employee && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
                    <div className="rounded-full border-2 border-green-400 p-8">
                      <Check size={48} className="text-green-400" />
                    </div>
                    <div className="mt-4 text-center text-white">
                      <p className="text-lg font-semibold">{employee.name}</p>
                      <p className="text-sm text-gray-200">{employee.department} • {employee.id}</p>
                      <p className="mt-2 text-sm font-medium text-green-400">
                        Attendance recorded successfully!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={toggleCamera}
              className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium ${
                cameraActive 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {cameraActive ? (
                <>
                  <VideoOff size={16} />
                  Deactivate Camera
                </>
              ) : (
                <>
                  <Video size={16} />
                  Activate Camera
                </>
              )}
            </button>
            
            {cameraActive && (
              <button
                onClick={startRecognition}
                disabled={recognizing || recognized}
                className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:bg-green-400"
              >
                {recognizing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Camera size={16} />
                    Recognize
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        
        <div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="mb-4 text-base font-medium text-gray-900">Today's Attendance Instructions</h3>
            
            <ol className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                  1
                </div>
                <div>
                  <p>Click the "Activate Camera" button to start your webcam</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                  2
                </div>
                <div>
                  <p>Position your face within the camera frame</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                  3
                </div>
                <div>
                  <p>Click "Recognize" to start the face recognition process</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                  4
                </div>
                <div>
                  <p>Wait for confirmation that your attendance has been recorded</p>
                </div>
              </li>
            </ol>
            
            <div className="mt-4 rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
              <p className="font-medium">Important Notes:</p>
              <ul className="mt-1 list-inside list-disc">
                <li>Ensure proper lighting for accurate face recognition</li>
                <li>Remove face coverings for successful recognition</li>
                <li>Contact HR if you experience persistent recognition issues</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};