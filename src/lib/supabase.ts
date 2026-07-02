import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      students: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          date_of_birth: string;
          gender: 'male' | 'female';
          address: string;
          parent_phone: string;
          parent_email: string;
          admission_date: string;
          grade: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          date_of_birth: string;
          gender: 'male' | 'female';
          address: string;
          parent_phone: string;
          parent_email: string;
          admission_date?: string;
          grade: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          date_of_birth?: string;
          gender?: 'male' | 'female';
          address?: string;
          parent_phone?: string;
          parent_email?: string;
          admission_date?: string;
          grade?: string;
          updated_at?: string;
        };
      };
      applications: {
        Row: {
          id: string;
          student_name: string;
          date_of_birth: string;
          gender: 'male' | 'female';
          previous_school: string;
          grade_applying: string;
          parent_name: string;
          parent_phone: string;
          parent_email: string;
          address: string;
          birth_certificate_url: string;
          previous_report_url: string;
          passport_photo_url: string;
          status: 'pending' | 'approved' | 'rejected' | 'under_review';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_name: string;
          date_of_birth: string;
          gender: 'male' | 'female';
          previous_school: string;
          grade_applying: string;
          parent_name: string;
          parent_phone: string;
          parent_email: string;
          address: string;
          birth_certificate_url: string;
          previous_report_url: string;
          passport_photo_url: string;
          status?: 'pending' | 'approved' | 'rejected' | 'under_review';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          student_name?: string;
          date_of_birth?: string;
          gender?: 'male' | 'female';
          previous_school?: string;
          grade_applying?: string;
          parent_name?: string;
          parent_phone?: string;
          parent_email?: string;
          address?: string;
          birth_certificate_url?: string;
          previous_report_url?: string;
          passport_photo_url?: string;
          status?: 'pending' | 'approved' | 'rejected' | 'under_review';
          updated_at?: string;
        };
      };
      teachers: {
        Row: {
          id: string;
          name: string;
          position: string;
          subject_specialty: string;
          biography: string;
          years_of_experience: number;
          photo_url: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          position: string;
          subject_specialty: string;
          biography: string;
          years_of_experience: number;
          photo_url: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          position?: string;
          subject_specialty?: string;
          biography?: string;
          years_of_experience?: number;
          photo_url?: string;
          updated_at?: string;
        };
      };
      subjects: {
        Row: {
          id: string;
          name: string;
          level: 'O_LEVEL' | 'A_LEVEL';
          description: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          level: 'O_LEVEL' | 'A_LEVEL';
          description: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          level?: 'O_LEVEL' | 'A_LEVEL';
          description?: string;
        };
      };
      news: {
        Row: {
          id: string;
          title: string;
          content: string;
          image_url: string;
          category: string;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          image_url: string;
          category: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          image_url?: string;
          category?: string;
          published?: boolean;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          event_date: string;
          event_time: string;
          location: string;
          image_url: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          event_date: string;
          event_time: string;
          location: string;
          image_url: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          event_date?: string;
          event_time?: string;
          location?: string;
          image_url?: string;
          updated_at?: string;
        };
      };
      gallery: {
        Row: {
          id: string;
          title: string;
          description: string;
          image_url: string;
          category: 'campus' | 'students' | 'teachers' | 'classrooms' | 'science_lab' | 'sports' | 'events' | 'graduation';
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          image_url: string;
          category: 'campus' | 'students' | 'teachers' | 'classrooms' | 'science_lab' | 'sports' | 'events' | 'graduation';
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          image_url?: string;
          category?: 'campus' | 'students' | 'teachers' | 'classrooms' | 'science_lab' | 'sports' | 'events' | 'graduation';
        };
      };
      downloads: {
        Row: {
          id: string;
          title: string;
          description: string;
          file_url: string;
          file_type: string;
          category: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          file_url: string;
          file_type: string;
          category: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          file_url?: string;
          file_type?: string;
          category?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          role: 'admin' | 'staff' | 'parent';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          role?: 'admin' | 'staff' | 'parent';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: 'admin' | 'staff' | 'parent';
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          subject: string;
          message: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          subject: string;
          message: string;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          subject?: string;
          message?: string;
          read?: boolean;
        };
      };
    };
  };
};
