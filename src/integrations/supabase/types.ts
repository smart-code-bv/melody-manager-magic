export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      lessons: {
        Row: {
          created_at: string
          duration: number
          id: string
          is_recurring: boolean | null
          location_id: string | null
          notes: string | null
          recurring_pattern: Json | null
          start_time: string
          status: string | null
          student_id: string | null
          teacher_id: string | null
        }
        Insert: {
          created_at?: string
          duration?: number
          id?: string
          is_recurring?: boolean | null
          location_id?: string | null
          notes?: string | null
          recurring_pattern?: Json | null
          start_time: string
          status?: string | null
          student_id?: string | null
          teacher_id?: string | null
        }
        Update: {
          created_at?: string
          duration?: number
          id?: string
          is_recurring?: boolean | null
          location_id?: string | null
          notes?: string | null
          recurring_pattern?: Json | null
          start_time?: string
          status?: string | null
          student_id?: string | null
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string
          city: string
          created_at: string
          id: string
          is_online: boolean | null
          name: string
          notes: string | null
          teacher_id: string | null
        }
        Insert: {
          address: string
          city: string
          created_at?: string
          id?: string
          is_online?: boolean | null
          name: string
          notes?: string | null
          teacher_id?: string | null
        }
        Update: {
          address?: string
          city?: string
          created_at?: string
          id?: string
          is_online?: boolean | null
          name?: string
          notes?: string | null
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "locations_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          created_at: string
          description: string | null
          file_url: string | null
          id: string
          tags: string[] | null
          teacher_id: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          tags?: string[] | null
          teacher_id?: string | null
          title: string
          type: string
        }
        Update: {
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          tags?: string[] | null
          teacher_id?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "materials_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          due_date: string | null
          id: string
          invoice_number: string | null
          notes: string | null
          paid_date: string | null
          status: string | null
          student_id: string | null
          teacher_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          due_date?: string | null
          id?: string
          invoice_number?: string | null
          notes?: string | null
          paid_date?: string | null
          status?: string | null
          student_id?: string | null
          teacher_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          due_date?: string | null
          id?: string
          invoice_number?: string | null
          notes?: string | null
          paid_date?: string | null
          status?: string | null
          student_id?: string | null
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          active: boolean | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          role: Database["public"]["Enums"]["user_role"]
          time_zone: string | null
          years_teaching: number | null
        }
        Insert: {
          active?: boolean | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email: string
          first_name: string
          id: string
          last_name: string
          role?: Database["public"]["Enums"]["user_role"]
          time_zone?: string | null
          years_teaching?: number | null
        }
        Update: {
          active?: boolean | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          role?: Database["public"]["Enums"]["user_role"]
          time_zone?: string | null
          years_teaching?: number | null
        }
        Relationships: []
      }
      students: {
        Row: {
          active: boolean | null
          created_at: string
          email: string | null
          first_name: string
          id: string
          last_name: string
          level: string | null
          notes: string | null
          phone: string | null
          start_date: string | null
          teacher_id: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          email?: string | null
          first_name: string
          id?: string
          last_name: string
          level?: string | null
          notes?: string | null
          phone?: string | null
          start_date?: string | null
          teacher_id?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string
          level?: string | null
          notes?: string | null
          phone?: string | null
          start_date?: string | null
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist: {
        Row: {
          beta_tester: boolean | null
          created_at: string
          email: string
          id: string
          instruments_list: string[]
          lesson_city: string | null
          name: string
          other_instruments: string | null
          student_count: string | null
          survey_consent: boolean | null
          teacher_name: string | null
          user_type: string
        }
        Insert: {
          beta_tester?: boolean | null
          created_at?: string
          email: string
          id?: string
          instruments_list?: string[]
          lesson_city?: string | null
          name: string
          other_instruments?: string | null
          student_count?: string | null
          survey_consent?: boolean | null
          teacher_name?: string | null
          user_type?: string
        }
        Update: {
          beta_tester?: boolean | null
          created_at?: string
          email?: string
          id?: string
          instruments_list?: string[]
          lesson_city?: string | null
          name?: string
          other_instruments?: string | null
          student_count?: string | null
          survey_consent?: boolean | null
          teacher_name?: string | null
          user_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      instrument_enum:
        | "piano"
        | "guitar"
        | "violin"
        | "drums"
        | "voice"
        | "flute"
        | "cello"
        | "saxophone"
        | "trumpet"
        | "clarinet"
        | "bass_guitar"
        | "viola"
        | "trombone"
        | "harp"
        | "ukulele"
        | "vibraphone"
        | "accordion"
        | "other"
      user_role: "admin" | "teacher" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
