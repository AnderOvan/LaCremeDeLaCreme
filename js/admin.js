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
    // VARIABLE DE EDICIÓN
    // ==============================

    let productoEditando = null;


    // ==============================
    // ELEMENTOS DEL FORMULARIO
    // ==============================

    const btnAgregarProducto =
        document.getElementById("btnAgregarProducto");

    const formularioProducto =
        document.getElementById("formularioProducto");

    const formProducto =
        document.getElementById("formProducto");

    const listaProductos =
        document.getElementById("listaProductos");

    const tituloFormulario =
        formularioProducto.querySelector("h2");

    const botonGuardar =
        formProducto.querySelector("button[type='submit']");


    // ==============================
    // MOSTRAR FORMULARIO
    // ==============================

    btnAgregarProducto.addEventListener("click", function () {

        productoEditando = null;

        formProducto.reset();

        tituloFormulario.textContent = "Agregar producto";

        botonGuardar.textContent = "Guardar producto";

        formularioProducto.style.display = "block";

    });


    // ==============================
    // MOSTRAR PRODUCTOS
    // ==============================

    function mostrarProductos() {

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

                        <button
                            class="boton_accion editar"
                            data-id="${producto.id}">
                            Editar
                        </button>

                        <button
                            class="boton_accion eliminar"
                            data-id="${producto.id}">
                            Eliminar
                        </button>

                    </div>

                </div>
            `;

        });

    }


    // ==============================
    // BOTONES EDITAR Y ELIMINAR
    // ==============================

    listaProductos.addEventListener("click", function (evento) {


        // ==============================
        // ELIMINAR
        // ==============================

        if (evento.target.classList.contains("eliminar")) {

            const id = Number(evento.target.dataset.id);

            const confirmar = confirm(
                "¿Seguro que quieres eliminar este producto?"
            );

            if (!confirmar) {
                return;
            }

            productos = productos.filter(function (producto) {
                return producto.id !== id;
            });

            localStorage.setItem(
                "productos",
                JSON.stringify(productos)
            );

            mostrarProductos();

            alert("Producto eliminado correctamente.");
        }


        // ==============================
        // EDITAR
        // ==============================

        if (evento.target.classList.contains("editar")) {

            const id = Number(evento.target.dataset.id);

            const producto = productos.find(function (producto) {
                return producto.id === id;
            });

            if (!producto) {
                return;
            }

            productoEditando = id;

            document.getElementById("nombreProducto").value =
                producto.nombre;

            document.getElementById("categoriaProducto").value =
                producto.categoria;

            document.getElementById("precioProducto").value =
                producto.precio;

            document.getElementById("stockProducto").value =
                producto.stock;

            tituloFormulario.textContent = "Editar producto";

            botonGuardar.textContent = "Guardar cambios";

            formularioProducto.style.display = "block";
        }

    });


    // ==============================
    // GUARDAR PRODUCTO
    // ==============================

    formProducto.addEventListener("submit", function (evento) {

        evento.preventDefault();


        const nombre =
            document.getElementById("nombreProducto").value.trim();

        const categoria =
            document.getElementById("categoriaProducto").value.trim();

        const precio =
            Number(document.getElementById("precioProducto").value);

        const stock =
            Number(document.getElementById("stockProducto").value);


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
        // EDITAR PRODUCTO
        // ==============================

        if (productoEditando !== null) {

            const producto =
                productos.find(function (producto) {
                    return producto.id === productoEditando;
                });

            if (producto) {

                producto.nombre = nombre;

                producto.categoria = categoria;

                producto.precio = precio;

                producto.stock = stock;

            }

            localStorage.setItem(
                "productos",
                JSON.stringify(productos)
            );

            mostrarProductos();

            formProducto.reset();

            productoEditando = null;

            tituloFormulario.textContent = "Agregar producto";

            botonGuardar.textContent = "Guardar producto";

            formularioProducto.style.display = "none";

            alert("Producto actualizado correctamente.");

            return;
        }


        // ==============================
        // CREAR PRODUCTO
        // ==============================

        const nuevoProducto = {

            id: productos.length > 0
                ? Math.max(...productos.map(function (producto) {
                    return producto.id;
                })) + 1
                : 1,

            nombre: nombre,

            categoria: categoria,

            precio: precio,

            stock: stock
        };


        productos.push(nuevoProducto);


        // ==============================
        // GUARDAR EN LOCALSTORAGE
        // ==============================

        localStorage.setItem(
            "productos",
            JSON.stringify(productos)
        );


        // ==============================
        // ACTUALIZAR TABLA
        // ==============================

        mostrarProductos();


        // ==============================
        // LIMPIAR FORMULARIO
        // ==============================

        formProducto.reset();


        // ==============================
        // OCULTAR FORMULARIO
        // ==============================

        formularioProducto.style.display = "none";


        alert("Producto agregado correctamente.");

    });


    // ==============================
    // MOSTRAR PRODUCTOS AL CARGAR
    // ==============================

    mostrarProductos();

});