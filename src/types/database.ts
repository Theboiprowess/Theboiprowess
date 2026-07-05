// Database Types for Wisedell Academy
// Generated based on Supabase schema

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
      gallery: {
        Row: {
          id: string
          title: string | null
          description: string | null
          image_url: string
          category: string | null
          album: string | null
          album_id: string | null
          featured: boolean
          order_index: number
          is_video: boolean
          video_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title?: string | null
          description?: string | null
          image_url: string
          category?: string | null
          album?: string | null
          album_id?: string | null
          featured?: boolean
          order_index?: number
          is_video?: boolean
          video_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string | null
          description?: string | null
          image_url?: string
          category?: string | null
          album?: string | null
          album_id?: string | null
          featured?: boolean
          order_index?: number
          is_video?: boolean
          video_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      news: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          category: string | null
          image_url: string | null
          featured_image_url: string | null
          author: string | null
          author_id: string | null
          published: boolean
          published_at: string | null
          scheduled_publish_at: string | null
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          category?: string | null
          image_url?: string | null
          featured_image_url?: string | null
          author?: string | null
          author_id?: string | null
          published?: boolean
          published_at?: string | null
          scheduled_publish_at?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          category?: string | null
          image_url?: string | null
          featured_image_url?: string | null
          author?: string | null
          author_id?: string | null
          published?: boolean
          published_at?: string | null
          scheduled_publish_at?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          event_date: string
          event_time: string | null
          location: string | null
          category: string | null
          image_url: string | null
          featured_image_url: string | null
          published: boolean
          registration_deadline: string | null
          registration_required: boolean
          max_participants: number | null
          current_participants: number
          is_completed: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          event_date: string
          event_time?: string | null
          location?: string | null
          category?: string | null
          image_url?: string | null
          featured_image_url?: string | null
          published?: boolean
          registration_deadline?: string | null
          registration_required?: boolean
          max_participants?: number | null
          current_participants?: number
          is_completed?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          event_date?: string
          event_time?: string | null
          location?: string | null
          category?: string | null
          image_url?: string | null
          featured_image_url?: string | null
          published?: boolean
          registration_deadline?: string | null
          registration_required?: boolean
          max_participants?: number | null
          current_participants?: number
          is_completed?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      teachers: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          subjects: string[]
          qualifications: string
          experience_years: number | null
          bio: string | null
          biography: string | null
          profile_image_url: string | null
          photo_url: string | null
          department: string | null
          subject_specialization: string | null
          status: string
          hire_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          subjects: string[]
          qualifications: string
          experience_years?: number | null
          bio?: string | null
          biography?: string | null
          profile_image_url?: string | null
          photo_url?: string | null
          department?: string | null
          subject_specialization?: string | null
          status?: string
          hire_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          subjects?: string[]
          qualifications?: string
          experience_years?: number | null
          bio?: string | null
          biography?: string | null
          profile_image_url?: string | null
          photo_url?: string | null
          department?: string | null
          subject_specialization?: string | null
          status?: string
          hire_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          application_number: string
          student_first_name: string
          student_last_name: string
          date_of_birth: string
          gender: string
          national_id_birth_cert: string | null
          passport_photo_url: string | null
          parent_name: string
          parent_relationship: string
          parent_phone: string
          parent_alternative_phone: string | null
          parent_email: string
          physical_address: string
          previous_school: string | null
          last_grade_completed: string | null
          results_upload_url: string | null
          grade_applying: string
          subjects: string[] | null
          additional_comments: string | null
          declaration_accepted: boolean
          status: string
          submitted_at: string
          reviewed_at: string | null
          reviewed_by: string | null
          reviewed_by_email: string | null
          director_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          application_number: string
          student_first_name: string
          student_last_name: string
          date_of_birth: string
          gender: string
          national_id_birth_cert?: string | null
          passport_photo_url?: string | null
          parent_name: string
          parent_relationship: string
          parent_phone: string
          parent_alternative_phone?: string | null
          parent_email: string
          physical_address: string
          previous_school?: string | null
          last_grade_completed?: string | null
          results_upload_url?: string | null
          grade_applying: string
          subjects?: string[] | null
          additional_comments?: string | null
          declaration_accepted?: boolean
          status?: string
          submitted_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewed_by_email?: string | null
          director_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          application_number?: string
          student_first_name?: string
          student_last_name?: string
          date_of_birth?: string
          gender?: string
          national_id_birth_cert?: string | null
          passport_photo_url?: string | null
          parent_name?: string
          parent_relationship?: string
          parent_phone?: string
          parent_alternative_phone?: string | null
          parent_email?: string
          physical_address?: string
          previous_school?: string | null
          last_grade_completed?: string | null
          results_upload_url?: string | null
          grade_applying?: string
          subjects?: string[] | null
          additional_comments?: string | null
          declaration_accepted?: boolean
          status?: string
          submitted_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          reviewed_by_email?: string | null
          director_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      activity_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          entity_type: string | null
          entity_id: string | null
          details: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          entity_type?: string | null
          entity_id?: string | null
          details?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          entity_type?: string | null
          entity_id?: string | null
          details?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      students: {
        Row: {
          id: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: string
          address: string
          parent_name: string
          parent_phone: string
          parent_email: string | null
          emergency_contact: string
          emergency_phone: string
          admission_date: string
          grade_level: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: string
          address: string
          parent_name: string
          parent_phone: string
          parent_email?: string | null
          emergency_contact: string
          emergency_phone: string
          admission_date: string
          grade_level: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          date_of_birth?: string
          gender?: string
          address?: string
          parent_name?: string
          parent_phone?: string
          parent_email?: string | null
          emergency_contact?: string
          emergency_phone?: string
          admission_date?: string
          grade_level?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
