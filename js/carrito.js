// ==========================================
// 1. BASE DE DATOS LOCAL DE PRODUCTOS
// ==========================================
const PRODUCTOS = [
    {
        id: 1,
        nombre: "Torta Tres Leches",
        categoria: "tradicionales",
        precio: 18990,
        descripcion: "Bizcocho tradicional remojado en mezcla de tres leches con suave merengue dorado y toque de canela.",
        imagen: "img/productos/tresleches.jpg",
        destacado: true
    },
    {
        id: 2,
        nombre: "Torta Selva Negra",
        categoria: "tradicionales",
        precio: 21500,
        descripcion: "Bizcocho de chocolate de alta pureza, relleno con crema chantilly fresca y macerado artesanal de cerezas.",
        imagen: "img/productos/selvanegra.jpeg",
        destacado: false
    },
    {
        id: 3,
        nombre: "Pie de Limón Individual",
        categoria: "postres",
        precio: 3500,
        descripcion: "Base crujiente de galleta sablée, relleno con crema ácida de limón natural y copón de merengue suizo.",
        imagen: "img/productos/pie de limon.jpg",
        destacado: true
    },
    {
        id: 4,
        nombre: "Cheesecake Frutos Rojos (Sin Azúcar)",
        categoria: "saludables",
        precio: 19990,
        descripcion: "Preparado con alulosa natural, base de harina de almendras y cobertura artesanal de frutos del bosque.",
        imagen: "img/productos/chiskake.jpg",
        destacado: true
    },
    {
        id: 5,
        nombre: "Torta Mousse Dulce de Leche",
        categoria: "tradicionales",
        precio: 22990,
        descripcion: "Hojarasca crujiente intercalada con mousse suave de manjar artesanal y toques de crema pastelera.",
        imagen: "img/productos/tortas-3.jpg",
        destacado: false
    },
    {
        id: 6,
        nombre: "Tartaleta de Fruta Estacional",
        categoria: "postres",
        precio: 4200,
        descripcion: "Masa quebrada rellena de crema pastelera a la vainilla de Papantla y selección de frutas frescas de estación.",
        imagen: "img/productos/postres-2.jpg",
        destacado: false
    }
];

// ==========================================
// 2. GESTIÓN DE PERSISTENCIA (localStorage)
// ==========================================
const LOCAL_STORAGE_KEY = 'lacreme_carrito';

function obtenerCarrito() {
    const carritoGuardado = localStorage.getItem(LOCAL_STORAGE_KEY);
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(carrito));
    actualizarContadorHeader();
}

function actualizarContadorHeader() {
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
        const carrito = obtenerCarrito();
        const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        cartCounter.textContent = totalProductos;
    }
}

function agregarAlCarrito(productoId, cantidad = 1) {
    const producto = PRODUCTOS.find(p => p.id === parseInt(productoId));
    if (!producto) return;

    let carrito = obtenerCarrito();
    const existeIndex = carrito.findIndex(item => item.id === producto.id);

    if (existeIndex !== -1) {
        carrito[existeIndex].cantidad += cantidad;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            categoria: producto.categoria,
            cantidad: cantidad
        });
    }

    guardarCarrito(carrito);
    alert(`¡"${producto.nombre}" fue añadido al carrito!`);
}

// ==========================================
// 3. RENDERIZADO EN "productos.html"
// ==========================================
function inicializarCatalogo() {
    const grid = document.getElementById('product-grid');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');

    if (!grid) return; // No está en productos.html

    function renderizar(lista) {
        grid.innerHTML = '';
        if (lista.length === 0) {
            grid.innerHTML = '<p class="no-results">No se encontraron productos que coincidan con la búsqueda.</p>';
            return;
        }

        lista.forEach(p => {
            const card = document.createElement('article');
            card.className = 'product-card';
            
            const badgeHtml = p.categoria === 'saludables' 
                ? '<span class="badge badge-health">Sin Azúcar</span>' 
                : (p.destacado ? '<span class="badge">Destacado</span>' : '');

            card.innerHTML = `
                <div class="card-image">
                    ${badgeHtml}
                    <img src="${p.imagen}" alt="${p.nombre}">
                </div>
                <div class="card-content">
                    <span class="product-category">${p.categoria.toUpperCase()}</span>
                    <h3 class="product-title">${p.nombre}</h3>
                    <p class="product-desc">${p.descripcion}</p>
                    <div class="card-footer">
                        <span class="product-price">$${p.precio.toLocaleString('es-CL')}</span>
                        <div class="card-actions">
                            <a href="detalle-producto.html?id=${p.id}" class="btn btn-secondary btn-sm">Detalle</a>
                            <button class="btn btn-primary btn-sm btn-add-cart" data-id="${p.id}">Añadir</button>
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        // Eventos en botones de añadir
        grid.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                agregarAlCarrito(id, 1);
            });
        });
    }

    function aplicarFiltros() {
        const texto = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const categoria = categoryFilter ? categoryFilter.value : 'todos';

        const filtrados = PRODUCTOS.filter(p => {
            const coincideTexto = p.nombre.toLowerCase().includes(texto) || p.descripcion.toLowerCase().includes(texto);
            const coincideCategoria = categoria === 'todos' || p.categoria === categoria;
            return coincideTexto && coincideCategoria;
        });

        renderizar(filtrados);
    }

    if (searchInput) searchInput.addEventListener('input', aplicarFiltros);
    if (categoryFilter) categoryFilter.addEventListener('change', aplicarFiltros);

    renderizar(PRODUCTOS);
}

// ==========================================
// 4. RENDERIZADO EN "detalle-producto.html"
// ==========================================
function inicializarDetalle() {
    const detailContainer = document.getElementById('product-detail-container');
    if (!detailContainer) return;

    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const producto = PRODUCTOS.find(p => p.id === productId) || PRODUCTOS[0];

    detailContainer.innerHTML = `
        <div class="detail-grid">
            <div class="detail-image-box">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="detail-info-box">
                <span class="product-category">${producto.categoria.toUpperCase()}</span>
                <h1 class="detail-title">${producto.nombre}</h1>
                <p class="detail-price">$${producto.precio.toLocaleString('es-CL')}</p>
                <p class="detail-desc">${producto.descripcion}</p>

                <div class="detail-actions">
                    <div class="quantity-selector">
                        <button type="button" id="btn-minus" class="qty-btn">-</button>
                        <input type="number" id="detail-qty" value="1" min="1" max="10" readonly>
                        <button type="button" id="btn-plus" class="qty-btn">+</button>
                    </div>
                    <button id="btn-add-detail" class="btn btn-primary btn-lg">Agregar al Carrito 🛒</button>
                </div>

                <div class="detail-extra">
                    <p>🚚 <strong>Envío a domicilio disponible</strong> en la Región Metropolitana.</p>
                    <p>🍰 <strong>Garantía de frescura:</strong> Elaborado el mismo día de entrega.</p>
                </div>
            </div>
        </div>
    `;

    const qtyInput = document.getElementById('detail-qty');
    document.getElementById('btn-minus').addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        if (val > 1) qtyInput.value = val - 1;
    });

    document.getElementById('btn-plus').addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        if (val < 10) qtyInput.value = val + 1;
    });

    document.getElementById('btn-add-detail').addEventListener('click', () => {
        const cantidad = parseInt(qtyInput.value);
        agregarAlCarrito(producto.id, cantidad);
    });
}

// ==========================================
// 5. RENDERIZADO EN "carrito.html"
// ==========================================
function inicializarCarritoPage() {
    const cartTableBody = document.getElementById('cart-table-body');
    const cartEmptyMsg = document.getElementById('cart-empty-msg');
    const cartWrapper = document.getElementById('cart-wrapper');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');

    if (!cartTableBody) return;

    function renderizar() {
        const carrito = obtenerCarrito();

        if (carrito.length === 0) {
            cartWrapper.style.display = 'none';
            cartEmptyMsg.style.display = 'block';
            return;
        }

        cartWrapper.style.display = 'grid';
        cartEmptyMsg.style.display = 'none';
        cartTableBody.innerHTML = '';

        let subtotalAcumulado = 0;

        carrito.forEach(item => {
            const subtotalItem = item.precio * item.cantidad;
            subtotalAcumulado += subtotalItem;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="cart-col-product">
                    <img src="${item.imagen}" alt="${item.nombre}" class="cart-thumb">
                    <div>
                        <strong>${item.nombre}</strong>
                        <br><small class="text-muted">${item.categoria.toUpperCase()}</small>
                    </div>
                </td>
                <td class="cart-col-price">$${item.precio.toLocaleString('es-CL')}</td>
                <td class="cart-col-qty">
                    <div class="quantity-selector">
                        <button class="qty-btn btn-mod-qty" data-id="${item.id}" data-change="-1">-</button>
                        <span>${item.cantidad}</span>
                        <button class="qty-btn btn-mod-qty" data-id="${item.id}" data-change="1">+</button>
                    </div>
                </td>
                <td class="cart-col-subtotal">$${subtotalItem.toLocaleString('es-CL')}</td>
                <td class="cart-col-action">
                    <button class="btn-delete" data-id="${item.id}" title="Eliminar del carrito">🗑️</button>
                </td>
            `;
            cartTableBody.appendChild(tr);
        });

        if (subtotalEl) subtotalEl.textContent = `$${subtotalAcumulado.toLocaleString('es-CL')}`;
        if (totalEl) totalEl.textContent = `$${subtotalAcumulado.toLocaleString('es-CL')}`;

        // Asignar eventos de cantidad
        document.querySelectorAll('.btn-mod-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                const cambio = parseInt(e.target.getAttribute('data-change'));
                modificarCantidad(id, cambio);
            });
        });

        // Asignar eventos de eliminar
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                eliminarDelCarrito(id);
            });
        });
    }

    function modificarCantidad(id, cambio) {
        let carrito = obtenerCarrito();
        const index = carrito.findIndex(item => item.id === id);
        if (index !== -1) {
            carrito[index].cantidad += cambio;
            if (carrito[index].cantidad <= 0) {
                carrito.splice(index, 1);
            }
            guardarCarrito(carrito);
            renderizar();
        }
    }

    function eliminarDelCarrito(id) {
        let carrito = obtenerCarrito();
        carrito = carrito.filter(item => item.id !== id);
        guardarCarrito(carrito);
        renderizar();
    }

    const btnClear = document.getElementById('btn-clear-cart');
    if (btnClear) {
        btnClear.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que deseas vaciar el carrito de compras?')) {
                guardarCarrito([]);
                renderizar();
            }
        });
    }

    renderizar();
}

// ==========================================
// 6. INICIALIZADOR GLOBAL
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorHeader();
    inicializarCatalogo();
    inicializarDetalle();
    inicializarCarritoPage();
});