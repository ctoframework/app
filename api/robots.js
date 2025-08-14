// returns the string without leading whitespace
function unindented(format, ...values) {
  const raw = String.raw({ raw: format }, ...values);
  const lines = raw.split("\n").map((line) => line.trim());
  return lines.join("\n");
}

export function GET(request) {
  const host = new URL(request.url).host;
  const content = unindented`Sitemap: https://${host}/sitemap.xml
    User-agent: *
    Disallow:`;
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600", // cache for 1 hour
    },
  });
}
