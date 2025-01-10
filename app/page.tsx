import { VideoSummaryForm } from "@/components/video-summary-form";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <VideoSummaryForm />
      </div>
    </main>
  );
}
