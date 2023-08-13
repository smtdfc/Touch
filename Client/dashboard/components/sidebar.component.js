app.staticComponent("admin-sidebar-items", function(controller) {
  return `
  <div class="sidebar-content" ref="sidebar">
    <button class="fa fa-times sidebar-close-btn" data-action="toggle-sidebar" data-sidebar="#main-sidebar"></button>
    <ul class="sidebar-nav-items">
      <li><a href="#/admin/home" ><i class="icon fa fa-home"></i><span>Home</span></a></li>
      <li><a href="#/admin/dt" ><i class="icon fa fa-database"></i><span>Data Storage</span></a></li>
      <li><a href="#/admin/dashboard" ><i class="icon fa fa-dashboard"></i><span>Dashboard</span></a></li>
      <li><a href="#/admin/devices" ><i class="icon fa fa-microchip"></i><span>Devices</span></a></li>
      <li><a href="#/admin/users" ><i class="icon fa fa-users"></i><span>Users</span></a></li>
    </ul>
  </div>
  `
})

app.staticComponent("main-sidebar", function(controller) {
  controller.refreshUI = function() {
    if (TouchApp.auth.currentUser.role == "admin") {
      controller.ref("sidebar").HTML = `
        <admin-sidebar-items></admin-sidebar-items>
      `
    }
    if (TouchApp.auth.currentUser.user_id != null) {
      controller.ref("sidebar").classList.remove("d-none")

    } else {
      controller.ref("sidebar").classList.add("d-none")
    }

  }
  controller.onRender = function() {
    controller.refreshUI()
    TouchApp.on("authstatechange", controller.refreshUI)

  }
  return `
    <div class="sidebar sidebar-icon " id="main-sidebar" ref="sidebar"></div>
  `
})