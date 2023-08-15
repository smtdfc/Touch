export const AdminRoutes ={
  "/admin/home":{
    title:"Admin",
    protect:isAdmin,
    loader:async()=>{await import("../pages/admin/home.page.js")},
    component:"admin-home-page"
  },
    "/admin/datatables/list": {
      title: "Datatables",
      protect: isAdmin,
      loader: async () => { await import("../pages/admin/datatables.page.js") },
      component: "admin-dt-page"
    }
}