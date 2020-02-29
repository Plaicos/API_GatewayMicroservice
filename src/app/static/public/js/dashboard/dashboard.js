window.onload = function () {
    //whenClicked attribute
    var anchors = document.getElementsByTagName('*');
    for (var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i];
        anchor.onclick = function () {
            code = this.getAttribute('whenClicked');
            eval(code);
        }
    }

    //links
    let main_server_link = $(`#main_server_link`).val()
    let view_server_link = $(`#view_server_link`).val()

    //session values
    let user_login = $("#user-login").val()

    //session storage
    sessionStorage.setItem("main_server_link", main_server_link)
    sessionStorage.setItem("view_server_link", view_server_link)
    sessionStorage.setItem("user-login", user_login)

    //session storage reset
    let raw_material_packing_counter = sessionStorage.getItem("raw-material-packing-counter")
    for(let i = 0; i <= raw_material_packing_counter; i++){
        sessionStorage.removeItem(`raw-material-packing-${i}`)
    }
    sessionStorage.setItem("raw-material-packing-counter", 0)

}
