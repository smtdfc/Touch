app.staticComponent("admin-devices-page",function(controller){
let limit = 5
  let offset = 0
  let ids = {}
  controller.addDeviceInfo = function(info) {
    if (ids[info.device_id]) return
    ids[info.device_id] = true
    let tr = Turtle.createElement("tr")
    tr.id = `_${info.device_id}`
    tr.HTML = `
            <td>${info.device_id}</td>
            <td>${info.name}</td>
            <td>${info.createBy}</td>
            <td>${info.status}</td>
            <td>
              <button class="edit-btn btn btn-success fa fa-pencil" data-id="${info.device_id}" > Edit</button>
              <button class="remove-btn btn btn-danger fa fa-trash-o" data-id="${info.device_id}" > Remove</button>
            </td>
      `
    controller.ref("table").addChild(tr)
    tr.select(".edit-btn").on("click",function(e){
      let device_id = e.target.dataset.id
      app.router.redirect(`/admin/devices/${device_id}/edit`)
    })
    
    tr.select(".remove-btn").on("click", function(e) {
      let device_id = e.target.dataset.id
      showLoader()
      TouchApp.devices.remove(device_id)
        .then(()=>{
          document.getElementById(`_${device_id}`).remove()
        })
        
        .catch((err)=>{
          showMsg(err.message)
        })
        
        .finally(()=>{
          hideLoader()
        })
    })
  }

  controller.loadData = async function() {
    showLoader()
    let list = await TouchApp.devices.list(limit, offset)
    offset += list.length
    if (list.length == 0) {
      showMsg("No more data to display")
    }
    list.forEach(i => {
      controller.addDeviceInfo(i)
    })

    hideLoader()
  }

  controller.onRender = async function() {
    controller.loadData()
    controller.ref("load-more-btn").on("click", controller.loadData)
    controller.ref("create-device-form").on("submit", async function(e) {
      e.preventDefault()
      let name = controller.ref("device-name").val
      showLoader()
      TouchApp.devices.create(name)
        .then((i) => {
          controller.addDeviceInfo(i)
        })

        .catch((err) => {
          alert("Cannot create new device !")
        })

        .finally(() => {
          hideLoader()
        })

    })
  }
  return `
  <h1>List Device</h1> 
  <button class="btn btn-success fa fa-plus" data-action="toggle-modal" data-modal="#modal-create-device"> Add </button> 
  <div class="table-responsive">
    <table class="table table-border" style="width: 100%;" ref="table">
      <tr>
        <th>Device ID</th>
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
  <div class="modal" id="modal-create-device">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-header-text">Create new Device</h3>
        <button class="modal-close-btn fa fa-times" data-action="toggle-modal" data-modal="#modal-create-device"></button>
      </div>
      <div class="modal-body">
        <form action="#" class="form" ref="create-device-form">
          <div>
            <label for="" class="form-label">Device name</label><br>
            <input type="text" class="form-input" style="width:90%;" ref="device-name">
          </div>
          <button class="btn btn-rounded btn-info" data-action="toggle-modal" data-modal="#modal-create-device">Create</button>
        </form>
      </div>
    </div>
  </div>

  `
})