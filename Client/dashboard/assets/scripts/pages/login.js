import(`${window.location.origin}/Client/dashboard/assets/scripts/components/navbar.js`)
let selector = new Turtle.Selector()

Turtle.render(selector.byId("root"), `
	<div class="overlay active" id="overlay1">
		<div class="loader navbar-loader " id="loader">
			<div class="bar"></div>
		</div>
	</div>
	<div style="padding-top:100px; height: 100vh; position:  relative;">
		<form action="#" id="form-login" class="form d-flex flex-flow-col align-items-center" style="position: relative; min-width: 250px;">
			<div class="d-none note note-danger" id="login-note"></div>
			<h1>Login</h1>
			<div class="field">
				<input type="text" id="username" class="form-input" style="width: 260px;" placeholder="Username" required>
			</div><br>
			<div class="field">
				<input type="password" class="form-input" style="width: 260px;" placeholder="Password" required>
			</div><br>
			<div class="text-align-center">
				<button class="btn btn-primary" id="login-btn">Login</button>
				<br><br>
			</div>
		</form>
		
	</div>
`)
let loginBtn = selector.byId("login-btn")
let loginNote = selector.byId("login-note")
let overlay1 = selector.byId("overlay1")

window.addEventListener("pageready", function(e) {
	checkServerURL()
	let server = localStorage.getItem("server")

	let app = initApp({
		base: server
	})
	
	app.auth.getUser()
		.then((user) => {
			if (user == null) {
				selector.byQuery("#overlay1").classList.remove("active")
			} else {
				if (user.role == "admin") {
					window.location = `${window.location.origin}/Client/dashboard/admin/index.html`
				} else {
					window.location = `${window.location.origin}/Client/dashboard/user/index.html`
				}
			}
		})

	selector.byId("form-login").on("submit", function(e) {
		e.preventDefault()
		loginBtn.disable = true
		loginNote.HTML = ""
		loginNote.classList.add("d-none")
		overlay1.classList.add("active")
		let inputs = selector.byId("form-login").selectAll("input")
		let username = inputs.index(0)
		let password = inputs.index(1)
		app.auth.login(username.val, password.val)
			.then((user) => {
				selector.byQuery(".main").classList.add("active")
				if (user.role == "admin") {
					window.location = `${window.location.origin}/Client/dashboard/admin/index.html`
				} else {
					window.location = `${window.location.origin}/Client/dashboard/user/index.html`
				}
			})

			.catch((err) => {
				loginNote.classList.remove("d-none")
				loginNote.text = err.message
			})

			.finally(() => {
				overlay1.classList.remove("active")
				loginBtn.disable = false
			})
	})
})