document.addEventListener("DOMContentLoaded", function() {

    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [
        {
            id: 1,
            cliente: "Juan Pérez",
            fecha: "13/09/2026",
            total: 25000,
            estado: "Pendiente"
        },
        {
            id: 2,
            cliente: "María González",
            fecha: "13/09/2026",
            total: 18500,
            estado: "Preparando"
        },
        {
            id: 3,
            cliente: "Pedro Soto",
            fecha: "12/09/2026",
            total: 32000,
            estado: "Completado"
        }
    ];

    const listaPedidos = document.getElementById("listaPedidos");

    // Guardar pedidos en localStorage
    function guardarPedidos() {
        localStorage.setItem("pedidos", JSON.stringify(pedidos));
    }


    // Obtener clase CSS según el estado
    function obtenerClaseEstado(estado) {

        if (estado === "Pendiente") {
            return "pendiente";
        }

        if (estado === "Preparando") {
            return "preparando";
        }

        if (estado === "Completado") {
            return "completado";
        }
        return "";
    }


    // Mostrar pedidos en la tabla
    function mostrarPedidos() {
        listaPedidos.innerHTML = "";

        pedidos.forEach(function(pedido) {

            const fila = document.createElement("div");

            fila.className = "fila_tabla";


            fila.innerHTML = `
                <p>#${String(pedido.id).padStart(4, "0")}</p>
                <p>${pedido.cliente}</p>
                <p>${pedido.fecha}</p>
                <p>$${pedido.total.toLocaleString("es-CL")}</p>
                <p>
                    <select class="selector_estado" data-id="${pedido.id}">
                        <option value="Pendiente" ${pedido.estado === "Pendiente" ? "selected" : ""}>
                            Pendiente
                        </option>

                        <option value="Preparando" ${pedido.estado === "Preparando" ? "selected" : ""}>
                            Preparando
                        </option>

                        <option value="Completado" ${pedido.estado === "Completado" ? "selected" : ""}>
                            Completado
                        </option>
                    </select>
                </p>

                <div class="acciones_tabla">

                    <button type="button" class="boton_accion editar" data-id="${pedido.id}">Ver</button>

                </div>
            `;

            listaPedidos.appendChild(fila);
        });
    }


    // Cambiar estado del pedido
    listaPedidos.addEventListener("change", function(evento) {
        if (!evento.target.classList.contains("selector_estado")) {
            return;
        }

        const id = Number(evento.target.dataset.id);

        const nuevoEstado = evento.target.value;

        const pedido = pedidos.find(function(pedido) {
            return pedido.id === id;
        });

        if (!pedido) {
            return;
        }

        pedido.estado = nuevoEstado;

        guardarPedidos();
        mostrarPedidos();
    });

    // Ver información del pedido
    listaPedidos.addEventListener("click", function(evento) {

        if (!evento.target.classList.contains("editar")) {
            return;
        }

        const id = Number(evento.target.dataset.id);

        const pedido = pedidos.find(function(pedido) {
            return pedido.id === id;
        });


        if (!pedido) {
            return;
        }

        alert(
            "Pedido #" + String(pedido.id).padStart(4, "0") +
            "\nCliente: " + pedido.cliente +
            "\nFecha: " + pedido.fecha +
            "\nTotal: $" + pedido.total.toLocaleString("es-CL") +
            "\nEstado: " + pedido.estado
        );
    });


    guardarPedidos();
    mostrarPedidos();

});