
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Melody Manager Magic</h1>
          <Button onClick={() => navigate("/auth")}>Sign In</Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold tracking-tight">
            Streamline Your Music Teaching Practice
          </h2>
          <p className="text-xl text-muted-foreground">
            Manage your students, schedule lessons, and handle payments - all in one place.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={() => navigate("/auth")}>
              Get Started
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
