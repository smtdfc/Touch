Turtle.createComponent("page-admin-edit-dt",{
  render:function(){
    return `
    <div style="padding:10px" >
    
    <button class="btn link btn-rounded" href="#/admin/datatables"><i class="fa fa-arrow-left"></i> Return</button> 
    <br> <br>
    <h1 style="margin:0;" >Edit Datatable</h1>
    <p style="margin-left:5px;" >Datatable ID : <span ref="dt-id">???</span> <span class="armorial" ref="dt-status"></span></p>
    <div class="tab" id="dt-edit-tab">
      <ul class="tab-items">
        <li class="active" data-action="open-tab" data-tab="#dt-edit-tab" data-index="0">Overview</li>
        <li data-action="open-tab" data-tab="#dt-edit-tab" data-index="1">Data</li>
        <li>Settings</li>
      </ul>
      <div class="tab-contents">
       <div class="active">
         <h1>Overview</h1><br>
         <div>
          <p>Datatable Name: <span ref="overview-dt-name"> ... </span></p>
          <p>Datatable ID: <span ref="overview-dt-id"> ... </span></p>
          <p>Owners: </p>
          <table class="table table-border" ref="overview-dt-owners" style="width:100%" >
            <tr>
              <th>User name</th>
              <th>User ID</th>
            </tr>
          </table>
         </div>
       </div>
       <div>
         
       </div>
      </div>
    </div>
    </div>
    `
  },

  onFirstRender:async function(){
    this.data.dt_info = {}
    this.ref("dt-id").text = this.data.dt
    this.ref("overview-dt-id").text = this.data.dt
    this.data.dt_info = await app.DT.info(this.data.dt)
    this.ref("overview-dt-name").text = this.data.dt_info.name
    this.data.dt_info.owners.forEach(owner_info=>{
      this.ref("overview-dt-owners").HTML+= `
        <tr>
          <td>${owner_info.name} ${owner_info.user_id==app.auth.currentUser.user_id?"( You )":""}</td>
          <td>${owner_info.user_id}</td>
        </tr>`
    })
    if(this.data.dt_info.status == "active"){
      this.ref("dt-status").text="Active"
      this.ref("dt-status").classList.add("active")
    }
    
  },

  onCreate:function(){
    this.data.dt = Router.routeInfo.params.id
  }
  
})