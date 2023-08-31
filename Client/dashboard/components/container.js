Turtle.component("main-container", function($) {
  $.genrateMenu = function() {
    let role = TouchApp.auth.currentUser.role
    let menu = [
      { title: "Home", icon:"home", roles: ["admin", "user"], link: "#/home" },
      { title: "DataTables", icon:"table", roles: ["admin", "user"], link: "#/datatables/list" },
    ]
    let fragment = document.createDocumentFragment()
    for (var i = 0; i < menu.length; i++) {
      let item = menu[i]
      if (item.roles == "*" || item.roles.includes(role)) {
        let a = document.createElement("a")
        a.className = "list-group-item list-group-item-action"
        a.href = item.link
        a.style.fontSize = "20px"
        a.innerHTML = `
          <i class="sidebar-icon fa fa-${item.icon}"></i>
          ${item.title}
        `
        fragment.appendChild(a)
      }
    }
    $.refs.sidebarItems.textContent = ""
    $.refs.sidebarItems.appendChild(fragment)
  }

  $.refresh = function() {
    if (TouchApp.isNotLogin()) $.refs.sidebar.classList.add("d-none")
    else {
      $.refs.sidebar.classList.remove("d-none")
      $.genrateMenu()
    }
  }

  $.onRender = function() {
    $.refresh()
    TouchApp.on("authstatechange", $.refresh)
  }

  return `
    <div class="wrapper">
      <div class="sidebar bg-secondary-subtle" id="main-sidebar" ${Turtle.ref("sidebar")}>
        <button class="btn-close d-md-none" id="close-sidebar-btn"
            ${Turtle.events({
              click:function(){
                $.refs.sidebar.classList.toggle("active")
              }
            })}>
        </button>
        <br>
        <ul class="list-group list-group-flush bg-transparent" ${Turtle.ref("sidebarItems")} ></ul>
      </div>
      <div class="content" id="page-contents"></div>
    </div>
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        Touch Dashboard version 0.0.1
      </div>
    </nav>
   `
})