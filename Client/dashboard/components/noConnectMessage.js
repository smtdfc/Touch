Turtle.component("no-connect-message", function($) {
  let show = false
  $.refresh = function() {
    if (window.navigator.onLine) {
      $.refs.p.classList.add("d-none")
    } else {
      $.refs.p.classList.remove("d-none")
    }
  }
  $.onRender = function() {
    $.refresh()
    window.addEventListener("offline",$.refresh)
    window.addEventListener("online",$.refresh)
  }
  return `
    <div class=" d-none bg-light text-center" style="position:fixed; top:0; left:0; z-index:99999;width:100vw; height:100vh; display:grid ; place-content:center;" ${Turtle.ref("p")}>
      <h1>No internet</h1>
      <p>Currently unable to connect to the server! Please check the connection to the server and try again!</p>
    </div>
  `
})