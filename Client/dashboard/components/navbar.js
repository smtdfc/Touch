import "./accountMenu.js"
Turtle.component("main-navbar", function($) {
  $.refresh = function() {
    if (TouchApp.isNotLogin()) {
      $.refs.navbar.classList.remove("shadow")
      $.refs.navbarBtn.classList.add("d-none")
      $.refs.navbarAvatar.classList.add("d-none")
    } else {
      $.refs.navbar.classList.add("shadow")
      $.refs.navbarBtn.classList.remove("d-none")
      $.refs.navbarAvatar.classList.remove("d-none")
    }
  }

  $.onRender = function() {
    $.refresh()
    TouchApp.on("authstatechange", $.refresh)
  }

  return `
    <nav class="navbar navbar-expand-lg bg-white sticky-top" ${Turtle.ref("navbar")}>
      <div class="container-fluid ">
        <div class="navbar-brand text-center">
          <button class="btn d-md-none" id="open-sidebar-btn"
           ${Turtle.ref("navbarBtn")}
           ${Turtle.events({
              click:function(){
                document.getElementById("main-sidebar").classList.toggle("active")
              }
          })}>
            <i class="fa fa-bars"></i>
          </button>
          Touch
        </div>
        <img class="avatar" src="./assets/images/avatar.jpg" alt="" data-bs-toggle="offcanvas" href="#account-menu" ${Turtle.ref("navbarAvatar")} >
      </div>
      <div class="line-loader d-none" id="main-loader">
        <div class="bar"></div>
      </div>
    </nav>
    <account-menu></account-menu>
  `
})