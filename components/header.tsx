import { Newspaper } from 'lucide-react';

export function Header() {
  return (
    <header className="mb-12 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Newspaper className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold">VideoSummarizer</h1>
      </div>
      <p className="text-muted-foreground text-lg">
        Transform YouTube videos into concise, readable summaries
      </p>
    </header>
  );
}