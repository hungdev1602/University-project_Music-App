import { Router } from "express"
import * as controller from "../../controller/admin/song.controller"
import multer from "multer"
import { uploadFields, uploadSingle } from "../../middlewares/admin/uploadCloud.middleware"

const router: Router = Router()

const upload = multer()

router.get("/", controller.index)

router.get("/create", controller.createGet)

router.post(
  "/create", 
  upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),
  uploadFields,
  controller.createPost
)

router.get("/edit/:id", controller.editGet)

router.patch(
  "/edit/:id", 
  upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),
  uploadFields,
  controller.editPatch
)

export const songRoute = router