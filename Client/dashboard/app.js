const App = new Turtle.TurtleApp(
  document.querySelector("#root")
)

function openFullscreen() {
  try {
    fscreen.requestFullscreen(document.documentElement);
    /*
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) { 
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { 
        document.documentElement.msRequestFullscreen();
      }*/
  } catch (err) {
    showMsg("Unable to enter full screen mode.")
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

function showMsg(msg) {
  let message = document.createElement("div")
  message.classList.add("message")
  message.textContent = msg
  setTimeout(() => {
    message.remove()
  }, 5000)
  document.getElementById("messages").appendChild(message)
}

function showError(msg) {
  let message = document.createElement("div")
  message.classList.add("message")
  message.classList.add("danger")
  message.textContent = msg
  setTimeout(() => {
    message.remove()
  }, 9000)
  document.getElementById("messages").appendChild(message)
}

function isAdmin() {
  return TouchApp.auth.currentUser.user_id != null && TouchApp.auth.currentUser.role == "admin"
}

function showLoader() {
  document.getElementById("main-loader").classList.remove("d-none")
}

function hideLoader() {
  document.getElementById("main-loader").classList.add("d-none")
}

window.addEventListener("offline", function(e) {
  showMsg("You are offline ! Some functions may not work or not work properly!")
})

window.addEventListener("online", function(e) {
  showMsg("Connection is back !")
})



async function main() {
  await TouchApp.auth.info()
  await import("./components/navbar.js")
  await import("./components/container.js")
  await import("./components/accountMenu.js")
  App.render(`
    <div id="messages"></div>
    <main-navbar></main-navbar>
    <account-menu></account-menu>
    <br><br><br><br>
    <main-container></main-container>
  `)
}

main()