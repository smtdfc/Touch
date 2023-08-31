Turtle.component("account-menu", function($) {
  $.refresh = function() {
    $.refs.username.textContent = TouchApp.auth.currentUser.username
  }

  $.onSignOutBtnClick = function() {
    showLoader()
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(
      $.refs.offcanvas
    )
    bsOffcanvas.hide()
    showMsg("Signing out ....")
    TouchApp.auth.logout()
      .then(()=>{
        app.router.redirect("/auth/login",true)
      })
      
      .catch(({name,msg})=>{
        showErr(msg)
      })
      
      .finally(()=>{
        hideLoader()
      })
  }
  
  $.onRender = function(){
    $.refresh()
    TouchApp.on("authstatechange",$.refresh)
  }
  
  return `
    <div class="offcanvas offcanvas-end" tabindex="-1" id="account-menu" aria-labelledby="accountMenuLabel" ${Turtle.ref("offcanvas")}>
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="accountMenuLabel">Account</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="d-flex flex-column align-items-center justify-content-center text-center">
          <img src="./assets/images/avatar.jpg" alt="avatar" class="avatar" >
          <p>@<span ${Turtle.ref("username")}></span></p>
        </div>
        <br>
        <button class="btn btn-outline-danger text-center w-100" ${Turtle.events({click:$.onSignOutBtnClick})} >
          <i class="fa fa-sign-out"></i>
          Sign out
        </button>
      </div>
    </div>
  `
})