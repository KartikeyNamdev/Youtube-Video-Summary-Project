"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  url: z
    .string()
    .url("Please enter a valid URL")
    .refine(
      (url) => url.includes("youtube.com/") || url.includes("youtu.be/"),
      "Please enter a valid YouTube URL"
    ),
});

export function VideoSummaryForm() {
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      setError(null);
      setSummary(null);

      // TODO: Implement the API call to generate summary
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      const data = await response.json();
      setSummary(data.summary); // Assuming the API returns { summary: "..." }
      // This will be implemented once we set up the Supabase backend

      setIsLoading(false);
    } catch (err) {
      setError("Failed to generate summary. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter YouTube URL (e.g., https://youtube.com/watch?v=...)"
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full h-12" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Summary...
              </>
            ) : (
              "Generate Summary"
            )}
          </Button>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {summary && (
        <Card className="mt-6 p-6">
          <h2 className="text-xl font-semibold mb-4">Video Summary</h2>
          <p className="text-muted-foreground whitespace-pre-wrap">{summary}</p>
        </Card>
      )}
    </div>
  );
}
