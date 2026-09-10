/* ==========================================================================
   VALIDACIONES TIENDA PÚBLICA (validaciones-tienda.js)
   Manejo de formularios: Registro, Login y Contacto
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // HELPER: MOSTRAR Y LIMPIAR ERRORES
    // ==========================================================================
    const mostrarError = (inputId, errorId, mensaje) => {
        const input = document.getElementById(inputId);
        const errorSpan = document.getElementById(errorId);
        if (input) input.classList.add('input-error');
        if (errorSpan) errorSpan.textContent = mensaje;
    };

    const limpiarError = (inputId, errorId) => {
        const input = document.getElementById(inputId);
        const errorSpan = document.getElementById(errorId);
        if (input) input.classList.remove('input-error');
        if (errorSpan) errorSpan.textContent = '';
    };

    const validarDominioCorreo = (correo) => {
        const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
        const correoMin = correo.trim().toLowerCase();
        return dominiosPermitidos.some(dominio => correoMin.endsWith(dominio));
    };

    // ==========================================================================
    // 1. FORMULARIO DE CONTACTO (contacto.html)
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const inputComentario = document.getElementById('comentario');
        const charCounter = document.getElementById('current-chars');

        // Contador dinamico de caracteres para el mensaje (max 500)
        if (inputComentario && charCounter) {
            inputComentario.addEventListener('input', () => {
                const len = inputComentario.value.length;
                charCounter.textContent = len;
            });
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let esValido = true;

            // Validar Nombre (Obligatorio)
            const nombre = document.getElementById('nombre').value.trim();
            if (!nombre) {
                mostrarError('nombre', 'error-nombre', 'El nombre es obligatorio.');
                esValido = false;
            } else {
                limpiarError('nombre', 'error-nombre');
            }

            // Validar Correo (Obligatorio y dominios permitidos)
            const correo = document.getElementById('correo').value.trim();
            if (!correo) {
                mostrarError('correo', 'error-correo', 'El correo es obligatorio.');
                esValido = false;
            } else if (!validarDominioCorreo(correo)) {
                mostrarError('correo', 'error-correo', 'Dominio no permitido. Use @duoc.cl, @profesor.duoc.cl o @gmail.com.');
                esValido = false;
            } else {
                limpiarError('correo', 'error-correo');
            }

            // Validar Comentario (Obligatorio y maximo 500 caracteres)
            const comentario = inputComentario ? inputComentario.value.trim() : '';
            if (!comentario) {
                mostrarError('comentario', 'error-comentario', 'El comentario es obligatorio.');
                esValido = false;
            } else if (comentario.length > 500) {
                mostrarError('comentario', 'error-comentario', 'El comentario no puede exceder 500 caracteres.');
                esValido = false;
            } else {
                limpiarError('comentario', 'error-comentario');
            }

            // Confirmación de envío
            if (esValido) {
                const alertMsg = document.getElementById('form-message');
                if (alertMsg) {
                    alertMsg.className = 'alert-message success';
                    alertMsg.textContent = '¡Mensaje enviado con éxito! Te responderemos a la brevedad.';
                    alertMsg.classList.remove('hidden');
                }
                contactForm.reset();
                if (charCounter) charCounter.textContent = '0';
            }
        });
    }

    // ==========================================================================
    // 2. FORMULARIO DE LOGIN (login.html)
    // ==========================================================================
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let esValido = true;

            // Validar Correo
            const correo = document.getElementById('correo').value.trim();
            if (!correo) {
                mostrarError('correo', 'error-correo', 'El correo es obligatorio.');
                esValido = false;
            } else if (!validarDominioCorreo(correo)) {
                mostrarError('correo', 'error-correo', 'Dominio no permitido (@duoc.cl, @profesor.duoc.cl, @gmail.com).');
                esValido = false;
            } else {
                limpiarError('correo', 'error-correo');
            }

            // Validar Contraseña (entre 4 y 10 caracteres)
            const password = document.getElementById('password').value.trim();
            if (!password) {
                mostrarError('password', 'error-password', 'La contraseña es obligatoria.');
                esValido = false;
            } else if (password.length < 4 || password.length > 10) {
                mostrarError('password', 'error-password', 'La contraseña debe tener entre 4 y 10 caracteres.');
                esValido = false;
            } else {
                limpiarError('password', 'error-password');
            }

            if (esValido) {
                alert('¡Inicio de sesión exitoso!');
                window.location.href = 'index.html';
            }
        });
    }

    // ==========================================================================
    // 3. FORMULARIO DE REGISTRO (registro.html)
    // ==========================================================================
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let esValido = true;

            // Validar RUN (sin puntos ni guion, entre 7 y 9 caracteres numéricos/K)
            const run = document.getElementById('run').value.trim();
            const regexRun = /^[0-9]{7,8}[0-9kK]{1}$/;
            if (!run) {
                mostrarError('run', 'error-run', 'El RUN es obligatorio.');
                esValido = false;
            } else if (!regexRun.test(run) || run.length < 7 || run.length > 9) {
                mostrarError('run', 'error-run', 'RUN inválido. Ingrese entre 7 y 9 caracteres, sin puntos ni guión (ej: 19123456k).');
                esValido = false;
            } else {
                limpiarError('run', 'error-run');
            }

            // Validar Correo
            const correo = document.getElementById('correo').value.trim();
            if (!correo) {
                mostrarError('correo', 'error-correo', 'El correo es obligatorio.');
                esValido = false;
            } else if (!validarDominioCorreo(correo)) {
                mostrarError('correo', 'error-correo', 'Dominio no permitido (@duoc.cl, @profesor.duoc.cl, @gmail.com).');
                esValido = false;
            } else {
                limpiarError('correo', 'error-correo');
            }

            // Validar Contraseña (entre 4 y 10 caracteres)
            const password = document.getElementById('password').value.trim();
            if (!password) {
                mostrarError('password', 'error-password', 'La contraseña es obligatoria.');
                esValido = false;
            } else if (password.length < 4 || password.length > 10) {
                mostrarError('password', 'error-password', 'La contraseña debe tener entre 4 y 10 caracteres.');
                esValido = false;
            } else {
                limpiarError('password', 'error-password');
            }

            // Validar Dirección (Obligatoria)
            const direccion = document.getElementById('direccion').value.trim();
            if (!direccion) {
                mostrarError('direccion', 'error-direccion', 'La dirección es obligatoria.');
                esValido = false;
            } else {
                limpiarError('direccion', 'error-direccion');
            }

            // Validar Región y Comuna
            const region = document.getElementById('region').value;
            if (!region) {
                mostrarError('region', 'error-region', 'Debe seleccionar una región.');
                esValido = false;
            } else {
                limpiarError('region', 'error-region');
            }

            const comuna = document.getElementById('comuna').value;
            if (!comuna) {
                mostrarError('comuna', 'error-comuna', 'Debe seleccionar una comuna.');
                esValido = false;
            } else {
                limpiarError('comuna', 'error-comuna');
            }

            if (esValido) {
                alert('¡Registro completado con éxito!');
                window.location.href = 'login.html';
            }
        });
    }
});