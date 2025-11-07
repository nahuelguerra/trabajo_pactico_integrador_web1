// VALIDACIÓN DE FORMULARIO DE CONTACTO

// Obtenemos campos
const form = document.getElementById('contactForm');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const telefono = document.getElementById('telefono');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');

// Donde mostramos los errores
const errorNombre = document.getElementById('errorNombre');
const errorEmail = document.getElementById('errorEmail');
const errorTelefono = document.getElementById('errorTelefono');
const errorAsunto = document.getElementById('errorAsunto');
const errorMensaje = document.getElementById('errorMensaje');

// Regexs
const regexEmail = /^\w+@\w+(\.\w{2,4})+$/;
const regexTelefono = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{3,4}$/;

function mostrarError(campo, mensaje) {
  const errorDiv = document.getElementById('error' + campo.id.charAt(0).toUpperCase() + campo.id.slice(1));
  errorDiv.textContent = mensaje;
  errorDiv.style.display = 'block';
  campo.classList.add('error');
}

function limpiarErrores() {
  errorNombre.style.display = 'none';
  errorEmail.style.display = 'none';
  errorTelefono.style.display = 'none';
  errorAsunto.style.display = 'none';
  errorMensaje.style.display = 'none';

  nombre.classList.remove('error');
  email.classList.remove('error');
  telefono.classList.remove('error');
  asunto.classList.remove('error');
  mensaje.classList.remove('error');
}

// VALIDACIÓN

form.addEventListener('submit', function(e) {
  e.preventDefault();
  limpiarErrores();
  const exitoPrevio = document.querySelector('.exito-card');
  if (exitoPrevio) {
    exitoPrevio.remove();
  }

  let formularioValido = true;

  // Nombre
  const nombreValor = nombre.value.trim();
  if (nombreValor === '') {
    mostrarError(nombre, 'El nombre es obligatorio');
    formularioValido = false;
  } else if (nombreValor.length < 3) {
    mostrarError(nombre, 'El nombre debe tener al menos 3 caracteres');
    formularioValido = false;
  }

  // Email
  const emailValor = email.value.trim();
  if (emailValor === '') {
    mostrarError(email, 'El correo electrónico es requerido');
    formularioValido = false;
  } else if (!regexEmail.test(emailValor)) {
    mostrarError(email, 'Ingrese un correo electrónico válido');
    formularioValido = false;
  }

  // Teléfono
  const telefonoValor = telefono.value.trim();
  if (telefonoValor === '') {
    mostrarError(telefono, 'El teléfono es obligatorio');
    formularioValido = false;
  } else if (!regexTelefono.test(telefonoValor)) {
    mostrarError(telefono, 'El teléfono no tiene un formato válido (ejemplo: +54 9 266 123-4567)');
    formularioValido = false;
  }

  // Asunto
  const asuntoValor = asunto.value.trim();
  if (asuntoValor === '') {
    mostrarError(asunto, 'El asunto es obligatorio');
    formularioValido = false;
  } else if (asuntoValor.length < 5) {
    mostrarError(asunto, 'El asunto debe tener al menos 5 caracteres');
    formularioValido = false;
  }

  // Mensaje (opcional)
  const mensajeValor = mensaje.value.trim();
  if (mensajeValor !== '' && mensajeValor.length < 10) {
    mostrarError(mensaje, 'El mensaje debe tener al menos 10 caracteres');
    formularioValido = false;
  }

  // Exito
  if (formularioValido) {
    

    const exitoCard = document.createElement('div');
    exitoCard.className = 'exito-card';
    exitoCard.textContent = `Formulario enviado correctamente. Gracias ${nombreValor}, nos contactaremos a ${emailValor}`;
    form.parentElement.appendChild(exitoCard);
    form.reset();
  }
});
// FIN VALIDACIÓN
