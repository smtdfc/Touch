let selector = new Turtle.Selector()

window.addEventListener("pageready",function(e){
	
	checkServerURL()
	selector.byQuery("#overlay1").classList.remove("active")
	
})