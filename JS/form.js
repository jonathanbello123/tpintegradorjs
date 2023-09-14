const form = document.getElementById("formulario")
const nameI = document.querySelector("#nombre")
const lastName = document.querySelector("#apellido")
const email = document.querySelector("#email")
const nameError = document.querySelector(".nameError")
const lastNameError = document.querySelector(".lastNameError")
const emailEror = document.querySelector(".emailError")
const emailRegular = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

// validar nombre

const validateName = () => {
    if (nameI.value.trim() === "") {
        nameError.textContent = "❌por favor introduce tu nombre"
        nameError.classList.add('error')

    } else {
        nameError.textContent = ""
        nameError.classList.remove('error')


    }
}

// validar apellido

const validateApellido = () => {
    if (lastName.value.trim() === "") {
        lastNameError.textContent = "❌por favor introduce tu apellido"
        lastNameError.classList.add('error')

    } else {
        lastNameError.textContent = ""
        lastNameError.classList.remove('error')

    }
}

// validar email
const validateEmail = () => {

    if (!emailRegular.test(email.value)) {
        emailEror.textContent = "❌por favor introduce un mail valido"
        emailEror.classList.add('error')
        email.classList.add('inputError')

    } else {
        emailEror.textContent = ""
        emailEror.classList.remove('error')

    }
}


// validar todos los datos del form 

const validateForm = (e) => {
    e.preventDefault()
    validateName()
    validateApellido()
    validateEmail()


    if (!emailEror.classList.contains("error") && !nameError.classList.contains("error") && !lastNameError.classList.contains("error")) {
        alert("El formulario se ha enviado con exito")
        console.log("nashe")

    }
    form.reset()
}

const xd = () => {
    form.addEventListener("submit", validateForm)
}

xd()