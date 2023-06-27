window.Turtle.createComponent("page-navbar",{
	render:function(){
		return `
			<nav class="navbar">
				<div class="d-flex">
					<button class="icon icon-menu" style="padding:16px; border:none; background:none; font-size:25px;"  data-action="toggle-sidebar" data-sidebar="#sidebar" ></button>
					<h1 class="navbar-brand">Touch</h1>
				</div>
			</nav>
		`
	}
})