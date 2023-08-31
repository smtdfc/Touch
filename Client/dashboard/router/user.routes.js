export const user_routes = {
  "/home": {
    protect: () => { return TouchApp.isLogin() },
    component: "home-page",
    loader: async () => { await import("../pages/home.js") }
  },
  "/datatables/list": {
    protect: () => { return TouchApp.isLogin() },
    component: "list-datatable-page",
    loader: async () => { await import("../pages/datatables/list.js") }
  }
}