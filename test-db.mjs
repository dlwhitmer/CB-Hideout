import { createClient } from "@libsql/client";

const db = createClient({
  url: "libsql://cbhideout-dlwhitmer.aws-us-east-2.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const result = await db.execute("SELECT 1");
console.log(result);