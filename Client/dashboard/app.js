const app = new Turtle.TurtleApp(
  document.querySelector("#root")
)

import("./components/navbar.js")
import("./components/container.js")
import("./components/confirmModal.js")

async function init(arg) {
  await TouchApp.auth.info()

}

function showLoader() {
  document.querySelector("#main-loader").classList.remove("d-none")
}

function hideLoader() {
  document.querySelector("#main-loader").classList.add("d-none")
}

function showMsg(msg) {
  let m = document.createElement("div")
  m.innerHTML = `
    <div class="toast align-items-center text-bg-primary border-0 show" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body ">
          ${msg}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `
  document.getElementById("messages").appendChild(m)
  setTimeout(() => {
    m.remove()
  }, 2000)
}

function showErr(msg) {
  let m = document.createElement("div")
  m.innerHTML = `
      <div class="toast align-items-center text-bg-danger border-0 show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body ">
            ${msg}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `
  document.getElementById("messages").appendChild(m)
  setTimeout(() => {
    m.remove()
  }, 2000)
}

function showConfirm(configs) {
  let modal = document.createElement("confirm-modal")
  modal.props = configs
  document.body.appendChild(modal)
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