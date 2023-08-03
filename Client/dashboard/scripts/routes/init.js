const Router = Turtle.RouterControl
export async function init(){ 
  let ErrorRoutes = (await import("./error.route.js")).ErrorRoutes
  let AuthRoutes = (await import("./auth.route.js")).AuthRoutes
  let AdminRoutes = (await import("./admin.route.js")).AdminRoutes
  Router.init({
    element: "#content",
    type: "hash",
    routes: [
      {
        path: "/",
        resolver: function() {
          if (isNotLoggedIn()) {
            Router.redirect("/auth/login", true)
          }
        }
      },
      ...AuthRoutes,
      ...AdminRoutes
    ],
    handleErr: ErrorRoutes,
  })
  Router.start()
}

init()