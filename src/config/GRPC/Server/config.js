var CredentialFactory = new (require("./credential/CredentialFactory"))()

var server_config = {
    credential: CredentialFactory.makeCredential(),
    port: "0.0.0.0:3030"
}

module.exports = server_config;