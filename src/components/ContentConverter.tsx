import { useState } from "react";
import InputSection from "./InputSection";
import OutputSection from "./OutputSection";
import { toast } from "@/components/ui/use-toast";

interface ConversionResult {
  speech: string;
  imageUrl: string;
  videoUrl: string;
}

const ContentConverter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ConversionResult | null>(null);

  const handleConvert = async (message: string) => {
    setIsLoading(true);
    try {
      // Fetching data from the backend
      const response = await fetch(`http://127.0.0.1:5000/api/ask/${message}`);
      const data = await response.json();

      setResult({
        // Use the backend response in the speech field
        speech: data.response,
        imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
        videoUrl: "https://example.com/video",
      });

      toast({
        title: "Conversion Complete",
        description: "Your message has been successfully converted!",
      });
    } catch (error) {
      toast({
        title: "Conversion Failed",
        description: "There was an error converting your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-8 animate-fade-up">
      <InputSection onConvert={handleConvert} isLoading={isLoading} />
      {result && <OutputSection result={result} />}
    </div>
  );
};

export default ContentConverter;