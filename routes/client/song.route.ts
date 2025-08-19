import express from "express"
const router = express.Router()

import * as controller from "../../controller/client/song.controller"

router.get("/detail/:slugSong", controller.songDetail)

router.patch("/like", controller.likePatch)

router.patch("/favorite", controller.favoritePatch)

router.get("/favorite", controller.favoriteGet)

router.get("/search/:type", controller.search)

router.patch("listen/:songId", controller.listenPatch)

router.get("/:slugTopic", controller.listSongByTopic)


export const songRoute = router