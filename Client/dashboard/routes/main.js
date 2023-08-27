import { auth_routes } from "./auth.js"
import {admin_routes} from "./admin.js"
App.use(Turtle.RouterModule)


App.router.define({
  element: "#content",
  type: "hash",
  routes: {
    "/":{
      callback:function(){
        if(isAdmin()) App.router.redirect("/admin/home",true)
        else App.router.redirect("/auth/login",true)
      }
    },
    ...auth_routes,
    ...admin_routes
  }
})

App.router.on("notfound", function(err) {
  err.router.element.innerHTML = `
  <div class="d-flex flex-flow-col align-items-center">
    <h1 style="font-size:100px" >404</h1>
    <h2>Page not found</h2>
  </div>
 `
})

App.router.on("notallow", function(err) {
  err.router.element.innerHTML = `
  <div class="d-flex flex-flow-col align-items-center">
    <h1 style="font-size:100px" >403</h1>
    <h2>Access has been blocked</h2>
  </div>
 `
})