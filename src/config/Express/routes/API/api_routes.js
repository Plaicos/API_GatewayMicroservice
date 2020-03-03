module.exports = (newrouter, dependencies) => {
    let router = newrouter()
    let auth_routes = require("./Auth/auth_routes")
    let user_routes = require("./User/user_routes")

    router.use("/auth", auth_routes(newrouter, dependencies))
    router.use("/user", user_routes(newrouter, dependencies))

    return router;
}