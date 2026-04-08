require("dotenv").config({ override: true });
const nodeDns = require("node:dns");
nodeDns.setDefaultResultOrder("ipv4first");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = require("./routers");

const PORT = process env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todo";

async function main() {
  const MONGODB_URI = (
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    "mongodb://127.0.0.1:27017/todo"
  ).trim();

  await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 20_000,
    family: 4,
  });
  console.log("연결성공");

  const app = express();
  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN || true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("todo-backend");
  });

  app.use("/todos", todoRoutes);

  app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
  });
}

main().catch((err) => {
  console.error("MongoDB 연결 실패:", err.message);
  process.exit(1);
});
