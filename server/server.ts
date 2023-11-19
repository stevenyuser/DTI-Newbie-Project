import express, { Express } from "express"
import cors from "cors"

const app: Express = express()
const port = 8080

app.use(express.json())
app.use(cors())

// route
app.get("/", async (req, res) => {
    res.status(200).json({message: "hello"})
})


app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})