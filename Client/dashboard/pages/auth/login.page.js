app.staticComponent("login-page", function(controller) {
  controller.onFirstRender = function() {
    controller.ref("form").on("submit", function(e) {
      e.preventDefault()
      showLoader()
      controller.ref("note").text = ""
      TouchApp.auth.login(
        controller.ref("username").val,
        controller.ref("password").val,
      )
        .then((user)=>{
          if(user.role == "admin") app.router.redirect("/admin/home",true)
        })
        
        .catch((err)=>{
          controller.ref("note").text = err.message
        })
        
        .finally (()=>{
          hideLoader()
        })
    })
  }
  
  controller.onCreate = function(){
    if (TouchApp.auth.currentUser.user_id != null) app.router.redirect("/", true)
  }
  
  return `
  <div class="d-flex justify-content-center" >
  <form action="#" class="card form d-flex flex-flow-col align-items-center " style="padding:20px;" ref="form">
    <h1>Login to continue</h1>
    <span class="text-align-center" ref="note" style="max-width:70%; word-wrap: break-word;" ></span>
    <br>
    <div>
      <label for="username" class="form-label">Username</label><br>
      <input type="text" class="form-input" name="username" style="min-width: 280px;"  ref="username" required="">
    </div>
    <br>
    <div>
      <label for="password" class="form-label">Password</label><br>
      <input type="password" class="form-input" name="password" style="min-width: 280px; " ref="password" required="">
    </div>
    <br><br>
    <button class="btn btn-primary" style="min-width: 280px;">Login</button>
  </form>
</div>
  `
})