"use client";

import { logout } from "@/lib/utils/auth-helpers";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/get-started");
  };

  return (
    <Button onClick={handleLogout}  className="cursor-pointer" variant="ghost">
      Logout
    </Button>
  );
}
