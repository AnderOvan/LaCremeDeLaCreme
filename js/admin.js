document.addEventListener("DOMContentLoaded", function () {

    console.log("Panel administrativo cargado correctamente.");


    // ==============================
    // PRODUCTOS
    // ==============================

    let productos = JSON.parse(localStorage.getItem("productos")) || [
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


    // ==============================
    // ELEMENTOS DEL FORMULARIO
    // ==============================

    const btnAgregarProducto = document.getElementById("btnAgregarProducto");
    const formularioProducto = document.getElementById("formularioProducto");
    const formProducto = document.getElementById("formProducto");

    // ==============================
    // MOSTRAR FORMULARIO
    // ==============================

    btnAgregarProducto.addEventListener("click", function () {
        formularioProducto.style.display = "block";
    });


    // ==============================
    // MOSTRAR PRODUCTOS
    // ==============================

    function mostrarProductos() {
        const listaProductos = document.getElementById("listaProductos");
        listaProductos.innerHTML = "";
        productos.forEach(function (producto) {
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


    // ==============================
    // GUARDAR PRODUCTO
    // ==============================

    formProducto.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const nombre = document.getElementById("nombreProducto").value.trim();
        const categoria = document.getElementById("categoriaProducto").value.trim();
        const precio = Number(
            document.getElementById("precioProducto").value
        );

        const stock = Number(
            document.getElementById("stockProducto").value
        );


        // ==============================
        // VALIDACIONES
        // ==============================

        if (nombre === "") {
        alert("El nombre del producto es obligatorio.");
        return;
        }

        if (categoria === "") {
        alert("La categoría del producto es obligatoria.");
        return;
        }

        if (precio <= 0) {
        alert("El precio debe ser mayor que $0.");
        return;
        }

        if (stock < 0) {
        alert("El stock no puede ser negativo.");
        return;
        }


        // ==============================
        // CREAR PRODUCTO
        // ==============================
        const nuevoProducto = {
            id: productos.length + 1,
            nombre: nombre,
            categoria: categoria,
            precio: precio,
            stock: stock
        };

        // Agregar al array
        productos.push(nuevoProducto);

        // Guardar en localStorage
        localStorage.setItem(
            "productos",
            JSON.stringify(productos)
        );


        // Actualizar tabla
        mostrarProductos();

        // Limpiar formulario
        formProducto.reset();

        // Limpiar mensaje
        mensajeError.textContent = "";

        // Ocultar formulario
        formularioProducto.style.display = "none";
    });


    // Mostrar productos al cargar
    mostrarProductos();

});