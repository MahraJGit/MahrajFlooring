import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const s3Host =
  process.env.S3_BUCKET?.trim() && process.env.S3_REGION?.trim()
    ? `${process.env.S3_BUCKET.trim()}.s3.${process.env.S3_REGION.trim()}.amazonaws.com`
    : null;

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: s3Host
      ? [{ protocol: "https", hostname: s3Host }]
      : [],
  },
};

export default withPayload(nextConfig);
