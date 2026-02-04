const path = require("path");
// Routes (optional – safe)
const authRoutes = require("./routes/authRoutes");
const promptRoutes = require("./routes/promptRoutes");
const userRoutes = require("./routes/userRoutes");
const channelRoutes = require("./routes/channelRoutes");
const promptTypeRoutes = require("./routes/promptTypeRoutes");

const cors = require("cors");
// Load .env from PROJECT ROOT
require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

// Debug (remove later)
console.log("ENV FILE:", path.join(__dirname, ".env"));
console.log("MONGO_URI:", process.env.MONGO_URI);

// Connect MongoDB
connectDB();

const app = express();
// 🔥 CORS FIX (ADD THIS)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));



// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/prompts", promptRoutes);
// app.use("/api/channels", channelRoutes);
// app.use("/api/prompt-types", promptTypeRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/prompts", promptRoutes);
app.use("/api/dashboard", dashboardRoutes);



app.listen(process.env.PORT,() => {
console.log(`Server running on ${process.env.PORT}`);
});

module.exports = app;
 