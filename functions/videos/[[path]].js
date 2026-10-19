// Entrega os vídeos em partes (HTTP 206), exigido pelo Safari/iPhone para tocar MP4.
// Os arquivos continuam em /videos; esta função só recorta o trecho pedido no cabeçalho Range.
export async function onRequest({ request, env }) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  }
  const asset = await env.ASSETS.fetch(new Request(request.url, { method: "GET" }));
  if (asset.status !== 200) return asset;

  const headers = new Headers(asset.headers);
  headers.set("Accept-Ranges", "bytes");
  headers.set("Cache-Control", "public, max-age=86400");

  const range = request.headers.get("Range");
  const m = range && /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  if (!m || (m[1] === "" && m[2] === "")) {
    return new Response(request.method === "HEAD" ? null : asset.body, { status: 200, headers });
  }

  // O serviço de arquivos da Cloudflare não informa o tamanho, então medimos lendo o vídeo
  const buf = await asset.arrayBuffer();
  const size = buf.byteLength;
  let start, end;
  if (m[1] === "") { start = Math.max(0, size - Number(m[2])); end = size - 1; }
  else { start = Number(m[1]); end = m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1); }
  if (start >= size || start > end) {
    return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}`, "Accept-Ranges": "bytes" } });
  }

  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  const body = request.method === "HEAD" ? null : new Uint8Array(buf, start, end - start + 1);
  return new Response(body, { status: 206, headers });
}
