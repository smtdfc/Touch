export const AdminRoutes =[
  {
    path:"/admin",
    component:"admin-home-page",
    protect:isAdmin,
    loadComponent:async()=>{await import("../pages/admin/home.js")}
  }
  
]