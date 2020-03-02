module.exports = (newrouter, dependencies) => {
    let router = newrouter()
    let auth_routes = require("./Auth/auth_routes")

    router.use("/auth", auth_routes(newrouter, dependencies))

    return router;
}