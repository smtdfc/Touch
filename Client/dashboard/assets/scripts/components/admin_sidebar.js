window.Turtle.createComponent("side-bar",{
	render:function(){
		return `
			<div class="sidebar sidebar-with-icon" id="sidebar" style="padding-top:75px;" >
				<button class="btn btn-toggle-sidebar icon icon-close" data-action="toggle-sidebar" data-sidebar="#sidebar"></button>
		
				<div class="avatar p-5">
					<img src="${window.location.origin}/Client/dashboard/assets/images/avatar.jpg" alt="">
					<div class="info" ref="username">nbb</div>
				</div>
				<ul class="sidebar-items">
					<li class=""><a href="#"><i class="sidebar-icon fa fa-home"></i><span>Home</span></a></li>
					<li class=""><a href="${window.location.origin}/Client/dashboard/admin/datatable.html"><i class="sidebar-icon fa fa-table"></i><span>Data Tables</span></a></li>
					<li class=""><a href="#"><i class="sidebar-icon fa fa-dashboard"></i><span>Dashboards</span></a></li>
					<li class=""><a href="#"><i class="sidebar-icon fa fa-user"></i><span>Users</span></a></li>
					<hr><br><br>
					<li class=""><a href="${window.location.origin}/Client/dashboard/logout.html"><i class="sidebar-icon fa fa-sign-out"></i><span>Logout</span></a></li>
				</ul>
			</div>
		`
	},
	onRender:function(){
		this.getRef("username").textContent = userInfo.username
	}
})