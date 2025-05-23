"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  // console.log(status);
  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setStatus("success");
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setStatus("error");
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      {status === "loading" && (
        <p className="text-muted-foreground text-sm">Verifying your email...</p>
      )}
      {status === "success" && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-green-600">Success!</h2>
          <p className="text-sm text-muted-foreground">
            Your email has been verified. Redirecting to your dashboard...
          </p>
        </div>
      )}
      {status === "error" && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-red-600">Oops!</h2>
          <p className="text-sm text-muted-foreground">
            This verification link is invalid or expired.
            Please try again.
          </p>
          <Button
            onClick={() => router.push("/auth/get-started")}
            variant="outline"
          >
            ⬅️ back to login
          </Button>
        </div>
      )}
    </div>
  );
}
