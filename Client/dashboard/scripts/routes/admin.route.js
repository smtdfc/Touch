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

  },
  {
    path:"/admin/datatables/:id",
    protect:isAdmin,
    loadComponent:async ()=>{await import("../pages/admin/editDatatable.js")},
    component:"page-admin-edit-dt"
  }
]

