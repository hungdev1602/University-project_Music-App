import express, { Express, Request, Response } from "express"
// ENV
import dotenv from "dotenv"
dotenv.config()

const app: Express = express()
const port: number = 3000

// Database connect
import { connect } from "./config/database"
connect()

// Views
app.set("views", `${__dirname}/views`); // Tìm đến thư mục tên là views
app.set("view engine", "pug") // template engine sử dụng: pug
// End Views


app.get("/topics", (req: Request, res: Response) => {
  res.render("client/pages/topics/index")
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})