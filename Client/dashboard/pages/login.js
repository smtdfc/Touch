Turtle.component("login-page",function($){
  if(isAdmin()) App.router.redirect("/admin/home",true)
  $.onSubmit = function(e){
    e.preventDefault()
    $.refs.note.classList.remove("active")
    let username = $.refs.username.value
    let password = $.refs.password.value
    showLoader()
    TouchApp.auth.login(username,password)
      .then(user=>{
        if(isAdmin()) App.router.redirect("/admin/home",true)
      })
      .catch((err)=>{
        $.refs.note.classList.add("active")
        $.refs.note.textContent = err.message
      })
      .finally(()=>{
        hideLoader()
      })
  }
  return `
    <form class="d-flex flex-flow-col align-items-center" ${Turtle.events({submit:$.onSubmit})}>
      <h1>Login</h1>
      <div class="note note-danger" ${Turtle.ref("note")}></div>
      <br>
      <label for="username" class="form-label-floating">
        <input type="text" placeholder="Username" style="padding-top: 0px; width: 250px;" id="username" required ${Turtle.ref("username")}>
        <span>Username</span>
      </label>
      <label for="password" class="form-label-floating">
        <input type="password" placeholder="Password" style="padding-top: 0px; width: 250px;" id="password" required ${Turtle.ref("password")}>
        <span>Password</span>
      </label>
      <button class="btn btn-outline-primary" style="width: 200px;">Login</button>
    </form>
  `
})