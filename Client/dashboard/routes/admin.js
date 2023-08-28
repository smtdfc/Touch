export const admin_routes ={
  "/admin/home":{
    protect:isAdmin,
    component:"admin-home-page",
    loader:async ()=>await import("../pages/admin/home.js")
  },
    "/admin/datatables/list": {
      protect: isAdmin,
      component: "admin-list-dt-page",
      loader: async () => await import("../pages/admin/datatables/list.js")
    },
        "/admin/datatables/:id/edit": {
      protect: isAdmin,
      component: "admin-edit-dt-page",
      loader: async () => await import("../pages/admin/datatables/edit.js")
    }
}