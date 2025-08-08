import express from "express"
const router = express.Router()

import * as controller from "../../controller/client/song.controller"

router.get("/:slugTopic", controller.index)

export const songRoute = router