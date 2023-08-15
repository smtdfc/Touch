app.staticComponent("admin-dt-page",function(controller){
  let limit = 5
  let offset = 0
  let ids ={}
  controller.loadData = async function(){
    showLoader()
    let list = await TouchApp.datatables.list(limit,offset)
    offset+= list.length
    if (list.length == 0) {
      showMsg("No more data to display")
    }
    list.forEach(i=>{
      if(ids[i.dt_id]) return 
      ids[i.dt_id] = true
      let tr = Turtle.createElement("tr")
      tr.HTML = `
            <td>${i.dt_id}</td>
            <td>${i.name}</td>
            <td>${i.createBy}</td>
            <td>${i.status}</td>
            <td>
              <button class="btn btn-success">Edit</button>
              <button class="btn btn-danger">Remove</button>
            </td>
      `
      controller.ref("table").addChild(tr)
    })
    
    hideLoader()
  }
  
  controller.onRender = async function(){
    controller.loadData()
    controller.ref("load-more-btn").on("click",controller.loadData)
    controller.ref("create-dt-form").on("submit",async function(e){
      e.preventDefault()
      let name = controller.ref("dt-name").val
      showLoader()
      TouchApp.datatables.create(name)
        .then((i)=>{
          ids[i.dt_id] = true
          let tr = Turtle.createElement("tr")
          tr.HTML = `
            <td>${i.dt_id}</td>
            <td>${i.name}</td>
            <td>${i.createBy}</td>
            <td>${i.status}</td>
            <td>
              <button class="btn btn-success">Edit</button>
              <button class="btn btn-danger">Remove</button>
            </td>
                `
          controller.ref("table").addChild(tr)
        })
        
        .catch(()=>{
          alert("Cannot create new datatable !")
        })
        
        .finally (()=>{
          hideLoader()
        })
      
    })
  }
  return `
  <h1>List Datatables</h1> 
  <button class="btn btn-success fa fa-plus" data-action="toggle-modal" data-modal="#modal-create-dt"> Add </button> 
  <div class="table-responsive">
    <table class="table table-border" style="width: 100%;" ref="table">
      <tr>
        <th>Datatable ID</th>
        <th>Name</th>
        <th>Create By</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </table> 
  </div>
  <div class = "d-flex justify-content-center" >
    <button ref="load-more-btn" class="btn btn-success">Load more</button> 
  </div>
  <div class="modal" id="modal-create-dt">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-header-text">Create new Datatable</h3>
        <button class="modal-close-btn fa fa-times" data-action="toggle-modal" data-modal="#modal-create-dt"></button>
      </div>
      <div class="modal-body">
        <form action="#" class="form" ref="create-dt-form">
          <div>
            <label for="" class="form-label">Datatable name</label><br>
            <input type="text" class="form-input" style="width:90%;" ref="dt-name">
          </div>
          <button class="btn btn-rounded btn-info" data-action="toggle-modal" data-modal="#modal-create-dt">Create</button>
        </form>
      </div>
    </div>
  </div>

  `
})