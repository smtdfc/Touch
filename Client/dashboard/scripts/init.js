import("./components/navbar.js")
let app = new App({
  base: "https://jolly-good-anger.glitch.me"
})

const selector = new Turtle.TurtleSelector()
let baseURL = window.location.origin

function isAdmin(){
  return app.auth.currentUser.username != null && app.auth.currentUser.role == "admin"
}

function isUser() {
  return app.auth.currentUser.username != null && app.auth.currentUser.role == "user"
}

function notLoggedIn() {
  //console.log(app.auth.currentUser.username);
  return app.auth.currentUser.username == null 
}

function openOverlay(){
  selector.byId("main-overlay").classList.add("active")
}

function closeOverlay() {
  selector.byId("main-overlay").classList.remove("active")
}

async function init() {
  window.addEventListener("offline",function(){
      selector.byId("root").HTML = `
       <div class="overlay active">
             <div class="mt-75 d-flex flex-flow-col align-items-center" >
            <div class="line-loader" style="width:300px; border-radius:5px;">
              <div class="bar"></div>
            </div>
            Reconnecting...
       </div>
      `
  })
}