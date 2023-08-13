export const AdminRoutes ={
  "/admin/home":{
    title:"Admin",
    protect:isAdmin,
    loader:async()=>{await import("../pages/admin/home.page.js")},
    component:"admin-home-page"
  }
}