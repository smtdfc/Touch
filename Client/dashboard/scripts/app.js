async function main() {
  selector.byId("root").HTML = `
     <div class="overlay " id="main-overlay">
           <div class="d-flex flex-flow-col align-items-center" >
          <div class="line-loader" style="height:3px;" >
            <div class="bar"></div>
          </div>
          <span class="mt-75" id="loader-text">Loading</span>
      </div>
     </div>
    <page-navbar></page-navbar>
    <br><br><br><br>
    <div class="p-10" id="content"></div>
  `
  openOverlay()
  await app.auth.getUser()
  let AuthRoutes = (await import("./routes/auth.js")).AuthRoutes
  let AdminRoutes = (await import("./routes/admin.js")).AdminRoutes
  let ErrorRoutes = (await import("./routes/errors.js")).ErrorRoutes
  Turtle.initRouter({
    element: "#content",
    type: "hash",
    routes: [
     {
       path:"/",
       callback:function(){
         if(isAdmin()) Turtle.redirect("/admin",true)
         if(isUser()) Turtle.redirect("/user",true)
         if(notLoggedIn()){
           console.log(1);
           Turtle.redirect("/login",true)
           
         }
       }
     },
     ...AuthRoutes,
     ...ErrorRoutes,
     ...AdminRoutes
    ],
    handleErr: {
      notFound: function(url) {
        Turtle.redirect("/notfound", true)
      },
      notAllow: function() {
        Turtle.redirect("/forbidden", true)
      }
    }
  })
  Turtle.startRouter()
  Turtle.setRouterEventListener("loadcontent",function(){
    openOverlay()
  })
  
  Turtle.setRouterEventListener("contentloaded",function(){
    closeOverlay()
  })
  closeOverlay()
}
init()
  .then(() => {
    main()
  })
  .catch((err) => {
    console.log(err);
  })