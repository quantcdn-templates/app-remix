import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix on Quant Cloud" },
    { name: "description", content: "A Remix application running on Quant Cloud" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const host = request.headers.get("host") || "localhost";
  const userAgent = request.headers.get("user-agent") || "Unknown";

  return json({
    host,
    userAgent,
    timestamp: new Date().toISOString(),
  });
}

export default function Index() {
  const { host, userAgent, timestamp } = useLoaderData<typeof loader>();

  return (
    <div style={styles.container}>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }
      `}</style>

      <main style={styles.main}>
        <div style={styles.card}>
          <div style={styles.logoContainer}>
            <svg
              style={styles.logo}
              viewBox="0 0 800 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="800" height="800" fill="#212121" rx="100" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M587.947 527.768C592.201 582.418 592.201 604.881 592.201 604.881H465.511C465.511 604.881 465.511 582.619 465.511 527.768V423.877H358.259V527.768C358.259 582.619 358.259 604.881 358.259 604.881H231.569C231.569 604.881 231.569 582.418 235.823 527.768L235.823 310.447C231.569 255.797 231.569 233.333 231.569 233.333H358.259C358.259 233.333 358.259 255.395 358.259 310.447V312.029H465.511V310.447C465.511 255.395 465.511 233.333 465.511 233.333H592.201C592.201 233.333 592.201 255.797 587.947 310.447V527.768Z"
                fill="white"
              />
            </svg>
          </div>

          <h1 style={styles.title}>Remix on Quant Cloud</h1>

          <p style={styles.description}>
            Your Remix application is running successfully on Quant Cloud.
          </p>

          <div style={styles.infoBox}>
            <h2 style={styles.infoTitle}>Request Information</h2>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Host</span>
                <code style={styles.infoValue}>{host}</code>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Timestamp</span>
                <code style={styles.infoValue}>{timestamp}</code>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>User Agent</span>
                <code style={styles.infoValueSmall}>{userAgent}</code>
              </div>
            </div>
          </div>

          <div style={styles.actions}>
            <a
              href="/api/hello"
              style={styles.button}
            >
              Test API Route
            </a>
            <a
              href="https://remix.run/docs"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.buttonSecondary}
            >
              Remix Docs
            </a>
          </div>
        </div>

        <footer style={styles.footer}>
          <p>
            Powered by{" "}
            <a
              href="https://www.quantcdn.io"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.footerLink}
            >
              Quant Cloud
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "3rem",
    maxWidth: "600px",
    width: "100%",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.5rem",
  },
  logo: {
    width: "80px",
    height: "80px",
    borderRadius: "12px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    textAlign: "center" as const,
    margin: "0 0 1rem 0",
    color: "#1a1a1a",
  },
  description: {
    fontSize: "1.125rem",
    textAlign: "center" as const,
    color: "#666",
    margin: "0 0 2rem 0",
  },
  infoBox: {
    background: "#f8f9fa",
    borderRadius: "12px",
    padding: "1.5rem",
    marginBottom: "2rem",
  },
  infoTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    margin: "0 0 1rem 0",
    color: "#1a1a1a",
  },
  infoGrid: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.75rem",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.25rem",
  },
  infoLabel: {
    fontSize: "0.75rem",
    fontWeight: 500,
    color: "#666",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  },
  infoValue: {
    fontSize: "0.875rem",
    background: "#e9ecef",
    padding: "0.5rem 0.75rem",
    borderRadius: "6px",
    fontFamily: "'SF Mono', 'Fira Code', monospace",
    wordBreak: "break-all" as const,
  },
  infoValueSmall: {
    fontSize: "0.75rem",
    background: "#e9ecef",
    padding: "0.5rem 0.75rem",
    borderRadius: "6px",
    fontFamily: "'SF Mono', 'Fira Code', monospace",
    wordBreak: "break-all" as const,
  },
  actions: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap" as const,
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.75rem 1.5rem",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: 500,
    fontSize: "0.875rem",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  buttonSecondary: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.75rem 1.5rem",
    background: "white",
    color: "#667eea",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: 500,
    fontSize: "0.875rem",
    border: "2px solid #667eea",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  footer: {
    marginTop: "2rem",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "0.875rem",
  },
  footerLink: {
    color: "white",
    textDecoration: "underline",
  },
};
