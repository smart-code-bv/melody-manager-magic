
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/translations";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const INSTRUMENTS = [
  'piano',
  'guitar',
  'violin',
  'drums',
  'voice',
  'flute',
  'cello',
  'saxophone',
  'trumpet',
  'clarinet',
  'bass_guitar',
  'viola',
  'trombone',
  'harp',
  'ukulele',
  'other'
] as const;

const STUDENT_COUNT_OPTIONS = [
  { value: 'less_than_10', label: '< 10 students' },
  { value: '10_to_25', label: '10 - 25 students' },
  { value: '25_to_50', label: '25 - 50 students' },
  { value: 'more_than_50', label: '> 50 students' },
] as const;

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userType, setUserType] = useState<'teacher' | 'student'>('teacher');
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [otherInstruments, setOtherInstruments] = useState('');
  const language = useLanguage();
  const t = translations[language].contact.form;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      instruments_list: selectedInstruments.filter(i => i !== 'other'),
      other_instruments: selectedInstruments.includes('other') ? otherInstruments : null,
      user_type: userType,
      student_count: userType === 'teacher' ? formData.get('student_count') as string : null,
      teacher_name: userType === 'student' ? formData.get('teacher_name') as string : null,
      lesson_city: userType === 'student' ? formData.get('lesson_city') as string : null,
      beta_tester: formData.get('beta') === 'on',
      survey_consent: formData.get('survey') === 'on'
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
      setSelectedInstruments([]);
      setOtherInstruments('');
      setUserType('teacher');
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

  const handleInstrumentToggle = (instrument: string) => {
    setSelectedInstruments(current => 
      current.includes(instrument)
        ? current.filter(i => i !== instrument)
        : [...current, instrument]
    );
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
        <Label>I am a</Label>
        <Select
          value={userType}
          onValueChange={(value: 'teacher' | 'student') => setUserType(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="student">Student</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Instruments</Label>
        <Accordion type="single" collapsible className="w-full border rounded-lg">
          <AccordionItem value="instruments">
            <AccordionTrigger className="px-4">
              Select Instruments ({selectedInstruments.length} selected)
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-2 pb-4 space-y-2">
              {INSTRUMENTS.map((instrument) => (
                <div key={instrument} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedInstruments.includes(instrument)}
                    onCheckedChange={() => handleInstrumentToggle(instrument)}
                    id={`instrument-${instrument}`}
                  />
                  <Label 
                    htmlFor={`instrument-${instrument}`}
                    className="text-sm font-normal capitalize cursor-pointer"
                  >
                    {instrument.replace('_', ' ')}
                  </Label>
                </div>
              ))}
              {selectedInstruments.includes('other') && (
                <Input
                  placeholder="Please specify other instruments"
                  value={otherInstruments}
                  onChange={(e) => setOtherInstruments(e.target.value)}
                  className="mt-2"
                />
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {userType === 'teacher' && (
        <div className="space-y-2">
          <Label htmlFor="student_count">How many students do you have?</Label>
          <Select name="student_count" required>
            <SelectTrigger>
              <SelectValue placeholder="Select student count" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {STUDENT_COUNT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      {userType === 'student' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="teacher_name">Who is your teacher?</Label>
            <Input
              id="teacher_name"
              name="teacher_name"
              placeholder="Teacher's name"
              required
              className="bg-white/50 backdrop-blur-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lesson_city">Where do you have lessons?</Label>
            <Input
              id="lesson_city"
              name="lesson_city"
              placeholder="City"
              required
              className="bg-white/50 backdrop-blur-sm"
            />
          </div>
        </>
      )}
      
      <div className="flex items-center space-x-2">
        <Checkbox id="beta" name="beta" />
        <Label htmlFor="beta" className="text-sm font-normal">
          {t.beta}
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="survey" name="survey" />
        <Label htmlFor="survey" className="text-sm font-normal">
          I agree to receive a survey with additional questions
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
