export const AuthRoutes =[
  {
    path:"/login",
    component:"login-form",
    callback:async ()=>{await import("../components/forms/login.js")}
  }
]