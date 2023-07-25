export const AdminRoutes = [
  {
    path: "/admin",
    component: "admin-home-page",
    protect: isAdmin,
    loadComponent: async () => { await import("../pages/admin/home.js") }
  },
  {
    path: "/admin/datatable",
    component: "admin-datatable-page",
    protect: isAdmin,
    loadComponent: async () => { await import("../pages/admin/datatable.js") }

  }

]