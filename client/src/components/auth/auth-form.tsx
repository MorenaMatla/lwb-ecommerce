import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import TwoFactorForm from "./two-factor-form";
import RegisterForm from "./register-form";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function AuthForm() {
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [credentials, setCredentials] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // For a simplified login flow (no two-factor)
  const onSubmit = async (values: FormValues) => {
    try {
      await login(values.username, values.password);
      toast({
        title: "Login successful",
        description: "Welcome to IWB Data Platform",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  // For two-factor flow (currently not being used)
  const onSubmitWithTwoFactor = async (values: FormValues) => {
    setCredentials(values);
    setShowTwoFactor(true);
  };

  const handleTwoFactorComplete = async (code: string) => {
    if (!credentials) return;

    try {
      // The code parameter would be used in a real MFA implementation
      await login(credentials.username, credentials.password);
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
      setShowTwoFactor(false);
    }
  };

  if (showRegister) {
    return (
      <div>
        <RegisterForm />
        <div className="mt-4 text-center">
          <Button variant="link" onClick={() => setShowRegister(false)}>
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  if (showTwoFactor) {
    return (
      <TwoFactorForm
        onComplete={handleTwoFactorComplete}
        onCancel={() => setShowTwoFactor(false)}
      />
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john.doe@iwb.com"
                      {...field}
                      autoComplete="username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                onClick={() => setShowRegister(true)}
              >
                Don't have an account? Register
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
