import { NhostClient } from "@nhost/nhost-js";
// import { NextResponse } from "@next/server";
import { NextResponse } from "next/server";

import type { Database } from "@/lib/nhost-types";
import { generateSummaryWithOpenRouter } from "@/lib/openrouter";
import { getYouTubeTranscript } from "@/lib/youtube";

export const nhost = new NhostClient({
  subdomain: process.env.NHOST_SUBDOMAIN!,
  region: process.env.NHOST_REGION!,
});

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    // const videoData = await getVideoMetadata(videoId);
    const transcript = await getYouTubeTranscript(videoId);
    const summary = await generateSummaryWithOpenRouter(transcript, url);

    // const { data, error } = await nhost.graphql.request(
    //   `
    //   mutation InsertVideoSummary($video_url: String!, $video_title: String!, $summary: String!, $user_id: uuid!) {
    //     insert_video_summaries_one(object: {
    //       video_url: $video_url,
    //       video_title: $video_title,
    //       summary: $summary,
    //       user_id: $user_id
    //     }) {
    //       id
    //       created_at
    //       video_url
    //       video_title
    //       summary
    //       user_id
    //     }
    //   }
    // `,
    //   {
    //     video_url: url,
    //     // video_title: videoData.title,
    //     summary,
    //     user_id: "USER_ID", // Replace with actual user ID from auth
    //   }
    // );

    // if (error) throw error;

    return NextResponse.json(summary);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}

function extractVideoId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

async function getVideoMetadata(videoId: string) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`
  );
  const data = await response.json();
  // console.log(data);
  return {
    title: data.items[0].snippet.title,
  };
}
