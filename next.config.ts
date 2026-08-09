import type { NextConfig } from "next";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: resolve(__dirname),
  },
  outputFileTracingRoot: resolve(__dirname),
};

export default nextConfig;
