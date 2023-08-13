export const AuthRoutes ={
  "/auth/login":{
    title:"login",
    loader:async ()=>{await import("../pages/auth/login.page.js")},
    component:"login-page"
  }
}