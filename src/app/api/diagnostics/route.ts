import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  console.log("[DIAGNOSTICS] Diagnostic endpoint called");
  
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: {},
    supabaseConnection: null as any,
    tables: {} as any,
  };

  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const resendFromEmail = process.env.RESEND_FROM_EMAIL;

  diagnostics.environment = {
    hasSupabaseUrl: !!supabaseUrl,
    hasSupabaseAnonKey: !!supabaseAnonKey,
    hasSupabaseServiceKey: !!supabaseServiceKey,
    hasResendKey: !!resendApiKey,
    hasRecaptchaSecret: !!recaptchaSecretKey,
    hasSiteUrl: !!siteUrl,
    hasResendFromEmail: !!resendFromEmail,
    supabaseUrlPrefix: supabaseUrl ? `${supabaseUrl.substring(0, 15)}...` : null,
    siteUrl: siteUrl || null,
    resendFromEmail: resendFromEmail || null,
  };

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({
      ...diagnostics,
      error: "Missing Supabase credentials"
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    console.log("[DIAGNOSTICS] Supabase client created");

    // Test basic connection using a simple RPC call that should always work
    try {
      const { data: versionData, error: versionError } = await supabase.rpc('version');
      diagnostics.supabaseConnection = {
        connected: !versionError,
        version: versionData || null,
        error: versionError ? versionError.message : null,
      };
    } catch (rpcError) {
      diagnostics.supabaseConnection = {
        connected: false,
        error: "RPC call failed",
        details: rpcError instanceof Error ? rpcError.message : String(rpcError),
      };
    }

    // Try to list tables using information_schema (if accessible)
    try {
      const { data: tablesData, error: tablesError } = await supabase
        .from("applications")
        .select("*")
        .limit(1);

      diagnostics.tables.applications = {
        accessible: !tablesError,
        error: tablesError ? tablesError.message : null,
        errorCode: tablesError?.code || null,
      };
    } catch (tableError) {
      diagnostics.tables.applications = {
        accessible: false,
        error: tableError instanceof Error ? tableError.message : String(tableError),
      };
    }

    // Try students table
    try {
      const { data: studentsData, error: studentsError } = await supabase
        .from("students")
        .select("*")
        .limit(1);

      diagnostics.tables.students = {
        accessible: !studentsError,
        error: studentsError ? studentsError.message : null,
        errorCode: studentsError?.code || null,
      };
    } catch (tableError) {
      diagnostics.tables.students = {
        accessible: false,
        error: tableError instanceof Error ? tableError.message : String(tableError),
      };
    }

    // Try gallery table
    try {
      const { data: galleryData, error: galleryError } = await supabase
        .from("gallery")
        .select("*")
        .limit(1);

      diagnostics.tables.gallery = {
        accessible: !galleryError,
        error: galleryError ? galleryError.message : null,
        errorCode: galleryError?.code || null,
      };
    } catch (tableError) {
      diagnostics.tables.gallery = {
        accessible: false,
        error: tableError instanceof Error ? tableError.message : String(tableError),
      };
    }

    // Try teachers table
    try {
      const { data: teachersData, error: teachersError } = await supabase
        .from("teachers")
        .select("*")
        .limit(1);

      diagnostics.tables.teachers = {
        accessible: !teachersError,
        error: teachersError ? teachersError.message : null,
        errorCode: teachersError?.code || null,
      };
    } catch (tableError) {
      diagnostics.tables.teachers = {
        accessible: false,
        error: tableError instanceof Error ? tableError.message : String(tableError),
      };
    }

    // Try news table
    try {
      const { data: newsData, error: newsError } = await supabase
        .from("news")
        .select("*")
        .limit(1);

      diagnostics.tables.news = {
        accessible: !newsError,
        error: newsError ? newsError.message : null,
        errorCode: newsError?.code || null,
      };
    } catch (tableError) {
      diagnostics.tables.news = {
        accessible: false,
        error: tableError instanceof Error ? tableError.message : String(tableError),
      };
    }

    // Try events table
    try {
      const { data: eventsData, error: eventsError } = await supabase
        .from("events")
        .select("*")
        .limit(1);

      diagnostics.tables.events = {
        accessible: !eventsError,
        error: eventsError ? eventsError.message : null,
        errorCode: eventsError?.code || null,
      };
    } catch (tableError) {
      diagnostics.tables.events = {
        accessible: false,
        error: tableError instanceof Error ? tableError.message : String(tableError),
      };
    }

    // Try activity_logs table
    try {
      const { data: logsData, error: logsError } = await supabase
        .from("activity_logs")
        .select("*")
        .limit(1);

      diagnostics.tables.activity_logs = {
        accessible: !logsError,
        error: logsError ? logsError.message : null,
        errorCode: logsError?.code || null,
      };
    } catch (tableError) {
      diagnostics.tables.activity_logs = {
        accessible: false,
        error: tableError instanceof Error ? tableError.message : String(tableError),
      };
    }

    return NextResponse.json(diagnostics);
  } catch (error) {
    console.error("[DIAGNOSTICS] Unexpected error:", error);
    return NextResponse.json({
      ...diagnostics,
      error: "Unexpected error",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
