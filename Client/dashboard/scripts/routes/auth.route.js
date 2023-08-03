export const AuthRoutes =[
  {
    path:"/auth/login",
    loadComponent:async ()=>{await import("../pages/auth/login.page.js")},
    component:"login-page"
  }
]