import "./admin/menu.js"
Turtle.createComponent("page-navbar",{
  render:function(){
    return `
      <nav class="navbar">
        <h1 class="navbar-brand">Touch</h1>
        <button class="btn icon icon-menu d-none" ref="menu-btn" data-action="toggle-offcanvas" data-offcanvas="#menu" ></button>
        <button  class="d-none btn btn-outline-primary btn-rounded" ref="login-btn" >Login</button>
      </nav>
      <div ref="menu">
      
      </div>
    `
  },
  
  onFirstRender:async function(){
    let ctx = this
    this.refresh()
    this.ref("login-btn").on("click",function(){
      Turtle.redirect("/login",true)
    })
    app.createEventListener("authstatechange",this.refresh.bind(this))
  },
  
  onCreate:function(){
    this.refresh = function(){
      if (isAdmin() || isUser()) {
        if(isAdmin()){
          this.ref("menu").HTML = `<admin-menu></admin-menu>`
        }
        this.ref("menu-btn").classList.remove("d-none")
        this.ref("login-btn").classList.add("d-none")
      }
      if(notLoggedIn()){
        this.ref("menu-btn").classList.add("d-none")
        this.ref("login-btn").classList.remove("d-none")
      }
    }
  }
  
})