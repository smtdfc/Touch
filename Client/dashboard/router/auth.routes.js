export const AuthRoutes ={
  "/auth/login":{
    title:"Login",
    loader:async ()=>{await import("../pages/auth/login.page.js")},
    component:"login-page"
  }
}