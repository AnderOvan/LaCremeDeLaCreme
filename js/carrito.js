/* ==========================================================================
   CARRITO DE COMPRAS - LA CREME DE LA CREME
   Manejo de productos, localStorage y actualización dinámica de la vista
   ========================================================================== */

// Key para almacenar en localStorage
const LOCAL_STORAGE_CART_KEY = 'pasteleria_carrito_dss';

// 1. Cargar el carrito desde localStorage o inicializarlo vacío
let carrito = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || [];

// ==========================================================================
// FUNCIONES DE MANEJO DE DATOS (localStorage)
// ==========================================================================

/**
 * Guarda el estado actual del carrito en localStorage
 */
function guardarCarritoLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(carrito));
    actualizarContadorCarrito();
}

/**
 * Calcula la cantidad total de productos en el carrito y actualiza el contador del header
 */
function actualizarContadorCarrito() {
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        cartCounter.textContent = totalItems;
    }
}

/**
 * Agrega un producto al carrito o incrementa su cantidad si ya existe
 * @param {Object} producto - Objeto con id, nombre, precio, imagen
 * @param {number} cantidad - Cantidad a agregar (por defecto 1)
 */
function agregarAlCarrito(producto, cantidad = 1) {
    const index = carrito.findIndex(item => item.id === producto.id);

    if (index !== -1) {
        // Si el producto ya está en el carrito, se incrementa la cantidad
        carrito[index].cantidad += cantidad;
    } else {
        // Si no existe, se agrega como nuevo ítem
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad
        });
    }

    guardarCarritoLocalStorage();
    mostrarNotificacion(`${producto.nombre} agregado al carrito 🛒`);
}

/**
 * Cambia la cantidad de un producto específico en el carrito
 * @param {number|string} idProducto 
 * @param {number} nuevaCantidad 
 */
function cambiarCantidadProducto(idProducto, nuevaCantidad) {
    const item = carrito.find(p => p.id == idProducto);
    if (item) {
        if (nuevaCantidad <= 0) {
            eliminarDelCarrito(idProducto);
        } else {
            item.cantidad = parseInt(nuevaCantidad);
            guardarCarritoLocalStorage();
            renderizarPaginaCarrito();
        }
    }
}

/**
 * Elimina un producto por completo del carrito
 * @param {number|string} idProducto 
 */
function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id != idProducto);
    guardarCarritoLocalStorage();
    renderizarPaginaCarrito();
}

/**
 * Vacía por completo el carrito de compras
 */
function vaciarCarrito() {
    carrito = [];
    guardarCarritoLocalStorage();
    renderizarPaginaCarrito();
}

// ==========================================================================
// RENDERIZADO EN VISTA (carrito.html)
// ==========================================================================

/**
 * Renderiza los elementos en la tabla de carrito.html y calcula el total
 */
function renderizarPaginaCarrito() {
    const contenedorTabla = document.getElementById('carrito-body');
    const elementoTotal = document.getElementById('carrito-total');
    const contenedorVacio = document.getElementById('carrito-vacio');
    const contenedorContenido = document.getElementById('carrito-contenido');

    // Si no estamos en la página del carrito (carrito.html), omitimos el renderizado de la tabla
    if (!contenedorTabla) return;

    if (carrito.length === 0) {
        if (contenedorVacio) contenedorVacio.classList.remove('hidden');
        if (contenedorContenido) contenedorContenido.classList.add('hidden');
        return;
    }

    if (contenedorVacio) contenedorVacio.classList.add('hidden');
    if (contenedorContenido) contenedorContenido.classList.remove('hidden');

    contenedorTabla.innerHTML = '';
    let totalGeneral = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        totalGeneral += subtotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="cart-item-detail">
                    <img src="${item.imagen}" alt="${item.nombre}" class="cart-thumb">
                    <span>${item.nombre}</span>
                </div>
            </td>
            <td>$${item.precio.toLocaleString('es-CL')}</td>
            <td>
                <div class="cart-qty-controls">
                    <button class="btn-qty" onclick="cambiarCantidadProducto('${item.id}', ${item.cantidad - 1})">-</button>
                    <input type="number" value="${item.cantidad}" min="1" onchange="cambiarCantidadProducto('${item.id}', this.value)">
                    <button class="btn-qty" onclick="cambiarCantidadProducto('${item.id}', ${item.cantidad + 1})">+</button>
                </div>
            </td>
            <td><strong>$${subtotal.toLocaleString('es-CL')}</strong></td>
            <td>
                <button class="btn-delete" onclick="eliminarDelCarrito('${item.id}')" title="Eliminar producto">🗑️</button>
            </td>
        `;
        contenedorTabla.appendChild(tr);
    });

    if (elementoTotal) {
        elementoTotal.textContent = `$${totalGeneral.toLocaleString('es-CL')}`;
    }
}

/**
 * Notificación flotante de confirmación cuando se agrega un producto
 */
function mostrarNotificacion(mensaje) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }
    
    toast.textContent = mensaje;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// ==========================================================================
// INICIALIZACIÓN
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
    renderizarPaginaCarrito();
});