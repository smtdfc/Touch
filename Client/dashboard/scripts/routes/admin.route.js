export const AdminRoutes =[
  {
    path:"/admin/home",
    protect:isAdmin,
    loadComponent:async ()=>{await import("../pages/admin/home.js")},
    component:"page-admin-home"
  },
  {
    path:"/admin/datatables",
    protect:isAdmin,
    loadComponent:async ()=>{await import("../pages/admin/datatables.js")},
    component:"page-admin-dt"

  }
  
]

