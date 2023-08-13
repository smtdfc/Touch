app.staticComponent("account-menu", function(controller) {
  controller.refreshUI = function() {
    controller.ref("username").text = TouchApp.auth.currentUser.username
  }
  
  controller.onRender = function() {
    controller.ref("logout-btn").on("click", function(e) {
      let offcanvas = new Turtle.UI.Components.TurtleUIOffcanvas("#account-menu")
      offcanvas.setState("toggle")
      showLoader()

      TouchApp.auth.logout()
        .then(() => {
          app.router.redirect("/auth/login",true)
        })

        .catch(() => {
          alert("Cannot logout now !")
        })

        .finally(() => {
          hideLoader()
        })
    })
    TouchApp.on("authstatechange", function() {
      controller.refreshUI()
    })
  }

  return `
  <div class="offcanvas offcanvas-right" id="account-menu" >
    <div class="offcanvas-header">
      <h3 class="offcanvas-title">Account</h3>
      <button class="fa fa-times offcanvas-close-btn" data-action="toggle-offcanvas" data-offcanvas="#account-menu"></button>
    </div>
    <div class="offcanvas-body">
      <div class="d-flex flex-flow-col align-items-center">
        <div class="avatar ml-0">
          <img src="./assets/images/avatar.jpg"></img>
        </div>
        <span ref="username">@${TouchApp.auth.currentUser.username?? "???"}</span>
      </div>
      <br>
      <ul class="offcanvas-nav-items">
        <li><a  href="#"><i class="icon fa fa-gear"></i>Settings</a></li>
      </ul>
      <br><br>
      <div class="d-flex justify-content-center">
        <button class="btn btn-outline-danger" style="width:100%;" ref="logout-btn"><i class="fa fa-sign-out"></i> Logout</button>
      </div>
    </div>
  </div>

  `
})