export const user_routes = {
  "/home": {
    title:"Home",
    protect: () => { return TouchApp.isLogin() },
    component: "home-page",
    loader: async () => { await import("../pages/home.js") }
  },
  "/datatables/list": {
    title:"DataTables",
    protect: () => { return TouchApp.isLogin() },
    component: "list-datatable-page",
    loader: async () => { await import("../pages/datatables/list.js") }
  },
  "/datatables/:id/edit": {
    title:"Edit DataTable",
    protect: () => { return TouchApp.isLogin() },
    component: "edit-datatable-page",
    loader: async () => { await import("../pages/datatables/edit.js") }
  }
}