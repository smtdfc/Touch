export const AdminRoutes =[
  {
    path:"/admin/home",
    loadComponent:async ()=>{await import("../pages/admin/home.js")},
    component:"page-admin-home"
  }
  
]

