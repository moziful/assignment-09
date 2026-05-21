"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function DashboardGuard({ children }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/auth/signin");
    }
  }, [isPending, router, session?.user]);

  if (isPending) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return children;
}
