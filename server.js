const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
// Load environment variables
dotenv.config();
// Connect MongoDB
connectDB();
// Create Express application
const app = express();
// ========================================
// MIDDLEWARE
// ========================================
app.use(cors());
app.use(express.json());
// ========================================
// HOME ROUTE
// ========================================
app.get("/", (req, res) => {
    res.json({
        message: "Todo Backend API is running successfully"
    });

});


// ========================================
// TODO ROUTES
// ========================================

app.use(
    "/api/todos",
    require("./routes/todoRoutes")
);


// ========================================
// SERVER
// ========================================

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});