import("./accountMenu.js")
Turtle.createStaticComponent("page-navbar", {
  render: function() {
    return `
      <nav class="d-none navbar" id="main-navbar" style="justify-content:space-between" >
        <div class="nav-brand">
          <button class="fa fa-bars nav-btn" style="padding:0px 6px;"  data-action="toggle-sidebar" data-sidebar="#main-sidebar"></button>
          <h1>Touch</h1>
        </div>
        <div class="nav-avatar">
          <img src="https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg" data-action="toggle-offcanvas" data-offcanvas="#account-menu" alt="">
        </div>
      </nav>
      <account-menu></account-menu>
    `
  },
  onRender: function() {
    this.onAuthStateChange = function(user) {
      if (!isNotLoggedIn()) {
        selector.byId("main-navbar").classList.remove("d-none")
      }
    }
    app.eventManager.addEventListener("authstatechange", this.onAuthStateChange.bind(this))
  }
})