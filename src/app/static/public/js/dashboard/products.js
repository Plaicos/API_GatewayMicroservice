function update_raw_material_table() {
    return new Promise(async (resolve, reject) => {
        try {
            let filters = window.get_form_data("raw-materials-table-filters")
            let session_cookie = window.get_sessionCookie()
            let view_server_link = sessionStorage.getItem("view_server_link")
            let user_login = sessionStorage.getItem("user-login")

            filters.location = {
                city: filters.city,
                state: filters.state
            }
            if (isNaN(parseInt(filters.limit, 10))) {
                filters.limit = 30
            }
            if (isNaN(parseInt(filters.offset, 10))) {
                filters.offset = 0
            }
            filters.pagination = {
                limit: filters.limit,
                offset: filters.offset
            }

            let params = {
                route: "/user/get/template",
                data: {
                    template: {
                        lib: "dashboard",
                        subject: "table",
                        name: "raw_material_table"
                    },
                    data: filters

                }
            }

            params = window.base64encode(JSON.stringify(params))

            axios.get(`${view_server_link}?params=${params}`, {
                query: {
                    cookie: session_cookie
                }
            })
                .then((json_response) => {
                    window.update_html("products-table-body", json_response.data)
                })
                .catch((json) => {
                    console.log(json);
                    if (typeof json === "object" && json.response) {
                        if (json.response.data && json.response.data.message) {
                            var erro_msg = json.response.data.message
                            var status = json.response.status
                        }
                        else {
                            var erro_msg = json.response.statusText
                            var status = json.response.status
                        }
                    } else if (typeof json === "string") {
                        var erro_msg = json
                        var status = 500
                    }
                    else {
                        var erro_msg = "ALGO DEU ERRADO, ERRO INDEFINIDO"
                        var status = 500
                    }
                    window.notify_error(erro_msg, status)
                    if (json.response.status === 401) {
                        location.reload()
                    }
                })
        } catch (erro) {
            console.log(erro);
        }
    });
}

function inci_name_suggestion_box(id) {
    let element_id = "product-listing-inci-name-suggestion"
    let view_server_link = sessionStorage.getItem("view_server_link")
    let text = $(`#${id}`).val()
    let params = {
        data: {
            filters: {
                text: text
            },
            template: {
                lib: "dashboard",
                subject: "suggestion_box",
                name: "inci_name_suggestion_box"
            }
        },
        route: "/user/get/template"
    }

    if (text.length >= 3) {
        try {
            params = window.base64encode(JSON.stringify(params))
            axios.get(`${view_server_link}?params=${params}`)
                .then((response) => {
                    let html = response.data
                    window.update_html(element_id, html)
                    window.show(element_id)
                })
                .catch((erro) => {
                    console.log(erro, erro.response)
                    window.notify_error(erro, erro.response.status)
                })

        } catch (erro) {
            console.log(erro);
            window.notify_error(erro, erro.response.status)
        }
    }
    else {
        let html = null
        window.update_html(element_id, html)
        window.hide(element_id)
    }
}

function register_rawMaterial() {

}

function create_packing(obj, name) {
    obj = JSON.stringify(obj)

    let counter = sessionStorage.getItem(`${name}-counter`)
    counter++

    sessionStorage.setItem(`${name}-${counter}`, obj)
    sessionStorage.setItem(`${name}-counter`, counter)

    return;
}

function read_packing(name, counter) {
    let packing = sessionStorage.getItem(`${name}-${counter}`)
    packing = JSON.parse(packing)

    return packing;
}

function get_packingArr(name) {
    let packing_array = []
    let counter = sessionStorage.getItem(`${name}-counter`)

    for (let i = 1; i <= counter; i++) {
        let packing = read_packing(name, i)
        if(packing){
            packing_array.push(packing)
        }
    }

    return packing_array;
}

async function create_rawMaterial_packing() {
    let view_server_link = sessionStorage.getItem("view_server_link")
    let packing = {
        weigth: 0
    }
    try {
        create_packing(packing, "raw-material-packing")

        let params = {
            data: {
                template: {
                    lib: "dashboard",
                    subject: "packing",
                    name: "packing_box"
                },
                data: {
                    counter: sessionStorage.getItem("raw-material-packing-counter"),
                    name: "raw-material-packing",
                    value: 0,
                    isEdit: false
                }
            },
            route: "/user/get/template"
        }
        params = window.base64encode(JSON.stringify(params))

        var new_packingDiv = await axios.get(`${view_server_link}?params=${params}`)
        console.log(Object.keys(new_packingDiv), new_packingDiv.response);

        $("#raw-material-packing-wrapper").append(new_packingDiv.data)

    } catch (erro) {
        console.log(erro);
        window.notify_error(erro, new_packingDiv.response.status)
    }
}

async function edit_rawMaterial_packing(clicked_element) {
    
    let view_server_link = sessionStorage.getItem("view_server_link")
    let counter = (clicked_element.id.match(/[0-9]/))[0]
   
    let packing = read_packing("raw-material-packing", counter)

    try {
        let params = {
            data: {
                template: {
                    lib: "dashboard",
                    subject: "packing",
                    name: "packing_box"
                },
                data: {
                    counter: counter,
                    name: "raw-material-packing",
                    value: 0,
                    isEdit: true
                }
            },
            route: "/user/get/template"
        }
        params = window.base64encode(JSON.stringify(params))
        var new_packingDiv = await axios.get(`${view_server_link}?params=${params}`)
        $(`#${clicked_element.id}`).replaceWith(new_packingDiv.data) 

    } catch (erro) {
        console.log(erro);
        
    }
}

async function update_rawMaterial_packing(clicked_element) {

    let new_packing = {
        weigth: $(`#${clicked_element.id}-weigth`).val()
    }
    let view_server_link = sessionStorage.getItem("view_server_link")
    let counter = (clicked_element.id.match(/[0-9]/))[0]
    let params = {
            data: {
                template: {
                    lib: "dashboard",
                    subject: "packing",
                    name: "packing_box"
                },
                data: {
                    counter: counter,
                    name: "raw-material-packing",
                    value: $(`#${clicked_element.id}-weigth`).val(),
                    isEdit: false
                }
            },
            route: "/user/get/template"
        }

    try {
        params = window.base64encode(JSON.stringify(params)) 
        new_packing = JSON.stringify(new_packing)

        var new_packingDiv = await axios.get(`${view_server_link}?params=${params}`)

        $(`#raw-material-packing-${counter}`).replaceWith(new_packingDiv.data) 
        sessionStorage.setItem(`raw-material-packing-${counter}`, new_packing)

    } catch (erro) {
        console.log(erro);
        //window.notify_error(msg, status)
    }
}

function delete_rawMaterial_packing(clicked_element){
    console.log("remove packing called", clicked_element.id);
    try {
        sessionStorage.removeItem(`${clicked_element.id}`)
    $(`#${clicked_element.id}`).remove()

    } catch (erro) {
        console.log(erro);
        window.notify_error(erro, erro.status)
    }
}