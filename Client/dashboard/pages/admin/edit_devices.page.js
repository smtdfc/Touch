app.component("admin-edit-device-page", async function(controller) {
  showLoader()
  let device_id = app.router.info.params.id ?? null
  let info = null
  if (!device_id) {
    return `
      <h1>Error! An error occurred. Please try again later !</h1>
    `
  }

  try {
    info = await TouchApp.devices.info(device_id)
  } catch (err) {
    hideLoader()
    return `
      <h1>This device cannot be edited </h1>
      <p>Cause : ${err.message}</p>
    `
  }
  hideLoader()

  controller.addOwner = function(info) {
    let tr = Turtle.createElement("tr")
    tr.id = `_${info.user_id}`
    tr.HTML = `
      <td>${info.user_id}</td>
      <td>${info.name}</td>
      <td>
       <button class="edit-btn btn btn-success fa fa-info" data-id="${info.user_id}" > Info</button> 
       <button class="remove-btn btn btn-danger fa fa-user-times" data-id="${info.user_id}"> Remove</button>
      </td>
    `

    controller.ref("device-owners").addChild(tr)
    tr.select(".remove-btn").on("click", function(e) {
      let user_id = e.target.dataset.id
      showLoader()
      TouchApp.devices.removeOwner(device_id, user_id)
        .then(() => {
          document.getElementById(`_${user_id}`).remove()
        })

        .catch((err) => {
          alert(`Cannot remove owner \n${err.message}`)
        })

        .finally(() => {
          hideLoader()
        })
    })
  }

  controller.refreshDTInfo = function() {
    showLoader()
    controller.ref("datastorage-tab-note").classList.add("d-none")
    TouchApp.datatables.info(info.datatable)
      .then((info) => {
        controller.ref("device-dt-name").text = info.name
        controller.ref("device-dt-status").text = info.status
        controller.ref("device-dt-createby").text = info.createBy
      })

      .catch((err) => {
        showError(`Warning: The DataTable associated with this device does not appear to be working! Please double check your access to this DataTable `)
        controller.ref("datastorage-tab-note").classList.remove("d-none")
        controller.ref("datastorage-tab-note").text = err.message
      })

      .finally(() => {
        hideLoader()
      })
  }

  controller.onRender = function() {
    controller.ref("device-dtinfo-reload").on("click", controller.refreshDTInfo)
    controller.ref("add-owner-form").on("submit", function(e) {
      e.preventDefault()
      showLoader()
      let user_id = controller.ref("owner-id").val
      TouchApp.devices.addOwner(device_id, user_id)
        .then((user) => {
          controller.addOwner(user)
        })
        .catch(err => {
          alert(`Cannot add owner \n ${err.message}`)
        })
        .finally(() => {
          hideLoader()
        })
    })


    TouchApp.devices.owners(device_id)
      .then((list) => {
        list.forEach(controller.addOwner)
      })
    controller.refreshDTInfo()
  }

  return `
    <h1>Edit Device</h1>
    <span>Device ID : <span> ${device_id} </span></span>
    <br>
    <div class="tab" id="device-edit-tab">
      <ul class="tab-items">
        <li class="active" data-action="open-tab" data-tab="#device-edit-tab" data-index="0">Overview</li>
        <li data-action="open-tab" data-tab="#device-edit-tab" data-index="1" >Owners </li>
        <li data-action="open-tab" data-tab="#device-edit-tab" data-index="2" >Data Storage</li>
      </ul>
      <div class="tab-contents">
        <div class="active">
          <h2>Overview</h2>
          <br>
          <div>
            <p> Datatable ID : ${device_id}</p>
          </div>
          <div>
            <p> Datatable Name : ${info.name}</p>
          </div>
          <div>
            <p> Datatable Status : ${info.status}</p>
          </div>
          <div>
            <p>Create by : ${info.createBy}</p>
          </div>
        </div>
        <div>
         <h2>Owners</h2>
         <br>
         <button class="btn btn-success fa fa-user-plus" data-action="toggle-modal" data-modal="#modal-add-owner-device" > Add owner</button>
          <div class="table-responsive">
            <table class="table table-border" ref="device-owners" style="width: 98%;">
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Actions</th>
              </tr>
            </table>
          </div>
         </div>
         <div>
          <h2>Data Storage</h2>
          <h5>The data sent from your device will be saved in the DataTable : <span>${info.datatable}</span></h5>
          <div ref="datastorage-tab-note" class="d-none note note-danger">sbbshs</div>
          <div class="accordion-group">
            <div class="accordion active" id="dt-info">
              <div class="accordion-header" data-action="toggle-accordion" data-accordion="#dt-info">
                DataTable Infomation
              </div>
              <div class="accordion-body">
               <div class="table-responsive">
                  <table class="table table-border" style="width: 100%;">
                    <tr>
                      <td>Name</td>
                      <td ref="device-dt-name">??</td>
                    </tr>
                    <tr>
                      <td>CreateBy</td>
                      <td ref="device-dt-createby">??</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td ref="device-dt-status">???</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <button ref="device-dtinfo-reload" class="btn btn-primary">Refresh</button>
            <button class="btn btn-primary">Change</button>
          </div>
         </div>
     </div>
    <div class="modal" id="modal-add-owner-device">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-header-text">Add owner</h3>
          <button class="modal-close-btn fa fa-times" data-action="toggle-modal" data-modal="#modal-add-owner-device"></button>
        </div>
        <div class="modal-body">
          <form action="#" class="form" ref="add-owner-form">
            <div>
              <label for="" class="form-label">User ID</label><br>
              <input type="text" class="form-input" style="width:90%;" ref="owner-id">
            </div>
          <button class="btn btn-rounded btn-info" data-action="toggle-modal" data-modal="#modal-add-owner-device">Add</button>
          </form>
        </div>
      </div>
    </div>
  `
})