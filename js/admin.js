document.addEventListener("DOMContentLoaded", function () {

    console.log("Panel administrativo cargado correctamente.");

    let productos = [
        {
            id: 1,
            nombre: "Pastel mil hojas",
            categoria: "Pasteles",
            precio: 10500,
            stock: 22
        },
        {
            id: 2,
            nombre: "Torta de chocolate",
            categoria: "Tortas",
            precio: 15000,
            stock: 10
        },
        {
            id: 3,
            nombre: "Brownie",
            categoria: "Repostería",
            precio: 4500,
            stock: 0
        }
    ];

    console.log(productos);

    function mostrarProductos() {

    const listaProductos = document.getElementById("listaProductos");

    listaProductos.innerHTML = "";

    productos.forEach(function(producto) {

        let estado;

        if (producto.stock > 0) {
            estado = `
                <span class="estado disponible">
                    Disponible
                </span>
            `;
        } else {
            estado = `
                <span class="estado agotado">
                    Agotado
                </span>
            `;
        }

        listaProductos.innerHTML += `
            <div class="fila_tabla">

                <p>${producto.nombre}</p>

                <p>${producto.categoria}</p>

                <p>$${producto.precio.toLocaleString("es-CL")}</p>

                <p>${producto.stock}</p>

                <p>${estado}</p>

                <div class="acciones_tabla">
                    <button class="boton_accion editar">
                        Editar
                    </button>

                    <button class="boton_accion eliminar">
                        Eliminar
                    </button>
                </div>

            </div>
        `;
    });

    }

    mostrarProductos();

});