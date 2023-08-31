export const auth_routes ={
  "/auth/login":{
    component:"login-page",
    loader:()=>{import("../pages/login.js")}
  }
}