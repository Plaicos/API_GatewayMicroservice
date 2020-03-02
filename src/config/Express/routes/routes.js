module.exports = (newrouter, dependencies) => {
    let router = newrouter()
    let default_router = require("./default/default_routes")(newrouter, dependencies);
    let api_router = require("./API/api_routes")(newrouter, dependencies);
    let handle404 = require("./404/404")(dependencies);

    router.use("/api", api_router)
    router.use(default_router)
    router.use(handle404)
    return router;
}