Turtle.component("confirm-modal", function($) {

  let props = $.props
  let onAccept = function() {
    (props.onAccept ?? new Function())()
    setTimeout(() => {
      $.remove()
    }, 2500)
  }

  let onRefuse = function() {
    (props.onRefuse ?? new Function())()
    setTimeout(() => {
      $.remove()
    }, 2500)
  }

  let id = `_${(Math.floor(Math.random()*9999999)*Date.now()).toString(16)}`
  $.onRender = function() {
    const modal = new bootstrap.Modal(`#${id}`)
    modal.show()
  }
  return `
    <div class="modal fade " id="${id}" tabindex="-1" aria-labelledby="${id}_label" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="${id}_label">${props.title}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ${Turtle.events({click:onRefuse})}></button>
          </div>
          <div class="modal-body">
            ${props.content}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ${Turtle.events({click:onRefuse})} >Close</button>
            <button type="button" class="btn btn-${props.btnAcceptType ?? "primary"}" data-bs-dismiss="modal" ${Turtle.events({click:onAccept})}>${props.acceptBtn ?? "OK"}</button>
          </div>
        </div>
      </div>
    </div>
  
  `
})