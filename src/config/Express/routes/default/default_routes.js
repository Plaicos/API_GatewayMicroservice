module.exports = (newrouter, dependencies) => {
    let router = newrouter()
    let pages_router = require("./pages/pages_routes")(newrouter, dependencies)
    let static_router = require("./static/static_file_route")(newrouter, dependencies)
    let dashboard_router = require("./dashboard/dashboard_routes")(newrouter, dependencies)
    let marketplace_router = require("./marketplace/marketplace_routes")(newrouter, dependencies)

    // SPA like resources 
    router.use("/dashboard", dashboard_router)
    router.use("/marketplace", marketplace_router)
    //router.use("/public", static_router)

    // pages
    router.use(pages_router)

    return router;
}