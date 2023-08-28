let dt_id = null
let dt_info = {}

Turtle.component("dt-edit-data-tab", function($) {
  $.addRow = function(info) {
    
    let tr = document.createElement("tr")
    tr.innerHTML = `
      <td>${new Date().toUTCString()}</td>
      <td>${info.key}</td>
      <td>${info.value}</td>
      <td>${info.by}</td>
    `
    $.refs.rows.appendChild(tr)
  }
  
  $.onDataAdded = function(info){
    $.addRow(info)
  }
  
  $.onRemove = function(){
    console.log(dt_id);
    TouchApp.off(`dataio:dt_${dt_id}_change`,$.onDataAdded)
  }
  TouchApp.on(`dataio:dt_${dt_id}_change`,$.onDataAdded)
  
  
  return `
    <h3>Real-time data reader </h3>
    <div class="table-responsive">
      <table class="table table-border" style="width:100%" >
        <thead>
          <tr>
            <th>Time</th>
            <th>Key</th>
            <th>Value</th>
            <th>By</th>
          </tr>
        </thead>
        <tbody ${Turtle.ref("rows")}>
          
        </tbody>
      </table>
    </div>
  `
})

Turtle.component("dt-edit-owner-tab", function($) {
  $.addRow = function(info) {
    let tr = document.createElement("tr")
    tr.innerHTML = `
        <td>${info.user_id}</td>
        <td>${info.name}</td>
        <td>
          <div class="d-flex align-items-center" style="min-width:50px">
            <div class="btn btn-outline-success  info-btn" >  <i class="icon fa fa-info"></i></div>
            <div class="btn btn-outline-danger rm-btn" > <i class="icon fa fa-trash"></i>  </div>
          </div>
        </td>
      `
    tr.querySelector(".info-btn").addEventListener("click", function() {

    })

    tr.querySelector(".rm-btn").addEventListener("click", function() {
      let ans = confirm(`Delete this owner : ${info.name} ?`)
      if (!ans) return
      showLoader()
      TouchApp.datatables.removeOwner(dt_id, info.user_id)
        .then(() => {
          tr.remove()
        })
        .catch((err) => {
          showError(err.message)
        })
        .finally(() => {
          hideLoader()
        })
    })

    $.refs.table.appendChild(tr)
  }

  $.addOwner = function() {
    let owner = $.refs.owner.value
    console.log(owner);
    showLoader()
    TouchApp.datatables.addOwner(dt_id, owner)
      .then((info) => {
        $.addRow(info)
      })
      .catch((err) => {
        showMsg(err.message)
      })
      .finally(() => {
        hideLoader()
      })
  }

  $.onRender = function() {
    
    $.refs.form.addEventListener("submit", function(e) {
      e.preventDefault()
      $.addOwner()
    })

    TouchApp.datatables.owners(dt_id)
      .then((list) => {
        list.forEach((owner) => {
          $.addRow(owner)
        })
      })
  }

  return `
    <h3>List owner</h3>
    <button class="btn btn-primary fa fa-plus" data-toggle="#add-owner-modal" > Add owner</button>
    <div class="table-responsive">
      <table class="table table-border" style="width:100%;" ${Turtle.ref("table")}>
        <tr style="position:sticky">
          <th>ID</th>
          <th>Username</th>
          <th>Actions</th>
        </tr>
      </table>
    </div>
    <div class="modal" id="add-owner-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-header-text">Add owner </h3>
          <button class="modal-close-btn fa fa-times" data-toggle="#add-owner-modal"></button>
        </div>
        <div class="modal-body" style="box-sizing: border-box; height: 150px;">
          <form action="#" ${Turtle.ref("form")}><br>
            <label for="username" class="form-label-floating" >
              <input type="text" placeholder="User ID" style="padding-top: 0px; width: 100%;" required ${Turtle.ref("owner")}>
              <span>User ID :</span>
            </label><br>
            <button class="btn btn-outline-primary" data-toggle="#add-owner-modal">Add</button>
          </form>
        </div>
      </div>
    </div>
  `
})

Turtle.component("dt-edit-overview-tab", function($) {
  $.onRender = function() {
    TouchApp.datatables.info(dt_id)
      .then(info => {
        
        dt_info = info
        $.refs.id.textContent = info.dt_id
        $.refs.name.textContent = info.name
        $.refs.status.textContent = info.status
        $.refs.createBy.textContent = info.createBy
      })

      .catch((err) => {
        alert(err.message)
        window.history.back()
        showMsg(err.message)
      })
  }

  return `
    <div class="accordion-group">
      <div class="accordion active" id="accord-1">
        <h3 class="accordion-header" data-toggle="#accord-1">
          Infomation
        </h3>
        <div class="accordion-body">
          <h4>Name : <span ${Turtle.ref("name")}></span></h4>
          <h4>ID : <span ${Turtle.ref("id")}></span></h4>
          <h4>Status : <span ${Turtle.ref("status")}></span></h4>
          <h4>Create by : <span ${Turtle.ref("createBy")}></span></h4>
        </div>
      </div>
    </div>
  `
})

Turtle.component("admin-edit-dt-page", function($) {
  dt_id = App.router.info.params.id
  
  $.onRender = function(){
    TouchApp.dataIO.setListener(dt_id)
  }
  
  $.onRemove = function(){
    TouchApp.dataIO.removeListener(dt_id)
  }
  return `
    <h1>Edit DataTable</h1> 
    <p> DataTable ID: ${dt_id}</p>
    <div class="tab" id="dt-edit-tab">
      <ul class="tab-items">
        <li class="active" data-opentab="#dt-edit-tab" data-idx=0 >Overview</li>
        <li data-opentab="#dt-edit-tab" data-idx=1 >Data </li>
        <li data-opentab="#dt-edit-tab" data-idx=2>Owners</li>
      </ul>
      <div class="tab-contents" style="padding:0">
        <div class="active" >
          <dt-edit-overview-tab></dt-edit-overview-tab>
        </div>
        <div>
          <dt-edit-data-tab></dt-edit-data-tab>
        </div>
        <div>
          <dt-edit-owner-tab></dt-edit-owner-tab>
        </div>
      </div>
    </div>
  `
})