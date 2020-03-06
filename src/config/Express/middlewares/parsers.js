module.exports = (newrouter, dependencies) => {
    let router = newrouter()
    let bodyParser = require("body-parser")
    let cookieParser = require("cookie-parser")

    // parse application/x-www-form-urlencoded
    router.use(bodyParser.urlencoded({ extended: true }))
    // parse application/json
    router.use(bodyParser.json())
    //parses cookies from head to req.cookies
    router.use(cookieParser())

    return router;
}