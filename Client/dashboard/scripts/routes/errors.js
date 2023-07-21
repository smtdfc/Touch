export const ErrorRoutes = [
  {
    path:"/notfound",
    resolver:function(){
      return {
        content:`
        <div class="text-align-center">
          <h1 style="font-size:100px;" >404</h1>
          <p style="font-size:20px" >Looks like the page you're looking for doesn't exist or has been deleted! </p>
          <p>That's all we know </p>
        </div>
        `
      }
    }
  },
  {
    path: "/forbidden",
    resolver: function() {
      return {
        content: `
        <div class="text-align-center">
          <h1 style="font-size:100px;" >403</h1>
          <p style="font-size:20px" >Access has been blocked ! Looks like you do not have access to this page !</p>
          <p>That's all we know </p>
        </div>
        `
      }
    }
  },
]