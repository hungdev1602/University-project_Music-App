import { Router } from "express"
import * as controller from "../../controller/admin/upload.controller"
import multer from "multer"
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware"


const router: Router = Router()
const upload = multer()

router.post(
  "/", 
  upload.single("file"),
  uploadSingle,
  controller.index
)

export const uploadRoute = router