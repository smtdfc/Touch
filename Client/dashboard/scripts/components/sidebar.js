Turtle.createStaticComponent("admin-sidebar",{
  render:function(){
    return `
      <div class="sidebar-content">
        <button class="fa fa-times sidebar-close-btn" data-action="toggle-sidebar" data-sidebar="#main-sidebar"></button>
        <ul class="sidebar-nav-items">
          <li><a href="#"><i class="icon fa fa-home"></i><span>Home</span></a></li>
          <li><a href="#"><i class="icon fa fa-home"></i><span>Home</span></a></li>
          <li><a href="#"><i class="icon fa fa-home"></i><span>Home</span></a></li>
          <li><a href="#"><i class="icon fa fa-home"></i><span>Home</span></a></li>
          <li><a href="#"><i class="icon fa fa-home"></i><span>Home</span></a></li>
        </ul>
      </div>
    `
  },
})

app.eventManager.addEventListener("authstatechange",function(user){
  if(user.role == "admin"){
    selector.byId("main-sidebar").classList.remove("d-none")
    selector.byId("main-sidebar").HTML =`<admin-sidebar>`
  }
})