module.exports = (newrouter, dependencies) => {
    let rotuer = newrouter()
    let parsersMiddlewares = require("./parsers")
    let tokenMiddleware = require("./token")

    rotuer.use(parsersMiddlewares(newrouter, dependencies))
    rotuer.use(tokenMiddleware(newrouter, dependencies))

    return rotuer;
}