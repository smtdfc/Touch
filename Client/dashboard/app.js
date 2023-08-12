import('./components/navbar.component.js')
import("./components/sidebar.component.js")
var app = Turtle.initApp(document.getElementById("root"))

app.render(`
  <main-navbar></main-navbar>
  <div class="sidebar-container " style="margin-top:100px;">
    <main-sidebar></main-sidebar>
    <div class="container" style="padding: 16px;"></div>
  </div>

  
`)