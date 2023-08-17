export async function initRouter() {
  let AuthRoutes = (await import("./auth.routes.js")).AuthRoutes
  let AdminRoutes = (await import("./admin.routes.js")).AdminRoutes

  let Routes = {
    "/": {
      title: "Home",
      callback: function(controller) {
        
        
        if (TouchApp.auth.currentUser.user_id == null) controller.router.redirect("/auth/login", true)
        if(TouchApp.auth.currentUser.role == "admin") controller.router.redirect("/admin/home",true)
      }
    },
  }

  Routes = Object.assign(
    Routes,
    AuthRoutes,
    AdminRoutes
  )

  app.router.init({
    element: "#content",
    type: "hash",
    routes: Routes
  })

  app.router.on("notfound", function(controller) {
    controller.router.element.innerHTML = `
      <div class="text-align-center">
        <h1 style="font-size:100px">404</h1>
        <p>The page you are requesting does not exist ! That's all we know!</p>
      </div>
    `
  })
app.router.on("notallow", function(controller) {
  controller.router.element.innerHTML = `
      <div class="text-align-center">
        <h1 style="font-size:100px">403</h1>
        <p>You are not authorized to access this page ! That's all we know!</p>
      </div>
    `
})
  app.router.start()
}