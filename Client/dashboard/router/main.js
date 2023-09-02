import { auth_routes } from "./auth.routes.js"
import {user_routes} from "./user.routes.js"
app.use(Turtle.RouterModule)

app.router.define({
  element: "#page-contents",
  type: "hash",
  routes: {
    ...auth_routes,
    ...user_routes,
    "/": {
      callback:()=>{
        if (TouchApp.isNotLogin()) app.router.redirect("/auth/login", true)
        else app.router.redirect("/home",true)
      }
    }
  }
})

app.router.on("notfound",function(err){
  err.router.element.innerHTML=`
    <div class="text-center m-5">
      <h1 style="font-size: 100px;">404</h1><br>
      <h3>Page not found</h3>
    </div>
  `
})


app.router.on("notallow", function(err) {
  err.router.element.innerHTML = `
    <div class="text-center m-5">
      <h1 style="font-size: 100px;">403</h1><br>
      <h3>Access has been denied !</h3>
      <a class="btn" href="#/auth/login">Goto login page</a>
    </div>
  `
})
app.router.start()