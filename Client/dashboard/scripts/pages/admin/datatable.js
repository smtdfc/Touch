Turtle.createComponent("admin-datatable-page", {
  render:function(){
    return `

    <div class="">
      <h1>List Data Table</h1>
      <button class="btn btn-primary fa fa-plus" > Create</button>
      <div ref="loader" class="line-loader d-none" style="height:2px;" ><span class="bar"></span></div>
      <div class="table-responsive" style="width:100%;" >
        <table class="table table-border" style="width:100%" ref="tables" >
          <tr>
            <th>DataTable ID</th>
            <th>Name</th>
            <th>Owners</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </table>
      </div>
    </div>
    `
  },
  onRemove:function(){
    console.log(1);
  },
  onCreate:function(){
    
  },
  onFirstRender:async function(){
    this.ref("loader").classList.remove("d-none")
    let list = await app.datatables.getAll()
    list.forEach((dt)=>{
      let tr = Turtle.createElement("tr")
      
    })
    this.ref("loader").classList.add("d-none")
  }

})