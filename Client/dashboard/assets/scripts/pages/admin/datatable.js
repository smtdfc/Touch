import(`${window.location.origin}/Client/dashboard/assets/scripts/components/navbar.js`)

let selector = new Turtle.Selector()
Turtle.render(selector.byId("root"), `
	<div class="overlay active" id="overlay1">
		<div class="loader navbar-loader " id="loader">
			<div class="bar"></div>
		</div>
	</div> 
	<page-navbar > </page-navbar> 
	<side-bar></side-bar>
	<br><br>


`)

function editDT() {

}

function deleteDT() {

}

window.addEventListener("pageready", function(e) {
	checkServerURL()
	app.auth.getUser()
		.then((user) => {
			userInfo = user
			import(`${window.location.origin}/Client/dashboard/assets/scripts/components/admin_sidebar.js`)
			selector.byQuery("#overlay1").classList.remove("active")
			
			if (user == null) {
				
				window.location = `${window.location.origin}/Client/dashboard/login.html`
			} else {

				if (user.role != "admin") {
					window.location = `${window.location.origin}/Client/dashboard/error/403.html`
				}
				main()
			}
		})

	checkServerURL()

})

async function main() {
	import(`${window.location.origin}/Client/dashboard/assets/scripts/components/listDT.js`)
	selector.byQuery("#root").HTML +=`
		<list-dt></list-dt>
	`
}