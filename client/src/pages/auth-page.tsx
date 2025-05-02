import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function for demo purposes - get reference to the demo login button
  const findAndClickDemoLoginButton = () => {
    const demoLoginBtn = document.querySelector('button:contains("Demo Login")') as HTMLButtonElement;
    if (demoLoginBtn) {
      demoLoginBtn.click();
    } else {
      console.error("Demo login button not found");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    try {
      // This is just for demo - in a real app we'd call the backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show a success message
      toast({
        title: "Login successful",
        description: "Welcome to the IWB Data Platform!",
      });
      
      // After login is successful, find and click the demo login button
      // This is a workaround for the demo
      findAndClickDemoLoginButton();
      
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Auth form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">IWB Data Platform</h1>
            <p className="text-gray-600">Recycle. Innovate. Transform.</p>
          </div>
          
          <Card className="w-full">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Sign In</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Email</Label>
                  <Input
                    id="username"
                    type="email"
                    placeholder="john.doe@iwb.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
                <div className="text-center">
                  <Button
                    variant="link"
                    type="button"
                  >
                    Don't have an account? Register
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <div className="text-center text-sm text-gray-600 mt-6">
            <p>© 2025 IWB. All rights reserved.</p>
          </div>
        </div>
      </div>
      
      {/* Right side - Hero image & info (desktop only) */}
      <div className="hidden md:flex flex-1 bg-primary items-center justify-center p-10">
        <div className="max-w-lg text-white">
          <h2 className="text-3xl font-bold mb-4">E-Waste Recycling Specialists</h2>
          <p className="mb-6">
            IWB is a leading company in Southern Africa specializing in the recycling 
            of computer parts. Our platform helps you manage inventory, track sales, 
            and monitor financial performance.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Track recycled computer parts inventory
            </li>
            <li className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Generate monthly income statements
            </li>
            <li className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Manage customer queries with automated responses
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
