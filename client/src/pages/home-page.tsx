import { useEffect } from "react";
import { useLocation } from "wouter";

export default function HomePage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to dashboard
    setLocation("/dashboard");
  }, [setLocation]);

  return null; // Nothing to render as we're redirecting
}
