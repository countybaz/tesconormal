
import { Button } from "@/components/ui/button";
import SurveyHeader from "@/components/SurveyHeader";
import { useSurvey } from "@/contexts/SurveyContext";
import { ArrowRight } from "lucide-react";
import FacebookReviews from "@/components/FacebookReviews";
import { useIsMobile } from "@/hooks/use-mobile";

const StartScreen = () => {
  const { goToNextStep } = useSurvey();
  const isMobile = useIsMobile();
  
  const handleStart = () => {
    goToNextStep();
  };
  
  return (
    <div className="max-w-md mx-auto pb-20 md:pb-0">
      <SurveyHeader 
        title="Great news! You are among the first to join our Tesco Reviewer Program!"
      />
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-center text-lg mb-4">
          Get a <span className="text-blue-600 font-semibold">Tesco gift card</span> with the Tesco Reviewer Program. Simply answer 3 short questions about your shopping habits and this fantastic chance is yours!
        </p>
        
        <p className="text-center mb-6">
          Ready to earn rewards for your feedback? Click on the <span className="text-blue-600 font-semibold">Start</span> button below.
        </p>
        
        <p className="text-sm text-red-600 text-center font-medium mb-6">
          As soon as you click the button, a timer starts and you have 3 minutes to complete the process.
        </p>
      </div>

      <Button 
        onClick={handleStart} 
        className={`w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 shadow-lg border-2 border-blue-700 font-bold fixed bottom-4 left-0 right-0 max-w-xs mx-auto md:static md:max-w-md z-20 ${isMobile ? 'h-16 text-xl' : ''}`}
      >
        START NOW <ArrowRight className="ml-2" />
      </Button>

      {/* Facebook Review Section - kept in the start screen */}
      <FacebookReviews />

      {/* Add some space at the bottom */}
      <div className="h-16 md:h-10"></div>
    </div>
  );
};

export default StartScreen;
