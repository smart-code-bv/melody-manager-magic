
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/translations";

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const language = useLanguage();
  const t = translations[language].contact.form;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      instruments: formData.get('instruments') as string,
      beta_tester: formData.get('beta') === 'on'
    };

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([data]);

      if (error) throw error;

      toast({
        title: t.success,
        description: t.successDetail,
      });

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="name">{t.name}</Label>
        <Input
          id="name"
          name="name"
          placeholder={t.name}
          required
          className="bg-white/50 backdrop-blur-sm"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">{t.email}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={t.email}
          required
          className="bg-white/50 backdrop-blur-sm"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="instruments">{t.instruments}</Label>
        <Input
          id="instruments"
          name="instruments"
          placeholder={t.instruments}
          required
          className="bg-white/50 backdrop-blur-sm"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="beta" name="beta" />
        <Label htmlFor="beta" className="text-sm font-normal">
          {t.beta}
        </Label>
      </div>
      
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary-hover text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? t.submitting : t.submit}
      </Button>
    </form>
  );
};
