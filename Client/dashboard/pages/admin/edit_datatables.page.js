app.staticComponent("admin-edit-dt-page",function(controller){
  let dt_id = app.router.info.params.id ?? null
  if(!"dt_id") {
    return `
      <h1>Error! An error occurred. Please try again later !</h1>
    `
  }
  
  
  return "Hello"
})