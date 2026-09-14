document.addEventListener("DOMContentLoaded", function () {

    // =-=-=-= Configuración inicial =-=-=-=

    const btnAgregarCliente = document.getElementById("btnAgregarCliente");
    const formularioCliente = document.getElementById("formularioCliente");
    const formCliente = document.getElementById("formCliente");
    const listaClientes = document.getElementById("listaClientes");

    const nombreCliente = document.getElementById("nombreCliente");
    const correoCliente = document.getElementById("correoCliente");
    const telefonoCliente = document.getElementById("telefonoCliente");

    let clienteEditando = null;

    // =-=-=-= Cargar clientes =-=-=-=

    let clientes = JSON.parse(localStorage.getItem("clientes")) || [
        {
            id: 1,
            nombre: "Juan Pérez",
            correo: "juan@email.com",
            telefono: "+56 9 1234 5678",
            pedidos: 4,
            estado: "Activo"
        },
        {
            id: 2,
            nombre: "María González",
            correo: "maria@email.com",
            telefono: "+56 9 8765 4321",
            pedidos: 7,
            estado: "Activo"
        },
        {
            id: 3,
            nombre: "Pedro Soto",
            correo: "pedro@email.com",
            telefono: "+56 9 5555 5555",
            pedidos: 2,
            estado: "Activo"
        }
    ];

    // =-=-=-= Guardar clientes =-=-=-=

    function guardarClientes() {
        localStorage.setItem("clientes", JSON.stringify(clientes));
    }

    // =-=-=-= Mostrar clientes =-=-=-=

    function mostrarClientes() {

        listaClientes.innerHTML = "";

        clientes.forEach(function (cliente) {

            const fila = document.createElement("div");
            fila.classList.add("fila_tabla");

            fila.innerHTML = `
                <p>${cliente.nombre}</p>
                <p>${cliente.correo}</p>
                <p>${cliente.telefono}</p>
                <p>${cliente.pedidos}</p>
                <p><span class="estado disponible">${cliente.estado}</span></p>

                <div class="acciones_tabla">
                    <button type="button" class="boton_accion editar" data-id="${cliente.id}">Editar</button>
                    <button type="button" class="boton_accion eliminar" data-id="${cliente.id}">Eliminar</button>
                </div>
            `;

            listaClientes.appendChild(fila);
        });
    }

    // =-=-=-= Mostrar formulario =-=-=-=

    btnAgregarCliente.addEventListener("click", function () {

        clienteEditando = null;

        formCliente.reset();

        formularioCliente.style.display = "block";

        document.getElementById("tituloFormularioCliente").textContent = "Agregar cliente";
        document.getElementById("botonGuardarCliente").textContent = "Guardar cliente";
    });

    // =-=-=-= Guardar / editar cliente =-=-=-=

    formCliente.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const nombre = nombreCliente.value.trim();
        const correo = correoCliente.value.trim();
        const telefono = telefonoCliente.value.trim();

        // =-=-=-= Validaciones =-=-=-=

        if (nombre.length < 3) {
            alert("El nombre debe tener al menos 3 caracteres.");
            return;
        }

        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formatoCorreo.test(correo)) {
            alert("Ingresa un correo electrónico válido. Ejemplo: cliente@email.com");
            return;
        }

        const numerosTelefono = telefono.replace(/\D/g, "");

        if (numerosTelefono.length < 9) {
            alert("El teléfono debe contener al menos 9 números.");
            return;
        }

        // =-=-=-= Editar cliente =-=-=-=

        if (clienteEditando !== null) {

            const cliente = clientes.find(function (cliente) {
                return cliente.id === clienteEditando;
            });

            if (cliente) {
                cliente.nombre = nombre;
                cliente.correo = correo;
                cliente.telefono = telefono;
            }

            alert("Cliente actualizado correctamente.");

        } else {

            // =-=-=-= Crear nuevo cliente =-=-=-=

            const nuevoId = clientes.length > 0
                ? Math.max(...clientes.map(function (cliente) {
                    return cliente.id;
                })) + 1
                : 1;

            const nuevoCliente = {
                id: nuevoId,
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                pedidos: 0,
                estado: "Activo"
            };

            clientes.push(nuevoCliente);

            alert("Cliente agregado correctamente.");
        }

        guardarClientes();
        mostrarClientes();

        formCliente.reset();
        formularioCliente.style.display = "none";

        clienteEditando = null;
    });

    // =-=-=-= Editar / eliminar =-=-=-=

    listaClientes.addEventListener("click", function (evento) {

        const id = Number(evento.target.dataset.id);

        if (!id) {
            return;
        }

        // =-=-=-= Editar =-=-=-=

        if (evento.target.classList.contains("editar")) {

            const cliente = clientes.find(function (cliente) {
                return cliente.id === id;
            });

            if (!cliente) {
                return;
            }

            clienteEditando = cliente.id;

            nombreCliente.value = cliente.nombre;
            correoCliente.value = cliente.correo;
            telefonoCliente.value = cliente.telefono;

            formularioCliente.style.display = "block";

            document.getElementById("tituloFormularioCliente").textContent = "Editar cliente";
            document.getElementById("botonGuardarCliente").textContent = "Guardar cambios";
        }

        // =-=-=-= Eliminar =-=-=-=

        if (evento.target.classList.contains("eliminar")) {

            const cliente = clientes.find(function (cliente) {
                return cliente.id === id;
            });

            if (!cliente) {
                return;
            }

            const confirmar = confirm(
                `¿Estás seguro de eliminar al cliente ${cliente.nombre}?`
            );

            if (!confirmar) {
                return;
            }

            clientes = clientes.filter(function (cliente) {
                return cliente.id !== id;
            });

            guardarClientes();
            mostrarClientes();

            alert("Cliente eliminado correctamente.");
        }
    });

    // =-=-=-= Mostrar datos al cargar =-=-=-=

    mostrarClientes();

});