const form = document.querySelector('.needs-validation')
const email = document.querySelector('#email')
const emailFeedback = document.querySelector('#email~.invalid-feedback')
const password = document.querySelector('#password')
const passwordFeedback = document.querySelector('#password~.invalid-feedback')

form.addEventListener('submit', event => {
  event.preventDefault()
  if (form.checkValidity() === false) {
    form.classList.add('was-validated')
  } else {
    form.classList.remove('was-validated')
    login()
  }
})

async function login () {
  try {

    let params = new URLSearchParams()
    params.append('email', email.value)
    params.append('password', password.value)

    const response = await axios('/user/login', {
      method: 'POST',
      data: params
    })
    if (response.data.status === 401) {
      if (response.data.type === 'email') {
        emailFeedback.innerHTML = response.data.msg
        email.classList.add('is-invalid')
        return
      }
      passwordFeedback.innerHTML = response.data.msg
      password.classList.add('is-invalid')
    } else {
      window.location = response.data.redirect
    }
  } catch (error) {
    console.error(error)
  }
}

form.addEventListener('input', e => {
  if (e.target.matches('.is-invalid')) { e.target.classList.remove('is-invalid') }
})
