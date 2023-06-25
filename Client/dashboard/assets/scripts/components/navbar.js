window.Turtle.createComponent("page-navbar",{
	render:function(){
		return `
			<nav class="navbar">
				<h1 class="navbar-brand">Touch</h1>
				<button class="navbar-control-btn btn-toggle-sidebar icon icon-menu" data-action="toggle-sidebar" data-sidebar="#sidebar" ></button>
			</nav>
		`
	}
})