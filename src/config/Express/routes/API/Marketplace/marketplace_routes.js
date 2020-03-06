module.exports = (newrouter, dependencies) => {
    let Controller = new (require("../../../../../app/Controller/Express/APIController/MarketplaceController/MarketplaceController"))(dependencies)
    let router = newrouter()

    router.post()

    return router;
}