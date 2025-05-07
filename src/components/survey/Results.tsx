
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSurvey } from "@/contexts/SurveyContext";
import ProductOffer from "@/components/ProductOffer";
import SurveyHeader from "@/components/SurveyHeader";
import { useToast } from "@/components/ui/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";

// Define fallback image path with aggressive quality reduction
const FALLBACK_IMAGE = "/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png?q=25&w=180";

const Results = () => {
  const { answers } = useSurvey();
  const { toast } = useToast();
  const [showingOffer, setShowingOffer] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();

  // Immediately start loading the fallback image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = FALLBACK_IMAGE;
    
    // Ultra-fast timeout for immediate display even if image is still loading
    const timeout = setTimeout(() => {
      setImageLoaded(true);
    }, 300); // Super fast timeout
    
    return () => clearTimeout(timeout);
  }, []);

  const handleClaim = () => {
    toast({
      title: "Offer Claimed!",
      description: "Thank you! Check your email for next steps.",
      duration: 5000,
    });
  };

  return (
    <div className="max-w-md mx-auto px-4">
      {!showingOffer ? (
        <>
          <SurveyHeader 
            title="Congratulations!" 
            subtitle="Fantastic news! Your participation is confirmed. Continue to the next step to receive your Sainsbury's gift card:"
            className="mb-4"
          />
          
          <div className="mb-4 space-y-3">
            {/* Sainsbury's Logo */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex justify-center">
              <div className="w-[180px]">
                <AspectRatio ratio={16/9}>
                  {!imageLoaded ? (
                    <Skeleton className="w-full h-full rounded-md" />
                  ) : (
                    <img 
                      src={FALLBACK_IMAGE} 
                      alt="Sainsbury's Review Program" 
                      className="rounded-md object-contain w-full h-full" 
                      loading="eager"
                      width="180"
                      height="101"
                      fetchPriority="high"
                      decoding="async"
                    />
                  )}
                </AspectRatio>
              </div>
            </div>
            
            {/* Orange promotional text */}
            <div className="text-center px-3 py-2 bg-orange-50 rounded-lg border border-orange-100">
              <p className="text-orange-600 font-medium text-sm">
                Share your thoughts and get rewarded! Claim your £100 Sainsbury's gift card and shop for FREE!
              </p>
            </div>
          </div>
          
          {/* Fixed CTA button for mobile */}
          <div className={isMobile ? "sticky bottom-4 z-10 mt-4" : ""}>
            <a 
              href="https://unlockrwrd.com/Jp6DC41Fn" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full"
            >
              <Button 
                className={`w-full bg-orange-600 hover:bg-orange-700 py-6 text-lg ${isMobile ? 'shadow-lg fixed bottom-4 left-0 right-0 max-w-xs mx-auto z-20' : ''} md:static md:max-w-md`}
              >
                Continue to Claim Your Reward
              </Button>
            </a>
          </div>
          
          <p className="text-sm text-center text-gray-500 mt-4 pb-16">
            Limited time offer. Your reward is reserved for the time shown in the timer.
          </p>
        </>
      ) : (
        <ProductOffer onClaim={handleClaim} />
      )}
    </div>
  );
};

export default Results;
