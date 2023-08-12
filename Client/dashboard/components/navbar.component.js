app.staticComponent("main-navbar",function(controller){
  
  return `
  <nav class="navbar" ref="navbar">
    <div class="nav-brand " >
      <button class="d-none nav-btn" ref="nav-btn">
        <span class="fa fa-bars" data-action="toggle-sidebar" data-sidebar="#main-sidebar" ></span>
      </button>
      <h1>Touch</h1>
    </div>
    <div class="d-none nav-avatar" ref="nav-avt">
      <img src="./assets/images/avatar.jpg">
    </div>
    <div class="d-none line-loader" id="main-loader">
      <span class="bar"></span>
    </div>
  </nav>
  `
})