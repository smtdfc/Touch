Turtle.component("edit-dt-data-tab", function($) {
  let dt_id = app.router.info.params.id
  $.changeStatus = function(status) {
    switch (status) {
      case "connected":
        $.refs.status.className = "badge text-bg-success"
        $.refs.status.textContent = "Connected"
        break
      case "failed":
        $.refs.status.className = "badge text-bg-danger"
        $.refs.status.textContent = "Connect Failed"
        break
      case "reconnect":
        $.refs.status.className = "badge text-bg-warning"
        $.refs.status.textContent = "Reconnecting"
        break
      case "update":
        $.refs.status.className = "badge text-bg-warning"
        $.refs.status.textContent = "Updating"
        break
    }
  }

  $.onData = function(info) {
    $.changeStatus("update")
    $.refs.lastupdate.textContent =`Last update : ${new Date().toUTCString()}`
    let tr = document.createElement("tr")
    tr.innerHTML = `
      <td>${new Date().toISOString()}</td>
      <td>${info.key}</td>
      <td>${info.value}</td>
      <td>${info.by}</td>
    `
    $.refs.table.appendChild(tr)
    $.changeStatus("connected")
  }

  $.onRender = async function() {
    TouchApp.dataIO.setListener(dt_id)
      .then(() => {
        $.changeStatus("connected")
        TouchApp.on(`dataio:dt_${dt_id}_change`, $.onData)
      })
      .catch((err) => {
        $.changeStatus("failed")
        showErr(err.message)
      })
  }

  $.onRemove = function() {
    TouchApp.dataIO.removeListener(dt_id)
    TouchApp.off(`dataio:dt_${dt_id}_change`, $.onData)
  }

  return `
    <p>ID : ${dt_id} <span class="badge text-bg-warning" ${Turtle.ref("status")}>Connecting</span></p>
    <i ${Turtle.ref("lastupdate")}>Last update:${new Date().toUTCString()}</i>
    <hr>
    <div class="table-responsive">
      <table class="table ">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Key</th>
            <th scope="col">Value</th>
            <th scope="col">By</th>
          </tr>
        </thead>
        <tbody ${Turtle.ref("table")}></tbody>
      </table>
    </div>
  `
})

Turtle.component("edit-datatable-page", async function($) {
  let dt_id = app.router.info.params.id
  showLoader()
  let info = await TouchApp.datatables.info(dt_id)
  hideLoader()
  return `
  <div class="d-flex align-items-center bg-light">
    <a class="btn btn-rounded p-1 m-3" href="#/datatables/list" ><i class="fa fa-arrow-left"></i></a>
    <h5 class="m-0" >Edit DataTable</h5>
  </div>

  <nav>
    <div class="nav nav-underline" id="nav-tab" role="tablist"  >
      <button class="nav-link active" id="nav-overview-tab" data-bs-toggle="tab" data-bs-target="#nav-overview" type="button" role="tab" aria-controls="nav-overview" aria-selected="true">Overview</button>
      <button class="nav-link" id="nav-data-tab" data-bs-toggle="tab" data-bs-target="#nav-data" type="button" role="tab" aria-controls="nav-data" aria-selected="false">Data</button>
      <button class="nav-link" id="nav-owners-tab" data-bs-toggle="tab" data-bs-target="#nav-owner" type="button" role="tab" aria-controls="nav-owners" aria-selected="false">Owners</button>
      <button class="nav-link" id="nav-settings-tab" data-bs-toggle="tab" data-bs-target="#nav-settings" type="button" role="tab" aria-controls="nav-settings" aria-selected="false" >Settings</button>
    </div>
  </nav>
  <div class="tab-content" id="nav-tabContent">
    <div class="tab-pane fade show active p-3" id="nav-overview" role="tabpanel" aria-labelledby="nav-overview-tab" tabindex="0">
      <h5>Overview</h5>
      <div class="p-3">
        <p>ID :${info.dt_id}</p>
        <p>Name :${info.name}</p>
        <p>Status :${info.status}</p>
        <p>Create By :${info.createBy}</p>
      </div>
    </div>
    <div class="tab-pane fade p-3" id="nav-data" role="tabpanel" aria-labelledby="nav-data-tab" tabindex="0">
      <h5>Data</h5>
      <edit-dt-data-tab></edit-dt-data-tab>
    </div>
    <div class="tab-pane fade" id="nav-owners" role="tabpanel" aria-labelledby="nav-owners-tab" tabindex="0">...</div>
    <div class="tab-pane fade" id="nav-settings" role="tabpanel" aria-labelledby="nav-settings-tab" tabindex="0">...</div>
  </div>
  `
})