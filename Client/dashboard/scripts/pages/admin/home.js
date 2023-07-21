import "https://cdn.jsdelivr.net/npm/apexcharts"
Turtle.createComponent("admin-home-page", {
  render: function() {
    return `
      <h1>Overview</h1>
      <div>
        <div class="card-group">
          <div style="flex:50%">
            <div class="card-body">
              <h3>Users</h3>
            </div>
            <div ref="user-chart"></div>
          </div>
          <div style="flex:50%;">
            <div class="card-body">
              <h3>Devices</h3>
            </div>
            <div ref="device-chart"></div>
          </div>
          <div style="flex:50%;">
            <div class="card-body">
              <h3>Data Tables</h3>
            </div>
            <div ref="dt-chart"></div>
          </div>
      </div>
    `
  },
  onFirstRender: function() {
    new ApexCharts(this.ref("user-chart").HTMLElement, {
      chart: {
        type: 'bar'
      },
      series: [{
        data: [{
          x: 'Total User',
          y: 10
        }, {
          x: 'Total Admin',
          y: 18
        }]
      }],
    }).render()
    new ApexCharts(this.ref("device-chart").HTMLElement, {
      chart: {
        type: 'bar'
      },
      series: [{
        data: [{
          x: 'Active now',
          y: 10
        }, {
          x: 'Connected',
          y: 18
        }]
      }],
    }).render()
    new ApexCharts(this.ref("dt-chart").HTMLElement, {
      chart: {
        type: 'bar'
      },
      series: [{
        data: [{
          x: 'Locked',
          y: 17
        }, {
          x: 'Created',
          y: 33
        }]
      }],
    }).render()
  }
})