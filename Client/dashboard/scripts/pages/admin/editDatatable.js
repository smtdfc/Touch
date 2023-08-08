Turtle.createComponent("page-admin-edit-dt",{
  render:function(){
    return `
    <div style="padding:10px" >
    
    <button class="btn link btn-rounded" href="#/admin/datatables"><i class="fa fa-arrow-left"></i> Return</button> 
    <br> <br>
    <h1 style="margin:0;" >Edit Datatable</h1>
    <p style="margin-left:5px;" >Datatable ID : <span ref="dt-id">???</span></p>
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
          <p>Owners:<span></span></p>
         </div>
       </div>
       <div>
         
       </div>
      </div>
    </div>
    </div>
    `
  },

  onFirstRender:function(){
    this.data.dt_info = {}
    this.ref("dt-id").text = this.data.dt
    this.ref("overview-dt-id").text = this.data.dt
  },

  onCreate:function(){
    this.data.dt = Router.routeInfo.params.id
  }
  
})