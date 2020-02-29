//onload function
window.onload = () => {
    //storage

    //set links to microservices and main server
    let main_server_link = $("#main-server").val()
    let view_server_link = $("#view-server").val()

    //store in session memory
    sessionStorage.setItem("main_server_link", main_server_link)
    sessionStorage.setItem("view_server_link", view_server_link)

    //whenClicked attribute
    var anchors = document.getElementsByTagName('*');
    for (var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i];
        anchor.onclick = function () {
            code = this.getAttribute('whenClicked');
            eval(code);
        }
    }

    //html injection
    $("#loading-animation").append(loading_animation.gears)
}

function show_loading() {
    $("#email-form").hide()
    $("#loading-animation").show()
}

function hide_loading() {
    $("#loading-animation").hide()
    $("#email-form").fadeIn()
}

function base64encode(string_to_encode) {
    let encoded_string = btoa(string_to_encode)
    return encoded_string
}

function base64decode(string_to_decode) {
    let decoded_string = atob(string_to_decode)
    return decoded_string
}

//login user
async function login() {
    show_loading()
    //links
    var main_server_link = sessionStorage.getItem("main_server_link")

    //get form data
    let login = $("#login").val()
    let password = $("#password").val()
    //builds body
    let data = {
        login: login,
        password: password
    }

    try {
        let response = await axios.request({
            method: "POST",
            url: `${main_server_link}/login`,
            data: data
        }).catch((axios_error_response) => {
            if (axios_error_response.response) {
                hide_loading()
                if (axios_error_response.response.data && typeof axios_error_response.response.data == "string") {
                    print_error(axios_error_response.response.data)
                } else {
                    print_error(axios_error_response.response.statusText)
                }
            }
            else {
                hide_loading()
                print_error("ALGO DEU ERRADO")
            }
        })

        hide_loading()
        let json = response.data
        let cookie = json.cookie.cookie

        document.cookie = `Plaicos Session Cookie=${cookie}`

        let params = {
            route: "/user/dashboard",
            data: {
                login: json.logged_user
            }
        }
     
        params = window.base64encode(JSON.stringify(params))
        
        window.location.replace(`https://rpjcoding.sa.ngrok.io?params=${params}`)

    } catch (erro) {
        console.log("axios error", erro)
    }


}

function print_error(error) {
    $("#error-box p").text(error)
    $("#error-box").show().delay(5000).fadeOut()
}

//animations **gambiara
let loading_animation = {
    gears: `<div class="w-embed">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;background:#fff;display:block;" width="200px" height="200px" viewbox="0 0 100 100" preserveaspectratio="xMidYMid">
      <g transform="translate(50 50)">
        <g transform="translate(-19 -19) scale(0.6)">
          <g transform="rotate(26.26)">
            <animatetransform attributename="transform" type="rotate" values="0;45" keytimes="0;1" dur="0.2s" begin="0s" repeatcount="indefinite"/>
            <path d="M31.359972760794346 21.46047782418268 L38.431040572659825 28.531545636048154 L28.531545636048154 38.431040572659825 L21.46047782418268 31.359972760794346 A38 38 0 0 1 7.0000000000000036 37.3496987939662 L7.0000000000000036 37.3496987939662 L7.000000000000004 47.3496987939662 L-6.999999999999999 47.3496987939662 L-7 37.3496987939662 A38 38 0 0 1 -21.46047782418268 31.35997276079435 L-21.46047782418268 31.35997276079435 L-28.531545636048154 38.431040572659825 L-38.43104057265982 28.531545636048158 L-31.359972760794346 21.460477824182682 A38 38 0 0 1 -37.3496987939662 7.000000000000007 L-37.3496987939662 7.000000000000007 L-47.3496987939662 7.000000000000008 L-47.3496987939662 -6.9999999999999964 L-37.3496987939662 -6.999999999999997 A38 38 0 0 1 -31.35997276079435 -21.460477824182675 L-31.35997276079435 -21.460477824182675 L-38.431040572659825 -28.531545636048147 L-28.53154563604818 -38.4310405726598 L-21.4604778241827 -31.35997276079433 A38 38 0 0 1 -6.999999999999992 -37.3496987939662 L-6.999999999999992 -37.3496987939662 L-6.999999999999994 -47.3496987939662 L6.999999999999977 -47.3496987939662 L6.999999999999979 -37.3496987939662 A38 38 0 0 1 21.460477824182686 -31.359972760794342 L21.460477824182686 -31.359972760794342 L28.531545636048158 -38.43104057265982 L38.4310405726598 -28.53154563604818 L31.35997276079433 -21.4604778241827 A38 38 0 0 1 37.3496987939662 -6.999999999999995 L37.3496987939662 -6.999999999999995 L47.3496987939662 -6.999999999999997 L47.349698793966205 6.999999999999973 L37.349698793966205 6.999999999999976 A38 38 0 0 1 31.359972760794346 21.460477824182686 M0 -23A23 23 0 1 0 0 23 A23 23 0 1 0 0 -23" fill="#3cbeba"/>
          </g>
        </g>
        <g transform="translate(19 19) scale(0.6)">
          <g transform="rotate(41.24)">
            <animatetransform attributename="transform" type="rotate" values="45;0" keytimes="0;1" dur="0.2s" begin="-0.1s" repeatcount="indefinite"/>
            <path d="M-31.35997276079435 -21.460477824182675 L-38.431040572659825 -28.531545636048147 L-28.53154563604818 -38.4310405726598 L-21.4604778241827 -31.35997276079433 A38 38 0 0 1 -6.999999999999992 -37.3496987939662 L-6.999999999999992 -37.3496987939662 L-6.999999999999994 -47.3496987939662 L6.999999999999977 -47.3496987939662 L6.999999999999979 -37.3496987939662 A38 38 0 0 1 21.460477824182686 -31.359972760794342 L21.460477824182686 -31.359972760794342 L28.531545636048158 -38.43104057265982 L38.4310405726598 -28.53154563604818 L31.35997276079433 -21.4604778241827 A38 38 0 0 1 37.3496987939662 -6.999999999999995 L37.3496987939662 -6.999999999999995 L47.3496987939662 -6.999999999999997 L47.349698793966205 6.999999999999973 L37.349698793966205 6.999999999999976 A38 38 0 0 1 31.359972760794346 21.460477824182686 L31.359972760794346 21.460477824182686 L38.431040572659825 28.531545636048158 L28.53154563604818 38.4310405726598 L21.460477824182703 31.35997276079433 A38 38 0 0 1 6.9999999999999964 37.3496987939662 L6.9999999999999964 37.3496987939662 L6.999999999999995 47.3496987939662 L-7.000000000000009 47.3496987939662 L-7.000000000000007 37.3496987939662 A38 38 0 0 1 -21.46047782418263 31.359972760794385 L-21.46047782418263 31.359972760794385 L-28.531545636048097 38.43104057265987 L-38.431040572659796 28.531545636048186 L-31.35997276079433 21.460477824182703 A38 38 0 0 1 -37.34969879396619 7.000000000000032 L-37.34969879396619 7.000000000000032 L-47.34969879396619 7.0000000000000355 L-47.3496987939662 -7.000000000000002 L-37.3496987939662 -7.000000000000005 A38 38 0 0 1 -31.359972760794346 -21.46047782418268 M0 -23A23 23 0 1 0 0 23 A23 23 0 1 0 0 -23" fill="#b00082"/>
          </g>
        </g>
      </g>
    </svg>
  </div>`
}