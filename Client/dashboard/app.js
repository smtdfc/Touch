const app = new Turtle.TurtleApp(
  document.querySelector("#root")
)

import("./components/navbar.js")
import("./components/container.js")

async function init(arg) {
  await TouchApp.auth.info()

}

function showLoader() {
  document.querySelector("#main-loader").classList.remove("d-none")
}

function hideLoader() {
  document.querySelector("#main-loader").classList.add("d-none")
}

function showMsg(msg){
  let m = document.createElement("div")
  m.className = "alert alert-info"  
  m.innerHTML = msg
  document.getElementById("messages").appendChild(m)
  setTimeout(()=>{
    m.remove()
  },2000)
}

function showErr(msg) {
  let m = document.createElement("div")
  m.className = "alert alert-danger"
  m.innerHTML = msg
  document.getElementById("messages").appendChild(m)
  setTimeout(() => {
    m.remove()
  }, 2000)
}

app.render(`
  <div class="line-loader">
    <div class="bar"></div>
  </div>
`)

init(1)
  .then(() => {
    app.render(`
      <main-navbar></main-navbar>
      <main-container></main-container>
      <div class="fixed-bottom vstack gap-2 col-md-5 mx-auto p-1" id="messages"></div>
    `)
    import("./router/main.js")
  })