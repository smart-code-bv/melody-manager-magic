
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WaitlistEntry {
  name: string;
  email: string;
  user_type: 'teacher' | 'student';
  instruments_list: string[];
  other_instruments: string | null;
  student_count: string | null;
  teacher_name: string | null;
  lesson_city: string | null;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const entry: WaitlistEntry = await req.json();
    
    // Create a formatted list of instruments
    const instrumentsList = entry.instruments_list.map(i => i.replace('_', ' ')).join(', ');
    const otherInstrumentsText = entry.other_instruments 
      ? `\nOther instruments: ${entry.other_instruments}`
      : '';

    // Create type-specific details
    let typeSpecificDetails = '';
    if (entry.user_type === 'teacher') {
      typeSpecificDetails = `\nNumber of students: ${entry.student_count}`;
    } else {
      typeSpecificDetails = `\nTeacher: ${entry.teacher_name}\nLesson city: ${entry.lesson_city}`;
    }

    const emailResponse = await resend.emails.send({
      from: "Music Teacher Platform <onboarding@resend.dev>",
      to: [Deno.env.get("NOTIFICATION_EMAIL") || ""], // Use the environment variable
      subject: "New Waitlist Signup!",
      html: `
        <h1>New Waitlist Signup</h1>
        <p>A new user has signed up for the waitlist:</p>
        <ul>
          <li><strong>Name:</strong> ${entry.name}</li>
          <li><strong>Email:</strong> ${entry.email}</li>
          <li><strong>User Type:</strong> ${entry.user_type}</li>
          <li><strong>Instruments:</strong> ${instrumentsList}${otherInstrumentsText}</li>
        </ul>
        <p>${typeSpecificDetails}</p>
      `,
    });

    console.log("Notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending notification email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
