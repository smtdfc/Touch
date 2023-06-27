
window.Turtle.createComponent("list-dt", {
	render: function() {
		return `
				<div class="offcanvas offcanvas-right" id="create-dt">
					<div class="offcanvas-header">
						<h3 class="offcanvas-title">New Data Table</h3>
						<button class="offcanvas-close-btn p-5 fa fa-times" data-action="toggle-offcanvas" data-offcanvas="#create-dt" ></button>
					</div>
					<div class="offcanvas-body form text-align-center">
						<div class="d-flex align-items-center" >
							<label class="form-label">Name</label>
							<input type="text" ref="dt-name" class="form-input" style="width:98%;" >
						</div>
						<button ref="create-btn" class="btn btn-success"  >Create</button>
					</div>
				</div>
				<h1>List Data Tables</h1>
				<div class="btn-group">
					<button ref="refresh" class="btn btn-outline-primary fa fa-refresh"> Refresh</btn>
					<button ref="create" class="btn btn-outline-primary fa fa-plus-circle"> Create</btn>
				</div>
				<br>
				<div class ="d-flex justify-content-center" >
						<input ref="search" type="text" class="form-input" style="width:80%; border:none; border-radius:0px; border-bottom:solid; border-color:black;" placeholder="Search here . . ." >
				</div>
				<br>
				<div class="table-responsive">
						<table class="table table-border " ref="list" style="width:100%;">
							<tr>
								<th>Name</th>
								<th>Owner</th>
								<th>Actions</th>
							</tr>
						</table>
				</div>
				<div class = "d-flex justify-content-center" >
					<button ref="new" class="btn btn-rounded btn-outline-info fa fa-plus" style="font-size:20px;" > New</button> 
				</div>
		`
	},
	onRender: async function() {
		this.getRef("create").addEventListener("click", function() {
			selector.byQuery("#create-dt").classList.add("active")
		})
		this.getRef("new").addEventListener("click", function() {
			selector.byQuery("#create-dt").classList.add("active")
		})
		let ctx = this
		this.getRef("search").addEventListener("input", function(e) {
			let stxt = e.target.value.toUpperCase()
			let table = ctx.getRef("list")
			let tr = table.getElementsByTagName("tr");
			for (let i = 0; i < tr.length; i++) {
				let td = tr[i].getElementsByTagName("td")[0];
				if (td) {
					let txtValue = td.textContent || td.innerText;
					if (txtValue.toUpperCase().indexOf(stxt) > -1) {
						tr[i].style.display = "";
					} else {
						tr[i].style.display = "none";
					}
				}
			}
		}, false)
		this.getRef("create-btn").addEventListener("click", function(e) {
			selector.byQuery("#overlay1").classList.add("active")
			let name = ctx.getRef("dt-name").value
			app.dt.create(name)
				.then((result) => {
					ctx.getRef("list").innerHTML += `
							<tr>
								<td>${result.info.name}</td>
								<td>${result.info.owner}</td>
								<td>
									<div class="d-flex">
											<button class="btn btn-success fa fa-edit"> Edit</button>
											<button class="btn btn-danger fa fa-trash"> Delete</button>
									</div>
								</td>
							</tr>
						`
				})
				.catch((err) => {
					alert(err.message)
				})
				.finally(() => {
					selector.byQuery("#overlay1").classList.remove("active")
				})
		})

		let list = await app.dt.list()
		list.forEach(dt => {
			let tr = document.createElement("tr")
			tr.innerHTML = `
				<td>${dt.name}</td>
				<td>${dt.owner}</td>
				<td>
					<div class="d-flex">
						<button class="btn btn-success fa fa-edit"> Edit</button>
							<button class="btn btn-danger fa fa-trash"> Delete</button>
					</div>
				</td>
			`
			this.getRef("list").appendChild(tr)
		})

	}
})