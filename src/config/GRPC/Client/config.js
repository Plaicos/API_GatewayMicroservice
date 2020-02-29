var CredentialFactory = new (require("./credential/CredentialFactory"))()
var url = require("./URL/servicesURLS")

var client_config = {
    port: {
        Authenticator: url.Authenticator,
        User: url.User,
        Inventory: url.Inventory,
        View: url.View
    }
}

module.exports = client_config 