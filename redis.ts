// Use ioredis library to interact with the Upstash service

import Redis from "ioredis";

let redis = new Redis(process.env.UPSTASH_URL!);

export default redis;
