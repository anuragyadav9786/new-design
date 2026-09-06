"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useLeadCaptureTrigger } from "@/hooks/use-lead-capture-trigger";
import { captureLead } from "@/app/actions/capture-lead";
import { goalPortfolios } from "@/components/landing/goal-portfolios";
import { constants } from "@/components/common/constants";

const formSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function LeadCaptureModal() {
  const { isOpen, close } = useLeadCaptureTrigger();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Snapshotted once when the modal opens, not read fresh on every render —
  // the hero carousel keeps auto-advancing in the background, so reading
  // sessionStorage live could silently change which goal gets submitted
  // partway through the user filling out the form.
  const [goalIdAtOpen, setGoalIdAtOpen] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "" },
  });

  useEffect(() => {
    if (isOpen) {
      setGoalIdAtOpen(sessionStorage.getItem("lastGoal"));
    }
  }, [isOpen]);

  const goal = goalPortfolios.find((g) => g.id === goalIdAtOpen);
  const goalLabel = goal ? goal.name : "Investment";

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await captureLead({ name: data.name, email: data.email, goal: goal?.id ?? "unspecified", source: "exit-intent-modal" });
    } catch (error) {
      console.error("Lead capture failed:", error);
    }

    setIsSubmitted(true);
    setIsSubmitting(false);

    window.setTimeout(() => {
      const params = new URLSearchParams({ name: data.name, email: data.email });
      if (goal) params.set("goal", goal.id);
      // advisor.thinkfinfinance.com doesn't consume these query params yet,
      // but is expected to add pre-fill support later — safe to send regardless.
      window.location.href = `${constants.advisorAppLink}?${params.toString()}`;
    }, 1200);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="rounded-[var(--tf-radius-lg)] border-[var(--tf-border)] bg-white p-8 shadow-[0_25px_70px_rgba(var(--tf-navy-rgb),0.2)] sm:max-w-md"
        style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}
      >
        {isSubmitted ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 className="h-10 w-10 text-[var(--tf-blue)]" />
            <p className="font-medium text-[var(--tf-navy)]">Thanks! Taking you to complete your {goalLabel} plan...</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-[var(--tf-navy)]">
                Get Your Free {goalLabel} Plan
              </DialogTitle>
              <DialogDescription className="pt-1 text-left text-[var(--tf-text-secondary)]">
                Share your details and our advisor will review your goal and send you a personalised recommendation.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          {...field}
                          disabled={isSubmitting}
                          className="h-11 rounded-[var(--tf-radius-xs)] border-[var(--tf-border)] focus-visible:ring-[var(--tf-blue)]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Your Email"
                          {...field}
                          disabled={isSubmitting}
                          className="h-11 rounded-[var(--tf-radius-xs)] border-[var(--tf-border)] focus-visible:ring-[var(--tf-blue)]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-[var(--tf-radius-btn)] bg-[var(--tf-blue)] text-[15px] font-semibold text-white shadow-[0_10px_30px_rgba(var(--tf-blue-rgb),0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--tf-blue-hover)]"
                >
                  {isSubmitting ? "Submitting..." : "Get My Free Plan"}
                </Button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
