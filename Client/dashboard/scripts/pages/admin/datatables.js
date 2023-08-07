Turtle.createComponent("page-admin-dt", {
  render: function() {
    return `
      <h1>List DataTable</h1>
      <div class="d-flex">
          <button class="btn btn-primary"><i class="fa fa-plus"></i> Add</button>
          <button class="btn btn-primary"><i class="fa fa-refresh"></i> Refresh</button>
          <button class="btn btn-primary">Add</button>
      </div>
      <br><br>
      <div class="table-responsive">
        <table class="table table-border" style="width:90%;">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </table>
      </div>

    `
  }
})