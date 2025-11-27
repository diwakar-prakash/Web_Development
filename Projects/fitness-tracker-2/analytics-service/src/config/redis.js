import Redis from "ioredis";

let redisClient;

const connectRedis = () => {
    if(!redisClient) {
        redisClient = new Redis({
            host : process.env.REDIS_HOST || "redis",
            port : process.env.REDIS_PORT || 6379
        });

        redisClient.on("connect", () => {
            console.log("REDIS CONNECTED")
        })

        redisClient.on("error", (err) => {
            console.log("REDIS ERROR", err);
        })
    }

    return redisClient;
}


export default connectRedis;