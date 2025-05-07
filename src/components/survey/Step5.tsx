
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import { useSurvey } from "@/contexts/SurveyContext";
import { Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Step5 = () => {
  const { goToNextStep } = useSurvey();
  const [checks, setChecks] = useState({
    saved: false,
    eligible: false,
    rewards: false,
    reserved: false
  });
  const [isProcessing, setIsProcessing] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timers = [
      setTimeout(() => setChecks(prev => ({ ...prev, saved: true })), 1000),
      setTimeout(() => setChecks(prev => ({ ...prev, eligible: true })), 2000),
      setTimeout(() => setChecks(prev => ({ ...prev, rewards: true })), 3000),
      setTimeout(() => setChecks(prev => ({ ...prev, reserved: true })), 4000)
    ];

    // Set processing to false after all checks complete
    const completeTimer = setTimeout(() => {
      setIsProcessing(false);
    }, 4500);

    // Auto-progress after a longer delay to ensure button is visible
    const autoProgress = setTimeout(() => {
      goToNextStep();
    }, 7000);

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      clearTimeout(completeTimer);
      clearTimeout(autoProgress);
    };
  }, [goToNextStep]);

  return (
    <div className="max-w-md mx-auto">
      <SurveyHeader 
        title="Thanks for your time!" 
        subtitle="Please wait a few seconds while we process your responses."
      />
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center">
          <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${checks.saved ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            {checks.saved && <Check className="h-4 w-4" />}
          </div>
          <p className="text-lg">Survey responses are saved</p>
        </div>
        
        <div className="flex items-center">
          <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${checks.eligible ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            {checks.eligible && <Check className="h-4 w-4" />}
          </div>
          <p className="text-lg">You are an eligible participant</p>
        </div>
        
        <div className="flex items-center">
          <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${checks.rewards ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            {checks.rewards && <Check className="h-4 w-4" />}
          </div>
          <p className="text-lg">Only 15 Rewards left</p>
        </div>
        
        <div className="flex items-center">
          <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${checks.reserved ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            {checks.reserved && <Check className="h-4 w-4" />}
          </div>
          <p className="text-lg">Your place is reserved until the timer runs out</p>
        </div>
      </div>

      <div className="w-full bg-gray-100 rounded-md h-2 mt-6">
        <div 
          className={`bg-orange-600 h-2 rounded-md ${isProcessing ? 'animate-pulse' : ''}`}
          style={{ width: isProcessing ? undefined : '100%' }}
        ></div>
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-2 mb-6">
        {isProcessing ? "Processing your information..." : "Processing complete!"}
      </p>

      {/* Add a continue button that's clearly visible */}
      <Button 
        onClick={goToNextStep} 
        className={`w-full py-5 text-lg bg-green-600 hover:bg-green-700 shadow-lg fixed bottom-4 left-0 right-0 max-w-xs mx-auto z-20 md:static md:max-w-md transition-opacity ${isProcessing ? 'opacity-0' : 'opacity-100'}`}
        disabled={isProcessing}
      >
        Continue to Your Reward
      </Button>
    </div>
  );
};

export default Step5;
