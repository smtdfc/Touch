export const admin_routes ={
  "/admin/home":{
    protect:isAdmin,
    component:"admin-home-page",
    loader:async ()=>await import("../pages/admin/home.js")
  }
}