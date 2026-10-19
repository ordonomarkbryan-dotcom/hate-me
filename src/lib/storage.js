/**
 * Storage abstraction for survey responses.
 * Uses Upstash Redis in production, in-memory fallback for development.
 */

let memoryStore = [];
let redisClient = null;

async function getRedisClient() {
  if (redisClient) return redisClient;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    try {
      const { Redis } = await import('@upstash/redis');
      redisClient = new Redis({ url, token });
      return redisClient;
    } catch (e) {
      console.warn('[Storage] Failed to initialize Upstash Redis:', e.message);
      return null;
    }
  }

  return null;
}

/**
 * Save a survey response.
 * @param {Object} response - The response data to save.
 * @returns {Object} - The saved response with ID and timestamp.
 */
export async function saveResponse(response) {
  const id = `resp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const timestamp = new Date().toISOString();
  const record = { id, timestamp, ...response };

  const redis = await getRedisClient();

  if (redis) {
    // Save to Upstash Redis
    await redis.lpush('our-memories:responses', JSON.stringify(record));
    await redis.set(`our-memories:response:${id}`, JSON.stringify(record));
    console.log(`[Storage] Response saved to Redis: ${id}`);
  } else {
    // Fallback: in-memory storage (development only)
    memoryStore.push(record);
    console.log(`[Storage] Response saved to memory: ${id} (total: ${memoryStore.length})`);
    console.warn('[Storage] Using in-memory storage. Data will be lost on restart.');
    console.warn('[Storage] Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN for persistent storage.');
  }

  return { id, timestamp };
}

/**
 * Retrieve all saved responses.
 * @returns {Array} - All saved responses.
 */
export async function getResponses() {
  const redis = await getRedisClient();

  if (redis) {
    const raw = await redis.lrange('our-memories:responses', 0, -1);
    return raw.map((item) => {
      if (typeof item === 'string') {
        try { return JSON.parse(item); } catch { return item; }
      }
      return item;
    });
  }

  return [...memoryStore];
}

/**
 * Check if a submission fingerprint already exists (duplicate prevention).
 * @param {string} fingerprint - A unique identifier for the submission.
 * @returns {boolean} - True if the fingerprint already exists.
 */
export async function checkDuplicate(fingerprint) {
  const redis = await getRedisClient();

  if (redis) {
    const exists = await redis.get(`our-memories:fingerprint:${fingerprint}`);
    if (exists) return true;
    // Set with 24-hour expiry
    await redis.set(`our-memories:fingerprint:${fingerprint}`, '1', { ex: 86400 });
    return false;
  }

  // In-memory fallback
  const exists = memoryStore.some((r) => r.fingerprint === fingerprint);
  return exists;
}
