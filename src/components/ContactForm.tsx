
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Thanks for your interest!",
      description: "We'll be in touch soon.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Your name"
          required
          className="bg-white/50 backdrop-blur-sm"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          required
          className="bg-white/50 backdrop-blur-sm"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="instruments">Instrument(s) you teach</Label>
        <Input
          id="instruments"
          placeholder="e.g., Piano, Guitar, Violin"
          required
          className="bg-white/50 backdrop-blur-sm"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="beta" />
        <Label htmlFor="beta" className="text-sm font-normal">
          I'm interested in beta testing
        </Label>
      </div>
      
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary-hover text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Join the Waitlist"}
      </Button>
    </form>
  );
};
