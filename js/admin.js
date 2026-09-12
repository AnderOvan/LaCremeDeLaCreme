const menuItems = document.querySelectorAll(".menu-item");
const sections = document.querySelectorAll(".admin-section");

const pageTitle = document.getElementById("page-title");
const breadcrumbSection = document.getElementById("breadcrumb-section");

const sectionNames = {
    inicio: "Inicio",
    productos: "Productos",
    usuarios: "Usuarios",
    pedidos: "Pedidos",
    configuracion: "Configuración"
};

const pageTitles = {
    inicio: "Panel de administración",
    productos: "Administración de productos",
    usuarios: "Administración de usuarios",
    pedidos: "Administración de pedidos",
    configuracion: "Configuración"
};

function mostrarContenido(sectionId) {
    // Ocultar todas las secciones
    sections.forEach(section => {
        section.classList.remove("active-section");
    });

    // Quitar estado activo de todos los botones
    menuItems.forEach(item => {
        item.classList.remove("active");
    });

    // Mostrar la sección seleccionada
    const selectedSection = document.getElementById(sectionId);

    if (selectedSection) {
        selectedSection.classList.add("active-section");
    }

    // Marcar el botón seleccionado
    const selectedButton = document.querySelector(
        `.menu-item[data-section="${sectionId}"]`
    );

    if (selectedButton) {
        selectedButton.classList.add("active");
    }

    // Actualizar título y breadcrumb
    breadcrumbSection.textContent = sectionNames[sectionId] || "Inicio";
    pageTitle.textContent = pageTitles[sectionId] || "Panel de administración";
}

// Eventos del menú
menuItems.forEach(item => {
    item.addEventListener("click", () => {
        mostrarContenido(item.dataset.section);
    });
});

// Mostrar Inicio al cargar la página
mostrarContenido("inicio");
