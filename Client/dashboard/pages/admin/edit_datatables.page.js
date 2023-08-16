app.staticComponent("admin-edit-dt-page", async function(controller) {
  showLoader()
  let dt_id = app.router.info.params.id ?? null
  let info = null
  if (!"dt_id") {
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
    tr.HTML = `
      <td>${info.user_id}</td>
      <td>${info.name}</td>
      <td>
       <button class="edit-btn btn btn-success" data-id="${info.user_id}" >Info</button> 
       <button class="remove-btn btn btn-danger" data-id="${info.user_id}">Remove</button>
      </td>
    `
    controller.ref("dt-owners").addChild(tr)
  }

  controller.onRender = function() {
    TouchApp.datatables.owners(dt_id)
      .then((list) => {
        list.forEach(controller.addOwner)
      })
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
            <p>Create by : ${info.createBy}</p>
          </div>
        </div>
       <div>
         <h2>Latest Data</h2>
         <div class="d-flex align-items-center" ref="update-dt-status" ><div class="dot dot-warn"></div> <span>Connecting ...</span> </div>
         <br>
          <div class="table-responsive" ref="dt-data">
            <table class="table table-border" style="width: 98%;">
              <tr>
                <th>Time</th>
                <th>Label</th>
                <th>Data</th>
              </tr>
            </table>
          </div>
        </div>
       <div>
         <h2>Owners</h2>
         <br>
         <button class="btn btn-success">Add owner</button>
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
  `
})