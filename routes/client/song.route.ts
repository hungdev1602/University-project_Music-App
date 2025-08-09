import express from "express"
const router = express.Router()

import * as controller from "../../controller/client/song.controller"

router.get("/:slugTopic", controller.listSongByTopic)

router.get("/detail/:slugSong", controller.songDetail)

export const songRoute = router