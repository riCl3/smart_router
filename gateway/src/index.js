import dotenv from "dotenv";
dotenv.config();

console.log("API_KEY:", process.env.API_KEY);

import express from "express";

import { requestId } from "./middleware/requestId.js";

import { logger } from "./middleware/logger.js";

import { auth } from "./middleware/auth.js";

import { rateLimiter } from "./middleware/rateLimiter.js";

import chatRoutes from "./routes/chat.js";

const app = express();

app.use(express.json());

app.use(requestId);

app.use(logger);

app.use(auth);

app.use(rateLimiter);

app.use("/v1", chatRoutes);

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.listen(3000);