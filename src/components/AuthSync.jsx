"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function AuthSync() {
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const syncAuth = async () => {
      if (session?.user?.email) {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jwt`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: session.user.email }),
            credentials: "include",
          });
        } catch (error) {
          console.error("Failed to sync JWT token", error);
        }
      } else {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, {
            method: "POST",
            credentials: "include",
          });
        } catch (error) {
          console.error("Failed to clear JWT token", error);
        }
      }
    };
    syncAuth();
  }, [session?.user?.email]);

  return null;
}
