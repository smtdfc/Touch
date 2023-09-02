export const auth_routes ={
  "/auth/login":{
    title:"Touch - Login",
    component:"login-page",
    loader:()=>{import("../pages/login.js")}
  }
}