let selector = new Turtle.Selector()

Turtle.render(selector.byId("root"), `
	<div class="overlay active" id="overlay1">
		<div class="loader navbar-loader " id="loader">
			<div class="bar"></div>
		</div>
	</div>
	<page-navbar></page-navbar>
`)

window.addEventListener("pageready", function(e) {
	checkServerURL()
	app.auth.getUser()
		.then((user) => {
			selector.byQuery("#overlay1").classList.remove("active")

			if (user == null) {
				window.location = `${window.location.origin}/Client/dashboard/login.html`
				selector.byQuery("#overlay1").classList.remove("active")
			} else {
				if (user.role == "admin") {
					window.location = `${window.location.origin}/Client/dashboard/admin/index.html`
				} else {
					window.location = `${window.location.origin}/Client/dashboard/user/index.html`
				}
			}
		})

	
	
})