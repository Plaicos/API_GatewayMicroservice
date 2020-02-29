function inci_name_suggestion_box(id) {
    let element_id = "product-listing-inci-name-suggestion"
    let view_server_link = $("#view_server_link").val()
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

function Search() {
    let element_id = "search-result"
    let filters_form = window.get_form_data("search-filters")
    let filters = {
        title: filters_form.title,
        type: filters_form.type,
        user: filters_form.user,
        location: {
            city: filters_form.city,
            state: filters_form.state
        },
        product: {
            inci_name: filters_form.inci_name,
            functions: filters_form.functions,
            origin: filters_form.origin,
            manufacturer: filters_form.manufacturer,
            made_in: filters_form.made_in,
            shelf_life: filters_form.shelf_life,
            lead_time: filters_form.lead_time,
            availability: filters_form.availability,
            free_from: filters_form.free_from,
            application: filters_form.application
        }
    }
    let view_server_link = $("#view_server_link").val()
    let params = {
        data: {
            filters: filters,
            template: {
                lib: "marketplace",
                subject: "table",
                name: "search_results"
            }
        },
        route: "/get/template"
    }

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