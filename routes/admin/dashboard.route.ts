import express from "express"
const router = express.Router()

import * as controller from "../../controller/admin/dashboard.controller"

router.get("/dashboard", controller.index)

export const dashboardRoute = router