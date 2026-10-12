import mongoose from "mongoose";

const globalForMongoose = globalThis;

const cache = globalForMongoose.__mahrajMongoose ?? {
  conn: null,
  promise: null,
  uri: null,
};

globalForMongoose.__mahrajMongoose = cache;

function resetCache() {
  cache.conn = null;
  cache.promise = null;
  cache.uri = null;
}

/**
 * Dedicated Mongoose connection for the custom CMS and public reads.
 * Do not use the default mongoose connection.
 */
export async function connectDb() {
  const uri = process.env.DATABASE_URI;
  if (!uri) {
    throw new Error("DATABASE_URI is not set.");
  }

  // Env reloads (new password / DB name) must drop the cached failed pool.
  if (cache.uri && cache.uri !== uri) {
    resetCache();
  }

  if (cache.conn && cache.conn.readyState === 1) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.uri = uri;
    const connection = mongoose.createConnection(uri, {
      bufferCommands: false,
    });
    cache.promise = connection.asPromise().catch((error) => {
      resetCache();
      throw error;
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
