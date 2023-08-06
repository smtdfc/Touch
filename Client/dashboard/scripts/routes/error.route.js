export const ErrorRoutes ={
  notFound:function(u,e){
    e.innerHTML =`
      <div class="text-align-center">
        <h1 style="font-size: 100px;">404</h1>
        <p>This page does not exist or has been deleted !</p>
      </div>
    `
  },
  notAllow:function(url,e){
    e.innerHTML = `
          <div class="text-align-center">
            <h1 style="font-size: 100px;">403</h1>
            <p>Permission has been denied  !</p>
          </div>
        `
  }
}