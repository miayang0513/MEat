const form = document.querySelector('.needs-validation')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const emailFeedback = document.querySelector('#email~.invalid-feedback')
const password = document.querySelector('#password')
const password2 = document.querySelector('#password2')
const password2Feedback = document.querySelector('#password2~.invalid-feedback')

form.addEventListener('submit', event => {
  event.preventDefault()
  if (form.checkValidity() === false) {
    form.classList.add('was-validated')
  } else {
    form.classList.remove('was-validated')
    if (password.value !== password2.value) {
      password2Feedback.innerHTML = "Those password didn't match. Try again."
      password2.classList.add('is-invalid')
      return
    }
    register()
  }
})

async function register () {
  try {
    let params = new URLSearchParams()
    params.append('username', username.value)
    params.append('email', email.value)
    params.append('password', password.value)

    const response = await axios('/user/register', {
      method: 'POST',
      data: params
    })
    console.log(response)
    if (response.data.status === 401) {
      emailFeedback.innerHTML = response.data.msg
      email.classList.add('is-invalid')
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
