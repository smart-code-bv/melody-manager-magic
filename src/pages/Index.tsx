import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Index() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-end mb-8">
        <Button onClick={handleSignOut}>Sign Out</Button>
      </div>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome to Melody Manager Magic</h1>
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
}
