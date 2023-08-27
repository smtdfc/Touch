export const auth_routes ={
  "/auth/login":{
    component:"login-page",
    loader:async ()=>{await import("../pages/login.js")}
  }
}