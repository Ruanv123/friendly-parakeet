"use client";

import { authClient } from "@/lib/client";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export function LogoutButton({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <button
      onClick={async () =>
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/signin"); // redirect to login page
            },
          },
        })
      }
    >
      {children}
    </button>
  );
}
