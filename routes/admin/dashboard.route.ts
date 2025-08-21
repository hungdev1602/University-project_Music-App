import express from "express"
const router = express.Router()

import * as controller from "../../controller/admin/dashboard.controller"

router.get("/", controller.index)

export const dashboardRoute = router