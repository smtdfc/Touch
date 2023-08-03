Turtle.createComponent("login-page",{
  render:function(){
    return `
      <div class="d-flex justify-content-center">
        <form ref="form" class="card d-flex flex-flow-col text-align-center form">
          <div ref="loader" class="d-none line-loader" style="height:2px;">
            <span class="bar"></bar>
          </div>
          <h1>Login</h1>
          <div style="padding:30px; padding-top:0;">
            <span ref="note" style="color:red;"></span>
            <br>
            <div class="field">
              <label for="" class="form-label">Username</label><br>
              <input ref="username" type="text" class="form-input" style="width:250px;" required>
            </div><br>
            <div class="field">
              <label for="" class="form-label">Password</label><br>
              <input ref="password" type="password" class="form-input" style="width:250px;" required>
            </div><br>
            <div>
              <button ref="btn" class="btn btn-outline-success" style="width:100px;">Login</button>
            </div>
          </div>
        </form>
      </div> <br> <br> <br><br> <br><br>
      <div class="text-align-center">
        Touch dashboard 0.0.1
      </div>
    `
  },
  onFirstRender:function(){
    let ctx = this
    this.ref("form").on("submit",function(e){
      ctx.ref("btn").HTMLElement.disabled = true
      ctx.ref("note").text = ""
      ctx.ref("loader").classList.remove("d-none")
      e.preventDefault()
      app.auth.login(ctx.ref("username").val,ctx.ref("password").val)
        .then((user)=>{
          if(user.role == "admin"){
            Router.redirect("/admin/home",true)
          }
        })
        
        .catch((e)=>{
          ctx.ref("note").text = e.message
        })
        
        .finally(()=>{
          ctx.ref("loader").classList.add("d-none")
          ctx.ref("btn").HTMLElement.disabled = false
        })
    })
  }
})