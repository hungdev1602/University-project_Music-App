import express, { Express, Request, Response } from "express"
// ENV
import dotenv from "dotenv"
dotenv.config()
import { routesClient } from "./routes/client/index.route"

const app: Express = express()
const port: number = 3000

// Database connect
import { connect } from "./config/database"
connect()

// Views
app.set("views", `${__dirname}/views`); // Tìm đến thư mục tên là views
app.set("view engine", "pug") // template engine sử dụng: pug
// End Views

// Static file (Thiết lập thư mục chứa file tĩnh "css, js, img,...")
app.use(express.static(`${__dirname}/public`))

//route client
routesClient(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})