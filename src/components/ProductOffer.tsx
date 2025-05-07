
import { Button } from "@/components/ui/button";
import Timer from "@/components/Timer";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductOfferProps {
  onClaim: () => void;
}

// Define guaranteed working fallback image with size optimization
const FALLBACK_IMAGE = "/lovable-uploads/cbdedd35-0ec9-4e16-8866-51e309907ad3.png?q=25&w=200";

const ProductOffer = ({ onClaim }: ProductOfferProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();
  
  // Preload fallback image immediately
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = FALLBACK_IMAGE;
    
    // Set a shorter timeout for faster initial render
    const timeout = setTimeout(() => {
      setImageLoaded(true);
    }, 500); // Ultra fast timeout
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg p-6 max-w-md mx-auto bg-white pb-20 md:pb-6">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Congratulations!</h3>
        <p className="text-green-600 font-medium">You've qualified for our special offer!</p>
      </div>

      <div className="mb-6">
        <div className="w-full h-48 relative rounded-md overflow-hidden">
          {!imageLoaded ? (
            <Skeleton className="w-full h-full absolute inset-0 rounded-md" />
          ) : null}
          <img 
            src={FALLBACK_IMAGE} 
            alt="Sainsbury's Gift Card" 
            className={`w-full h-48 object-contain rounded-md ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.1s' }} // Faster transition
            width="200"
            height="150"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-lg mb-2">£100 Sainsbury's Gift Card</h4>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-gray-700">Valid in all Sainsbury's stores</span>
        </div>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-gray-700">Use for groceries or merchandise</span>
        </div>
        <div className="flex items-center mb-1">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-gray-700">No expiration date</span>
        </div>
      </div>

      <div className="mb-6 text-center">
        <div className="flex items-center justify-center">
          <span className="text-gray-500 line-through text-lg mr-2">£100.00</span>
          <span className="text-2xl font-bold text-green-600">FREE</span>
        </div>
        <p className="text-orange-600 font-medium text-sm mt-1">+ FREE Shipping</p>
      </div>

      <Timer minutes={15} />

      <Button 
        onClick={onClaim} 
        className={`w-full py-6 text-lg bg-green-600 hover:bg-green-700 shadow-lg fixed bottom-4 left-0 right-0 max-w-xs mx-auto z-20 md:static md:max-w-md md:mt-6`}
      >
        CLAIM NOW
      </Button>

      <p className="text-xs text-center text-gray-500 mt-4">
        Limited quantity available. Offer valid while supplies last.
      </p>
    </div>
  );
};

export default ProductOffer;
