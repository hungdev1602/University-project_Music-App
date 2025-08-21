import express, { Express, Request, Response } from "express"
// ENV
import dotenv from "dotenv"
dotenv.config()
import { routesClient } from "./routes/client/index.route"
import bodyParser from "body-parser"

const app: Express = express()
const port: number = 3000

// Database connect
import { connect } from "./config/database"
import { adminRoute } from "./routes/admin/index.route"
import { systemConfig } from "./config/system"
import path from "path"
connect()

// Views
app.set("views", `${__dirname}/views`); // Tìm đến thư mục tên là views
app.set("view engine", "pug") // template engine sử dụng: pug
// End Views

// Static file (Thiết lập thư mục chứa file tĩnh "css, js, img,...")
app.use(express.static(`${__dirname}/public`))

// body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

// App local variable (in file PUG)
app.locals.prefixAdmin = systemConfig.prefixAdmin

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

//route client
routesClient(app)
// route admin
adminRoute(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})