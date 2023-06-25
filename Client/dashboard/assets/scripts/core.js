let origin = window.origin
const userInfo = {}
function checkServerURL(){
	try {
		new URL(localStorage.getItem("server"))
	} catch (e) {
		window.location = `${origin}/Client/dashboard/connect.html`
	}
	
}

document.onreadystatechange = async function(e){
	if(document.readyState == "complete"){
		await import("./axios.min.js")
		await import("./api.js")
		
		window.dispatchEvent(new CustomEvent("pageready"))
	}else{
		
	}
}