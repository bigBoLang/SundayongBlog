// Worker 入口：/api/* 交给授权服务，其余全部交给静态资源（Astro 构建出来的 dist）。
// 这个文件是加到博客仓库里的，路径 worker/index.js。
import license from "./license.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      return license.fetch(request, env, ctx);
    }
    return env.ASSETS.fetch(request);
  },
};
