"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const dashboard_route_1 = require("./dashboard.route");
const system_1 = require("../../config/system");
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const upload_route_1 = require("./upload.route");
const adminRoute = (app) => {
    const adminPath = system_1.systemConfig.prefixAdmin;
    app.use(`/${adminPath}/dashboard`, dashboard_route_1.dashboardRoute);
    app.use(`/${adminPath}/topics`, topic_route_1.topicRoute);
    app.use(`/${adminPath}/songs`, song_route_1.songRoute);
    app.use(`/${adminPath}/upload`, upload_route_1.uploadRoute);
};
exports.adminRoute = adminRoute;
