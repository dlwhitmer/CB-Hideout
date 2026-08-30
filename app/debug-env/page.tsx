export default function DebugEnv() {
  return (
    <pre>
      {JSON.stringify(
        {
          url: process.env.TURSO_DATABASE_URL,
          token: process.env.TURSO_AUTH_TOKEN,
        },
        null,
        2
      )}
    </pre>
  );
}
