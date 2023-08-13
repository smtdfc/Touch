export const AdminRoutes ={
  "/admin/home":{
    title:"Admin",
    loader:async()=>{await import("../pages/admin/home.page.js")},
    component:"admin-home-page"
  }
}