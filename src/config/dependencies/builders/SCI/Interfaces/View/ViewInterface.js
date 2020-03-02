module.exports = class ViewInterface {
    constructor(Interface) {
        this.Interface = Interface
    }

    get_template(selector, params, credential) {
        return new Promise((resolve, reject) => {
            let { Interface } = this

            try {
                Interface.View.get_template({ selector, params, credential }, (erro, template) => {
                    if (erro) {
                        throw (Error(erro))
                    }
                    console.log("resolving api call to view service")
                    resolve(template);
                })
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    get_public_static_file(path) {
        return new Promise((resolve, reject) => {
            let { Interface } = this
            let strem = require("stream")
            let fs = require ("fs")
            let file = fs.createWriteStream("./FOOOANDBAR")
            let file_arr = []

            try {
                let call = Interface.View.get_public_static_file({ path })

                call.on("data", (chunk)=>{
                    console.log("got chunk", chunk)
                    file_arr = file_arr.concat(chunk.data)
                    console.log("Wrote chunk")
                })

                call.on("end", ()=>{
                    file.
                    console.log("Resolving Promise with file:", file)
                    Promise.resolve(file)
                })
            }
            catch (erro) {
                reject(erro)
            }
        })
    }
}