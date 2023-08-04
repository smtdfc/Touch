Turtle.createComponent("account-menu",{
  render:function(){
    return `
      <div class="offcanvas offcanvas-right" id="account-menu" style="transition:0.2s;" >
        <div class="offcanvas-header">
          <h3 class="offcanvas-title">Account</h3>
          <button class="fa fa-times offcanvas-close-btn" data-action="toggle-offcanvas" data-offcanvas="#account-menu"></button>
        </div>
        <div class="offcanvas-body">
          <div class="d-flex flex-flow-col align-items-center">
            <div class="avatar ml-0">
              <img src="https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg" data-action="toggle-offcanvas" data-offcanvas="#offcanvas1" alt="">
            </div>
            <span ref="username">???</span>
          </div>
          <br>
          <ul class="offcanvas-nav-items">
            <li><a  href="#"> <i class="icon fa fa-sign-out"></i>Logout</a></li>
            <li><a  href="#"><i class="icon fa fa-gear"></i>Settings</a></li>
          </ul>
        </div>
      </div>
    `
  },
  onRender:function(){
    this.onAuthStateChange = function(user) {
      if (!isNotLoggedIn()) {
        this.ref("username").text = `@${user.username}`
      }
    }
    app.eventManager.addEventListener("authstatechange", this.onAuthStateChange.bind(this))
  }
})