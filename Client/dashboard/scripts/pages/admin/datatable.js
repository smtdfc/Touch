Turtle.createComponent("admin-datatable-page", {
  render: function() {
    return `

    <div class="">
      <h1>List Data Table</h1>
      <button class="btn btn-primary fa fa-plus" ref="create-btn"  > Create</button>
      <div ref="loader" class="line-loader d-none" style="height:2px;" ><span class="bar"></span></div>
      <div class="table-responsive" style="width:100%;" >
        <table class="table table-border" style="width:100%" ref="tables" >
          <tr>
            <th>DataTable ID</th>
            <th>Name</th>
            <th>Create By</th>
            <th>Owners</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </table>
        <div class="d-flex justify-content-center">
          <button class="btn" ref="loadmore-btn" >Load more</button>
        </div>
      </div>
    </div>
    `
  },
  onRemove: function() {

  },
  onCreate: function() {

  },
  onFirstRender: async function() {
    let ctx = this
    this.data.ids = {}
    this.data.limit = 10
    this.data.page = 0
    this.ref("loader").classList.remove("d-none")
    let list = await app.datatables.getAll(this.data.limit, this.data.page * this.data.limit)
    list.forEach((dt) => {
      let tr = Turtle.createElement("tr")
      this.data.ids[dt.dt_id] = true
      tr.HTML = `
        <td>${dt.dt_id}</td>
        <td>${dt.name}</td>
        <td>${dt.createBy}</td>
        <td>${dt.owners}</td>
        <td><div class="armorial ${dt.status =="active" ? "success" : "failed"}">${dt.status}</div></td>
        <td>
          <div class="d-flex">
            <button class="btn" >Edit</button>
            <button class="btn" >Remove</button>
          </div>
        </td>
      `
      this.ref("tables").addChild(tr)
    })
    this.ref("loader").classList.add("d-none")
    this.ref("create-btn").on("click", function() {
      let name = prompt("Name of datatable ?", "Example1")
      openOverlay()
      app.datatables.create(name)
        .then((dt) => {
          ctx.data.ids[dt.id] = true
          let tr = Turtle.createElement("tr")
          tr.HTML = `
                  <td>${dt.dt_id}</td>
                  <td>${dt.name}</td>
                  <td>${dt.createBy}</td>
                  <td>${dt.owners}</td>
                  <td><div class="armorial ${dt.status =="active" ? "success" : "failed"}">${dt.status}</div></td>
                  <td>
                    <div class="d-flex">
                      <button class="btn" >Edit</button>
                      <button class="btn" >Remove</button>
                    </div>
                  </td>
                `
          ctx.ref("tables").addChild(tr)
        })
        .catch(err => {
          alert(err.message)
        })
        .finally(() => {
          closeOverlay()
        })
    })
    this.ref("loadmore-btn").on("click", async function() {
      ctx.data.page += 1
      let list = await app.datatables.getAll(ctx.data.limit, ctx.data.page * ctx.data.limit)
      if (list.length == 0) {
        ctx.data.page -= 1
      }
      list.forEach((dt) => {
        if (!ctx.data.ids[dt.dt_id]) {
          let tr = Turtle.createElement("tr")
          tr.HTML = `
              <td>${dt.dt_id}</td>
              <td>${dt.name}</td>
              <td>${dt.createBy}</td>
              <td>${dt.owners}</td>
              <td><div class="armorial ${dt.status =="active" ? "success" : "failed"}">${dt.status}</div></td>
              <td>
                <div class="d-flex">
                  <button class="btn" >Edit</button>
                  <button class="btn" >Remove</button>
                </div>
              </td>
            `
          ctx.ref("tables").addChild(tr)
        }
      })
    })
  }

})