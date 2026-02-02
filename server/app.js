const path = require("path");
// Routes (optional – safe)
const authRoutes = require("./routes/authRoutes");
const promptRoutes = require("./routes/promptRoutes");
const userRoutes = require("./routes/userRoutes")

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

app.use(express.json({ limit: "50mb" }));



app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/prompts", promptRoutes);


app.listen(process.env.PORT,() => {
console.log(`Server running on ${process.env.PORT}`);
});

module.exports = app;
 