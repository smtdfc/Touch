Turtle.component("account-menu", function($){
  $.refreshUI = function(){
    $.refs.username.textContent = TouchApp.auth.currentUser.username
  }
  
  $.onRender = function(){
    $.refreshUI()
  }
  
  return `
    <div class="offcanvas offcanvas-right" id="account-menu">
      <div class="offcanvas-header">
        <h3>Account</h3>
        <button class="offcanvas-toggle-btn fa fa-times" data-toggle="#account-menu"></button>
      </div>
      
      <div class="offcanvas-body">
        <div class="d-flex justify-content-center text-align-center">
          <div class="avatar flex-flow-col">
            <img src="./assets/images/avatar.jpg" alt="">
            <span ${Turtle.ref("username")} >${TouchApp.auth.currentUser.username}</span>
            <br>
          </div>
        </div>
        <br>
        <button ${Turtle.ref("logout")} class="btn btn-outline-danger fa fa-sign-out " style="width: 100%;"> Logout</button>
      </div>
    </div>
  `
})