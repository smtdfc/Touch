Turtle.component("list-datatable-page", function($) {
  let limit = 10
  let offset = 0
  let dt_ids = {}
  $.addRow = function(info) {
    if (dt_ids[info.dt_id]) return
    dt_ids[info.dt_id] = true
    let tr = document.createElement("tr")
    tr.innerHTML = `
      <td>${info.dt_id}</td>
      <td>${info.name}</td>
      <td><span class="badge text-bg-${info.status == "active" ? "success":"danger"}" >${info.status}</span></td>
      <td>${info.createBy == TouchApp.auth.currentUser.user_id ? "You" : `User:${info.createBy}`}</td>
      <td class="d-flex">
        <button data-role="edit" class="btn btn-sm btn-success m-1">Edit</button>
        <button data-role="remove"class="btn btn-sm btn-danger m-1">Remove</button>
      </td>
    `
    tr.querySelector(`button[data-role=edit]`).addEventListener("click", function() {

    })

    tr.querySelector(`button[data-role=remove]`).addEventListener("click", function() {
      function accept() {
        showLoader()
        TouchApp.datatables.remove(info.dt_id)
          .then(() => {
            tr.remove()
          })

          .catch((err) => {
            showErr(err.message)
          })

          .finally(() => {
            hideLoader()
          })
      }

      showConfirm({
        title: "Are you sure ?",
        content: `This action will delete DataTable "${info.name}" . AND YOU WILL LOSE THE TABLE OF DATA !`,
        acceptBtn: "Remove",
        btnAcceptType: "outline-danger",
        onAccept: accept
      })
    })
    $.refs.table.appendChild(tr)
  }
  $.loadMore = function() {
    showLoader()
    TouchApp.datatables.list(limit, offset)
      .then(list => {
        offset += list.length
        list.forEach((item) => {
          $.addRow(item)
        })
      })
      .catch(err => showErr(err.message))
      .finally(() => hideLoader())
  }

  $.onRender = function() {
    $.loadMore()
  }
  
  $.create = function(){
    let name = $.refs.dtName.value
    showLoader()
    TouchApp.datatables.create(name)
      .then(info=>{
        $.addRow(info)
        showMsg("DataTable has been created !")
      })
      
      .catch((err)=>{
        showErr(err.message)
      })
      
      .finally(()=>hideLoader())
  }
  
  return `
    <h1>List DataTable</h1>
    <br>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#create-dt-modal">
      <i class="fa fa-plus"></i>
      New
    </button>
    <br>
    <div class="table-responsive">
      <table class="table" style="width:100%;">
        <thead>
          <tr>
            <th scope="col">Datatable ID</th>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Create By</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody ${Turtle.ref("table")}></tbody>
      </table>
    </div>
    <div class="d-flex justify-content-center">
      <button class="btn btn-sm" ${Turtle.events({click:$.loadMore})} >Load more</button>
    </div>
    <div class="modal fade " id="create-dt-modal" tabindex="-1" aria-labelledby="createdt_label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="createdt_label">Create new DataTable</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="dt-name" class="form-label">DataTable name</label>
              <input type="text" class="form-control" id="dt-name" ${Turtle.ref("dtName")}>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cancel</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" ${Turtle.events({click:$.create})}> Create </button>
          </div>
        </div>
      </div>
    </div>
  `
})