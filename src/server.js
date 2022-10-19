import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import TimelineRouter from "./routes/timeline.route.js"
dotenv.config()

const server = express()
const PORT = process.env.PORT

server
    .use(express.json())
    .use(cors())
    .use(TimelineRouter)

server.get("/status", (req, res) => {
    res.send("server it's on")
})

server.listen(PORT, () => {console.log(`Server listen on PORT ${PORT}`)})