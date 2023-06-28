let selector = new Turtle.Selector()
window.addEventListener("pageready", function() {
	checkServerURL()
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