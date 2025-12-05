export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          session_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          session_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "quiz_sessions"
            referencedColumns: ["session_id"]
          },
        ]
      }
      languages: {
        Row: {
          code: string
          created_at: string | null
          id: string
          name_ar: string | null
          name_en: string
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          name_ar?: string | null
          name_en: string
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          name_ar?: string | null
          name_en?: string
        }
        Relationships: []
      }
      major_aliases: {
        Row: {
          alias: string
          major_slug: string | null
        }
        Insert: {
          alias: string
          major_slug?: string | null
        }
        Update: {
          alias?: string
          major_slug?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "major_aliases_major_slug_fkey"
            columns: ["major_slug"]
            isOneToOne: false
            referencedRelation: "majors"
            referencedColumns: ["slug"]
          },
        ]
      }
      majors: {
        Row: {
          badge_label_ar: string | null
          badge_label_en: string | null
          emoji: string | null
          name_ar: string | null
          name_en: string
          slug: string
        }
        Insert: {
          badge_label_ar?: string | null
          badge_label_en?: string | null
          emoji?: string | null
          name_ar?: string | null
          name_en: string
          slug: string
        }
        Update: {
          badge_label_ar?: string | null
          badge_label_en?: string | null
          emoji?: string | null
          name_ar?: string | null
          name_en?: string
          slug?: string
        }
        Relationships: []
      }
      program_types: {
        Row: {
          created_at: string | null
          description: string | null
          duration_years: number
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_years: number
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_years?: number
          id?: string
          name?: string
        }
        Relationships: []
      }
      programs: {
        Row: {
          application_deadline: string | null
          available_seats: number | null
          bonus_amount: number | null
          cash_discount_percent: number | null
          commission_amount: number | null
          commission_kind: Database["public"]["Enums"]["commission_kind"] | null
          commission_rate: number | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          language_id: string | null
          major_slug: string | null
          original_tuition: number
          program_type_id: string | null
          seat_status: Database["public"]["Enums"]["seat_status"] | null
          siblings_discount_percent: number | null
          start_date: string | null
          title: string
          title_ar: string | null
          total_seats: number | null
          tuition_after_discount: number | null
          university_id: string | null
          updated_at: string | null
        }
        Insert: {
          application_deadline?: string | null
          available_seats?: number | null
          bonus_amount?: number | null
          cash_discount_percent?: number | null
          commission_amount?: number | null
          commission_kind?:
            | Database["public"]["Enums"]["commission_kind"]
            | null
          commission_rate?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          language_id?: string | null
          major_slug?: string | null
          original_tuition: number
          program_type_id?: string | null
          seat_status?: Database["public"]["Enums"]["seat_status"] | null
          siblings_discount_percent?: number | null
          start_date?: string | null
          title: string
          title_ar?: string | null
          total_seats?: number | null
          tuition_after_discount?: number | null
          university_id?: string | null
          updated_at?: string | null
        }
        Update: {
          application_deadline?: string | null
          available_seats?: number | null
          bonus_amount?: number | null
          cash_discount_percent?: number | null
          commission_amount?: number | null
          commission_kind?:
            | Database["public"]["Enums"]["commission_kind"]
            | null
          commission_rate?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          language_id?: string | null
          major_slug?: string | null
          original_tuition?: number
          program_type_id?: string | null
          seat_status?: Database["public"]["Enums"]["seat_status"] | null
          siblings_discount_percent?: number | null
          start_date?: string | null
          title?: string
          title_ar?: string | null
          total_seats?: number | null
          tuition_after_discount?: number | null
          university_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "programs_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "programs_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "programs_view"
            referencedColumns: ["language_id"]
          },
          {
            foreignKeyName: "programs_major_slug_fkey"
            columns: ["major_slug"]
            isOneToOne: false
            referencedRelation: "majors"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "programs_program_type_id_fkey"
            columns: ["program_type_id"]
            isOneToOne: false
            referencedRelation: "program_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "programs_program_type_id_fkey"
            columns: ["program_type_id"]
            isOneToOne: false
            referencedRelation: "programs_view"
            referencedColumns: ["program_type_id"]
          },
          {
            foreignKeyName: "programs_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_sessions: {
        Row: {
          ai_explanation: string | null
          ai_generated_at: string | null
          answers: Json
          badge_slug: string | null
          confidence: number | null
          created_at: string | null
          grade_band: number | null
          highest_tuition: number | null
          id: string
          session_id: string | null
          top_major_slug: string | null
          top_programs: Json
          user_id: string | null
          user_name: string
          user_phone: string | null
        }
        Insert: {
          ai_explanation?: string | null
          ai_generated_at?: string | null
          answers: Json
          badge_slug?: string | null
          confidence?: number | null
          created_at?: string | null
          grade_band?: number | null
          highest_tuition?: number | null
          id?: string
          session_id?: string | null
          top_major_slug?: string | null
          top_programs: Json
          user_id?: string | null
          user_name: string
          user_phone?: string | null
        }
        Update: {
          ai_explanation?: string | null
          ai_generated_at?: string | null
          answers?: Json
          badge_slug?: string | null
          confidence?: number | null
          created_at?: string | null
          grade_band?: number | null
          highest_tuition?: number | null
          id?: string
          session_id?: string | null
          top_major_slug?: string | null
          top_programs?: Json
          user_id?: string | null
          user_name?: string
          user_phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_sessions_top_major_slug_fkey"
            columns: ["top_major_slug"]
            isOneToOne: false
            referencedRelation: "majors"
            referencedColumns: ["slug"]
          },
        ]
      }
      universities: {
        Row: {
          city: string
          country: string | null
          created_at: string | null
          established_year: number | null
          id: string
          is_prestigious: boolean | null
          is_private: boolean | null
          logo_url: string | null
          name: string
          name_ar: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          city: string
          country?: string | null
          created_at?: string | null
          established_year?: number | null
          id?: string
          is_prestigious?: boolean | null
          is_private?: boolean | null
          logo_url?: string | null
          name: string
          name_ar?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          city?: string
          country?: string | null
          created_at?: string | null
          established_year?: number | null
          id?: string
          is_prestigious?: boolean | null
          is_private?: boolean | null
          logo_url?: string | null
          name?: string
          name_ar?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      programs_view: {
        Row: {
          application_deadline: string | null
          available_seats: number | null
          city: string | null
          country: string | null
          duration_years: number | null
          is_active: boolean | null
          is_prestigious: boolean | null
          is_private: boolean | null
          language_code: string | null
          language_id: string | null
          language_name_en: string | null
          logo_url: string | null
          major_name_ar: string | null
          major_name_en: string | null
          major_slug: string | null
          original_tuition: number | null
          program_id: string | null
          program_name_ar: string | null
          program_name_en: string | null
          program_type: string | null
          program_type_id: string | null
          seat_status: Database["public"]["Enums"]["seat_status"] | null
          start_date: string | null
          tuition_after_discount: number | null
          university_name: string | null
          university_name_ar: string | null
        }
        Relationships: [
          {
            foreignKeyName: "programs_major_slug_fkey"
            columns: ["major_slug"]
            isOneToOne: false
            referencedRelation: "majors"
            referencedColumns: ["slug"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      commission_kind: "percent" | "flat"
      seat_status: "active" | "limited" | "full" | "closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      commission_kind: ["percent", "flat"],
      seat_status: ["active", "limited", "full", "closed"],
    },
  },
} as const
