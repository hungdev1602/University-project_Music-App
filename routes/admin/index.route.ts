import { Express } from "express"
import { dashboardRoute } from "./dashboard.route"
import { systemConfig } from "../../config/system"
import { topicRoute } from "./topic.route"
import { songRoute } from "./song.route"
export const adminRoute = (app: Express) => {
  const adminPath = systemConfig.prefixAdmin

  app.use(`/${adminPath}`, dashboardRoute)

  app.use(`/${adminPath}`, topicRoute)

  app.use(`/${adminPath}`, songRoute)
}