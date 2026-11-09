/**
 * 公开下载跳转：/dl/<filename> -> VPS 镜像
 *
 * 只允许白名单文件名，避免这个路由被当成开放代理。
 * 实际字节由 49.235.159.190:18080 提供（支持 Range，可断点续传）。
 */
const VPS_BASE = "http://49.235.159.190:18080/dl/";
const ALLOW = new Set(["mjdx-xxzy-2.20.apk"]);

export function onRequest(context) {
  const url = new URL(context.request.url);
  const name = decodeURIComponent(url.pathname.replace(/^\/dl\//, ""));

  if (!ALLOW.has(name)) {
    return new Response("not found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return Response.redirect(VPS_BASE + encodeURIComponent(name), 302);
}
