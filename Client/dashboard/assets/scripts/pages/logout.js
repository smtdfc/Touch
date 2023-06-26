var app = null
let selector = new Turtle.Selector()

window.addEventListener("pageready", function() {
	checkServerURL()
	let server = localStorage.getItem("server")

	 app = initApp({
		base: server
	})

	app.auth.getUser()
		.then((user) => {
			if (user) {
				selector.byQuery("#overlay1").classList.remove("active")
				import(`${window.location.origin}/Client/dashboard/assets/scripts/components/LogoutCofirm.js`)
				document.body.innerHTML += `
					<logout-confirm></logout-confirm>
				`
			} else {
				window.location = "./index.html"
			}
		})
})