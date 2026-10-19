// Entrega os vídeos em partes (HTTP 206), exigido pelo Safari/iPhone para tocar MP4.
// Os arquivos continuam em /videos; esta função só recorta o trecho pedido no cabeçalho Range.
export async function onRequest({ request, env }) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  }
  const asset = await env.ASSETS.fetch(new Request(request.url, { method: "GET" }));
  if (asset.status !== 200) return asset;

  const size = Number(asset.headers.get("Content-Length"));
  const headers = new Headers(asset.headers);
  headers.set("Accept-Ranges", "bytes");
  headers.set("Cache-Control", "public, max-age=86400");

  const range = request.headers.get("Range");
  const m = range && /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  if (!m || !size || (m[1] === "" && m[2] === "")) {
    return new Response(request.method === "HEAD" ? null : asset.body, { status: 200, headers });
  }

  let start, end;
  if (m[1] === "") { start = Math.max(0, size - Number(m[2])); end = size - 1; }
  else { start = Number(m[1]); end = m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1); }
  if (start >= size || start > end) {
    asset.body.cancel();
    return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}`, "Accept-Ranges": "bytes" } });
  }

  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  if (request.method === "HEAD") { asset.body.cancel(); return new Response(null, { status: 206, headers }); }

  // Repassa só os bytes do trecho pedido, sem carregar o vídeo inteiro na memória.
  let pos = 0;
  const slicer = new TransformStream({
    transform(chunk, ctl) {
      const a = pos, b = pos + chunk.byteLength;
      pos = b;
      if (b <= start || a > end) return;
      ctl.enqueue(chunk.subarray(Math.max(0, start - a), Math.min(chunk.byteLength, end - a + 1)));
      if (b > end) ctl.terminate();
    }
  });
  asset.body.pipeTo(slicer.writable).catch(() => {});
  return new Response(slicer.readable, { status: 206, headers });
}
