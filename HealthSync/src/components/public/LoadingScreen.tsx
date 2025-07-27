import { Heart, Activity, Stethoscope } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 z-50">
      <div className="flex flex-col items-center space-y-8">
        {/* Main Heart with Pulse Animation */}
        <div className="relative">
          <div className="flex items-center justify-center">
            <Heart
              className="w-16 h-16 text-red-500 animate-pulse"
              fill="currentColor"
            />
          </div>
          {/* Pulse Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 border-2 border-red-300 rounded-full animate-ping opacity-30"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-2 border-red-200 rounded-full animate-ping opacity-20 [animation-delay:0.5s]"></div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="flex items-center space-x-3">
          <Heart className="h-8 w-8 text-red-500" />
          <h1 className="text-2xl font-bold text-gray-900">HealthSync</h1>
        </div>

        {/* Loading Message */}
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-gray-700 animate-pulse">
            Preparing your health dashboard...
          </p>
          <p className="text-sm text-gray-500">Securing your medical data</p>
        </div>

        {/* Medical Icons Animation */}
        <div className="flex items-center space-x-8">
          <div className="flex flex-col items-center space-y-2">
            <Activity className="w-6 h-6 text-blue-500 animate-bounce [animation-delay:-0.3s]" />
            <span className="text-xs text-gray-400">Vitals</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Stethoscope className="w-6 h-6 text-green-500 animate-bounce [animation-delay:-0.15s]" />
            <span className="text-xs text-gray-400">Records</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Heart className="w-6 h-6 text-red-500 animate-bounce" />
            <span className="text-xs text-gray-400">Care</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
