app.component("admin-edit-dt-page", async function(controller) {
  showLoader()
  let dt_id = app.router.info.params.id ?? null
  let info = null
  if (!dt_id) {
    return `
      <h1>Error! An error occurred. Please try again later !</h1>
    `
  }

  try {
    info = await TouchApp.datatables.info(dt_id)
  } catch (err) {
    hideLoader()
    return `
      <h1>This datatable cannot be edited </h1>
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

    controller.ref("dt-owners").addChild(tr)
    tr.select(".remove-btn").on("click", function(e) {
      let user_id = e.target.dataset.id
      showLoader()
      TouchApp.datatables.removeOwner(dt_id, user_id)
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

  controller.changeStatus = function(status) {
    if (status == "connected") {
      controller.ref("update-dt-status").HTML = `
        <div class="dot dot-success"></div> <span>Connected . Updating realtime </span>
      `
    }

    if (status == "error") {
      controller.ref("update-dt-status").HTML = `
        <div class="dot dot-danger"></div> <span>Cannot connect ! </span>
      `
    }
  }

  controller.onDTDataChange = function(data) {

    let tr = Turtle.createElement("tr")
    tr.HTML = `
      <td>${new Date(Date.now()).toUTCString()}</td>
      <td>${data.key}</td>
      <td>${data.value}</td>
      <td>${data.by}</td>
     `
    controller.ref("dt-data").addChild(tr)
  }

  controller.onRender = function() {
    controller.ref("add-owner-form").on("submit", function(e) {
      e.preventDefault()
      showLoader()
      let user_id = controller.ref("owner-id").val
      TouchApp.datatables.addOwner(dt_id, user_id)
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

    controller.ref("set-data-form").on("submit", function(e) {
      e.preventDefault()
      showLoader()
      let key = controller.ref("set-data-key").val
      let val = controller.ref("set-data-val").val
      TouchApp.dataIO.setData(
        key,
        val
      )
      hideLoader()
    })

    TouchApp.datatables.owners(dt_id)
      .then((list) => {
        list.forEach(controller.addOwner)
      })

    TouchApp.dataIO.setListener(dt_id)
      .then(() => {
        showMsg("Connected Datatable  ")
        controller.changeStatus("connected")
        TouchApp.on(`dataio:dt_${dt_id}_change`, controller.onDTDataChange)
      })

      .catch((err) => {
        controller.changeStatus("error")
      })

  }

  controller.onRemove = function() {
    TouchApp.dataIO.removeListener(dt_id)
    TouchApp.off(`dataio:dt_${dt_id}_change`, controller.onDTDataChange)
  }

  return `
    <h1>Edit DataTable</h1>
    <span>Datatables ID : <span> ${dt_id} </span></span>
    <br>
    <div class="tab" id="dt-edit-tab">
      <ul class="tab-items">
        <li class="active" data-action="open-tab" data-tab="#dt-edit-tab" data-index="0">Overview</li>
        <li data-action="open-tab" data-tab="#dt-edit-tab" data-index="1" >Latest data </li>
        <li data-action="open-tab" data-tab="#dt-edit-tab" data-index="2" >Owners </li>
      </ul>
      <div class="tab-contents">
        <div class="active">
          <h2>Overview</h2>
          <br>
          <div>
            <p> Datatable ID : ${dt_id}</p>
          </div>
          <div>
            <p> Datatable Name : ${info.name}</p>
          </div>
          <div>
            <p> Datatable Status : ${info.status}</p>
          </div>
          <div>
            <p>Create by user: ${info.createBy}</p>
          </div>
        </div>
       <div>
         <h2>Latest Data</h2>
         <div class="d-flex align-items-center" ref="update-dt-status" ><div class="dot dot-warn"></div> <span>Connecting ...</span> </div>
         <br>
         <button class="btn btn-success fa fa-pencil " data-action="toggle-modal" data-modal="#modal-set-data-dt" > Set data</button>
         <div class="table-responsive" >
            <table class="table table-border" style="width: 98%;" ref="dt-data">
              <tr>
                <th>Time</th>
                <th>Key</th>
                <th>Data</th>
                <th>By</th>
              </tr>
            </table>
          </div>
        </div>
        <div>
         <h2>Owners</h2>
         <br>
         <button class="btn btn-success fa fa-user-plus" data-action="toggle-modal" data-modal="#modal-add-owner-dt" > Add owner</button>
          <div class="table-responsive">
            <table class="table table-border" ref="dt-owners" style="width: 98%;">
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Actions</th>
              </tr>
            </table>
          </div>
         </div>
     </div>
    <div class="modal" id="modal-add-owner-dt">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-header-text">Add owner</h3>
          <button class="modal-close-btn fa fa-times" data-action="toggle-modal" data-modal="#modal-add-owner-dt"></button>
        </div>
        <div class="modal-body">
          <form action="#" class="form" ref="add-owner-form">
            <div>
              <label for="" class="form-label">User ID</label><br>
              <input type="text" class="form-input" style="width:90%;" ref="owner-id">
            </div>
            <button class="btn btn-rounded btn-info" data-action="toggle-modal" data-modal="#modal-add-owner-dt">Add</button>
          </form>
        </div>
      </div>
    </div>

    <div class="modal" id="modal-set-data-dt">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-header-text">Set Data </h3>
          <button class="modal-close-btn fa fa-times" data-action="toggle-modal" data-modal="#modal-set-data-dt"></button>
        </div>
        <div class="modal-body">
          <form action="#" class="form" ref="set-data-form">
            <div>
              <label for="" class="form-label">Key</label><br>
              <input type="text" class="form-input" style="width:90%;" ref="set-data-key">
            </div>
            <div>
              <label for="" class="form-label">Value</label><br>
              <input type="text" class="form-input" style="width:90%;" ref="set-data-val">
            </div>

            <button class="btn btn-rounded btn-info" data-action="toggle-modal" data-modal="#modal-set-data-dt">Set</button>
          </form>
        </div>
      </div>
    </div>
  `
})