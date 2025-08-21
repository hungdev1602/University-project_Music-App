import { Express } from "express"
import { dashboardRoute } from "./dashboard.route"
import { systemConfig } from "../../config/system"
import { topicRoute } from "./topic.route"
import { songRoute } from "./song.route"
export const adminRoute = (app: Express) => {
  const adminPath = systemConfig.prefixAdmin

  app.use(`/${adminPath}/dashboard`, dashboardRoute)

  app.use(`/${adminPath}/topics`, topicRoute)

  app.use(`/${adminPath}/songs`, songRoute)
}