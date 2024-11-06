import { db } from "@/db/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, organization } from "better-auth/plugins";
import { schema } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    usePlural: false,
    schema: {
      ...schema,
      user: schema.user,
    },
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  plugins: [admin(), organization()],
  logger: {
    disabled: false,
  },
});
