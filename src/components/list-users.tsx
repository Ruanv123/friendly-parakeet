import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function ListUsers() {
  const users = await auth.api.listUsers({
    headers: await headers(),
    query: {
      limit: 10,
    },
  });

  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
