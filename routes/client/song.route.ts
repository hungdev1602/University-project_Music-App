import express from "express"
const router = express.Router()

import * as controller from "../../controller/client/song.controller"

router.get("/:slugTopic", controller.listSongByTopic)

router.get("/detail/:slugSong", controller.songDetail)

router.patch("/like", controller.likePatch)

router.patch("/favorite", controller.favoritePatch)

export const songRoute = router