import { Router } from "express"

import * as controller from "../../controller/admin/topic.controller"

const router: Router = Router()

router.get("/topics", controller.index)

export const topicRoute = router