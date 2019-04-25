document.querySelector('#listen').addEventListener('click', e => {
  if (e.target.closest('.deleteIcon')) {
    const id = e.target.closest('.deleteIcon').dataset.id
    const modalBody = document.querySelector('.modal-body')
    const modalTitle = document.querySelector('.modal-title')

    modalTitle.innerHTML = 'Are you absolutely sure?'
    modalBody.innerHTML = `
      <form action=/restaurants/${id}/?_method=DELETE method='POST'>
        <button type='submit' class='btn btn-primary'> Yes I'm sure </button>
      </form>
      <button type='button' class='btn btn-secondary ml-3' data-dismiss="modal"> close</button>
    `
  }
})
