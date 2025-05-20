"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleUpdate = async () => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return alert(error.message);
    alert("Password updated successfully.");
    router.push("/auth/get-started");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-center">Set a new password</h2>
        <Input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleUpdate} disabled={loading} className="w-full">
          {loading ? "Updating..." : "Update password"}
        </Button>
      </div>
    </div>
  );
}
