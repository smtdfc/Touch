Turtle.createComponent("page-admin-dt", {
  render: function() {
    return `
      <h1>List DataTable</h1>
      <div class="d-flex">
          <button class="btn btn-primary" data-action="toggle-modal" data-modal="#create-dt-modal"><i class="fa fa-plus"></i> Add</button>
          <button class="btn btn-primary"><i class="fa fa-refresh"></i> Refresh</button>
          <button class="btn btn-primary">Add</button>
      </div>
      <br><br>
      <div class="table-responsive">
        <table class="table table-border" style="width:90%;" ref="table">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
          
        </table>
        <div ref="loader" class="d-none d-flex justify-content-center d-nk">
            <div class="circle-loader" style="border-color:#00FF6E4D; border-top-color:#00FF6E;" ></div>
        </div>
        <div class="d-flex justify-content-center">
          <button ref="load-more" class="btn btn-outline-success">Load more</button>
        </div>
      </div>
      <div class="modal" id="create-dt-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-header-text">Create new DataTable</h3>
            <button class="modal-close-btn fa fa-times" data-action="toggle-modal" data-modal="#create-dt-modal"></button>
          </div>
          <div class="modal-body">
            <div class="field">
              <label for="" class="form-label">Datatable Name</label>
              <br>
              <input ref="dt-name" type="text" class="form-input" style="width: 100%;">
            </div>
            <button ref="create-dt-btn" class="btn btn-primary">Create</button>
          </div>
        </div>
      </div>
    `
  },
  onFirstRender: function() {
    let ctx = this
    let limit = 5
    let offset = -1
    let count = 0
    this.ref("load-more").on("click",async function(e){
      ctx.ref("loader").classList.remove("d-none")
      e.target.classList.add("d-none")
      await ctx.displayDTInfo()
      e.target.classList.remove("d-none")
      ctx.ref("loader").classList.add("d-none")
    })
    
    this.ref("create-dt-btn").on("click", function() {
      let dtName = ctx.ref("dt-name").val
      showLoader()
      app.DT.create(dtName)
        .then((info) => {
          ctx.data.caches[info.dt_id] = true
          let tr = Turtle.createElement("tr")
          tr.HTML = `
            <td>${info.dt_id}</td>
          `
          ctx.ref("table").addChild(tr)
        })
        .catch(err => {
          alert(err.message)
        })
        .finally(() => {
          selector.byId("create-dt-modal").classList.remove("active")
        })
    })

    this.displayDTInfo = async function() {
      offset = limit*count
      count++
      let list = await app.DT.getAll(limit, offset)
      list.forEach(dt_info => {
       
        if (ctx.data.caches[dt_info.dt_id] == undefined) {
          ctx.data.caches[dt_info.dt_id] = true
          let tr = Turtle.createElement("tr")
          tr.HTML = `
            <td>${dt_info.dt_id}</td>
            <td>${dt_info.name}</td>
            <td>${dt_info.status}</td>
          `
          ctx.ref("table").addChild(tr)
        }
      })
    }
    this.displayDTInfo()
    this.displayDTInfo()
    this.displayDTInfo()
    this.displayDTInfo()
    //document.body.addEventListener("scroll", this.infinityScroll)
  },
  onCreate: function() {
    this.data.caches = {}
  },
  onRemove: function() {
   // document.body.removeEventListener("scroll", this.infinityScroll)
  }
})