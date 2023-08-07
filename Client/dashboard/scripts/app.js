const selector = new Turtle.TurtleSelector()
window.Router = Turtle.RouterControl

function showLoader() {
  console.log(1);
  selector.byId("main-loader").classList.add("active")
}

function hideLoader() {
  selector.byId("main-loader").classList.remove("active")
}

function isAdmin() {
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
      <div class=" overlay " id="main-loader" >
        <div class=" line-loader" style="height:5px;">
          <span class="bar"></span>
        </div>
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
              We are checking login information. Please wait 
            </h4>
          </div>
        </div>
      </div>
    `
  }
})

main()