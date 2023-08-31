Turtle.component("login-page", function($) {
  $.onSubmit = function(e) {
    e.preventDefault()
    showLoader()
    $.refs.btn.disabled=true
    $.refs.alert.classList.add("d-none")
    TouchApp.auth.login(
        $.refs.username.value,
        $.refs.password.value
      )
      .then((user) => {
        app.router.redirect("/home",true)
      })

      .catch((err) => {
        $.refs.alert.classList.remove("d-none")
        $.refs.alert.textContent = err.message
      })

      .finally(() => {
        hideLoader()
        $.refs.btn.disabled=false
      })

  }
  return `
    <main class="text-center" style="display:flex; align-items:center; justify-content:center;">
      <form style="width:100%; max-width:380px;" ${Turtle.events({submit:$.onSubmit})}>
        <img class="mb-4" src="./assets/images/icon.png" alt="" width="72" height="57">
        <h1 class="mb-3">Sign in</h1>
        <div class="alert alert-danger d-none" role="alert" ${Turtle.ref("alert")}></div>
        <div class="form-floating">
          <input type="text" class="form-control" id="floatingInput" placeholder="abc" required ${Turtle.ref("username")}>
          <label for="floatingInput">Username</label>
        </div><br>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" required ${Turtle.ref("password")} >
          <label for="floatingPassword">Password</label>
        </div>
        <br>
        <button class="w-100 btn btn-lg btn-primary" type="submit" ${Turtle.ref("btn")}>Sign in</button>
      </form>
    </main>
  `
})