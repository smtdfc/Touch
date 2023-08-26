Turtle.component("main-container",function($){
  
  $.adminItems = function(){
    return `
      <li><a href="#">Hello</a></li>
    `
  }
  
  $.refreshUI = function (){
    $.refs.sidebar.classList.remove("d-none")
     if(isAdmin()) $.refs.items.innerHTML = $.adminItems()
     else $.refs.sidebar.classList.add("d-none")
  }
  
  $.onRender = function(){
    $.refreshUI()
  }
  
  return `
    <div class="sidebar-container">
      <div class="sidebar sidebar-icon" id="main-sidebar" ${Turtle.ref("sidebar")}>
        <button class="sidebar-close-btn fa fa-times" data-toggle="#main-sidebar"></button>
        <div class="sidebar-content">
          <ul class="sidebar-nav-items" ${Turtle.ref("items")} >
          </ul>
        </div>
      </div>
      <div class="container" id="content">
        <div class="d-flex justify-content-center" style="padding:75px;" >
          <div class="circle-loader loader-info"></div>
        </div>
      </div>
    </div>
  `
})