import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppLayout from "./pages/app/layout";
import Dashboard from "./pages/app/dashboard";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Routes>
                        {/* Landing page route */}
                        <Route path="/" element={<Index />} />

                        {/* Auth routes */}
                        <Route path="/auth/sign-in" element={<SignIn />} />
                        <Route path="/auth/sign-up" element={<SignUp />} />

                        {/* Protected app routes */}
                        <Route
                            path="/app"
                            element={
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Dashboard />} />
                            {/* Add more app routes here */}
                        </Route>

                        {/* Catch-all route */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </AuthProvider>
    </QueryClientProvider>
);

export default App;
