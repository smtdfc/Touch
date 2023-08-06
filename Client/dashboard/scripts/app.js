const selector = new Turtle.TurtleSelector()
window.Router = Turtle.RouterControl
function showLoader() {
  selector.byId("main-loader").classList.remove("d-none")
}

function hideLoader() {
  selector.byId("main-loader").classList.add("d-none")
}

function isAdmin(){
  return app.auth.currentUser.user_id != null && app.auth.currentUser.role == "admin"
}

function isNotLoggedIn() {
  return app.auth.currentUser.user_id == null
}

const app = createApp({
  base: "https://jolly-good-anger.glitch.me"
})

Turtle.createStaticComponent("main-app", {
  render: function() {
    return `
      <div id="main-loader" class="d-none line-loader" style="height:5px;" >
        <span class="bar"></span>
      </div>
      <page-navbar></page-navbar>
      <br><br><br><br><br>
      <div class="sidebar-container" id="sidebar-container" >
        <div class="sidebar d-none sidebar-icon" id="main-sidebar" ></div>
        <div class="container" style="padding:10px;" id="content"></div>
      </div>
    `
  }
})

//showLoader()
async function main(){
  
  
  await app.auth.info()
  await Promise.all([
      import("./components/navbar.js"),
      import("./components/sidebar.js"),
      import("./routes/init.js")
    ])
  
}


main()