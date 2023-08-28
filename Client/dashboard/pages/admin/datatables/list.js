let dt_table = null
let dt_info = {}
let limit = 5
let offset = 0
window.editDT = function(ctx) {
  let dt_id = ctx.dataset.dt
  App.router.redirect(`/admin/datatables/${dt_id}/edit`)
}

window.removeDT = function(ctx) {
  let dt_id = ctx.dataset.dt
  let ans = confirm("Delete this Datatable ! THIS MAY LOSE YOUR DATA !")
  if (!ans) return
  showLoader()
  TouchApp.datatables.remove(dt_id)
    .then(() => {
      offset--
      document.querySelector(`#_${dt_id}`).remove()
    })
    .catch((err) => {
      alert(`Cannot remove datatables \n${err.message}`)
    })
    .finally(() => {
      hideLoader()
    })
}

function createRow(info) {
  let tr = document.createElement("tr")
  tr.id = `_${info.dt_id}`
  tr.innerHTML = `
    <td>${info.dt_id}</td>
    <td>${info.name}</td>
    <td>${info.status}</td>
    <td>${info.createBy}</td>
    <td>
      <div class="d-flex align-items-center" style="min-width:50px">
        <div class="btn btn-outline-success  " data-dt="${info.dt_id}" onclick="editDT(this)">  <i class="icon fa fa-pencil"></i></div>
        <div class="btn btn-outline-danger ${(TouchApp.auth.currentUser.role == "admin" || TouchApp.auth.currentUser.user_id == info.createBy) ? "" : "d-none"} " data-dt="${info.dt_id}" onclick="removeDT(this)"> <i class="icon fa fa-trash"></i>  </div>
      </div>
    </td>
  `
  return tr
}

Turtle.component("create-dt-modal", function($) {
  $.onSubmit = function(e) {
    e.preventDefault()
    let name = $.refs.dtName.value
    showLoader()
    TouchApp.datatables.create(name)
      .then((info) => {
        dt_info[info.dt_id] = true
        dt_table.appendChild(createRow(info))
      })

      .catch((err) => {
        alert(`Cannot create new Datatable\n${err.message}`)
      })

      .finally(() => {
        hideLoader()
      })
  }

  $.onRender = function() {
    $.refs.form.addEventListener("submit", $.onSubmit)
  }
  return `
    <div class="modal" id="create-dt-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-header-text">Create new DataTable</h3>
          <button class="modal-close-btn fa fa-times" data-toggle="#create-dt-modal"></button>
        </div>
        <div class="modal-body" style="box-sizing: border-box; height: 150px;">
          <form action="#" ${Turtle.ref("form")}><br>
            <label for="username" class="form-label-floating" >
              <input type="text" placeholder="Datatable name" style="padding-top: 0px; width: 100%;" required ${Turtle.ref("dtName")}>
              <span>Datatable name</span>
            </label><br>
            <button class="btn btn-outline-primary" data-toggle="#create-dt-modal">Create</button>
          </form>
        </div>
      </div>
    </div>
  `
})

Turtle.component("list-dt-table", function($) {
  
  $.loadMore = function() {
    showLoader()
    TouchApp.datatables.list(limit, offset)
      .then(list => {
        if(!list) return
        offset += list.length
        list.forEach((item) => {
          if (dt_info[item.dt_id]) return
          dt_info[item.dt_id] = true
          $.refs.table.appendChild(createRow(item))
        })
      })

      .catch((err) => {
        showError(err.message)
      })
      .finally(() => {
        hideLoader()
      })
  }

  $.onRender = function() {
    dt_table = $.refs.table
    $.loadMore()
  }

  $.onRemove = function() {
    dt_table = null
    dt_info = {}
    limit = 5
    offset = 0
  }

  return `
    <div class="table-responsive">
      <table class="table table-border" style="width:100%;" ${Turtle.ref("table")}>
        <tr style="position:sticky">
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Create By</th>
          <th>Actions</th>
        </tr>
      </table>
    </div> 
    <div class = "d-flex justify-content-center" >
      <button class="btn btn-outline-primary" ${Turtle.events({click:$.loadMore})} >load more</button> 
    </div>
  `
})

Turtle.component("admin-list-dt-page", function($) {
  return `
    <h1> List Data Table</h1>
    <button class="btn btn-primary fa fa-plus" data-toggle="#create-dt-modal"> Create new</button>
    <list-dt-table></list-dt-table>
    <create-dt-modal></create-dt-modal>
  `
})