import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const resendApiKey = process.env.RESEND_API_KEY;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, recipients, subject, content, scheduled_at } = body;

    if (!type || !recipients || !content) {
      return NextResponse.json(
        { error: "Type, recipients, and content are required" },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (type === "email") {
      if (!resendApiKey) {
        return NextResponse.json(
          { error: "RESEND_API_KEY is not configured" },
          { status: 500 }
        );
      }

      const resend = new Resend(resendApiKey);

      // Queue email notifications
      const notifications = recipients.map((recipient: string) => ({
        type: "email",
        recipient,
        subject: subject || "WISEDELL ACADEMY Notification",
        content,
        status: "pending",
        scheduled_at: scheduled_at || null,
        created_at: new Date().toISOString(),
      }));

      const { error: queueError } = await supabase
        .from("notification_queue")
        .insert(notifications);

      if (queueError) {
        return NextResponse.json({ error: queueError.message }, { status: 500 });
      }

      // Send emails immediately if not scheduled
      if (!scheduled_at) {
        for (const recipient of recipients) {
          try {
            await resend.emails.send({
              from: "WISEDELL ACADEMY <wisedellacademy@gmail.com>",
              to: recipient,
              subject: subject || "WISEDELL ACADEMY Notification",
              html: content,
            });

            await supabase
              .from("notification_queue")
              .update({ status: "sent", sent_at: new Date().toISOString() })
              .eq("recipient", recipient)
              .eq("type", "email")
              .eq("status", "pending");
          } catch (error) {
            await supabase
              .from("notification_queue")
              .update({ 
                status: "failed", 
                error_message: String(error) 
              })
              .eq("recipient", recipient)
              .eq("type", "email")
              .eq("status", "pending");
          }
        }
      }

      return NextResponse.json({ success: true, queued: recipients.length });
    }

    if (type === "sms") {
      // SMS implementation would go here with an SMS provider
      // For now, just queue them
      const notifications = recipients.map((recipient: string) => ({
        type: "sms",
        recipient,
        subject,
        content,
        status: "pending",
        scheduled_at: scheduled_at || null,
        created_at: new Date().toISOString(),
      }));

      const { error: queueError } = await supabase
        .from("notification_queue")
        .insert(notifications);

      if (queueError) {
        return NextResponse.json({ error: queueError.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, queued: recipients.length, note: "SMS provider not configured" });
    }

    return NextResponse.json({ error: "Invalid notification type" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
