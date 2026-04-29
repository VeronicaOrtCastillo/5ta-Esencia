document.addEventListener('DOMContentLoaded', () => {
    // 1. INICIALIZACIÓN: Usuarios de prueba si el localStorage está vacío
    if (!localStorage.getItem("usuarios")) {
        const usuariosSemilla = [
            { 
                email: "admin@5taesencia.com", 
                contrasena: "123456", 
                nombreCompleto: "Victor Admin" 
            },
            { 
                email: "test@correo.com", 
                contrasena: "password123", 
                nombreCompleto: "Usuario Prueba" 
            }
        ];
        localStorage.setItem("usuarios", JSON.stringify(usuariosSemilla));
    }

    // 2. REFERENCIAS AL DOM (Basadas en tu login.html)
    const loginForm = document.getElementById('loginForm');
    const loginStatus = document.getElementById('loginStatus');
    const emailInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-password');

    // 3. EVENTO DE ENVÍO
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Limpiar estados previos
        loginStatus.textContent = "";
        loginStatus.style.color = "red";

        const email = emailInput.value.trim();
        const pass = passInput.value.trim();

        // VALIDACIÓN: Campos vacíos
        if (email === "" || pass === "") {
            loginStatus.textContent = "Error: Nombre de usuario y contraseña son obligatorios.";
            return;
        }

        // 4. AUTENTICACIÓN
        const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Buscamos coincidencia (soporta 'contrasena' de registro.js y 'pass' de pruebas)
        const usuarioValido = usuariosRegistrados.find(user => 
            user.email === email && (user.contrasena === pass || user.pass === pass)
        );

        if (usuarioValido) {
            // ÉXITO
            loginStatus.style.color = "green";
            loginStatus.textContent = `¡Bienvenido, ${usuarioValido.nombreCompleto || usuarioValido.nombre}! Redirigiendo...`;
            
            // Almacenar sesión activa
            sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioValido));

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        } else {
            // VALIDACIÓN: Datos inválidos
            loginStatus.textContent = "Nombre de usuario o contraseña inválidos.";
        }
    });
});