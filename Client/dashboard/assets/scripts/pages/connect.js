let selector = new Turtle.Selector()

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
			localStorage.setItem("server",server)
			window.location ="./index.html"
		})
		
		.catch(()=>{
			selector.byQuery("#alert").classList.remove("d-none")
			selector.byQuery("#alert").HTML = "Cannot connect to sever"
		})
		
		.finally (()=>{
			selector.byQuery("#overlay1").classList.remove("active")
		})
	})
})
