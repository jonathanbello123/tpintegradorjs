const form = document.getElementById("formulario")
const nameI = document.querySelector("#nombre")
const lastName = document.querySelector("#apellido")
const email = document.querySelector("#email")
const nameError = document.querySelector(".nameError")
const lastNameError = document.querySelector(".lastNameError")
const emailEror = document.querySelector(".emailError")
const emailRegular = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;



const validateName = () => {
    if (nameI.value.trim() === "") {
        nameError.textContent = "❌por favor introduce tu nombre"
        nameError.classList.add('error')

    } else {
        nameError.textContent = ""
        nameError.classList.remove('error')


    }
}



const validateApellido = () => {
    if (lastName.value.trim() === "") {
        lastNameError.textContent = "❌por favor introduce tu apellido"
        lastNameError.classList.add('error')

    } else {
        lastNameError.textContent = ""
        lastNameError.classList.remove('error')

    }
}


const validateEmail = () => {

    if (!emailRegular.test(email.value)) {
        emailEror.textContent = "❌por favor introduce un mail valido"
        emailEror.classList.add('error')


    } else {
        emailEror.textContent = ""
        emailEror.classList.remove('error')

    }
}




const validateForm = (e) => {
    e.preventDefault()
    validateName()
    validateApellido()
    validateEmail()


    if (!emailEror.classList.contains("error") && !nameError.classList.contains("error") && !lastNameError.classList.contains("error")) {
        alert("El formulario se ha enviado con exito")
        lastName.classList.remove('inputError')
        nameI.classList.remove('inputError')
        email.classList.remove('inputError')

    } else {
        lastName.classList.add('inputError')
        nameI.classList.add('inputError')
        email.classList.add('inputError')
    }

    form.reset()

}


const init2 = () => {
    form.addEventListener("submit", validateForm)
}

init2()