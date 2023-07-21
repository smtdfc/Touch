Turtle.createComponent("login-form", {
  render: function() {
    return `
        <form action="#" class="form text-align-center" ref="login-form" >
          <h1>Login to continue</h1>
          <span ref="message" style="color:red;"  ></span>
          <br>
          <div class="field">
            <label for="username-input" class="form-label">Username</label>
            <br>
            <input type="text" ref="username" name="username-input" class="form-input" style="width:250px;">
          </div><br>
          <div class="field">
            <label for="password-input" class="form-label">Password</label>
            <br>
            <input type="password" ref="password" name="password-input" class="form-input" style="width:250px;">
          </div><br>
          <button class="btn btn-primary" type="submit" style="width:100px;">Login</button>
        </form>
    `
  },
  onFirstRender:function(){
    let ctx = this
    let message = this.ref("message")
    let usernameInput = this.ref("username")
    let passwordInput = this.ref("password")
    this.ref("login-form").on("submit",function(e){
      e.preventDefault()
      openOverlay()
      message.text =""
      app.auth.login(usernameInput.val,passwordInput.val)
        .then((user)=>{
          Turtle.redirect("/",true)
        })
        
        .catch((err)=>{
          message.text = err.message
        })
        
        .finally(()=>{
          closeOverlay()
        })
    })
  }
})