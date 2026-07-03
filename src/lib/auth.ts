import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export type UserRole = 
  | "super_admin" 
  | "admin" 
  | "admissions_officer" 
  | "teacher" 
  | "finance" 
  | "content_manager";

export interface UserWithRoles {
  id: string;
  email: string;
  roles: UserRole[];
}

// Role permissions matrix
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  super_admin: [
    "all",
    "manage_users",
    "manage_roles",
    "manage_applications",
    "manage_students",
    "manage_teachers",
    "manage_news",
    "manage_events",
    "manage_gallery",
    "manage_downloads",
    "manage_calendar",
    "manage_contact",
    "manage_settings",
    "manage_announcements",
    "send_notifications",
    "view_analytics",
    "database_backup",
  ],
  admin: [
    "manage_applications",
    "manage_students",
    "manage_teachers",
    "manage_news",
    "manage_events",
    "manage_gallery",
    "manage_downloads",
    "manage_calendar",
    "manage_contact",
    "manage_announcements",
    "send_notifications",
    "view_analytics",
  ],
  admissions_officer: [
    "manage_applications",
    "view_analytics",
  ],
  teacher: [
    "manage_students",
    "view_analytics",
  ],
  finance: [
    "manage_students",
    "view_analytics",
  ],
  content_manager: [
    "manage_news",
    "manage_events",
    "manage_gallery",
    "manage_announcements",
  ],
};

/**
 * Check if a user has a specific permission
 */
export function hasPermission(userRoles: UserRole[], permission: string): boolean {
  if (userRoles.includes("super_admin")) return true;
  
  for (const role of userRoles) {
    if (ROLE_PERMISSIONS[role]?.includes(permission)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Check if a user has any of the specified roles
 */
export function hasRole(userRoles: UserRole[], requiredRoles: UserRole[]): boolean {
  return requiredRoles.some(role => userRoles.includes(role));
}

/**
 * Get user roles from Supabase
 */
export async function getUserRoles(userId: string): Promise<UserRole[]> {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);
  
  if (error) {
    console.error("Error fetching user roles:", error);
    return [];
  }
  
  return data?.map(r => r.role as UserRole) || [];
}

/**
 * Log user activity
 */
export async function logActivity(
  userId: string,
  action: string,
  entityType: string,
  entityId?: string,
  details?: Record<string, any>,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  const { error } = await supabase.from("activity_logs").insert({
    user_id: userId,
    action,
    entity_type: entityType,
    entity_id: entityId,
    details: details as any,
    ip_address: ipAddress,
    user_agent: userAgent,
  });
  
  if (error) {
    console.error("Error logging activity:", error);
  }
}
