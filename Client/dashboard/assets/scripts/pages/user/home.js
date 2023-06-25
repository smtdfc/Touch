import(`${window.location.origin}/Client/dashboard/assets/scripts/components/navbar.js`)
let selector = new Turtle.Selector()

Turtle.render(selector.byId("root"),`
	<div class="overlay active" id="overlay1">
		<div class="loader navbar-loader " id="loader">
			<div class="bar"></div>
		</div>
	</div> 
	<page-navbar > </page-navbar>
`)

window.addEventListener("pageready", function(e) {
	checkServerURL()
	let server = localStorage.getItem("server")

	let app = initApp({
		base: server
	})

	app.auth.getUser()
		.then((user) => {
			if (user == null) {
				window.location = `${window.location.origin}/Client/dashboard/login.html`
			} else {
				if (user.role != "user") {
					window.location = `${window.location.origin}/Client/dashboard/error/403.html`
				}
			}
		})

	checkServerURL()
	selector.byQuery("#overlay1").classList.remove("active")

})