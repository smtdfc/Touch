let isFullScreen = false

app.staticComponent("main-navbar",function(controller){
  controller.refreshUI = function(){
    if(TouchApp.auth.currentUser.user_id != null){
      controller.ref("nav-btn").classList.remove("d-none")
      controller.ref("nav-avt").classList.remove("d-none")
    }else{
      controller.ref("nav-btn").classList.add("d-none")
      controller.ref("nav-avt").classList.add("d-none")

    }
  }
  
  controller.onRender =function(){
    controller.ref("fullscreen").on("click",function(){
      if(isFullScreen) openFullscreen() 
      else closeFullscreen()
      isFullScreen = !isFullScreen
    })
    controller.refreshUI()
    TouchApp.on("authstatechange",controller.refreshUI)
  }
  
  return `
  <nav class="navbar" ref="navbar">
    <div class="nav-brand">
      <button class="d-none nav-btn" ref="nav-btn">
        <span class="fa fa-bars" data-action="toggle-sidebar" data-sidebar="#main-sidebar" ></span>
      </button>
      <h1>Touch</h1>
    </div>
    <div class="d-flex">
      <button ref="fullscreen" class="btn m-5 fa fa-arrows-alt" style="font-size:20px;background:none;border:none;"></button>
      <div class="d-none nav-avatar avatar" ref="nav-avt">
        <img src="./assets/images/avatar.jpg" data-action="toggle-offcanvas" data-offcanvas="#account-menu" >
      </div>
    </div>
    <div class="line-loader" id="main-loader">
      <span class="bar"></span>
    </div>
  </nav>
  `
})