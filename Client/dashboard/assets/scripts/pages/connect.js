let selector = new Turtle.Selector()

Turtle.render(selector.byId("root"),`
	<div class="overlay active" id="overlay1">
			<div class="loader navbar-loader " id="loader">
				<div class="bar"></div>
			</div>
	</div>
	<div class="d-flex flex-flow-col align-items-center text-align-center">
		<h2>Connect Server</h2>
		<div class="note note-danger d-none" id="alert"></div>
		<form action="#" id="form1" class="form d-flex flex-flow-col align-items-center ">
			<input type="text" class="form-input" style="width: 300px;" placeholder="Server URL">
			<button class="btn btn-rounded btn-outline-info ">Connect</button>
		</form>
	</div>

`)

window.addEventListener("pageready",function(e){
	selector.byQuery("#overlay1").classList.remove("active")
	selector.byQuery("#form1").on("submit", function(e) {
		selector.byQuery("#overlay1").classList.add("active")
		selector.byQuery("#alert").classList.add("d-none")
		e.preventDefault()
		let server = selector.byQuery("#form1").selectAll("input").index(0).val
		if(server.length == 0){
			selector.byQuery("#overlay1").classList.remove("active")
			return
		}
		try {
			new URL(server)
		} catch (e) {
			selector.byQuery("#alert").classList.remove("d-none")
			selector.byQuery("#alert").HTML = "Invalid URL"
			selector.byQuery("#overlay1").classList.remove("active")
			return
		}
		
		let res = axios({
			method:"POST",
			url:`${server}/info/ver`
		})
		
		.then(()=>{
			CookieManager.eraseCookie("at")
			CookieManager.eraseCookie("rt")
			localStorage.setItem("server",server)
			window.location ="./index.html"
		})
		
		.catch((err)=>{
			console.log(err);
			selector.byQuery("#alert").classList.remove("d-none")
			selector.byQuery("#alert").HTML = "Cannot connect to sever"
		})
		
		.finally (()=>{
			selector.byQuery("#overlay1").classList.remove("active")
		})
	})
})
