const selector = new Turtle.TurtleSelector()
window.Router = Turtle.RouterControl

function showLoader() {
  selector.byId("main-loader").classList.remove("d-none")
}

function hideLoader() {
  selector.byId("main-loader").classList.add("d-none")
}

function isAdmin() {
  console.log(app.auth.currentUser);
  return app.auth.currentUser.user_id != null && app.auth.currentUser.role == "admin"
}

function isNotLoggedIn() {
  return app.auth.currentUser.user_id == null
}

const app = createApp({
  base: "https://jolly-good-anger.glitch.me"
})

async function main() {
  app.auth.info()
    .then(async () => {
      await Promise.all([
        import("./components/navbar.js"),
        import("./components/sidebar.js"),
        import("./routes/init.js")
      ])
    })

 // hideLoader()
}

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
        <div class="container" style="padding:10px;" id="content">
          <div class="d-flex flex-flow-col align-items-center text-align-center">
            <div class="circle-loader" style="border-color:#00FF6E4D; border-top-color:#00FF6E;" ></div>
            <br>
            <h4>
              We are checking login information.We are checking login information. Please wait 
            </h4>
          </div>
        </div>
      </div>
    `
  }
})

main()