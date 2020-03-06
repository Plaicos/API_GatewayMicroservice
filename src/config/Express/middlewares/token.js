module.exports = (newrouter, dependencies) => {
    let router = newrouter()
    let { SCI } = dependencies

    router.use(async (req, resp, next) => {
    
        let token = req.cookies && req.cookies.PlaicosSession ? req.cookies.PlaicosSession : null
        if (token) {
            req.credential = await SCI.Authenticator.authenticate(token)
        }
        next()
    })

    return router;
}