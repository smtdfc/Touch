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
            <li><link-to to="/admin"><i class="fa fa-home"></i>Home</link-to></li>
            <li><link-to to="/admin/dt"><i class="fa fa-database"></i>Data Storage</link-to></li>
            <li><link-to to="#"><i class="fa fa-dashboard"></i>Dashboards</link-to></li>
            <li><link-to to="#"><i class="fa fa-users"></i>Users</link-to></li>
            <li><link-to to="#"><i class="fa fa-microchip"></i>Devices</link-to></li>
            <li><link-to to="#"><i class="fa fa-bar-chart"></i>Statistical</link-to></li>
            <li><link-to to="#"><i class="fa fa-server"></i>Server</link-to></li>
            <li><link-to to="#"><i class="fa fa-user"></i>Home</link-to></li>
            <li><link-to to="#"><i class="fa fa-cog"></i>Settings</link-to></li>
          </ul>
        </div>
      </div>
    `
  }
})