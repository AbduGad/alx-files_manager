import { createClient } from 'redis';
import { promisify } from 'util';

/**
 * Class for performing operations with Redis service
 */
class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on("error", (err) => {
      console.error('Redis client error', err);
    });
  }

  /**
   * Checks if connection to Redis is Alive
   * @return {boolean} true if connection alive or false if not
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * gets value corresponding to key in redis
   * @key {string} key to search for in redis
   * @return {string}  value of key
   */
  async get(key) {
    const getCommand = promisify(this.client.get).bind(this.client);
    const value = await getCommand(key);
    return value;
  }

  /**
   * Creates a new key in redis with a specific TTL
   * @key {string} key to be saved in redis
   * @value {string} value to be asigned to key
   * @time {number} TTL of key
   * @return {undefined}  No return
   */
  async set(key, value, time) {
    const setCommand = promisify(this.client.set).bind(this.client);
    await setCommand(key, value, 'EX', time);
  }

  /**
   * Deletes key in redis service
   * @key {string} key to be deleted
   */
  async del(key) {
    const delCommand = promisify(this.client.del).bind(this.client);
    await delCommand(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;