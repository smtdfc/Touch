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
            <div class="d-flex align-items-center line-loader bar" ref="user-chart"></div>
          </div>
          <!--
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
          </div>-->
      </div>
    `
  },
  onFirstRender:async function() {
    let userStatisticsData = await app.statistics.getUserStatistics()
    let userStatisticsChart = new ApexCharts(this.ref("user-chart").HTMLElement, {
      chart: {
        type: 'bar',
        height:"300px"
      },
      series: [{
        data: [{
          x: 'Total User',
          y: userStatisticsData.totalUser || 0
        }, {
          x: 'Total Admin',
          y: userStatisticsData.totalAdmin || 0
        },{
          x: 'Total User Active',
          y: userStatisticsData.totalUserActive || 0
        }]
      }],
      yaxis: {
        labels: {
          formatter: function(val) {
            return Math.floor(val)
          }
        }
      }
    })
    this.ref("user-chart").classList.remove("line-loader")
    this.ref("user-chart").classList.remove("bar")

    queueMicrotask(()=>{
      userStatisticsChart.render()
    })

  }
})