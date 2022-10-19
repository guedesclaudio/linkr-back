import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import allRoutes from "./routes/index.routes.js";
dotenv.config();

const server = express();
const PORT = process.env.PORT;

server
    .use(express.json())
    .use(cors())
    .use(allRoutes);

server.get("/status", (req, res) => {
    res.send("server it's on")
});

server.listen(PORT, () => {console.log(`Server listen on PORT ${PORT}`)});