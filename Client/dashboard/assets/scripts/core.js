let origin = window.origin
var userInfo = null

Turtle.UI.Actions.Actions["toggle-sidebar"] = function(target, args) {
	let sidebar = new Turtle.Selector().byQuery(args.sidebar)
	sidebar.styles.top="0%"
	
	let left = getComputedStyle(sidebar.element).left
	if(left == "0px"){
		sidebar.styles.left = "-100%"
		target.classList.remove("icon-close")
		target.classList.add("icon-menu")
	}else{
		sidebar.styles.left="0"
		target.classList.add("icon-close")
		target.classList.remove("icon-menu")
	}
}

function checkServerURL() {
	try {
		new URL(localStorage.getItem("server"))
	} catch (e) {
		window.location = `${origin}/Client/dashboard/connect.html`
	}

}

document.onreadystatechange = async function(e) {
	if (document.readyState == "complete") {
		await import("./axios.min.js")
		await import("./api.js")

		window.dispatchEvent(new CustomEvent("pageready"))
	} else {

	}
}