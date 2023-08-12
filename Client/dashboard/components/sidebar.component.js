app.staticComponent("admin-sidebar-items",function(controller){
  return `
  <div class="sidebar-content" ref="sidebar">
    <button class="fa fa-times sidebar-close-btn" data-action="toggle-sidebar" data-sidebar="#main-sidebar"></button>
    <ul class="sidebar-nav-items">
      <li>
        <a href="#"><i class="icon fa fa-home"></i><span>Home</span></a>
        <ul>
          <li><a href="#">Statistics</a></li>
          <li><a href="#">Statistics</a></li>
          <li><a href="#">Statistics</a></li>
          <li><a href="#">Statistics</a></li>
          <li><a href="#">Statistics</a></li>
          <li><a href="#">Statistics</a></li>
  
        </ul>
      </li>
      <li><a href="#"><i class="icon fa fa-home"></i><span>Home</span></a></li>
      <li><a href="#"><i class="icon fa fa-home"></i><span>Home</span></a></li>
      <li><a href="#"><i class="icon fa fa-home"></i><span>Home</span></a></li>
      <li><a href="#"><i class="icon fa fa-home"></i><span>Home</span></a></li>
      <li><a href="#"><i class="icon fa fa-home"></i><span>Home</span></a></li>
    </ul>
  </div>
  `
})

app.staticComponent("main-sidebar",function(controller){
  controller.onRender = function(){
    controller.ref("sidebar").classList.add("d-none")
  }
  return`
    <div class="sidebar sidebar-icon " id="main-sidebar" ref="sidebar"></div>
  `
})