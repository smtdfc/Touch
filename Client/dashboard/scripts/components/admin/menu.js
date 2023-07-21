Turtle.createComponent("admin-menu",{
  render:function(){
    return `
      <div class="offcanvas offcanvas-left" id="menu">
        <div class="offcanvas-header">
          <h3 class="offcanvas-title">Menu</h3>
          <button class="offcanvas-close-btn icon icon-close" data-action="toggle-offcanvas" data-offcanvas="#menu" ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="offcanvas-nav">
            <li><a href="#"><i class="fa fa-home"></i>Home</a></li>
            <li><a href="#"><i class="fa fa-database"></i>Data Storage</a></li>
            <li><a href="#"><i class="fa fa-dashboard"></i>Dashboards</a></li>
            <li><a href="#"><i class="fa fa-users"></i>Users</a></li>
            <li><a href="#"><i class="fa fa-microchip"></i>Devices</a></li>
            <li><a href="#"><i class="fa fa-bar-chart"></i>Statistical</a></li>
            <li><a href="#"><i class="fa fa-server"></i>Server</a></li>
            <li><a href="#"><i class="fa fa-user"></i>Home</a></li>
            <li><a href="#"><i class="fa fa-cog"></i>Settings</a></li>

          </ul>
        </div>
      </div>
    `
  }
})