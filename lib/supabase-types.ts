export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      video_summaries: {
        Row: {
          id: string
          created_at: string
          video_url: string
          video_title: string
          summary: string
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          video_url: string
          video_title: string
          summary: string
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          video_url?: string
          video_title?: string
          summary?: string
          user_id?: string
        }
      }
    }
  }
}