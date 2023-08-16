function showMsg(msg){
  let message = document.createElement("div")
  message.classList.add("message")
  message.textContent = msg
  setTimeout(()=>{
    message.remove()
  },5000)
  document.getElementById("messages").appendChild(message)
}

function isAdmin(){
  return TouchApp.auth.currentUser.user_id != null && TouchApp.auth.currentUser.role =="admin"
}

function showLoader() {
  document.getElementById("main-loader").classList.remove("d-none")
}

function hideLoader() {
  document.getElementById("main-loader").classList.add("d-none")
}

window.addEventListener("offline",function(e){
  showMsg("You are offline ! Some functions may not work or not work properly!")
})

window.addEventListener("online", function(e) {
  showMsg("Connection is back !")
})

var app = Turtle.initApp(document.getElementById("root"))
app.use(Turtle.RouterModule)

app.render(`
  <main-navbar></main-navbar>
  <account-menu></account-menu>
  <div class="sidebar-container " style="margin-top:100px;">
    <main-sidebar></main-sidebar>
    <div id="messages" class="messages"></div>
    <div class="container" style="padding: 16px;" id="content">
      <div class="d-flex justify-content-center">
       <div class="circle-loader"></div>
      </div>
    </div>
  </div>
`)

async function loader() {
  await TouchApp.auth.info()
  await import('./components/navbar.component.js')
  await import("./components/sidebar.component.js")
  await import("./components/accountMenu.component.js")
  return {
    initRouter:(await import("./router/main.js")).initRouter
  }
}

loader()
  .then((r) => {
    showLoader()
    return r.initRouter()
  })
  .then(() => {
    hideLoader()
  })