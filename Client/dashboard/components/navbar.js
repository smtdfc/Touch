Turtle.component("main-navbar", function($) {
  $.refreshUI = function() {
    if (isAdmin()) {
      $.refs.toggleBtn.classList.remove("d-none")
      $.refs.avatar.classList.remove("d-none")
    } else {
      $.refs.toggleBtn.classList.add("d-none")
      $.refs.avatar.classList.add("d-none")
    }
  }

  $.onRender = function() {
    $.refreshUI()
    TouchApp.on("authstatechange",$.refreshUI)
  }
  return `
    <nav class="navbar">
      <div class="navbar-brand" style="padding:0px 5px;">
        <button class="navbar-toggle-btn fa fa-bars" data-toggle="#main-sidebar" ${Turtle.ref("toggleBtn")}></button>
        <h3>Touch</h3>
      </div>
      <div class="navbar-items" style="padding:0px 10px;">
        <img src="./assets/images/avatar.jpg" alt="" class="navbar-avatar" data-toggle="#account-menu" ${Turtle.ref("avatar")} >
      </div>
      <div class="line-loader" id="main-loader">
        <span class="bar"></span>
      </div>
    </nav>
  `
})