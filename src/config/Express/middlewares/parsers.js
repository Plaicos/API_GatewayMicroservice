module.exports = (newrouter, dependencies) => {
    let router = newrouter()
    let bodyParser = require("body-parser")

    // parse application/x-www-form-urlencoded
    router.use(bodyParser.urlencoded({ extended: true }))
    // parse application/json
    router.use(bodyParser.json())

    return router;
}