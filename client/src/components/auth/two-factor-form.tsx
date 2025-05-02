import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  verificationCode: z.string().length(6, "Code must be 6 digits"),
});

type FormValues = z.infer<typeof formSchema>;

interface TwoFactorFormProps {
  onComplete: (code: string) => void;
  onCancel: () => void;
}

export default function TwoFactorForm({
  onComplete,
  onCancel,
}: TwoFactorFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    // In a real system, this would validate with the backend
    setTimeout(() => {
      onComplete(values.verificationCode);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Two-Factor Authentication</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123456"
                      {...field}
                      maxLength={6}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoFocus
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the code sent to your mobile device
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
