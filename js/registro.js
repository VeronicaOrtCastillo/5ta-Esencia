const passInput = document.getElementById('regPass');
const passStrength = document.getElementById('passStrength');

// 1. Escuchador para indicar la seguridad de la contraseña
passInput.addEventListener('input', function() {
    const val = passInput.value;
    let mensaje = "";
    let color = "";

    if (val.length === 0) {
        mensaje = "";
    } else if (val.length < 6) {
        mensaje = "Muy corta";
        color = "red";
    } else if (val.match(/[A-Z]/) && val.match(/[0-9]/) && val.match(/[^A-Za-z0-9]/)) {
        mensaje = "Seguridad Alta (Fuerte)";
        color = "green";
    } else if (val.match(/[A-Z]/) || val.match(/[0-9]/)) {
        mensaje = "Seguridad Media";
        color = "orange";
    } else {
        mensaje = "Seguridad Baja";
        color = "#d4af37"; // Dorado de la marca
    }

    passStrength.textContent = mensaje;
    passStrength.style.color = color;
});

// 2. Validación del formulario al enviar
document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const nombre = document.getElementById('regNombre');
    const telefono = document.getElementById('regTelefono');
    const pass = document.getElementById('regPass');
    const confirmPass = document.getElementById('regPassConfirm');

    // Validación manual de coincidencia de contraseñas
    if (pass.value !== confirmPass.value) {
        confirmPass.setCustomValidity("No coincide");
    } else {
        confirmPass.setCustomValidity("");
    }

    // Validar que el teléfono sea solo números (por si pegan texto)
    if (!/^\d{10}$/.test(telefono.value)) {
        telefono.setCustomValidity("Inválido");
    } else {
        telefono.setCustomValidity("");
    }

    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
    }

    // Crear el objeto JSON una vez validado
    const nuevoUsuario = {
        nombreCompleto: nombre.value,
        telefono: telefono.value,
        email: document.getElementById('regEmail').value,
        contrasena: pass.value
    };

    // Persistencia en LocalStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [
        { email: "admin@5taesencia.com", pass: "123456", nombre: "Victor Admin" }
    ];

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuario registrado con éxito.");
    window.location.href = "login.html";
});