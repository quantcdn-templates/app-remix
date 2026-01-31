import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const host = request.headers.get("host") || "localhost";
  const url = new URL(request.url);

  return json({
    message: "Hello from Remix API!",
    host,
    path: url.pathname,
    timestamp: new Date().toISOString(),
    headers: {
      "user-agent": request.headers.get("user-agent"),
      "accept": request.headers.get("accept"),
    },
  });
}
